
var Dots = function () {

    this.canvas;
    this.ctx;

    this.x;
    this.y;
    this.r;

    this.sx;
    this.sy;
};

Dots.prototype = {
    init: function (canvas, x, y) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        this.x = x*2 || Math.random() * this.canvas.width;
        this.y = y*2 || Math.random() * this.canvas.height;
        this.r = Math.random() * 5;
        this.sx = Math.random() * 2 - 1;
        this.sy = Math.random() * 2 - 1;

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        this.ctx.fillStyle = "rgba(115,115,115,.6)";
        this.ctx.fill();
        this.ctx.closePath();
    },

    update: function () {
        this.x = this.x + this.sx;
        this.y = this.y + this.sy;

        if (this.x < 0 || this.x > this.canvas.width) {
            this.init(this.canvas);
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.init(this.canvas);
        }

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2*Math.PI);
        this.ctx.fillStyle = "rgba(115,115,115,.6)";
        this.ctx.fill();
        this.ctx.closePath();
    },
    mouseDot: function (x, y) {
        this.x = x*2;
        this.y = y*2;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2*Math.PI);
        this.ctx.fillStyle = "rgba(115,115,115,.6)";
        this.ctx.fill();
        this.ctx.closePath();
    }
};


var Main = function () {

    var dotsArr = [],
        dotsNum = 0,
        maxDotsNum = 0,
        overNum = 0, 
        dotsDistance = 150, 

        bg = document.getElementById('bg'),
        canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),

        width = parseInt(document.documentElement.clientWidth),
        height = parseInt(document.documentElement.clientHeight),
        area = width * height,
        cssText = 'width: '+width+'px; height: '+height+'px;';

    bg.setAttribute('style', cssText);
    canvas.setAttribute('style', cssText);
    canvas.width = (width * 2).toString();
    canvas.height = (height * 2).toString();

  
    dotsNum = parseInt(area / 6000);
    maxDotsNum = dotsNum * 2;

    for (var i = 0; i < dotsNum; i ++) {
        var dot = new Dots();
        dotsArr.push(dot);
        dot.init(canvas);
    }

    document.addEventListener('click', createDot);
    function createDot(e) {
        var tx = e.pageX,
            ty = e.pageY;
        if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {

            for (var i = 0; i < 5; i ++) {
                var dot = new Dots();
                dotsArr.push(dot);
                dotsNum += 1;
                dot.init(canvas, tx, ty);
            }
        }
    };
    document.addEventListener('mousemove', moveDot);
    function moveDot(e) {
        var tx = e.pageX,
            ty = e.pageY;
        if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {
            dot.mouseDot(tx, ty);
        }
    };

    var requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame;
    requestAnimFrame(animateUpdate); 

    function animateUpdate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        if (dotsNum > maxDotsNum) {
            overNum = dotsNum - maxDotsNum;
        }

    
        for (var i = overNum; i < dotsNum; i ++) {
            dotsArr[i].update();
        }

        for (var i = overNum; i < dotsNum; i ++) {
            for (var j = i + 1; j < dotsNum; j ++) {
                var tx = dotsArr[i].x - dotsArr[j].x,
                    ty = dotsArr[i].y - dotsArr[j].y,
                    s = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
                if (s < dotsDistance) {
                    ctx.beginPath();
                    ctx.moveTo(dotsArr[i].x, dotsArr[i].y);
                    ctx.lineTo(dotsArr[j].x, dotsArr[j].y);
                    ctx.strokeStyle = 'rgba(115,115,115,.2),'+(dotsDistance-s)/dotsDistance+')';
                    ctx.strokeWidth = 1;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }

        requestAnimFrame(animateUpdate);
    }
}();