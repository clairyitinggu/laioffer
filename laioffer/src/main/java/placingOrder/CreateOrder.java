package placingOrder;

import java.sql.Timestamp;
import java.util.List;

import database.MySQLDBConnection;
import entity.Order;
import entity.Order.OrderBuilder;
import entity.Robot;
import robotManagement.Point;
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
	public Order createOrder(String username, String start, String destination, String method, 
			String dispatcher, List<Point> route) {
		// creating temporary tracking number
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String trackingNumber = username + timestamp.getTime();
		
		Robot robot = RobotManagement.getFreeRobot(trackingNumber, method, dispatcher, route);
		
		OrderBuilder builder = new OrderBuilder();
		Order order = builder.setUsername(username)
							.setTrackingNumber(trackingNumber)
							.setStart(start)
							.setDestination(destination)
							.setRobotId(robot.getRobotId())
							.setStatus("shipping")
							.build();
		
		// Save order into Database
		MySQLDBConnection connection = new MySQLDBConnection();
		connection.setOrder(order);
		connection.close();
		return order;
	}
}
