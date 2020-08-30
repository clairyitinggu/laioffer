package robotManagement;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import entity.Robot;

public class RobotSimulator extends TimerTask implements Runnable{
	private List<Point> route;
	private int index;
	private Timer timer;
	
	private String robotId;
	private String type;
	private String status;
	private String trackingNumber;
	private String dispatcher;
	
	public RobotSimulator(Timer timer, Robot robot) {
		index = 0;
		route = new ArrayList<>();
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
	
	public Point getLocation() {
		return route.get(index);
	}
	
	public String getRobotId() {
		return robotId;
	}
	
	public void start(String trackingNumber, List<Point> route) {
		setRoute(route);
		setStatus("busy");
		setTrackingNumber(trackingNumber);
		timer.schedule(this, 0, 5000);
	}
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		System.out.println(robotId + " move to Lat: " + route.get(index).getLat() + " Lng: " + route.get(index).getLng());
		index++;
		if(index == route.size()) {
			reset();
		}
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
}
