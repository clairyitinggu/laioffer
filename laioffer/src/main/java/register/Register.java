package register;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.json.JSONObject;

import database.MySQLDBConnection;

/**
 * Servlet implementation class Register
 */
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Register() {
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
		JSONObject input = new JSONObject(IOUtils.toString(request.getReader()));
		String username = input.getString("username");
		String password = input.getString("password");
		String email = input.getString("email");

		MySQLDBConnection connection = new MySQLDBConnection();
		JSONObject obj = new JSONObject();
		if (connection.addUser(username, password, email)) {
			obj.put("status", "OK");
		} else {
			obj.put("status", "User Already Exists");
		}
		connection.close();
		response.setContentType("application/json");
		response.getWriter().print(obj);
	}

}
