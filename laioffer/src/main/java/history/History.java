package history;

import java.io.IOException;
import java.util.List;

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
import entity.Robot;
import rpcHelper.RpcHelper;

/**
 * Servlet implementation class History
 */
public class History extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public History() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * handling the request to get order history of user
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String username = "";
    	try {
    		String token = request.getHeader("Authorization");
    	    Algorithm algorithm = Algorithm.HMAC256("secret");
    	    JWTVerifier verifier = JWT.require(algorithm)
    	        .withIssuer("auth0")
    	        .acceptExpiresAt(1800)
    	        .build(); //Reusable verifier instance
    	    DecodedJWT jwt = verifier.verify(token);
    	    username = jwt.getClaim("username").asString();
    	} catch (JWTVerificationException exception){
    		response.setStatus(403);
    		return;
    	} catch (Exception e) {
    		response.setStatus(403);
    		return;
    	}
		
		MySQLDBConnection connection = new MySQLDBConnection();
		List<Order> orders = connection.getHistory(username);
		
		JSONArray array = new JSONArray();
		for(Order order : orders) {
			JSONObject obj = order.toJSONObject();
			Robot robot = connection.getRobot(order.getRobotId());
			obj.put("method", robot.getType());
			obj.put("dispatcher", robot.getDispatcher());
			array.put(obj);
		}
		connection.close();
		
		JSONObject object = new JSONObject();
		object.put("username", username);
		object.put("orders", array);
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
