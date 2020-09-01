package rpcHelper;

import dao.UserDao;
import entity.User;
import org.apache.commons.io.IOUtils;
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
        JSONObject input = new JSONObject(IOUtils.toString(request.getReader()));
        String username = input.getString("username");
        String password = input.getString("password");

        UserDao userDao = new UserDao();
        JSONObject obj = new JSONObject();

            try {
                boolean isLogin = userDao.checkLogin(username, password);
                //String destPage = "login.jsp";

                if (isLogin) {
                    HttpSession session = request.getSession();
                    session.setAttribute("username", username);
                    session.setMaxInactiveInterval(600);
                    obj.put("status", "OK").put("username", username);
                    //destPage = "home.jsp";
                } else {
                    obj.put("status", "User Doesn't Exist");
                    response.setStatus(401);
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
