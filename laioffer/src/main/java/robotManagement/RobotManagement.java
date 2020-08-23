package robotManagement;

import database.MySQLDBConnection;
import entity.Robot;
import entity.Robot.RobotBuilder;

/**
 * This class would managing the set of robots
 * @author Kira
 *
 */
public class RobotManagement {
	
	/**
	 * Assigning free robot to work
	 * @param trackingNumber - the tracking number of order
	 * @param method - the user selected shipping method
	 * @return the assigned robot object
	 */
	public Robot getFreeRobot(String trackingNumber, String method) {
		RobotBuilder builder = new RobotBuilder();
		Robot robot = builder.setRobotId(String.valueOf((int) Math.random() * 50))
				.setTrackingNumber(trackingNumber).setStatus("busy").setType(method).build();
		MySQLDBConnection connection = new MySQLDBConnection();
		connection.setRobot(robot);
		connection.close();
		return robot;
	}
	
	
}
