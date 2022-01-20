const MAX_COUNT = 6000;
const deadline = 1643630400000; // 2022-01-31 21:00:00 GMT+0900
let current_count = 0;
let prev_count = -1;
function load_timer(){
	var time_now = (new Date()).getTime();
	var time_diff = Math.max(0, deadline-time_now);

	time_diff/=1000;
	var second = time_diff%60; time_diff/=60;
	var minute = time_diff%60; time_diff/=60;
	var hour = time_diff%24; time_diff/=24;
	var day = time_diff;

	document.querySelector("#timer_day>span").innerHTML = Math.floor(day);
	document.querySelector("#timer_hour>span").innerHTML = Math.floor(hour);
	document.querySelector("#timer_minute>span").innerHTML = Math.floor(minute);
	document.querySelector("#timer_second>span").innerHTML = Math.floor(second);




	if(prev_count != current_count)
	{
		prev_count = current_count;
		var left_percent = current_count/MAX_COUNT * 100;
		left_percent = Math.round(left_percent*100)/100;
		document.querySelector("#wrap>.progress_wrap>.progress>.volume").style.width = (left_percent)+"%";
		document.querySelector("#wrap>.progress_wrap>.progress>.volume>span").innerHTML = (left_percent)+"%";
		var progress_class = document.querySelector("#wrap>.progress_wrap").classList;
		if(left_percent<20){
			progress_class.remove("r");
			progress_class.add("l");
		}
		else if(left_percent>80){
			progress_class.remove("l");
			progress_class.add("r");
		}
		else{
			progress_class.remove("l");
			progress_class.remove("r");
		}
	}



	var left_words = (MAX_COUNT-current_count);
	var words_per_day = left_words / day;//Math.floor(day+1)
	words_per_day = Math.round(words_per_day * 100)/100;
	words_per_day = Math.min(MAX_COUNT, words_per_day);
	words_per_day = Math.max(0, words_per_day);
	document.querySelector("#wrap>.count_wrap>.required_wrap>span").innerHTML = words_per_day;
}
load_timer();
setInterval(load_timer, 300);

function on_count_input(){
	current_count = parseInt(this.value)?Math.min(MAX_COUNT, parseInt(this.value)):0;
	load_timer();
}

document.querySelector("#input_word_count").addEventListener("input", on_count_input);
document.querySelector("#input_word_count").addEventListener("change", on_count_input);
// document.querySelector("#input_word_count").addEventListener("keyup", on_count_input);