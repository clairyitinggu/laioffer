package dao;

import database.MySQLDBConnection;

import entity.User;

import java.sql.SQLException;

public class UserDao {
    public boolean checkLogin(String username, String password) throws SQLException, ClassNotFoundException {

        MySQLDBConnection conn = new MySQLDBConnection();

        boolean res = conn.checkLogin(username, password);

        conn.close();

        return res;

    }


}
