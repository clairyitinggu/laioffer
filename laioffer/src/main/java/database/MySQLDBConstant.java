package database;

public class MySQLDBConstant {
	private static final String INSTANCE = "laiproject-instance.coz9llegvrth.us-east-2.rds.amazonaws.com";
	private static final String PORT_NUM = "3306";
	public static final String DB_NAME = "laiproject";
	private static final String USERNAME = "admin";
	private static final String PASSWORD = "123456789";
	public static final String URL = "jdbc:mysql://"
			+ INSTANCE + ":" + PORT_NUM + "/" + DB_NAME
			+ "?user=" + USERNAME + "&password=" + PASSWORD
			+ "&autoReconnect=true&serverTimezone=UTC";
}
