package history;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

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
		HttpSession session = request.getSession(false);
		if (session == null) {
			response.setStatus(403);
			return;
		}
		String username = (String)session.getAttribute("username");
		System.out.print(username);
		
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
