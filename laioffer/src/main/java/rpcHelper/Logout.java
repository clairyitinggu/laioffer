package rpcHelper;

import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class Logout extends HttpServlet {
    private static final long serialVersionUID = 1L;
    public Logout() {
        super();

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.removeAttribute("user");
            //RequestDispatcher dispatcher = request.getRequestDispatcher("login.jsp");
            //dispatcher.forward(request, response);
            session.invalidate();
        }
        JSONObject obj = new JSONObject();
        obj.put("status", "logged out");
        RpcHelper.writeJsonObject(response, obj);
    }
}
