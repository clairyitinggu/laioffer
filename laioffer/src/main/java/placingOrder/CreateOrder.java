package placingOrder;

import java.sql.Timestamp;

import database.MySQLDBConnection;
import entity.Order;
import entity.Order.OrderBuilder;
import entity.Robot;
import robotManagement.RobotManagement;

/**
 * This class would creating the submit order and assigning robot to such order
 * @author Kira
 *
 */
public class CreateOrder {

	/**
	 * Creating order
	 * @param username - the user submit order
	 * @param start - start location
	 * @param destination - destination location
	 * @param method - the shipping method
	 * @return order object of submitted order
	 */
	public Order createOrder(String username, String start, String destination, String method) {
		// creating temporary tracking number
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String trackingNumber = username + timestamp.getTime();
		
		RobotManagement manage = new RobotManagement();
		Robot robot = manage.getFreeRobot(trackingNumber, method);
		OrderBuilder builder = new OrderBuilder();
		Order order = builder.setUsername(username)
							.setTrackingNumber(trackingNumber)
							.setStart(start)
							.setDestination(destination)
							.setRobotId(robot.getRobotId())
							.setStatus("picking up")
							.build();
		
		// Save order into Database
		MySQLDBConnection connection = new MySQLDBConnection();
		connection.setOrder(order);
		connection.close();
		return order;
	}
}
