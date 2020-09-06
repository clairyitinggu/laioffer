package robotManagement;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import org.json.JSONArray;
import org.json.JSONObject;

import entity.Robot;

public class RobotSimulator extends TimerTask implements Runnable{
	private List<Point> route;
	private int index;
	private Timer timer;
	private double lat;
	private double lng;
	
	private String robotId;
	private String type;
	private String status;
	private String trackingNumber;
	private String dispatcher;
	
	public RobotSimulator(Timer timer, Robot robot) {
		index = 0;
		route = new ArrayList<>();
		lat = 0;
		lng = 0;
		this.timer = timer;
		this.robotId = robot.getRobotId();
		this.type = robot.getType();
		this.status = robot.getStatus();
		this.trackingNumber = robot.getTrackingNumber();
		this.dispatcher = robot.getDispatcher();
	}
	
	public String getStatus() {
		return status;
	}
	
	public JSONObject getLocation() {
		JSONObject object = new JSONObject();
		object.put("lat", this.lat);
		object.put("lng", this.lng);
		return object;
	}
	
	public JSONArray getRoute() {
		if(type.equals("robot")) {
			return robotRoute();
		} else {
			return droneRoute();
		}
	}
	
	public String getRobotId() {
		return robotId;
	}
	
	public String getTrackingNumber() {
		return trackingNumber;
	}
	
	public void start(String trackingNumber, List<Point> route) {
		setRoute(route);
		setStatus("busy");
		setTrackingNumber(trackingNumber);
		lat = route.get(0).getLat();
		lng = route.get(0).getLng();
		timer.schedule(this, 0, 500);
	}
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		System.out.println(robotId + " move to Lat: " + lat + " Lng: " + lng);

		if(this.type.equals("robot")) {
			runRobot();
		} else {
			runDrone();
		}
		if(index == route.size() - 1) {
			reset();
		}
	}
	
	private void runRobot() {
		lat += (route.get(index+1).getLat() - route.get(index).getLat()) / 3;
		lng += (route.get(index+1).getLng() - route.get(index).getLng()) / 3;
		if(nextPoint()) {
			index++;
			if(index < route.size()) {
				lat = route.get(index).getLat();
				lng = route.get(index).getLng();
			}
		}
	}
	
	private void runDrone() {
		lat += (route.get(index+1).getLat() - route.get(index).getLat()) / 100;
		lng += (route.get(index+1).getLng() - route.get(index).getLng()) / 100;
		if(nextPoint()) {
			index++;
		}
	}
	
	private boolean nextPoint() {
		boolean passLat = false;
		boolean passLng = false;
		
		if(route.get(index+1).getLat() <= route.get(index).getLat() && lat <= route.get(index+1).getLat()) {
			passLat = true;
		} else if (route.get(index+1).getLat() >= route.get(index).getLat() && lat >= route.get(index+1).getLat()) {
			passLat = true;
		}
		
		if(route.get(index+1).getLng() <= route.get(index).getLng() && lng <= route.get(index+1).getLng()) {
			passLng = true;
		} else if (route.get(index+1).getLng() >= route.get(index).getLng() && lng >= route.get(index+1).getLng()) {
			passLng = true;
		}
		
		return passLat && passLng;
	}
	
	private void reset() {
		System.out.println(robotId + " finish route");
		timer.cancel();
		RobotManagement.delivered(trackingNumber);
		RobotManagement.setFreeRobot(robotId);
		RobotManagement.initializeRobot(robotId);
	}
	
	private void setRoute(List<Point> route) {
		this.route = route;
	}
	
	private void setStatus(String status) {
		this.status = status;
	}
	
	private void setTrackingNumber(String trackingNumber) {
		this.trackingNumber = trackingNumber;
	}
	
	private JSONArray robotRoute() {
		JSONArray array = new JSONArray();
		JSONObject object = new JSONObject();
		object.put("lat", lat);
		object.put("lng", lng);
		array.put(object);
		
		
		for(int i = index+1; i < route.size(); i++) {
			object = new JSONObject();
			object.put("lat", route.get(i).getLat());
			object.put("lng", route.get(i).getLng());
			array.put(object);
		}
		return array;
	}
	
	private JSONArray droneRoute() {
		JSONArray array = new JSONArray();
		
		JSONObject object = new JSONObject();
		object.put("lat", lat);
		object.put("lng", lng);
		array.put(object);
		
		JSONObject obj = new JSONObject();
		obj.put("lat", route.get(1).getLat());
		obj.put("lng", route.get(1).getLng());
		array.put(obj);
		
		return array;
	}
}
