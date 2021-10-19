let X, R, Y;

function validateX() {
    if (document.querySelector('input[name="coordinateX"]:checked') !== null) {
        X = document.querySelector('input[name="coordinateX"]:checked').value;
    } else {
        showErrorToLog("Input X<br>");
        return false;

    }
    return true;
}

function validateY() {
    Y = document.querySelector("input[id=coordinateY]").value.replace(",", ".");
    if (Y === undefined) {
        showErrorToLog("Введите Y");
        return false;
    }
    if (!(!isNaN(parseFloat(Y)) && isFinite(Y))) {
        showErrorToLog("Y не является числом");
        return false;
    }
    if (!((Y > -5) && (Y < 3))) {
        showErrorToLog("Y должен быть от -5 до 3");
        return false;
    }
    return true;
}

function validateR() {
    R = document.getElementById("coordinateR")[document.getElementById("coordinateR").selectedIndex].value;
    showErrorToLog("R = " + R);
    return true;
}

function clickOnChart(canvas, event) {
    $('#logs-request').empty();

    let rect = canvas.getBoundingClientRect()
    let width = canvas.width;
    let height = canvas.height;
    let x = (event.clientX - rect.left - width / 2) / scale;
    let y = (height / 2 - event.clientY + rect.top) / scale;
    let r = $("#coordinateR").val();
    console.log("x = " + x + ", y = " + y + ", r = " + r);
    shoot(x, y, r).then(function (answer) {
        drawShoot(event.clientX - rect.left, event.clientY - rect.top, answer.isHit);
    });
}

function changeR() {
    drawAxis();
}

async function shoot(valX, valY, valR) {
    let isHit = 'Нет';
    //if (validateY(valY) && validateX(valX)) {
        await submit_request(valX, valY, valR);
    //} else {
    //    return new Answer('Y должен лежать в интервале (-5;5)', isHit);
    //}
    console.log(isHit + '1');
    return new Answer('', isHit);
}

class Answer {
    constructor(errMsg, isHit) {
        this.errMsg = errMsg;
        this.isHit = isHit;
    }
}

function showErrorToLog(message) {
    document.getElementById("logs-request").append(message)
}

function submit() {
    $('#logs-request').empty();

    if (validateX() & validateY() & validateR()) {
        submit_request(X, Y, R);
    }
}

function submit_request(X, Y, R) {
    $.post("/filter", {
        'x': X,
        'y': Y,
        'r': R,
        'timezone': new Date().getTimezoneOffset()
    }).done(function (data) {
        arr = JSON.parse(data);
        row = '<tr>';
        row += '<td><b>' + parseFloat(arr.x.toFixed(8)) + '</b></td>';
        row += '<td><b>' + parseFloat(arr.y.toFixed(8)) + '</b></td>';
        row += '<td><b>' + parseFloat(arr.r.toFixed(8)) + '</b></td>';
        row += '<td><b>' + parseFloat(arr.execTime.toFixed(8)) + '</b></td>';
        row += '<td><b>' + arr.currentTime + '</b></td>';
        row += '<td><b>' + arr.isHit + '</b></td>';
        row += '</tr>';
        $('#tableWithResults tr:first').after(row);
        if (arr.isHit === "true") {
            return "Да";
        }
    }).fail(function (err) {
        alert(err);
    });
}

function submit_clear() {
    $('#logs-request').empty();
    showErrorToLog("Удаляю данные");

    $.post("filter", {
        'clear': true
    }).done(function (data) {
        $('#logs-request').empty();
        showErrorToLog("Data has been deleted");
    }).fail(function (err) {
        $('#logs-request').empty();
        showErrorToLog(err);
    })
}