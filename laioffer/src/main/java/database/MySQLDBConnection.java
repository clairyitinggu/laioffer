package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import entity.Order;
import entity.Order.OrderBuilder;
import entity.Robot;
import entity.Robot.RobotBuilder;

/**
 * This class is client access to mysql database
 * @author Kira
 *
 */
public class MySQLDBConnection {
	private Connection conn;
	
	/**
	 * creating connection
	 */
	public MySQLDBConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
			conn = DriverManager.getConnection(MySQLDBConstant.URL);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * closing connection
	 */
	public void close() {
		if(conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * Getting order from data base according to tracking number
	 * @param trackingNumber - tracking number of order to be tracked
	 * @return the order object corresponding to such tracking number
	 *            null if no such order
	 */
	public Order getTrackOrder(String trackingNumber) {
		if(conn == null) {
			System.err.println("DB connection failed");
			return null;
		}
		
		Order order = null;
		String sql = "SELECT * FROM package WHERE tracking_number = ?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, trackingNumber);
			ResultSet rs = statement.executeQuery();
			
			
			OrderBuilder builder = new OrderBuilder();
			if(rs.next()) {
				order = builder.setUsername(rs.getString("username"))
								.setTrackingNumber(rs.getString("tracking_number"))
								.setStart(rs.getString("start"))
								.setDestination(rs.getString("destination"))
								.setStatus(rs.getString("status"))
								.setRobotId(rs.getString("robot_id"))
								.build();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return order;
	}
	
	/**
	 * Getting robot from data base according to robot id
	 * @param robotId - id of robot to be selected
	 * @return object of robot 
	 */
	public Robot getRobot(String robotId) {
		if(conn == null) {
			System.err.println("DB connection failed");
			return null;
		}
		
		Robot robot = null;
		String sql = "SELECT * FROM robot WHERE robot_id = ?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, robotId);
			ResultSet rs = statement.executeQuery();
			
			
			RobotBuilder builder = new RobotBuilder();
			if(rs.next()) {
				robot = builder.setRobotId(rs.getString("robot_id"))
								.setType(rs.getString("type"))
								.setStatus(rs.getString("status"))
								.setTrackingNumber(rs.getString("tracking_number"))
								.build();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return robot;
	}
	
	/**
	 * Getting all orders from data base according to the username
	 * @param username - the username of current user
	 * @return list of order objects
	 */
	public List<Order> getHistory(String username) {
		List<Order> history = new ArrayList<>();
		if(conn == null) {
			System.err.println("DB connection failed");
			return history;
		}
		
		String sql = "SELECT * FROM package WHERE username = ?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, username);
			ResultSet rs = statement.executeQuery();
			OrderBuilder builder = new OrderBuilder();
			while(rs.next()) {
				Order order = builder.setUsername(rs.getString("username"))
						.setTrackingNumber(rs.getString("tracking_number"))
						.setStart(rs.getString("start"))
						.setDestination(rs.getString("destination"))
						.setStatus(rs.getString("status"))
						.setRobotId(rs.getString("robot_id"))
						.build();
				history.add(order);
			}
		} catch(SQLException e) {
			e.printStackTrace();
		}
		return history;
	}
	
	/**
	 * Save order into database
	 * @param order - the order to be saved
	 */
	public void setOrder(Order order) {
		if(conn == null) {
			System.err.println("DB connection failed");
			return;
		}
		
		String sql = "INSERT IGNORE INTO package VALUES (?,?,?,?,?,?)";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, order.getTrackingNumber());
			statement.setString(2, order.getUsername());
			statement.setString(3, order.getStart());
			statement.setString(4, order.getDestination());
			statement.setString(5, order.getStatus());
			statement.setString(6, order.getRobotId());
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * set the robot to handle an order
	 * @return
	 */
	public void setRobot(String trackingNumber, String robotId, String free) {
		if(conn == null) {
			System.err.println("DB connection failed");
			return;
		}
		
		String sql = "UPDATE robot SET tracking_number = ?, status = ? WHERE robot_id = ?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, trackingNumber);
			statement.setString(2, free);
			statement.setString(3, robotId);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void deliveredOrder(String trackingNumber) {
		if(conn == null) {
			System.err.println("DB connection failed");
			return;
		}	
		String sql = "UPDATE package SET status = ? WHERE tracking_number = ?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, "delivered");
			statement.setString(2, trackingNumber);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Adding user
	 * @param username
	 * @param password
	 * @param email
	 * @return
	 */
	public boolean addUser(String username, String password, String email) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return false;
		}

		String sql = "INSERT IGNORE INTO user VALUES (?, ?, ?)";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, username);
			statement.setString(2, password);
			statement.setString(3, email);
			return statement.executeUpdate() == 1;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
     * Checking login
     * @param username
     * @param password
     * @return
     */

	public boolean checkLogin(String username, String password) {
		if (conn == null) {
			System.err.print("DB Connection fail");
			return false;
		}
		String sql = "SELECT * FROM user WHERE username = ? and password = ?";

		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, username);
			statement.setString(2, password);
			ResultSet result = statement.executeQuery();
			return result.next();

		} catch(SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

	
	/**
	 * Get all robots from database
	 * @return the list of robots
	 */
	public List<Robot> getAllRobots() {
		List<Robot> robots = new ArrayList<>();
		if(conn == null) {
			System.err.println("DB connection failed");
			return robots;
		}
		
		String sql = "SELECT * FROM robot";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			ResultSet rs = statement.executeQuery();
			RobotBuilder builder = new RobotBuilder();
			while(rs.next()) {
				Robot robot = builder.setRobotId(rs.getString("robot_id"))
									.setType(rs.getString("type"))
									.setTrackingNumber(rs.getString("tracking_number"))
									.setStatus(rs.getString("status"))
									.setDispatcher(rs.getString("dispatcher"))
									.build();
				robots.add(robot);
			}
		} catch(SQLException e) {
			e.printStackTrace();
		}
		return robots;
	}
	
	/**
	 * Getting the free robot
	 * @param dispatcher - the dispatcher where selected robot belong to
	 * @return free robot with such dispatcher
	 */
	public Robot getFreeRobot(String dispatcher, String method) {
		Robot robot = null;
		if(conn == null) {
			System.err.println("DB connection failed");
			return robot;
		}
		
		String sql = "SELECT * FROM robot WHERE dispatcher = ? AND type = ? AND status = 'free'";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, dispatcher);
			statement.setString(2, method);
			ResultSet rs = statement.executeQuery();
			
			
			RobotBuilder builder = new RobotBuilder();
			if(rs.next()) {
				robot = builder.setRobotId(rs.getString("robot_id"))
								.setType(rs.getString("type"))
								.setStatus(rs.getString("status"))
								.setTrackingNumber(rs.getString("tracking_number"))
								.setDispatcher(rs.getString("dispatcher"))
								.build();
				return robot;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}		
		return robot;
	}
}
