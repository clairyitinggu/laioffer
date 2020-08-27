package dao;

import database.MySQLDBConnection;

import entity.User;

import java.sql.SQLException;

public class UserDao {
    public User checkLogin(String email, String password) throws SQLException, ClassNotFoundException {

        MySQLDBConnection conn = new MySQLDBConnection();

        return conn.checkLogin(email, password);

    }


}
