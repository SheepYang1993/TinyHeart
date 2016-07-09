function momFruitCollision()
{
		for(var i = 0; i < fruit.num; i++)
		{
				if(fruit.alive[i])
				{
						//计算大鱼和果实的距离
						var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
						if(l < 900)
						{
								//果实被吃掉
								fruit.dead(i);
								data.fruitNum++;
								mom.momBodyCount++;
								if(mom.momBodyCount > 7)
								{
										mom.momBodyCount = 7;
								}
								if(fruit.fruitType[i] == "blue")
								{
										data.double = 2;
								}
								wav.born(fruit.x[i], fruit.y[i]);
						}
				}
		}
}
function momBabyCollision()
{
		var l = calLength2(mom.x, mom.y, baby.x, baby.y);
		if(l < 900)
		{
				//小鱼吃到果实，回血
				baby.babyBodyCount = 0;
				data.reset();
				mom.momBodyCount = 0;
				halo.born(baby.x, baby.y);
		}
}