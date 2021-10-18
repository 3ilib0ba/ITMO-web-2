package app.servlets;

import app.entities.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("Area checker start");

        long startTime = System.nanoTime();
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            Shot shot = getShot(request, startTime);
            List<Shot> shots = (List<Shot>) request.getServletContext().getAttribute("hits");
            if (shots == null) {
                shots = Stream.of(shot).collect(Collectors.toList());
            } else {
                shots.add(shot);
            }
            request.getServletContext().setAttribute("hits", shots);
            out.println(shot.toJson());
        } catch (NumberFormatException e) {
            e.printStackTrace();
            out.println("Incorrect coordinates type");
        } finally {
            out.close();
        }
    }

    private Shot getShot(HttpServletRequest request, long startTime) {
        double x = Double.parseDouble(request.getParameter("x"));
        double y = Double.parseDouble(request.getParameter("y"));
        double r = Double.parseDouble(request.getParameter("r"));
        String currentTime = new SimpleDateFormat("HH:mm:ss").format(new Date());
        Shot shot = new Shot(x, y, r);
        shot.isCorrect();
        shot.setLocalDateTime(currentTime);
        shot.setExecTime((System.nanoTime() - startTime) / 1000000000d);

        return shot;
    }

}
