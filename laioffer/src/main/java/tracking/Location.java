package tracking;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import database.MySQLDBConnection;
import entity.Order;
import robotManagement.Point;
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
		HttpSession session = request.getSession(false);
		if (session == null) {
			response.setStatus(403);
			return;
		}
		
		String trackingNumber = request.getParameter("tracking_number");

		MySQLDBConnection connection = new MySQLDBConnection();
		Order order = connection.getTrackOrder(trackingNumber);
		
		JSONObject object = new JSONObject();;
		if(order != null) {
			System.out.println("robot id: " + order.getRobotId());
			Point location = RobotManagement.getLocation(order.getRobotId());
			if(location != null) {
				object.put("lat", location.getLat());
				object.put("lng", location.getLng());
			} else {
				object.put("status", "Current order is delivery");
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
