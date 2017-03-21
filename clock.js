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
		this.clockBtn.addEventListener('click',function(){
			_this.alarmHour = document.querySelector('.alarm-clock-hour').value;
			_this.alarmMinute = document.querySelector('.alarm-clock-minute').value;
		})
		setTimeout(function alarmClock(){
			if(_this.alarmHour == _this.hour && _this.alarmMinute == _this.minute){
				alert("时间到了");
				clearTimeout(timer);
				return;
			}
			timer = setTimeout(alarmClock,1000);
		},1000)
	}
})