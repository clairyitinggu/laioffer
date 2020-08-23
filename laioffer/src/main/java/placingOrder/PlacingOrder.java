package placingOrder;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;

import database.MySQLDBConnection;
import entity.Order;
import entity.Robot;
import rpcHelper.RpcHelper;

/**
 * Servlet implementation class PlacingOrder
 */
public class PlacingOrder extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PlacingOrder() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		JSONObject input = new JSONObject(IOUtils.toString(request.getReader()));
		JSONObject object = new JSONObject();;
		try {
			String username = input.getString("username");
			String start = input.getString("start");
			String destination = input.getString("destination");
			String method = input.getString("method");
			
			CreateOrder creation = new CreateOrder();
			Order order = creation.createOrder(username, start, destination, method);
			object = order.toJSONObject();
			
			MySQLDBConnection connection = new MySQLDBConnection();
			Robot robot = connection.getRobot(order.getRobotId());
			object.put("method", robot.getType());
			
		} catch (JSONException e) {
			object.put("status", "Can not place order, information missing");
		}
		
		RpcHelper.writeJsonObject(response, object);
	}
}
