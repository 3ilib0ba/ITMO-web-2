package app.entities;

public class Shot {
    public static final double MIN_X = -5;
    public static final double MAX_X = 5;
    public static final double MIN_Y = -5;
    public static final double MAX_Y = 5;
    public static final double MIN_R = 1;
    public static final double MAX_R = 3;

    private double x;
    private double y;
    private double r;
    private boolean isInit;
    private boolean valid;
    private boolean correct;
    private String localDateTime;
    private double execTime;

    public Shot() {
        isInit = false;
        checkValid();
    }

    public Shot(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
        isInit = true;
        checkValid();
    }

    private void checkValid() {
        if (isInit) {
            if (x >= MIN_X && x <= MAX_X &&
                    y >= MIN_Y && y <= MAX_Y &&
                    r >= MIN_R && r <= MAX_R) {
                valid = true;
            }
        } else {
            valid = false;
        }
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isInit() {
        return isInit;
    }

    public boolean isValid() {
        return valid;
    }

    public String getLocalDateTime() {
        return localDateTime;
    }

    public double getExecTime() {
        return execTime;
    }

    public void setLocalDateTime(String localDateTime) {
        this.localDateTime = localDateTime;
    }

    public void setExecTime(double execTime) {
        this.execTime = execTime;
    }

    public boolean getValid() {
        return valid;
    }

    public boolean getCorrect() {
        return correct;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public void isCorrect() {
        if (x > 0 && y >= 0 && x <= r / 2 && y <= r) {
            correct = true;
            return;
        }
        if (x > 0 && y < 0) {
            correct = false;
            return;
        }
        if (x <= 0 && y >= 0 && (y - 2 * x <= r)) {
            correct = true;
            return;
        }
        if (x <= 0 && y < 0 && (x * x + y * y <= r * r)) {
            correct = true;
            return;
        }
        correct = false;
    }

    public String toJson() {
        return "{" +
                "\"x\":" + x + ',' +
                "\"y\":" + y + ',' +
                "\"r\":" + r + ',' +
                "\"currentTime\":" + "\"" + localDateTime + "\"" + ',' +
                "\"execTime\":" + execTime + ',' +
                "\"isHit\":" + "\"" + (correct) + "\"" +
                "}";
    }

}
