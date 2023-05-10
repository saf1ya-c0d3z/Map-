//------------------------------
//--- Global parameters --------
//------------------------------
var xmlns = "http://www.w3.org/2000/svg";

var wheel_width = 16;
var wheel_height = 28;
var wheel_spacing = (90 - 5*wheel_width)/5;
var button_height = 6;
var button_dx = .2;
var button_dy = .5;
var wheel_digit_height = 7;
var wheel_baseline_height = 1.5;
var scroll_speed_factor = 4;

var days28 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]; 
var days29 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
var days30 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
var days31 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
var oct1582 = [1,2,3,4,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
var year365 = [28,29,30,31].concat(days31,days28,days31,days30,days31,days30,days31,days31,days30,days31,days30,days31,[1,2,3,4]);
var year366 = [28,29,30,31].concat(days31,days29,days31,days30,days31,days30,days31,days31,days30,days31,days30,days31,[1,2,3,4]);
var year355 = [28,29,30,31].concat(days31,days28,days31,days30,days31,days30,days31,days31,days30,oct1582,days30,days31,[1,2,3,4]);
var monthStart365 = [1,32,60,91,121,152,182,213,244,274,305,335,1000];
var monthStart366 = [1,32,61,92,122,153,183,214,245,275,306,336,1000];
var monthStart355 = [1,32,60,91,121,152,182,213,244,274,295,325,1000];
var monthstart = monthStart365;

var yearmin = -1999;
var yearmax = 3000;
var jdmax = 2817152.5 - (1/1440); // Dec. 31, 3000, 23:59
var jdmin = 990923.5; // Jan. 1, 2000BC, 00:00

//-----------------------------------
//--- Initialize wheels -------------
//-----------------------------------
function wheel_init(){
	makeMinuteWheel();
	makeHourWheel();
	makeDayWheel();
	makeMonthWheel();
	makeYearWheel();

	// Silver Linear Gradient
	var silver = document.getElementById("silver");
	silver.setAttribute("x1", 0);
	silver.setAttribute("x2", 0);
	silver.setAttribute("y1", 0);
	silver.setAttribute("y2", 1);
	var stop1 = document.createElementNS(xmlns, "stop");
	stop1.setAttribute("offset", "0%");
	stop1.setAttribute("stop-color", "rgb(150,150,150)");
	silver.appendChild(stop1);
	var stop2 = document.createElementNS(xmlns, "stop");
	stop2.setAttribute("offset", "25%");
	stop2.setAttribute("stop-color", "rgb(240,240,240)");
	silver.appendChild(stop2);
	var stop3 = document.createElementNS(xmlns, "stop");
	stop3.setAttribute("offset", "50%");
	stop3.setAttribute("stop-color", "rgb(255,255,255)");
	silver.appendChild(stop3);
	var stop4 = document.createElementNS(xmlns, "stop");
	stop4.setAttribute("offset", "75%");
	stop4.setAttribute("stop-color", "rgb(240,240,240)");
	silver.appendChild(stop4); 
	var stop5 = document.createElementNS(xmlns, "stop");
	stop5.setAttribute("offset", "100%");
	stop5.setAttribute("stop-color", "rgb(150,150,150)");
	silver.appendChild(stop5);
	wheelgroup.setAttribute("fill", "url(#silver)"); 

	$("#wheelbox").on("vmouseover", function(){
	  $(this).css("cursor","pointer");
	});

	topshield.setAttribute("y", wheel_height/2 - .2);
	bottomshield.setAttribute("y", wheel_height/2 - .2);

}

//-----------------------------------
//--- Build wheels ------------------
//-----------------------------------
//--- Minute Wheel ---
function makeMinuteWheel(){

	var x = 1.5 * wheel_width + 2 * wheel_spacing;
	minutewheel.setAttribute("x", x);
	minutewheel.setAttribute("y", -wheel_height/2);
	minutewheel.setAttribute("width", wheel_width);
	minutewheel.setAttribute("height", wheel_height);
	minutebox.setAttribute("x", x);
	minutebox.setAttribute("y", -wheel_height/2);
	minutebox.setAttribute("width", wheel_width);
	minutebox.setAttribute("height", wheel_height);
	var xcenter = x + wheel_width/2;
	for (var i=-4; i<=(60+4); i++){
		var y = wheel_digit_height * i;
		var tx = document.createElementNS(xmlns, "text");
		tx.setAttributeNS(null,"x",xcenter);
		tx.setAttributeNS(null,"y",y);
		tx.setAttributeNS(null,"class","wheelval_inactive");
		var val = (60+i)%60;  
		var valstr = ("0"+val.toString()).slice(-2);
		var id_string = "mm" + i.toString();
		tx.setAttributeNS(null,"id", id_string);
		var tn = document.createTextNode(valstr);
		tx.appendChild(tn);
		minutewheel_textgroup.appendChild(tx);
	}

	document.getElementById("minutebox").addEventListener("wheel", minutewheel_scroll)
	function minutewheel_scroll(event) {
		event.preventDefault();
		stop_button_pressed();
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		var minute0 = Number(document.getElementById("local_minutes").innerHTML);
		var N = 60; // the number of items in the (unaugmented) list
		var dy = (1 + 9 * event.deltaMode) * event.deltaY; // scale according to whether wheel deltas are "pixel" or "line" mode 
		dy = Math.sign(dy) * Math.min(Math.abs(dy), wheel_digit_height * scroll_speed_factor); // clip abs(dy) to the digit height
		var y0 = minutewheel_textgroup.getAttribute("transform");
		y0 = y0.replace("translate(0,", "");
		y0 = Number(y0.replace(")", ""));
		var y1 = y0 - dy/scroll_speed_factor;
		jd_local += (1/1440) *  Math.round(((wheel_baseline_height - y1) / wheel_digit_height) - minute0);
		if (jd_local > jdmax || jd_local < jdmin) {return;}
		var upper_threshold = wheel_baseline_height + wheel_digit_height/2;
		var lower_threshold = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2;
		if(y1 > upper_threshold){
			y1 = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2 + (y1 - upper_threshold);
			fullDateSet(jd_local);
		}
		else if(y1 <= lower_threshold){
			y1 = wheel_baseline_height + wheel_digit_height/2 + (y1 - lower_threshold);
			fullDateSet(jd_local);
		}
		var val = Math.round((wheel_baseline_height - y1) / wheel_digit_height);	
		var val_id_string = "#mm" + val.toString();
		$("#minutewheel_textgroup > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
		$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
		var transform_string = "translate(0," + y1 + ")";
		minutewheel_textgroup.setAttribute("transform", transform_string);
		document.getElementById("minutewheel_y").innerHTML = y1.toFixed(3);
		document.getElementById("minutewheel_val").innerHTML = val;
	    document.getElementById("minutewheel_dy").innerHTML = dy;
	    cosmic_update(jd_local);
	}

	var minutewheel_drag = d3.drag().on("drag", function() {
		stop_button_pressed();
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		var minute0 = Number(document.getElementById("local_minutes").innerHTML);
		var N = 60; // the number of items in the (unaugmented) list
		var dy = d3.event.dy;
		var y0 = minutewheel_textgroup.getAttribute("transform");
		y0 = y0.replace("translate(0,", "");
		y0 = Number(y0.replace(")", ""));
		var y1 = y0 - dy;
		jd_local += (1/1440) *  Math.round(((wheel_baseline_height - y1) / wheel_digit_height) - minute0);
		if (jd_local > jdmax || jd_local < jdmin) {return;}
		var upper_threshold = wheel_baseline_height + wheel_digit_height/2;
		var lower_threshold = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2;
		if(y1 > upper_threshold){
			y1 = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2 + (y1 - upper_threshold);
			fullDateSet(jd_local);
		}
		else if(y1 <= lower_threshold){
			y1 = wheel_baseline_height + wheel_digit_height/2 + (y1 - lower_threshold);
			fullDateSet(jd_local);
		}
		var val = Math.round((wheel_baseline_height - y1) / wheel_digit_height);	
		var val_id_string = "#mm" + val.toString();
		$("#minutewheel_textgroup > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
		$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
		var transform_string = "translate(0," + y1 + ")"; 
		minutewheel_textgroup.setAttribute("transform", transform_string);
	    document.getElementById("minutewheel_y").innerHTML = y1.toFixed(3);
	    document.getElementById("minutewheel_val").innerHTML = val;
	    document.getElementById("minutewheel_dy").innerHTML = dy;
	    cosmic_update(jd_local);
	})
	.on("end", function() {
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		fullDateSet(jd_local);
	});
	d3.select("#minutebox").call(minutewheel_drag);
}

//--- Hour Wheel ---
function makeHourWheel(){
	var x = .5 * wheel_width + wheel_spacing;
	hourwheel.setAttribute("x", x);
	hourwheel.setAttribute("y", -wheel_height/2);
	hourwheel.setAttribute("width", wheel_width);
	hourwheel.setAttribute("height", wheel_height);
	hourbox.setAttribute("x", x);
	hourbox.setAttribute("y", -wheel_height/2);
	hourbox.setAttribute("width", wheel_width);
	hourbox.setAttribute("height", wheel_height);
	var xcenter = x + wheel_width/2;
	for (var i=-4; i<=(24+4); i++){
		var y = wheel_digit_height * i;
		var tx = document.createElementNS(xmlns, "text");
		tx.setAttributeNS(null,"x",xcenter);
		tx.setAttributeNS(null,"y",y);
		tx.setAttributeNS(null,"class","wheelval_inactive");
		var val = (24+i)%24;  
		var valstr = ("0"+val.toString()).slice(-2);
		var id_string = "hh" + i.toString();
		tx.setAttributeNS(null,"id", id_string);
		var tn = document.createTextNode(valstr);
		tx.appendChild(tn);
		hourwheel_textgroup.appendChild(tx);
	}

	document.getElementById("hourbox").addEventListener("wheel", hourwheel_scroll)
	function hourwheel_scroll(event) {
		event.preventDefault();
		stop_button_pressed();
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		var hour0 = Number(document.getElementById("local_hour").innerHTML);
		var N = 24; // the number of items in the (unaugmented) list
		var dy = (1 + 9 * event.deltaMode) * event.deltaY; // scale according to whether wheel deltas are "pixel" or "line" mode 
		dy = Math.sign(dy) * Math.min(Math.abs(dy), wheel_digit_height * scroll_speed_factor); // clip abs(dy) to the digit height
		var y0 = hourwheel_textgroup.getAttribute("transform");
		y0 = y0.replace("translate(0,", "");
		y0 = Number(y0.replace(")", ""));
		var y1 = y0 - dy/scroll_speed_factor;
		jd_local += (1/24) *  Math.round(((wheel_baseline_height - y1) / wheel_digit_height) - hour0);
		if (jd_local > jdmax || jd_local < jdmin) {return;}
		var upper_threshold = wheel_baseline_height + wheel_digit_height/2;
		var lower_threshold = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2;
		if(y1 > upper_threshold){
			y1 = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2 + (y1 - upper_threshold);
			fullDateSet(jd_local);
		}
		else if(y1 <= lower_threshold){
			y1 = wheel_baseline_height + wheel_digit_height/2 + (y1 - lower_threshold);
			fullDateSet(jd_local);
		}	
		var val = Math.round((wheel_baseline_height - y1) / wheel_digit_height);	
		var val_id_string = "#hh" + val.toString();
		$("#hourwheel_textgroup > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
		$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
		var transform_string = "translate(0," + y1 + ")";
		hourwheel_textgroup.setAttribute("transform", transform_string);
		document.getElementById("hourwheel_y").innerHTML = y1.toFixed(3);
		document.getElementById("hourwheel_val").innerHTML = val;
	    document.getElementById("hourwheel_dy").innerHTML = dy;
	    cosmic_update(jd_local);
	}

	var hourwheel_drag = d3.drag().on("drag", function() {
		stop_button_pressed();
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		var hour0 = Number(document.getElementById("local_hour").innerHTML);
		var N = 24; // the number of items in the (unaugmented) list
	    var dy = d3.event.dy;
	  	var y0 = hourwheel_textgroup.getAttribute("transform");
		y0 = y0.replace("translate(0,", "");
		y0 = Number(y0.replace(")", ""));
		var y1 = y0 - dy;
		jd_local += (1/24) *  Math.round(((wheel_baseline_height - y1) / wheel_digit_height) - hour0);
		if (jd_local > jdmax || jd_local < jdmin) {return;}
		var upper_threshold = wheel_baseline_height + wheel_digit_height/2;
		var lower_threshold = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2;
		if(y1 > upper_threshold){
			y1 = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2 + (y1 - upper_threshold);
			fullDateSet(jd_local);
		}
		else if(y1 <= lower_threshold){
			y1 = wheel_baseline_height + wheel_digit_height/2 + (y1 - lower_threshold);
			fullDateSet(jd_local);
		}	
		var val = Math.round((wheel_baseline_height - y1) / wheel_digit_height);	
		var val_id_string = "#hh" + val.toString();
		$("#hourwheel_textgroup > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
		$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
		var transform_string = "translate(0," + y1 + ")";
		hourwheel_textgroup.setAttribute("transform", transform_string);
		document.getElementById("hourwheel_y").innerHTML = y1.toFixed(3);
		document.getElementById("hourwheel_val").innerHTML = val;
	    document.getElementById("hourwheel_dy").innerHTML = dy;
	    cosmic_update(jd_local);
	})
	.on("end", function() {
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		fullDateSet(jd_local);
	});
	d3.select("#hourbox").call(hourwheel_drag);
}

//--- Day Wheel ---
function makeDayWheel(){
	var x = -.5 * wheel_width;
	daywheel.setAttribute("x", x);
	daywheel.setAttribute("y", -wheel_height/2);
	daywheel.setAttribute("width", wheel_width);
	daywheel.setAttribute("height", wheel_height);
	daybox.setAttribute("x", x);
	daybox.setAttribute("y", -wheel_height/2);
	daybox.setAttribute("width", wheel_width);
	daybox.setAttribute("height", wheel_height);
	var xcenter = x + wheel_width/2;
	
	//--- 365 day wheel ---
	for (var i=-4; i<=(365+4); i++){
		var y = wheel_digit_height * i;
		var tx = document.createElementNS(xmlns, "text");
		tx.setAttributeNS(null,"x",xcenter);
		tx.setAttributeNS(null,"y",y);
		tx.setAttributeNS(null,"class","wheelval_inactive");
		var id_string = "dd365_" + (i+1).toString();
		tx.setAttributeNS(null,"id", id_string);
		var tn = document.createTextNode(year365[i+4]);
		tx.appendChild(tn);
		daywheel_textgroup_365.appendChild(tx);
	}

	//--- 366 day wheel ---
	for (var i=-4; i<=(366+4); i++){
		var y = wheel_digit_height * i;
		var tx = document.createElementNS(xmlns, "text");
		tx.setAttributeNS(null,"x",xcenter);
		tx.setAttributeNS(null,"y",y);
		tx.setAttributeNS(null,"class","wheelval_inactive");
		var id_string = "dd366_" + (i+1).toString();
		tx.setAttributeNS(null,"id", id_string);
		var tn = document.createTextNode(year366[i+4]);
		tx.appendChild(tn);
		daywheel_textgroup_366.appendChild(tx);
	}

	//--- 355 day wheel (year 1582) ---
	for (var i=-4; i<=(355+4); i++){
		var y = wheel_digit_height * i;
		var tx = document.createElementNS(xmlns, "text");
		tx.setAttributeNS(null,"x",xcenter);
		tx.setAttributeNS(null,"y",y);
		tx.setAttributeNS(null,"class","wheelval_inactive");
		var id_string = "dd355_" + (i+1).toString();
		tx.setAttributeNS(null,"id", id_string);
		var tn = document.createTextNode(year355[i+4]);
		tx.appendChild(tn);
		daywheel_textgroup_355.appendChild(tx);
	}

	document.getElementById("daybox").addEventListener("wheel", daywheel_scroll)
	function daywheel_scroll(event) {
		event.preventDefault();
		stop_button_pressed();
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		var doy0 = Number(document.getElementById("daywheel_val").innerHTML);
		var month0 = Number(document.getElementById("local_month").innerHTML);
		var leapyearoffset = Number(document.getElementById("leapyearval").innerHTML); 
		var N = 365 + leapyearoffset; // the number of items in the (unaugmented) list
		var dy = (1 + 9 * event.deltaMode) * event.deltaY; // scale according to whether wheel deltas are "pixel" or "line" mode 
		dy = Math.sign(dy) * Math.min(Math.abs(dy), wheel_digit_height * scroll_speed_factor); // clip abs(dy) to the digit height
		var daywheel_textgroup = document.getElementById("daywheel_textgroup_" + String(N));
		var y0 = daywheel_textgroup.getAttribute("transform");
		y0 = y0.replace("translate(0,", "");
		y0 = Number(y0.replace(")", ""));
		var y1 = y0 - dy/scroll_speed_factor;
		jd_local += Math.round(((wheel_baseline_height - y1) / wheel_digit_height) - doy0 + 1);
		if (jd_local > jdmax || jd_local < jdmin) {return;}
		var ymdhms_local = jd_to_array(jd_local);
		if (ymdhms_local[1] != month0){
			fullDateSet(jd_local);
			if (y1 <= lower_threshold) {
				y1 = wheel_baseline_height + wheel_digit_height/2 + (y1 - lower_threshold);
			}
			else if (y1 >= upper_threshold) {
				y1 = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2 + (y1 - upper_threshold);
			}
		}
		var val = 1 + Math.round((wheel_baseline_height - y1) / wheel_digit_height);
		var val_id_string = "#dd" + String(N) + "_" + val.toString();
		$("#daywheel_textgroup_" + String(N) + " > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
		$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
		var transform_string = "translate(0," + y1 + ")";
		daywheel_textgroup.setAttribute("transform", transform_string);
		document.getElementById("daywheel_val").innerHTML = val;
		document.getElementById("daysinyear").innerHTML = N;
		document.getElementById("daywheel_y").innerHTML = y1.toFixed(3);
	    document.getElementById("daywheel_dy").innerHTML = Math.round(((wheel_baseline_height - y1) / wheel_digit_height) - doy0);
	    cosmic_update(jd_local);
	}

	var daywheel_drag = d3.drag().on("drag", function() {
		stop_button_pressed();
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		var doy0 = Number(document.getElementById("daywheel_val").innerHTML);
		var month0 = Number(document.getElementById("local_month").innerHTML);
		var leapyearoffset = Number(document.getElementById("leapyearval").innerHTML); 
		var N = 365 + leapyearoffset; // the number of items in the (unaugmented) list
		var dy = d3.event.dy;
		var daywheel_textgroup = document.getElementById("daywheel_textgroup_" + String(N));
		var y0 = daywheel_textgroup.getAttribute("transform");
		y0 = y0.replace("translate(0,", "");
		y0 = Number(y0.replace(")", ""));
		var y1 = y0 - dy;
		jd_local += Math.round(((wheel_baseline_height - y1) / wheel_digit_height) - doy0 + 1);
		if (jd_local > jdmax || jd_local < jdmin) {return;}
		var ymdhms_local = jd_to_array(jd_local);
		if (ymdhms_local[1] != month0){
			fullDateSet(jd_local);
			if (y1 <= lower_threshold) {
				y1 = wheel_baseline_height + wheel_digit_height/2 + (y1 - lower_threshold);
			}
			else if (y1 >= upper_threshold) {
				y1 = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2 + (y1 - upper_threshold);
			}
		}
		var val = 1 + Math.round((wheel_baseline_height - y1) / wheel_digit_height);
		var val_id_string = "#dd" + String(N) + "_" + val.toString();
		$("#daywheel_textgroup_" + String(N) + " > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
		$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
		var transform_string = "translate(0," + y1 + ")";
		daywheel_textgroup.setAttribute("transform", transform_string);
		document.getElementById("daywheel_val").innerHTML = val;
		document.getElementById("daysinyear").innerHTML = N;
		document.getElementById("daywheel_y").innerHTML = y1.toFixed(3);
	    document.getElementById("daywheel_dy").innerHTML = Math.round(((wheel_baseline_height - y1) / wheel_digit_height) - doy0);
	    cosmic_update(jd_local);
	})
	.on("end", function() {
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		fullDateSet(jd_local);
	});
	d3.select("#daybox").call(daywheel_drag);
}

//--- Month Wheel ---
function makeMonthWheel(){
	var monthNames = ["SEP","OCT","NOV","DEC","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC","JAN","FEB","MAR","APR"];
	var x = -1.5 * wheel_width - 1 * wheel_spacing;
	monthwheel.setAttribute("x", x);
	monthwheel.setAttribute("y", -wheel_height/2);
	monthwheel.setAttribute("width", wheel_width);
	monthwheel.setAttribute("height", wheel_height);
	monthbox.setAttribute("x", x);
	monthbox.setAttribute("y", -wheel_height/2);
	monthbox.setAttribute("width", wheel_width);
	monthbox.setAttribute("height", wheel_height);
	var xcenter = x + wheel_width/2;
	for (var i=-4; i<=monthNames.length; i++){
		var y = wheel_digit_height * i;
		var tx = document.createElementNS(xmlns, "text");
		tx.setAttributeNS(null,"x",xcenter);
		tx.setAttributeNS(null,"y",y);
		tx.setAttributeNS(null,"class","wheelval_inactive"); 
		var id_string = "M" + (i+1).toString();
		tx.setAttributeNS(null,"id", id_string);
		var tn = document.createTextNode(monthNames[i+4]);
		tx.appendChild(tn);
		monthwheel_textgroup.appendChild(tx);
	}

	document.getElementById("monthbox").addEventListener("wheel", monthwheel_scroll)
	function monthwheel_scroll(event) {
		event.preventDefault();
		stop_button_pressed();
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		var daysinyear0 = Number(document.getElementById("daysinyear").innerHTML);
		var N = 12; // the number of items in the (unaugmented) list
		var dy = (1 + 9 * event.deltaMode) * event.deltaY; // scale according to whether wheel deltas are "pixel" or "line" mode 
		dy = Math.sign(dy) * Math.min(Math.abs(dy), wheel_digit_height * scroll_speed_factor); // clip abs(dy) to the digit height
		var y0 = monthwheel_textgroup.getAttribute("transform");
		y0 = y0.replace("translate(0,", "");
		y0 = Number(y0.replace(")", ""));
		var y1 = y0 - dy/scroll_speed_factor;
		var ymdhms_local = jd_to_array(jd_local);
		var upper_threshold = wheel_baseline_height + wheel_digit_height/2;
		var lower_threshold = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2;
		var val = 1 + Math.round((wheel_baseline_height - y1) / wheel_digit_height);
		if (val != ymdhms_local[1]) {
			if (y1 <= lower_threshold) {
				val = 1;
				y1 = wheel_baseline_height + wheel_digit_height/2 + (y1 - lower_threshold);
				ymdhms_local = [ymdhms_local[0]+1,1,ymdhms_local[2],ymdhms_local[3],ymdhms_local[4],0];
				jd_local = jd_from_array(ymdhms_local);
				if (jd_local > jdmax || jd_local < jdmin) {return;}
				fullDateSet(jd_local);
			}
			else if (y1 >= upper_threshold) {
				val = 12;
				y1 = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2 + (y1 - upper_threshold);
				ymdhms_local = [ymdhms_local[0]-1,12,ymdhms_local[2],ymdhms_local[3],ymdhms_local[4],0];
				jd_local = jd_from_array(ymdhms_local);
				if (jd_local > jdmax || jd_local < jdmin) {return;}
				fullDateSet(jd_local);
			}
			else {
				var doy = Math.min(monthstart[val-1] + ymdhms_local[2] - 1, monthstart[val] - 1);
				daySet(doy, daysinyear0);
				jd_local = jd_from_array([ymdhms_local[0],1,1,ymdhms_local[3],ymdhms_local[4],0]) + doy - 1;
				cosmic_update(jd_local);
			}
		}	
		var val_id_string = "#M" + val.toString();
		$("#monthwheel_textgroup > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
		$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
		var transform_string = "translate(0," + y1 + ")";
		monthwheel_textgroup.setAttribute("transform", transform_string);
		document.getElementById("monthwheel_y").innerHTML = y1.toFixed(3);
		document.getElementById("monthwheel_val").innerHTML = val;
	    document.getElementById("monthwheel_dy").innerHTML = dy;
	}

	var monthwheel_drag = d3.drag().on("drag", function() {
		stop_button_pressed();
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		var daysinyear0 = Number(document.getElementById("daysinyear").innerHTML);
		var N = 12; // the number of items in the (unaugmented) list
		var dy = d3.event.dy;
		var y0 = monthwheel_textgroup.getAttribute("transform");
		y0 = y0.replace("translate(0,", "");
		y0 = Number(y0.replace(")", ""));
		var y1 = y0 - dy;
		var ymdhms_local = jd_to_array(jd_local);
		var upper_threshold = wheel_baseline_height + wheel_digit_height/2;
		var lower_threshold = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2;
		var val = 1 + Math.round((wheel_baseline_height - y1) / wheel_digit_height);
		if (val != ymdhms_local[1]) {
			if (y1 <= lower_threshold) {
				val = 1;
				y1 = wheel_baseline_height + wheel_digit_height/2 + (y1 - lower_threshold);
				ymdhms_local = [ymdhms_local[0]+1,1,ymdhms_local[2],ymdhms_local[3],ymdhms_local[4],0];
				jd_local = jd_from_array(ymdhms_local);
				if (jd_local > jdmax || jd_local < jdmin) {return;}
				fullDateSet(jd_local);
			}
			else if (y1 >= upper_threshold) {
				val = 12;
				y1 = wheel_baseline_height - wheel_digit_height * (N-1) - wheel_digit_height/2 + (y1 - upper_threshold);
				ymdhms_local = [ymdhms_local[0]-1,12,ymdhms_local[2],ymdhms_local[3],ymdhms_local[4],0];
				jd_local = jd_from_array(ymdhms_local);
				if (jd_local > jdmax || jd_local < jdmin) {return;}
				fullDateSet(jd_local);
			}
			else {
				var doy = Math.min(monthstart[val-1] + ymdhms_local[2] - 1, monthstart[val] - 1);
				daySet(doy, daysinyear0);
				jd_local = jd_from_array([ymdhms_local[0],1,1,ymdhms_local[3],ymdhms_local[4],0]) + doy - 1;
				cosmic_update(jd_local);
			}
		}
		var val_id_string = "#M" + val.toString();
		$("#monthwheel_textgroup > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
		$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
		var transform_string = "translate(0," + y1 + ")";
		monthwheel_textgroup.setAttribute("transform", transform_string);
		document.getElementById("monthwheel_y").innerHTML = y1.toFixed(3);
		document.getElementById("monthwheel_val").innerHTML = val;
	    document.getElementById("monthwheel_dy").innerHTML = dy;	
	})
	.on("end", function() {
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		fullDateSet(jd_local);
	});
	d3.select("#monthbox").call(monthwheel_drag);
}


//--- Year Wheel ---
function makeYearWheel(){
	var x = -2.5 * wheel_width - 2 * wheel_spacing;
	yearwheel.setAttribute("x", x);
	yearwheel.setAttribute("y", -wheel_height/2);
	yearwheel.setAttribute("width", wheel_width);
	yearwheel.setAttribute("height", wheel_height);
	yearbox.setAttribute("x", x);
	yearbox.setAttribute("y", -wheel_height/2);
	yearbox.setAttribute("width", wheel_width);
	yearbox.setAttribute("height", wheel_height);
	var xcenter = x + wheel_width/2;
	for (var century=-19; century<=30; century++){
		var g = document.createElementNS(xmlns, "g");
		var gid_string = "c" + String(century) + "_textgroup";
		g.setAttributeNS(null,"id",gid_string);
		g.setAttributeNS(null,"class","centuryblock_hidden");
		g.setAttributeNS(null,"transform","translate(0,1.5)");
		centuryblock_group.appendChild(g);
		for (var i=-3; i<=104; i++){
			var y = wheel_digit_height * i;
			var tx = document.createElementNS(xmlns, "text");
			tx.setAttributeNS(null,"x",xcenter);
			tx.setAttributeNS(null,"y",y);
			tx.setAttributeNS(null,"class","wheelval_inactive");
			if (i>=1 && i <=100){
				var id_string = "c" + String(century) + "y" + String(i);
				tx.setAttributeNS(null,"id", id_string);
			}
			var yearval = (100 * (century - 1) + i);
			var valstr = String(yearval);
			if (yearval > yearmax) {
				valstr = "";
			}
			if (yearval < 1) {
				valstr = String(1 - yearval) + " BC";
				tx.setAttributeNS(null, "font-size", 4.5);
			}
			if (yearval < -98) {
				tx.setAttributeNS(null, "font-size", 4);
			}
			if (yearval < -998) {
				tx.setAttributeNS(null, "font-size", 3.5);
			}
			if (yearval < yearmin) {
				valstr = "";
			}
			var tn = document.createTextNode(valstr);
			tx.appendChild(tn);
			g.appendChild(tx);
		}
	}

	document.getElementById("yearbox").addEventListener("wheel", yearwheel_scroll)
	function yearwheel_scroll(event) {
		event.preventDefault();
		stop_button_pressed();
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		var ymdhms_local = jd_to_array(jd_local);
		var century = 1 + Math.floor((ymdhms_local[0] - 1)/100); 
		var yearwheel_textgroup_id = "c" + century.toString() + "_textgroup";
		var yearwheel_textgroup = document.getElementById(yearwheel_textgroup_id); 
		var oldLeap = Number(document.getElementById("leapyearval").innerHTML);
		var doy = Number(document.getElementById("daywheel_val").innerHTML);
		var dy = (1 + 9 * event.deltaMode) * event.deltaY; // scale according to whether wheel deltas are "pixel" or "line" mode 
		dy = Math.sign(dy) * Math.min(Math.abs(dy), wheel_digit_height * scroll_speed_factor); // clip abs(dy) to the digit height
		var y0 = yearwheel_textgroup.getAttribute("transform");
		y0 = y0.replace("translate(0,", "");
		y0 = Number(y0.replace(")", ""));
		var y1 = y0 - dy/scroll_speed_factor;
		var upper_threshold = wheel_baseline_height - wheel_digit_height/2; // = -2 since wheels count from 1 not zero
		var lower_threshold = wheel_baseline_height - wheel_digit_height * 100 - wheel_digit_height/2;
		var val = Math.round((wheel_baseline_height - y1) / wheel_digit_height);
		var yearval = 100 * (century - 1) + val;
		if (yearval > yearmax || yearval < yearmin) {return;}
		if (yearval != ymdhms_local[0]) {
			ymdhms_local[0] = yearval;
			var newLeap = Number(leapYearQuery(ymdhms_local[0]));
			if (y1 < lower_threshold) {
				y1 = wheel_baseline_height - wheel_digit_height/2 + (y1 - lower_threshold);
				century = 1 + Math.floor((ymdhms_local[0] - 1)/100);
				val = ymdhms_local[0] - 100 * (century - 1);
				yearwheel_textgroup_id = "c" + century.toString() + "_textgroup";
				yearwheel_textgroup = document.getElementById(yearwheel_textgroup_id); 
			    $(".centuryblock_visible").removeClass("centuryblock_visible").addClass("centuryblock_hidden");
			    $("#" + yearwheel_textgroup_id).removeClass("centuryblock_hidden").addClass("centuryblock_visible");
			}
			else if (y1 > upper_threshold){
				y1 = wheel_baseline_height - wheel_digit_height * 100 - wheel_digit_height/2 + (y1 - upper_threshold);
				century = 1 + Math.floor((ymdhms_local[0] - 1)/100); 
				val = ymdhms_local[0] - 100 * (century - 1);
				yearwheel_textgroup_id = "c" + century.toString() + "_textgroup";
				yearwheel_textgroup = document.getElementById(yearwheel_textgroup_id); 
			    $(".centuryblock_visible").removeClass("centuryblock_visible").addClass("centuryblock_hidden");
			    $("#" + yearwheel_textgroup_id).removeClass("centuryblock_hidden").addClass("centuryblock_visible");
			}
			if(newLeap != oldLeap){
				if(oldLeap == 0 && newLeap == 1){
					daywheel_textgroup_365.setAttribute("visibility", "hidden");
					daywheel_textgroup_366.setAttribute("visibility", "visible");
					daywheel_textgroup_355.setAttribute("visibility", "hidden");
					monthstart = monthStart366;
					if (doy >= 60){doy += 1;}
					daySet(doy, 366);
					star_precess();
				}
				if(oldLeap == 1 && newLeap == 0){
					daywheel_textgroup_365.setAttribute("visibility", "visible");
					daywheel_textgroup_366.setAttribute("visibility", "hidden");
					daywheel_textgroup_355.setAttribute("visibility", "hidden");
					monthstart = monthStart365;
					if (doy >= 60){doy -= 1;}
					daySet(doy, 365);
					star_precess();
				}
				if(newLeap == -10){
					daywheel_textgroup_365.setAttribute("visibility", "hidden");
					daywheel_textgroup_366.setAttribute("visibility", "hidden");
					daywheel_textgroup_355.setAttribute("visibility", "visible");
					monthstart = monthStart355;
					if ([278,279,280,281,282,283,284,285,286,287].includes(doy)){doy = 278;}
					if (doy >= 288){doy -= 10;}
					daySet(doy, 355);
				}
				if(oldLeap == -10){
					daywheel_textgroup_365.setAttribute("visibility", "visible");
					daywheel_textgroup_366.setAttribute("visibility", "hidden");
					daywheel_textgroup_355.setAttribute("visibility", "hidden");
					monthstart = monthStart365;
					if (doy >= 278){doy += 10;}
					daySet(doy, 365);
				}
			}
		}
		var val_id_string = "#c" + century.toString() + "y" + val.toString();
		$("#" + yearwheel_textgroup_id + " > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
		$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
		var transform_string = "translate(0," + y1 + ")";
		yearwheel_textgroup.setAttribute("transform", transform_string);
		document.getElementById("yearwheel_y").innerHTML = y1.toFixed(3);
		document.getElementById("yearwheel_val").innerHTML = val;
	    document.getElementById("yearwheel_dy").innerHTML = dy;
		jd_local = jd_from_array(ymdhms_local);
		cosmic_update(jd_local);
	}

	var yearwheel_drag = d3.drag()
	.on("start", function() {
		stop_button_pressed();
		var oldLeap = Number(document.getElementById("leapyearval").innerHTML);
		document.getElementById("oldLeap_buffer").innerHTML = oldLeap; 
	})
	.on("drag", function() {
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		var ymdhms_local = jd_to_array(jd_local);
		var century = 1 + Math.floor((ymdhms_local[0] - 1)/100); 
		var yearwheel_textgroup_id = "c" + century.toString() + "_textgroup";
		var yearwheel_textgroup = document.getElementById(yearwheel_textgroup_id); 
		var dy = d3.event.dy;
		var y0 = yearwheel_textgroup.getAttribute("transform");
		y0 = y0.replace("translate(0,", "");
		y0 = Number(y0.replace(")", ""));
		var y1 = y0 - dy;
		var upper_threshold = wheel_baseline_height - wheel_digit_height/2; // = -2 since wheels count from 1 not zero
		var lower_threshold = wheel_baseline_height - wheel_digit_height * 100 - wheel_digit_height/2;
		var val = Math.round((wheel_baseline_height - y1) / wheel_digit_height);
		var yearval = 100 * (century - 1) + val;
		if (yearval > yearmax || yearval < yearmin) {return;}
		if (yearval != ymdhms_local[0]) {
			ymdhms_local[0] = yearval;
			if (y1 < lower_threshold) {
				y1 = wheel_baseline_height - wheel_digit_height/2 + (y1 - lower_threshold);
				century = 1 + Math.floor((ymdhms_local[0] - 1)/100); 
				val = ymdhms_local[0] - 100 * (century - 1);
				yearwheel_textgroup_id = "c" + century.toString() + "_textgroup";
				yearwheel_textgroup = document.getElementById(yearwheel_textgroup_id); 
			    $(".centuryblock_visible").removeClass("centuryblock_visible").addClass("centuryblock_hidden");
			    $("#" + yearwheel_textgroup_id).removeClass("centuryblock_hidden").addClass("centuryblock_visible");
			}
			else if (y1 > upper_threshold){
				y1 = wheel_baseline_height - wheel_digit_height * 100 - wheel_digit_height/2 + (y1 - upper_threshold);
				century = 1 + Math.floor((ymdhms_local[0] - 1)/100); 
				val = ymdhms_local[0] - 100 * (century - 1);
				yearwheel_textgroup_id = "c" + century.toString() + "_textgroup";
				yearwheel_textgroup = document.getElementById(yearwheel_textgroup_id); 
			    $(".centuryblock_visible").removeClass("centuryblock_visible").addClass("centuryblock_hidden");
			    $("#" + yearwheel_textgroup_id).removeClass("centuryblock_hidden").addClass("centuryblock_visible");
			}
		}
	    var val_id_string = "#c" + century.toString() + "y" + val.toString();
		$("#" + yearwheel_textgroup_id + " > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
		$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
		var transform_string = "translate(0," + y1 + ")";
		yearwheel_textgroup.setAttribute("transform", transform_string);
		document.getElementById("yearwheel_y").innerHTML = y1.toFixed(3);
		document.getElementById("yearwheel_val").innerHTML = val;
	    document.getElementById("yearwheel_dy").innerHTML = dy;
		jd_local = jd_from_array(ymdhms_local);
		cosmic_update(jd_local);
	})
	.on("end", function() {
		var doy = Number(document.getElementById("daywheel_val").innerHTML);
		var oldLeap = Number(document.getElementById("oldLeap_buffer").innerHTML);
		var newLeap = Number(document.getElementById("leapyearval").innerHTML);
		if(oldLeap == 0 && newLeap == 1){
			daywheel_textgroup_365.setAttribute("visibility", "hidden");
			daywheel_textgroup_366.setAttribute("visibility", "visible");
			daywheel_textgroup_355.setAttribute("visibility", "hidden");
			monthstart = monthStart366;
			if (doy >= 60){doy += 1;}
			star_precess();
		}
		if(oldLeap == 1 && newLeap == 0){
			daywheel_textgroup_365.setAttribute("visibility", "visible");
			daywheel_textgroup_366.setAttribute("visibility", "hidden");
			daywheel_textgroup_355.setAttribute("visibility", "hidden");
			monthstart = monthStart365;
			if (doy >= 60){doy -= 1;}
			star_precess();
		}
		if(newLeap == -10){
			daywheel_textgroup_365.setAttribute("visibility", "hidden");
			daywheel_textgroup_366.setAttribute("visibility", "hidden");
			daywheel_textgroup_355.setAttribute("visibility", "visible");
			monthstart = monthStart355;
			if ([278,279,280,281,282,283,284,285,286,287].includes(doy)){doy = 278;}
			if (doy >= 288){doy -= 10;}
		}
		if(oldLeap == -10){
			daywheel_textgroup_365.setAttribute("visibility", "visible");
			daywheel_textgroup_366.setAttribute("visibility", "hidden");
			daywheel_textgroup_355.setAttribute("visibility", "hidden");
			monthstart = monthStart365;
			if (doy >= 278){doy += 10;}
		}
		var N = 365 + newLeap;
		daySet(doy, N);
		var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
		fullDateSet(jd_local);

	});
	d3.select("#yearbox").call(yearwheel_drag);
}


//-----------------------------------
//--- Set wheels by value -----------
//-----------------------------------
function minuteSet(val){
	var y1 = wheel_baseline_height - val * wheel_digit_height;
	var transform_string = "translate(0," + y1 + ")"; 
    minutewheel_textgroup.setAttribute("transform", transform_string);
    var val_id_string = "#mm" + val.toString();
	$("#minutewheel_textgroup > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
	$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
    document.getElementById("minutewheel_y").innerHTML = y1.toFixed(3);
    document.getElementById("minutewheel_val").innerHTML = val;
}

function hourSet(val){
	var y1 = wheel_baseline_height - val * wheel_digit_height;
	var transform_string = "translate(0," + y1 + ")"; 
    hourwheel_textgroup.setAttribute("transform", transform_string);
    var val_id_string = "#hh" + val.toString();
	$("#hourwheel_textgroup > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
	$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
    document.getElementById("hourwheel_y").innerHTML = y1.toFixed(3);
    document.getElementById("hourwheel_val").innerHTML = val;
}

function daySet(doy, N){
	var y1 = wheel_baseline_height - (doy - 1) * wheel_digit_height;
	var transform_string = "translate(0," + y1 + ")";
	var daywheel_textgroup = document.getElementById("daywheel_textgroup_" + String(N)); 
    daywheel_textgroup.setAttribute("transform", transform_string);
    var val_id_string = "#dd" + String(N) + "_" + doy.toString();
    $("#daywheel_textgroup_" + String(N) + " > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
    $(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
    document.getElementById("daywheel_y").innerHTML = y1.toFixed(3);
    document.getElementById("daywheel_val").innerHTML = doy;
}

function monthSet(val){
	var y1 = wheel_baseline_height - (val - 1) * wheel_digit_height;
	var transform_string = "translate(0," + y1 + ")"; 
    monthwheel_textgroup.setAttribute("transform", transform_string);
    var val_id_string = "#M" + val.toString();
	$("#monthwheel_textgroup > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
	$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
    document.getElementById("monthwheel_y").innerHTML = y1.toFixed(3);
    document.getElementById("monthwheel_val").innerHTML = val;
}

function yearSet(yearval){
	var century = 1 + Math.floor((yearval - 1)/100); 
	var val = yearval - 100 * (century - 1);
	var y1 = wheel_baseline_height - val * wheel_digit_height;
	var transform_string = "translate(0," + y1 + ")"; 
	var yearwheel_textgroup_id = "c" + century.toString() + "_textgroup";
	var yearwheel_textgroup = document.getElementById(yearwheel_textgroup_id); 
    yearwheel_textgroup.setAttribute("transform", transform_string);
    var val_id_string = "#c" + century.toString() + "y" + val.toString();
    $(".centuryblock_visible").removeClass("centuryblock_visible").addClass("centuryblock_hidden");
    $("#" + yearwheel_textgroup_id).removeClass("centuryblock_hidden").addClass("centuryblock_visible");
	$("#" + yearwheel_textgroup_id + " > .wheelval_active").removeClass("wheelval_active").addClass("wheelval_inactive");
	$(val_id_string).removeClass("wheelval_inactive").addClass("wheelval_active");
    document.getElementById("yearwheel_y").innerHTML = y1.toFixed(3);
    document.getElementById("yearwheel_val").innerHTML = val;
}

function wheelSet(jd_local){
  if (jd_local > jdmax || jd_local < jdmin) {
	stop_button_pressed();
  	return;
  }
  var ymdhms_array = jd_to_array(jd_local);
  var oldLeap = Number(document.getElementById("leapyearval").innerHTML); 
  var newLeap = Number(leapYearQuery(ymdhms_array[0]));
  yearSet(ymdhms_array[0]);
  monthSet(ymdhms_array[1]);
  if(oldLeap == 0 && newLeap == 1){
  	daywheel_textgroup_365.setAttribute("visibility", "hidden");
  	daywheel_textgroup_366.setAttribute("visibility", "visible");
  	daywheel_textgroup_355.setAttribute("visibility", "hidden");
  	monthstart = monthStart366;
  	star_precess();
  }
  if(oldLeap != 0 && newLeap == 0){
  	daywheel_textgroup_365.setAttribute("visibility", "visible");
  	daywheel_textgroup_366.setAttribute("visibility", "hidden");
  	daywheel_textgroup_355.setAttribute("visibility", "hidden");
  	monthstart = monthStart365;
  	star_precess();
  }
  if(oldLeap == 0 && newLeap == -10){
  	daywheel_textgroup_365.setAttribute("visibility", "hidden");
  	daywheel_textgroup_366.setAttribute("visibility", "hidden");
  	daywheel_textgroup_355.setAttribute("visibility", "visible");
  	monthstart = monthStart355;
  }
  var doy = day_of_year(ymdhms_array[0], ymdhms_array[1], ymdhms_array[2]);
  var N = 365 + newLeap;
  daySet(doy, N);
  hourSet(ymdhms_array[3]);  
  minuteSet(ymdhms_array[4]);
  cosmic_update(jd_local);
}

function fullDateSet(jd_local){
	wheelSet(jd_local);
	cosmic_update(jd_local);
}

//-----------------------------------
//--- Advance wheels by increment ---
//-----------------------------------
function wheelAdvance(increment){
	var jd_local = Number(document.getElementById("julian_day_local").innerHTML);
	jd_local += increment;
	fullDateSet(jd_local);
}


