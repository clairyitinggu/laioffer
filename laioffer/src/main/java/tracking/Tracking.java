package tracking;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
 * Servlet implementation class Tracking
 */
public class Tracking extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Tracking() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * handling request getting order of certain tracking number
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
    	} catch (Exception e) {
    		response.setStatus(403);
    		return;
    	}
		String trackingNumber = request.getParameter("tracking_number");

		MySQLDBConnection connection = new MySQLDBConnection();
		Order order = connection.getTrackOrder(trackingNumber);
		
		JSONObject object;
		if(order == null) {
			object = new JSONObject();
		} else {
			object = order.toJSONObject();
			Robot robot = connection.getRobot(order.getRobotId());
			if(robot != null) {
				object.put("method", robot.getType());
				object.put("dispatcher", robot.getDispatcher());
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
