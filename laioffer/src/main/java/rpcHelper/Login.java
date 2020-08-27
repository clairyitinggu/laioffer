package rpcHelper;

import dao.UserDao;
import entity.User;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;

/**
 * Servlet implementation class Login
 */
@WebServlet(name = "/login")
public class Login extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public Login() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");
        UserDao userDao = new UserDao();
        JSONObject obj = new JSONObject();

            try {
                User user = userDao.checkLogin(email, password);
                //String destPage = "login.jsp";

                if (user != null) {
                    HttpSession session = request.getSession();
                    session.setAttribute("user", user);
                    //destPage = "home.jsp";
                } else {
                    String message = "Invalid email/password";
                    request.setAttribute("message", message);
                }

                //RequestDispatcher dispatcher = request.getRequestDispatcher(destPage);
                //dispatcher.forward(request, response);
            }catch (SQLException | ClassNotFoundException ex) {

                throw new ServletException(ex);
            }


        RpcHelper.writeJsonObject(response, obj);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


    }
}
