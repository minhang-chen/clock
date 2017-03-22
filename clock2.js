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
 	this.alarmHour = 0;
 	this.alarmMinute = 0;
 	this.second ;
 	this.minute;
 	this.hour;
}

extend(Clock.prototype,{
	active:function(){
		var _this = this;
		setTimeout(function timer(){
			var date = new Date();
			_this.second = date.getSeconds();
			_this.minute = date.getMinutes();
			_this.hour  = date.getHours();
			if(_this.second == 0){
				_this.secondHand.style.transition = "all 0s";
			}else{
				_this.secondHand.style.transition = "all .5s";
			}
			if(_this.minute == 0){
				_this.minuteHand.style.transition = "all 0s";
			}else{
				_this.minuteHand.style.transition = "all .5s";
			}
			if(_this.hour == 13 || _this.hour == 0){
				_this.hourHand.style.transition = "all 0s";
			}else{
				_this.hourHand.style.transition = "all .5s";
			}
			
			_this.minuteHand.style.transition = "all .5s";
			_this.hourHand.style.transition = "all .5s";
			_this.secondHand.style.transform = 'rotate(' + 6*(_this.second) + 'deg)';
			_this.minuteHand.style.transform = 'rotate(' + 6*(_this.minute) + 'deg)';
			_this.hourHand.style.transform = 'rotate(' + 30*(_this.hour) + 'deg)';
			if(_this.second < 60 && _this.hour < 24){
				setTimeout(timer,1000)
			}
		},0)
		this._alarmClock();

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

	}
})