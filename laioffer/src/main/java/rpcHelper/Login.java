package rpcHelper;

import dao.UserDao;
import database.MySQLDBConnection;
import entity.User;

import org.apache.commons.io.IOUtils;
import org.json.JSONObject;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;

/**
 * Servlet implementation class Login
 */
public class Login extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public Login() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject input = new JSONObject(IOUtils.toString(request.getReader()));
        String username = input.getString("username");
        String password = input.getString("password");

//        UserDao userDao = new UserDao();
//        JSONObject obj = new JSONObject();
//
//            try {
//                boolean isLogin = userDao.checkLogin(username, password);
//                //String destPage = "login.jsp";
//
//                if (isLogin) {
//                    HttpSession session = request.getSession();
//                    session.setAttribute("username", username);
//                    session.setMaxInactiveInterval(600);
//                    obj.put("status", "OK").put("username", username);
//                    //destPage = "home.jsp";
//                } else {
//                    obj.put("status", "User Doesn't Exist");
//                    response.setStatus(401);
//                }
//
//                //RequestDispatcher dispatcher = request.getRequestDispatcher(destPage);
//                //dispatcher.forward(request, response);
//            }catch (SQLException | ClassNotFoundException ex) {
//
//                throw new ServletException(ex);
//            }
            
        MySQLDBConnection conn = new MySQLDBConnection();
        JSONObject obj = new JSONObject();
        if(conn.checkLogin(username, password)) {
        	try {
        		System.out.print(System.currentTimeMillis());
                Algorithm algorithm = Algorithm.HMAC256("secret");
                String token = JWT.create()
                    .withIssuer("auth0")
                    .withClaim("username", username)
                    .withExpiresAt(new Date())
                    .sign(algorithm);
                obj.put("status", "OK").put("token", token);
            } catch (JWTCreationException exception){
                //Invalid Signing configuration / Couldn't convert Claims.
            }
        } else {
			obj.put("status", "User Doesn't Exist");
			response.setStatus(401);
		}
        conn.close();
        RpcHelper.writeJsonObject(response, obj);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//    	HttpSession session = request.getSession(false);
//		JSONObject obj = new JSONObject();
//		if(session != null) {
//			MySQLDBConnection connection = new MySQLDBConnection();
//			String username = session.getAttribute("username").toString();
//			obj.put("status", "OK").put("username", username);
//			connection.close();
//		} else {
//			obj.put("status", "Invalid Session");
//			response.setStatus(403);
//		}
    	JSONObject obj = new JSONObject();
    	String token = request.getHeader("Authorization");
    	try {
    	    Algorithm algorithm = Algorithm.HMAC256("secret");
    	    JWTVerifier verifier = JWT.require(algorithm)
    	        .withIssuer("auth0")
    	        .acceptExpiresAt(1800)
    	        .build(); //Reusable verifier instance
    	    DecodedJWT jwt = verifier.verify(token);
    	    obj.put("status", "Valid Authentication");
    	} catch (JWTVerificationException exception){
    		obj.put("status", "Invalid Authentication");
    		response.setStatus(403);
    	}
		RpcHelper.writeJsonObject(response, obj);

    }
}
