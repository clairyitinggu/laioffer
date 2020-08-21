package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import entity.Order;
import entity.Order.OrderBuilder;

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
	 * 
	 * @param trackingNumber - tracking number of order to be tracked
	 * @return the order object corresponding to such tracking number
	 *            null if no such order
	 */
	public Order getTrackOrder(String trackingNumber) {
		if(conn == null) {
			System.err.println("DB connection failed");
			return null;
		}
		
		Order result = null;
		String sql = "SELECT * FROM package WHERE tracking_number = ?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, trackingNumber);
			ResultSet rs = statement.executeQuery();
			
			
			OrderBuilder builder = new OrderBuilder();
			if(rs.next()) {
				result = builder.setUsername(rs.getString("username"))
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
		return result;
	}
}
