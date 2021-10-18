package app.servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ControllerServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println(request.getParameter("x"));
        System.out.println(request.getParameter("y"));
        System.out.println(request.getParameter("r"));
        System.out.println("Filter start");
        if      (request.getParameter("x") != null &&
                request.getParameter("y") != null &&
                request.getParameter("r") != null) {
            System.out.println("to areachecker going");
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(request, response);
        } else {
            //TODO реализовать переход на удаление таблицы
            String clear = request.getParameter("clear");
            if (clear != null && clear.equals("true")) {
                getServletContext().getNamedDispatcher("ClearTableServlet").forward(request, response);
            } else {
                System.out.println("go back, incorrect request");
                getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
            }
        }
    }

}
