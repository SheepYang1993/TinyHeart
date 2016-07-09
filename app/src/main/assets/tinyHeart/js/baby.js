var babyObj = function()
{
		this.x;
		this.y;
		this.angle;
		this.babyBody = new Image();
		
		this.babyTailTimer = 0;
		this.babyTailCount = 0;
		
		this.babyEyeTimer = 0;
		this.babyEyeCount = 0;
		this.babyEyeInterval = 1000;//眨眼间隔
		
		this.babyBodyTimer = 0;
		this.babyBodyCount = 0;
}
babyObj.prototype.init = function()
{
		this.x = canWidth * 0.5 - 50;
		this.y = canHeight * 0.5 + 50;
		this.angle = 0;
		this.babyBody.src = "./src/babyFade0.png";
}
babyObj.prototype.draw = function()
{
		//lerp x, y
		this.x = lerpDistance(mom.x, this.x, 0.98);
		this.y = lerpDistance(mom.y, this.y, 0.98);
		
		//delta angle
		//Math.atan2(y, x) 反正切
		var deltaY = mom.y - this.y;
		var deltaX = mom.x - this.x;
		var beta = Math.atan2(deltaY, deltaX) + Math.PI;
		
		//lerp angle
		this.angle = lerpAngle(beta, this.angle, 0.6);
		
		//babyTail的计数工作
		this.babyTailTimer += deltaTime;
		if(this.babyTailTimer > 50)
		{
					this.babyTailCount = (this.babyTailCount + 1) % 8;
					this.babyTailTimer %= 50;
		}
		
		//babyEye眨眼
		this.babyEyeTimer += deltaTime;
		if(this.babyEyeTimer > this.babyEyeInterval)
		{
				this.babyEyeCount = (this.babyEyeCount + 1) % 2;
				this.babyEyeTimer %= this.babyEyeInterval;
				
				if(this.babyEyeCount == 0)
				{
						this.babyEyeInterval = Math.random() * 1500 + 2000//[2000,3500)
				}
				else
				{
						this.babyEyeInterval = 200;
				}
		}
		
		//babyBody身体颜色变化
		this.babyBodyTimer += deltaTime;
		if(this.babyBodyTimer > 300)//小鱼身体变白的时间
		{
				this.babyBodyCount = this.babyBodyCount + 1;
				this.babyBodyTimer %= 300;
				if(this.babyBodyCount > 19)//小鱼身体变白,游戏结束
				{
						this.babyBodyCount = 19;
						//gameover
				}
		}
		
		//ctx1
		ctx1.save();
		//translate();
		ctx1.translate(this.x, this.y);
		ctx1.rotate(this.angle);
		var babyTailCount = this.babyTailCount;
		ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
		var babyBodyCount = this.babyBodyCount;
		ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
		var babyEyeCount = this.babyEyeCount;
		ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);

		ctx1.restore();
}