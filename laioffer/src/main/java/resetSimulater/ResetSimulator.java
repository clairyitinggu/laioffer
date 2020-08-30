package resetSimulater;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import entity.Robot;
import robotManagement.Point;
import robotManagement.RobotManagement;

/**
 * Servlet implementation class ResetSimulator
 */
public class ResetSimulator extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ResetSimulator() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		RobotManagement.initializeRobots();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		JSONObject input = new JSONObject(IOUtils.toString(request.getReader()));
		String username = input.getString("username");
		String start = input.getString("start");
		String destination = input.getString("destination");
		String method = input.getString("method");
		JSONArray route = input.getJSONArray("route");
		List<Point> points = new ArrayList<>();
		
		for(int i = 0; i < route.length(); i++) {
			JSONObject obj = route.getJSONObject(i);
			System.out.println(obj);
			Point point = new Point(obj.getDouble("lat"), obj.getDouble("lng"));
			points.add(point);
		}
		
		Robot robot = RobotManagement.getFreeRobot("123456789", method, start, points);
	}

}
