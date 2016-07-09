var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;
var mom;
var baby;

var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var data;
var wav;//大鱼吃果实身后出现的白色的圈
var halo;//大鱼喂小鱼的特效

var dust//漂浮物
var dustPic = [];
document.body.onload = game;
function game()
{
		init();
		lastTime = Date.now();
		deltaTime = 0;
		gameloop();
}

function init()
{
		//获得canvas context
		can1 = document.getElementById("canvas1");//图层位于前面
		ctx1 = can1.getContext('2d');
		can2 = document.getElementById("canvas2");//图层位于后面，海葵、果实、背景
		ctx2 = can2.getContext('2d');
		
		can1.addEventListener('mousemove', onMouseMove, false);
		
		bgPic.src = "./src/background.jpg";
		
		canWidth = can1.width;
		canHeight = can1.height;
		
		ane = new aneObj();
		ane.init();
		
		fruit = new fruitObj();
		fruit.init();
		
		mom = new momObj();
		mom.init();
		
		baby = new babyObj();
		baby.init();
		
		mx = canWidth * 0.5;
		my = canHeight * 0.5;
		
		for(var i = 0; i < 8; i++)
		{
				babyTail[i] = new Image();
				babyTail[i].src = "./src/babyTail" + i +".png";
		}
		for(var i = 0; i < 2; i++)
		{
				babyEye[i] = new Image();
				babyEye[i].src = "./src/babyEye" + i +".png";
		}
		for(var i = 0; i < 20; i++)
		{
				babyBody[i] = new Image();
				babyBody[i].src = "./src/babyFade" + i +".png";
		}
		for(var i = 0; i < 8; i++)
		{
				momTail[i] = new Image();
				momTail[i].src = "./src/bigTail" + i +".png";
		}
		for(var i = 0; i < 2; i++)
		{
				momEye[i] = new Image();
				momEye[i].src = "./src/bigEye" + i +".png";
		}
		for(var i = 0; i < 8; i++)
		{
				momBodyOra[i] = new Image();
				momBodyBlue[i] = new Image();
				momBodyOra[i].src = "./src/bigSwim" + i +".png";
				momBodyBlue[i].src = "./src/bigSwimBlue" + i +".png";
		}
		for(var i = 0; i < 7; i++)
		{
				dustPic[i] = new Image();
				dustPic[i].src = "./src/dust" + i +".png";
		}
		data = new dataObj();
		
		dust = new dustObj();
		dust.init();

		wav = new wavObj();
		wav.init();
		halo = new haloObj();
		halo.init();
}

function gameloop()
{
		window.requestAnimFrame(gameloop);//当前绘制完成之后，根据机器的性能来决定下一次绘制时间
		var now = Date.now();
		deltaTime = now - lastTime;
		lastTime = now;
		
		if(deltaTime > 40) deltaTime = 40;
		
		drwaBackGround();
		ane.draw();
		fruitMonitor();
		fruit.draw();
		
		ctx1.clearRect(0, 0, canWidth, canHeight);
		mom.draw();
		baby.draw();
		momFruitCollision();
		momBabyCollision();
		
		data.draw();
		dust.draw();
		wav.draw();
		halo.draw();
}
function onMouseMove(e)
{
		if(e.offSetX || e.layerX)
		{
				mx = e.offSetX == undefined ? e.layerX : e.offSetX;
				my = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
}