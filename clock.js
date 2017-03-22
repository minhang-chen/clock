function  extend(o1,o2){
	for(var i in o2){
		if(o1[i] ===undefined){
			o1[i]= o2[i];
		}
	}
}

 function Clock(){
 	this.hourHand = document.querySelector('.hour');
 	this.minuteHand = document.querySelector('.minute');
 	this.secondHand = document.querySelector('.second');
 	this.clockBtn = document.querySelector('.btn-clock');
 	this.round = document.querySelector('.round');
 	this.alarmHour = 0;
 	this.alarmMinute = 0;
 	this.second=null;
 	this.minute=null;
 	this.hour=null;
 	this.clockTime = null;
 	
}

extend(Clock.prototype,{
	active:function(){
		var date = new Date();
		var _this = this;
		this.second = date.getSeconds();
		this.minute = date.getMinutes();
		this.hour  = date.getHours();
		
		this.secondHand.style.transform = 'rotate(' + 6*(_this.second) + 'deg)';
		this.minuteHand.style.transform = 'rotate(' + 6*(_this.minute) + 'deg)';
		this.hourHand.style.transform = 'rotate(' + 30*(_this.hour) + 'deg)';
		this._timers();
		this._alarmClock();
		this._drag(_this.secondHand,_this.second);
	},	
	_alarmClock:function(){
		var _this = this;
		var reg = /^\d{1,2}$/;
		this.clockBtn.addEventListener('click',function(){
			_this.alarmHour = document.querySelector('.alarm-clock-hour').value;
			_this.alarmMinute = document.querySelector('.alarm-clock-minute').value;
			if(reg.test(_this.alarmHour) && reg.test(_this.alarmMinute) && _this.alarmHour < 24 &&_this.alarmMinute <= 60){
				alert("闹钟设置成功!")
			}else{
				alert("请重新填写时间")
			}
			setTimeout(function alarmClock(){
			if(parseInt(_this.alarmHour) == parseInt(_this.hour) && parseInt(_this.alarmMinute) == parseInt(_this.minute)){
				if(parseInt(_this.alarmHour)<12){
					alert("早上" + _this.hour +':'+_this.minute+':'+_this.second);
				}else{
					alert("下午" + _this.hour +':'+_this.minute+':'+_this.second);
				}
				clearTimeout(alarmtime);
				return;
			}else{
				alarmtime = setTimeout(alarmClock,1000);
			}
			
		},1000)
		})

	},
	_drag:function(obj1,obj2){
		var _this = this;
		var oldY ;
		var isdown = false;
		obj1.onmousedown = function(e){
			clearTimeout(_this.clockTime);
			oldY = e.clientY;
			isdown = true;
		}
		window.onmousemove = function(e){

				if(isdown){
					obj1.style.transform = 'rotate(' + (e.clientY-oldY) + 'deg)';
					obj2 = (e.clientY - oldY)/6;
				}
				
			}
		window.onmouseup = function(){
			if(isdown){
				_this._timers();
			 	isdown = false;
			}
			
		}

	},
	_timers:function(){
		var _this=this;
		setTimeout(function timer(){
			_this.second++;
			_this.secondHand.style.transform = 'rotate(' + 6*(_this.second) + 'deg)';
			// if(_this.second == 0){
			// 	_this.secondHand.style.transition = "all 0s";
			// }else{
			// 	_this.secondHand.style.transition = "all .5s";
			// }
			// if(_this.minute == 0){
			// 	_this.minuteHand.style.transition = "all 0s";
			// }else{
			// 	_this.minuteHand.style.transition = "all .5s";
			// }
			// if(_this.hour == 13 || _this.hour == 0){
			// 	_this.hourHand.style.transition = "all 0s";
			// }else{
			// 	_this.hourHand.style.transition = "all .5s";
			// }
			if(_this.second==60){
				_this.second = 0;
				_this.minute++;
				_this.minuteHand.style.transform = 'rotate(' + 6*(_this.minute) + 'deg)';
				
			}
			if(_this.minute ==60){
				_this.minute =0;
				_this.hour ++;
				_this.hourHand.style.transform = 'rotate(' + 30*(_this.hour) + 'deg)';
			}
			if(_this.hour ==24 ){
				_this.hour =0;
			}
			if(_this.second < 60 ){
				_this.clockTime = setTimeout(timer,1000);
			}
		},0)
	}
})