package robotManagement;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;

import org.json.JSONArray;
import org.json.JSONObject;

import database.MySQLDBConnection;
import entity.Robot;

/**
 * This class would managing the set of robots
 * @author Kira
 *
 */
public class RobotManagement {
	
	private static Map<String, RobotSimulator> robots = new HashMap<>();
	
	/**
	 * Assigning free robot to work
	 * @param trackingNumber - the tracking number of order
	 * @param method - the user selected shipping method
	 * @return the assigned robot object
	 */
	public static Robot getFreeRobot(String trackingNumber, String method, String dispatcher, List<Point> route) {
		if(robots.size() == 0) {
			initializeRobots();
		}
		MySQLDBConnection connection = new MySQLDBConnection();
		Robot robot = connection.getFreeRobot(dispatcher, method);
		if(robot == null) {
			return null;
		}
		connection.setRobot(trackingNumber, robot.getRobotId(), "busy");
		connection.close();

		RobotSimulator simulator = robots.get(robot.getRobotId());
		simulator.start(trackingNumber, route);
		return robot;
	}
	
	/**
	 * Free the robot after finish job
	 * @param robotId - id of the robot finish shipping
	 */
	public static void setFreeRobot(String robotId) {
		MySQLDBConnection connection = new MySQLDBConnection();
		connection.setRobot(null, robotId, "free");
		connection.close();
	}
	
	public static void delivered(String trackingNumber) {
		MySQLDBConnection connection = new MySQLDBConnection();
		connection.deliveredOrder(trackingNumber);
		connection.close();
	}
	
	/**
	 * Getting current location point of a robot
	 * @param robotId - id of robot
	 * @return location point of the robot
	 */
	public static JSONObject getLocation(String robotId, String trackingNumber) {
		RobotSimulator simulator = robots.get(robotId);
		if(simulator.getTrackingNumber() == null || !simulator.getTrackingNumber().equals(trackingNumber)) {
			return null;
		}
		return simulator.getLocation();
	}
	
	/**
	 * Getting the rest points of route of a robot
	 * @param robotId
	 * @param trackingNumber
	 * @return
	 */
	public static JSONArray getRoute(String robotId, String trackingNumber) {
		RobotSimulator simulator = robots.get(robotId);
		if(simulator.getTrackingNumber() == null || !simulator.getTrackingNumber().equals(trackingNumber)) {
			return null;
		}
		return simulator.getRoute();
	}
	
	/**
	 * Initialized threads for each robots
	 */
	public static void initializeRobots() {
		MySQLDBConnection connection = new MySQLDBConnection();
		List<Robot> robotsList = connection.getAllRobots();
		connection.close();
		
		for(Robot robot : robotsList) {
			Timer timer = new Timer();
			robots.put(robot.getRobotId(), new RobotSimulator(timer, robot));
		}
	}
	
	public static void initializeRobot(String robotId) {
		MySQLDBConnection connection = new MySQLDBConnection();
		Robot robot = connection.getRobot(robotId);
		robots.put(robotId,  new RobotSimulator(new Timer(), robot));
	}
}
