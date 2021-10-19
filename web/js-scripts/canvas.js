const scale = 25;
const dash = 5;


function drawAreas() {
    let valR = $("#coordinateR").val() * scale;
    let canvas = document.getElementById('chart');
    let width = canvas.width;
    let height = canvas.height;
    let chart = canvas.getContext('2d');

    chart.fillStyle = 'blue';
    chart.globalAlpha = 0.6;

    //draw triangle
    chart.beginPath();
    chart.moveTo(width / 2, height / 2 - valR);
    chart.lineTo((width - valR) / 2, height / 2);
    chart.lineTo(width / 2, height / 2);
    chart.fill();

    //draw rectangle
    chart.beginPath();
    chart.fillRect(width / 2, height / 2 - valR, valR / 2, valR);

    //draw arc
    chart.beginPath();
    chart.fillStyle = 'blue';
    chart.strokeStyle = 'blue';
    chart.globalAlpha = 0.6;
    chart.arc(width / 2, height / 2, valR, Math.PI * 0.5, Math.PI);
    chart.lineTo(width / 2, height / 2)
    chart.fill();
    chart.stroke();

}

function drawAxis() {
    let canvas = document.getElementById('chart');
    let width = canvas.width;
    let height = canvas.height;
    let chart = canvas.getContext('2d');


    chart.strokeStyle = 'black';
    chart.fillStyle = 'black';
    chart.globalAlpha = 1.0;
    chart.clearRect(0, 0, width, height);

    //draw axis
    chart.beginPath();
    chart.moveTo(width / 2, 0);
    chart.lineTo(width / 2, height);
    chart.stroke();
    chart.beginPath();
    chart.moveTo(0, height / 2);
    chart.lineTo(width, height / 2);
    chart.stroke();

    chart.font = '9px Arial';
    //draw x-dash
    for (let i = -5; i <= 5; i++) {
        chart.beginPath();
        let x = width / 2 + scale * i;
        chart.moveTo(x, height / 2 + dash);
        chart.lineTo(x, height / 2 - dash);
        if (i !== 0) {
            chart.fillText(i.toString(), x - dash / 2, height / 2 + 3 * dash);
        }
        chart.stroke();
    }

    //draw y-dash
    for (let i = -5; i <= 5; i++) {
        chart.beginPath();
        let y = height / 2 + scale * i;
        chart.moveTo(width / 2 + dash, y);
        chart.lineTo(width / 2 - dash, y);
        if (i !== 0) {
            chart.fillText(i.toString(), width / 2 + dash, y + dash);
        }
        chart.stroke();
    }
    drawAreas();
}

function drawShoot(x, y, isHit) {
    let canvas = document.getElementById('chart');
    let chart = canvas.getContext('2d');
    console.log(isHit, '2');
    let color;
    if (isHit === 'Да') {
        color = 'green';
    } else {
        color = 'red';
    }
    chart.beginPath();
    chart.arc(x, y, dash, 0, Math.PI * 2);
    chart.fillStyle = color;
    chart.strokeStyle = color;
    chart.globalAlpha = 0.45;
    chart.fill();
    chart.stroke();
}

function canvasInit() {
    let canvas = document.getElementById('chart');
    canvas.addEventListener('mousedown', event => clickOnChart(canvas, event));
    drawAxis();
}

function mapCoordinates(x, y) {
    let canvas = document.getElementById('chart');
    let width = canvas.width;
    let height = canvas.height;
    return new Coordinates(width / 2 + x * scale, height / 2 - y * scale);
}

class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}