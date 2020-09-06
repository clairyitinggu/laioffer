package tracking;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import database.MySQLDBConnection;
import entity.Order;
import robotManagement.RobotManagement;
import rpcHelper.RpcHelper;

/**
 * Servlet implementation class Location
 */
public class Location extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Location() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
    	try {
    		String token = request.getHeader("Authorization");
    	    Algorithm algorithm = Algorithm.HMAC256("secret");
    	    JWTVerifier verifier = JWT.require(algorithm)
    	        .withIssuer("auth0")
    	        .acceptExpiresAt(1800)
    	        .build(); //Reusable verifier instance
    	    DecodedJWT jwt = verifier.verify(token);
    	} catch (JWTVerificationException exception){
    		response.setStatus(403);
    		return;
    	}
		
		String trackingNumber = request.getParameter("tracking_number");
		String path = request.getParameter("path");
		
		MySQLDBConnection connection = new MySQLDBConnection();
		Order order = connection.getTrackOrder(trackingNumber);
		
		JSONObject object = new JSONObject();
		if(order != null) {
			System.out.println("robot id: " + order.getRobotId());
			JSONObject location = RobotManagement.getLocation(order.getRobotId(), order.getTrackingNumber());	
			if(location != null) {
				object.put("location", location);
			} else {
				object.put("status", "Current order is delivery");
			}
			
			if(path.equals("true")) {
				JSONArray route = RobotManagement.getRoute(order.getRobotId(), order.getTrackingNumber());
				System.out.println("route: " + route);
				if(route != null) {
					object.put("route", route);
				}
			}			
		}
		connection.close();
		RpcHelper.writeJsonObject(response, object);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
