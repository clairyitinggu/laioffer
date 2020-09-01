package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

/**
 * 
 * @author Kira This is a class for reset and create the table in mysql database
 *         And couple fake data would be added for developing and debuging
 */
public class MySQLTableReset {
	// Run this as Java application to reset the database
	public static void main(String[] args) {

		try {
			// Step 1 Connect to MySQL.
			System.out.println("Connecting to " + MySQLDBConstant.URL);
			Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
			Connection conn = DriverManager.getConnection(MySQLDBConstant.URL);
			if (conn == null) {
				return;
			}

			// Step 2 Drop tables if they exists
			Statement statement = conn.createStatement();
			String sql = "DROP TABLE IF EXISTS package";
			statement.executeUpdate(sql);

			sql = "DROP TABLE IF EXISTS user";
			statement.executeUpdate(sql);

			sql = "DROP TABLE IF EXISTS payment";
			statement.executeUpdate(sql);

			sql = "DROP TABLE IF EXISTS robot";
			statement.executeUpdate(sql);

			// Step 3 Create the tables
			sql = "CREATE TABLE user (" 
					+ "username VARCHAR(255) NOT NULL," 
					+ "password VARCHAR(255) NOT NULL,"
					+ "email VARCHAR(255) NOT NULL," 
					+ "PRIMARY KEY (username)" 
					+ ")";
			statement.executeUpdate(sql);

			sql = "CREATE TABLE payment (" 
					+ "payment_id VARCHAR(255) NOT NULL,"
					+ "tracking_number VARCHAR(255) NOT NULL," 
					+ "PRIMARY KEY (payment_id)" 
					+ ")";
			statement.executeUpdate(sql);

			sql = "CREATE TABLE robot ("
					+ "robot_id VARCHAR(255) NOT NULL," 
					+ "type VARCHAR(255) NOT NULL,"
					+ "tracking_number VARCHAR(255),"
					+ "status VARCHAR(255)," 
					+ "dispatcher VARCHAR(255),"
					+ "PRIMARY KEY (robot_id)" 
					+ ")";
			statement.executeUpdate(sql);

			// the payment and robot table may link to order for later implementation
			sql = "CREATE TABLE package (" 
					+ "tracking_number VARCHAR(255) NOT NULL,"
					+ "username VARCHAR(255) NOT NULL," 
					+ "start VARCHAR(255) NOT NULL,"
					+ "destination VARCHAR(255) NOT NULL," 
					+ "status VARCHAR(255) NOT NULL,"
					+ "robot_id VARCHAR(255) NOT NULL," 
					+ "PRIMARY KEY (tracking_number, username),"
					+ "FOREIGN KEY (username) REFERENCES user(username)"
					+ ")";
			statement.executeUpdate(sql);

			// Step 4: insert fake data
			// insert user
			sql = "INSERT INTO user VALUES('1111', '3229c1097c00d497a0fd282d586be050', 'laioffer@gmail.com')";
			statement.executeUpdate(sql);

			// insert order
//			sql = "INSERT INTO package VALUES(" 
//					+ "'123456789', " 
//					+ "'1111', " 
//					+ "'151 W 34th St, New York, NY 10001', "
//					+ "'312 W 34th St, New York, NY 10001 ', " 
//					+ "'picking up', " 
//					+ "'1'" 
//					+ ")";
//			statement.executeUpdate(sql);
//
//			sql = "INSERT INTO package VALUES(" 
//					+ "'987654321', " 
//					+ "'1111', " 
//					+ "'151 W 34th St, New York, NY 10001', "
//					+ "'476 5th Ave, New York, NY 10018', " 
//					+ "'shipping', " 
//					+ "'2'" 
//					+ ")";
//			statement.executeUpdate(sql);
//
//			sql = "INSERT INTO package VALUES(" 
//					+ "'123459876', "
//					+ "'1111', " 
//					+ "'151 W 34th St, New York, NY 10001', "
//					+ "'234 W 42nd St, New York, NY 10036', " 
//					+ "'delivered', " 
//					+ "'3'" 
//					+ ")";
//			statement.executeUpdate(sql);

			// insert payment
			sql = "INSERT INTO payment VALUES(" 
					+ "'123456789', " 
					+ "'123456789'" 
					+ ")";
			statement.executeUpdate(sql);

			sql = "INSERT INTO payment VALUES(" 
					+ "'987654321', " 
					+ "'987654321'" 
					+ ")";
			statement.executeUpdate(sql);

			sql = "INSERT INTO payment VALUES(" 
					+ "'123459876', " 
					+ "'123459876'" 
					+ ")";
			statement.executeUpdate(sql);

			// insert robot
			for(int i = 0; i < 9; i++) {
				String dispatcher;
				if(i/3 == 0) {
					dispatcher = "'47 Lee Ave, San Francisco, CA'";
				} else if (i/3 == 1) {
					dispatcher = "'1250 Quintara St, San Francisco, CA'";
				} else {
					dispatcher = "'449 Powell St, San Francisco, CA'";
				}
				String robot = i % 3 == 0 ? "'drone'" : "'robot'";
				String robotid = i % 3 == 0 ? "'drone" + i + "'": "'robot" + i + "'";
				sql = "INSERT INTO robot VALUES(" 
						+ robotid + ", " 
						+ robot + ", "
						+ "null, " 
						+ "'free', "
						+ dispatcher
						+ ")";
				statement.executeUpdate(sql);
			}

			conn.close();
			System.out.println("Import done successfully");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
