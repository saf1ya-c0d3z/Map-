//IMPORTANT FOR MAP

var xmlns = "http://www.w3.org/2000/svg";
var interval1;

//-----------------------------------
//--- Initialize panel buttons ------
//-----------------------------------
function panel_button_init(){

	var button_names = ["now_button", "stop_button", "ff_button", "rr_button"];
	var button_spacing = 5;
	var outer_button_radius = 6;
	var inner_button_radius = outer_button_radius - 1;
	var glow_radius = outer_button_radius + 2.5;

	var buttonglow = document.getElementById("buttonglow");
  	var stop1 = document.createElementNS(xmlns, "stop");
  	stop1.setAttributeNS(null, "offset", "70%");
  	stop1.setAttributeNS(null, "stop-color", "rgb(235,240,250)");
	buttonglow.appendChild(stop1);
	var stop2 = document.createElementNS(xmlns, "stop");
  	stop2.setAttributeNS(null, "offset", "100%");
  	stop2.setAttributeNS(null, "stop-color", "rgb(255,255,255)");
  	buttonglow.appendChild(stop2);

	for (var i=0; i<=3; i++){
		var cx = (2*i - 3) * (button_spacing/2 + outer_button_radius);
		var transform_string = "translate(" + cx + ")";
		var button_name = button_names[i];
		var g = document.getElementById(button_name + "_group");
		g.setAttribute("transform", transform_string);
		var c0 = document.createElementNS(xmlns, "circle");
		c0.setAttribute("cx", 0);
		c0.setAttribute("cx", 0);
		c0.setAttribute("r", glow_radius);
		c0.setAttribute("fill", "url(#buttonglow)");
		c0.setAttribute("class", "panel_button_glow");
		g.appendChild(c0);
		var c1 = document.createElementNS(xmlns, "circle");
		c1.setAttribute("cx", 0);
		c1.setAttribute("cy", 0);
		c1.setAttribute("r", outer_button_radius);
		c1.setAttribute("class", "panel_button_outer");
		g.appendChild(c1);
		var c2 = document.createElementNS(xmlns, "circle");
		c2.setAttribute("cx", 0);
		c2.setAttribute("cx", 0);
		c2.setAttribute("r", inner_button_radius);
		c2.setAttribute("class", "panel_button_inner");
		g.appendChild(c2);
	}

	make_now_button(inner_button_radius);
	make_ff_button(inner_button_radius);
	make_stop_button(inner_button_radius);
	make_rr_button(inner_button_radius);

	$(".panel_button").on("vmouseover", function(){
	  $(this).css("cursor","pointer");
	});
	$(".panel_button_inner").addClass("button_inactive_background");
	$(".panel_button_outer").addClass("button_inactive_rim");
	$(".panel_button_glow").addClass("hidden");

	document.getElementById("now_button_group").addEventListener("click", now_button_pressed);
	document.getElementById("stop_button_group").addEventListener("click", stop_button_pressed);
	document.getElementById("ff_button_group").addEventListener("click", ff_button_pressed);
	document.getElementById("rr_button_group").addEventListener("click", rr_button_pressed);
}


//-----------------------------------
//--- Draw button svgs --------------
//-----------------------------------
function make_now_button(r){
	var d = new Date();
	var hh = (d.getHours()) % 12;
	var mm = d.getMinutes();
	var ss = d.getSeconds();
	var theta_minutes = -Math.floor(360 * (Number(mm)/60 + Number(ss)/3600));
	var theta_hours = -Math.floor(360 * (Number(hh)/12 + 2 * Number(mm)/1440));
	var transform_string_minutes = "rotate(" + theta_minutes + ")";
	var transform_string_hours = "rotate(" + theta_hours + ")";
	var g = document.getElementById("now_button_group");
	var c1r = .92 * r;
	var c2r = .75 * r;
	for (i=0;i<360;i+=30){
		var tick = document.createElementNS(xmlns, "path");
		var d = "M 0 "+c2r+"L 0 "+c1r;
		var rotation_string = "rotate("+i+")";
		tick.setAttributeNS(null, "d", d);
		tick.setAttributeNS(null, "transform", rotation_string);
		tick.setAttributeNS(null, "stroke", "white");
		tick.setAttributeNS(null, "stroke-width", r/15);
		g.appendChild(tick);
	}

	var d = r/30;
	var yback = r/5;
	var hourhand = document.createElementNS(xmlns, "rect");
	hourhand.setAttributeNS(null, "id", "nowbutton_hourhand");
	hourhand.setAttributeNS(null, "x", -d);
	hourhand.setAttributeNS(null, "y", -yback);
	hourhand.setAttributeNS(null, "width", 2 * d);
	hourhand.setAttributeNS(null, "height", 0.6 * r + yback);
	hourhand.setAttributeNS(null, "fill", "white");
	hourhand.setAttributeNS(null, "stroke", "none");
	hourhand.setAttributeNS(null, "transform", transform_string_hours);
	g.appendChild(hourhand);

	var minutehand = document.createElementNS(xmlns, "rect");
	minutehand.setAttributeNS(null, "id", "nowbutton_minutehand");
	minutehand.setAttributeNS(null, "x", -d);
	minutehand.setAttributeNS(null, "y", -yback);
	minutehand.setAttributeNS(null, "width", 2 * d);
	minutehand.setAttributeNS(null, "height", 0.9 * r + yback);
	minutehand.setAttributeNS(null, "fill", "white");
	minutehand.setAttributeNS(null, "stroke", "none");
	minutehand.setAttributeNS(null, "transform", transform_string_minutes);
	g.appendChild(minutehand);
}

function make_stop_button(r){
	var g = document.getElementById("stop_button_group");
	var h = 1.1 * r;
	var w = 0.4 * r;
	var d = 0.12 * r;
	var R1 = document.createElementNS(xmlns, "rect");
	R1.setAttributeNS(null, "x", -d - w);
	R1.setAttributeNS(null, "y", -h/2);
	R1.setAttributeNS(null, "width", w);
	R1.setAttributeNS(null, "height", h);
	R1.setAttributeNS(null, "fill", "white");
	R1.setAttributeNS(null, "stroke", "none");
	g.appendChild(R1);
	var R2 = document.createElementNS(xmlns, "rect");
	R2.setAttributeNS(null, "x", d);
	R2.setAttributeNS(null, "y", -h/2);
	R2.setAttributeNS(null, "width", w);
	R2.setAttributeNS(null, "height", h);
	R2.setAttributeNS(null, "fill", "white");
	R2.setAttributeNS(null, "stroke", "none");
	g.appendChild(R2);
}

function make_ff_button(r){
	var g = document.getElementById("ff_button_group");
	var p = document.createElementNS(xmlns, "path");
	g.appendChild(p);
	var x1 = 0.64*r;
	var y1 = 0.64*r;
	var dx = 0.6;
	var d = "M"+[-x1+dx,-y1]+"L"+[-x1+dx,y1]+"L"+[0+dx,0]+"L"+[0+dx,y1]+"L"+[x1+dx,0]+"L"+[0+dx,-y1]+"L"+[0+dx,0]+"L"+[-x1+dx,-y1]+"Z";
	p.setAttributeNS(null, "d", d);
	p.setAttributeNS(null, "fill", "white");
	p.setAttributeNS(null, "stroke", "none");
}

function make_rr_button(r){
	var g = document.getElementById("rr_button_group");
	var p = document.createElementNS(xmlns, "path");
	g.appendChild(p);
	var x1 = 0.64*r;
	var y1 = 0.64*r;
	var dx = -0.6;
	var d = "M"+[-x1+dx,0]+"L"+[0+dx,y1]+"L"+[0+dx,0]+"L"+[x1+dx,y1]+"L"+[x1+dx,-y1]+"L"+[0+dx,0]+"L"+[0+dx,-y1]+"L"+[-x1+dx,0]+"Z";
	p.setAttributeNS(null, "d", d);
	p.setAttributeNS(null, "fill", "white");
	p.setAttributeNS(null, "stroke", "none");
}

function set_clockhands(){
	var d = new Date();
	var hh = (d.getHours()) % 12;
	var mm = d.getMinutes();
	var ss = d.getSeconds();
	var theta1 = -Math.floor(360 * (Number(mm)/60 + Number(ss)/3600));
	var theta2 = -Math.floor(360 * (Number(hh)/12 + 2 * Number(mm)/1440));
	var transform_string1 = "rotate(" + theta1 + ")";
	var transform_string2 = "rotate(" + theta2 + ")";
	nowbutton_minutehand.setAttributeNS(null, "transform", transform_string1);
	nowbutton_hourhand.setAttributeNS(null, "transform", transform_string2);
}

//-----------------------------------
//--- Event handlers ----------------
//-----------------------------------
function now_button_pressed(){
	$(".panel_button_inner").removeClass("button_active_background").addClass("button_inactive_background");
	$(".panel_button_outer").removeClass("button_active_rim").addClass("button_inactive_rim");
	$(".panel_button_glow").removeClass("visible").addClass("hidden");
	$("#now_button_group > .panel_button_inner").removeClass("button_inactive_background").addClass("button_active_background");
	$("#now_button_group > .panel_button_outer").removeClass("button_inactive_rim").addClass("button_active_rim");
	$("#now_button_group > .panel_button_glow").removeClass("hidden").addClass("visible");
	now();
	star_precess();
	clearInterval(interval1);
	interval1 = setInterval(function(){now()},1000);
	document.getElementById("run_status").innerHTML = "run";
	document.getElementById("ff_speed").innerHTML = 0;
	document.getElementById("rr_speed").innerHTML = 0;
	$("#speedpar").html(" ");
}

function stop_button_pressed(){
	$(".panel_button_inner").removeClass("button_active_background").addClass("button_inactive_background");
	$(".panel_button_outer").removeClass("button_active_rim").addClass("button_inactive_rim");
	$(".panel_button_glow").removeClass("visible").addClass("hidden");
	$("#stop_button_group > .panel_button_inner").removeClass("button_inactive_background").addClass("button_active_background");
	$("#stop_button_group > .panel_button_outer").removeClass("button_inactive_rim").addClass("button_active_rim");
	$("#stop_button_group > .panel_button_glow").removeClass("hidden").addClass("visible");
	clearInterval(interval1);
	document.getElementById("run_status").innerHTML = "stop";
	document.getElementById("ff_speed").innerHTML = 0;
	document.getElementById("rr_speed").innerHTML = 0;
	$("#speedpar").html(" ");
}

function ff_button_pressed(){
	$(".panel_button_inner").removeClass("button_active_background").addClass("button_inactive_background");
	$(".panel_button_outer").removeClass("button_active_rim").addClass("button_inactive_rim");
	$(".panel_button_glow").removeClass("visible").addClass("hidden");
	$("#ff_button_group > .panel_button_inner").removeClass("button_inactive_background").addClass("button_active_background");
	$("#ff_button_group > .panel_button_outer").removeClass("button_inactive_rim").addClass("button_active_rim");
	$("#ff_button_group > .panel_button_glow").removeClass("hidden").addClass("visible");
	clearInterval(interval1);
	document.getElementById("run_status").innerHTML = "ff";
	document.getElementById("rr_speed").innerHTML = 0;
	var speed = Number(document.getElementById("ff_speed").innerHTML);
	speed += 1;
	var increment = 0;
	if(speed==1){
		increment = 1/1440;
    	$("#speedpar").html("Speed 1: increment = +1 minute");
    }
	else if(speed==2){
		increment = 1/144;
    	$("#speedpar").html("Speed 2: increment = +10 minutes");
    }
	else if(speed > 2){
		speed = 3;
		increment = 1;
    	$("#speedpar").html("Speed 3: increment = +1 day");
    }
    document.getElementById("ff_speed").innerHTML = speed;
	interval1 = setInterval(function(){wheelAdvance(increment)}, 50);
}

function rr_button_pressed(){
	$(".panel_button_inner").removeClass("button_active_background").addClass("button_inactive_background");
	$(".panel_button_outer").removeClass("button_active_rim").addClass("button_inactive_rim");
	$(".panel_button_glow").removeClass("visible").addClass("hidden");
	$("#rr_button_group > .panel_button_inner").removeClass("button_inactive_background").addClass("button_active_background");
	$("#rr_button_group > .panel_button_outer").removeClass("button_inactive_rim").addClass("button_active_rim");
	$("#rr_button_group > .panel_button_glow").removeClass("hidden").addClass("visible");
	clearInterval(interval1);
	document.getElementById("run_status").innerHTML = "rr";
	document.getElementById("ff_speed").innerHTML = 0;
	var speed = Number(document.getElementById("rr_speed").innerHTML);
	speed += 1;
	var increment = 0;
	if(speed==1){
		increment = -1/1440;
    	$("#speedpar").html("Speed 1: increment = -1 minute");
    }
	else if(speed==2){
		increment = -1/144;
    	$("#speedpar").html("Speed 2: increment = -10 minutes");
    }
	else if(speed > 2){
		speed = 3;
		increment = -1;
    	$("#speedpar").html("Speed 3: increment = -1 day");
    }
    document.getElementById("rr_speed").innerHTML = speed;
	interval1 = setInterval(function(){wheelAdvance(increment)}, 50);
}





//----------------------------------------
//---------------------------------------- 
//--- Initialize settings dropdown menu --
//----------------------------------------
//----------------------------------------
function settings_menu_init(){

	// Populate select dropdowns
	initialize_bcce_radio_buttons();
	populate_month_select();
	populate_hour_select();
	populate_minute_select();
	initialize_dst_radio_buttons();

	// Extend expand/collapse functionality to datetime_div
	$("#datetime_div").on("vmouseover", function(){
		$(this).css("cursor","pointer");
	});
	$("#datetime_div").on("click", function(){
		if ($("#settings_button").hasClass("ui-collapsible-collapsed")) {
			$("#settings_button").collapsible("expand");
			$("html, body").animate({scrollTop: $("#settings_button").offset().top}, 600);
		}
		else{
		  $("#settings_button").collapsible("collapse");
		}
	});

	// When settings is expanded, set datetime values to current local values
	$("#settings_button").on("collapsibleexpand", function() {
		var year = Number(document.getElementById("local_year").innerHTML);
		$(".radio1_on").addClass("hidden");
		if (year > 1) {
			$("#radio1_CE > .radio1_on").removeClass("hidden").addClass("visible");
		}
		else {
			$("#radio1_BC > .radio1_on").removeClass("hidden").addClass("visible");
			year = 1 - year;
		}
		var dst = Number(document.getElementById("daylightsaving").innerHTML);
		$(".radio2_on").addClass("hidden");
		if (dst == 1) {
			$("#radio2_ON > .radio2_on").removeClass("hidden").addClass("visible");
			$("#dst_radiospan").text(1);
		}
		else {
			$("#radio2_OFF > .radio2_on").removeClass("hidden").addClass("visible");
			$("#dst_radiospan").text(0);
		}
		document.getElementById("year_numberinput").value = year;
		var month = String(document.getElementById("local_month").innerHTML);
		$("#month_select").val(month).selectmenu("refresh");
		dayselect_configure();
		var day = String(document.getElementById("local_day").innerHTML);
		$("#day_select").val(day).selectmenu("refresh");
		var hour = String(document.getElementById("local_hour").innerHTML);
		$("#hour_select").val(hour).selectmenu("refresh");
		var minutes = String(document.getElementById("local_minutes").innerHTML);
		$("#minute_select").val(minutes).selectmenu("refresh");
		var tzo = -Number(document.getElementById("utc_offset").innerHTML)/60;
		$("#timeZoneSlider").val(tzo).slider("refresh");
		var lon = document.getElementById("longitude").innerHTML;
		var lonstring = Math.abs(lon) + "°" + ["W","","E"][(1 + Math.sign(lon))];
		$("#lonspan").text(lonstring);
		$("html, body").animate({scrollTop: $("#settings_button").offset().top}, 600);
	});

	$("#settings_button").on("collapsiblecollapse", function() {
		$("html, body").animate({scrollTop: $("#svg_astrolabe").offset().top}, 500);
	});

	// Reconfigure the day options whenever the selected year or month changes
	$("#year_numberinput").change(function(){
		year_rangecheck();
  		dayselect_configure();
	});

	$("#month_select").change(function(){
  		dayselect_configure();
	});
	// Update lonspan when slider is moved
  	$("#timeZoneSlider").change(function(){
  		longitude_adjust();
	});

	$("#settings_cancel").on("click", function(){
		$("#settings_button").collapsible("collapse");
		$('html, body').animate({scrollTop: $("#svg_astrolabe").offset().top}, 500);
	});

	$("#settings_enter").on("click", function(){
  		stop_button_pressed();
  		var tzo = Number($("#timeZoneSlider").val());
		var dst = Number($("#dst_radiospan").text());
		var lon = 15 * (tzo - dst);
		var utc_offset = -60 * tzo;
		document.getElementById("longitude").innerHTML = lon;
		document.getElementById("daylightsaving").innerHTML = $("#dst_radiospan").text();
		document.getElementById("utc_offset").innerHTML = utc_offset;
		var ymdhms_local = new Array(0,0,0,0,0,0);
		var y = Number($("#year_numberinput").val());
		if ($("#radio1_BC > .radio1_on").hasClass("visible")){
			y = 1 - y;
		}
		ymdhms_local[0] = y;
		ymdhms_local[1] = Number($("#month_select").val());
		ymdhms_local[2] = Number($("#day_select").val());
		ymdhms_local[3] = Number($("#hour_select").val());
		ymdhms_local[4] = Number($("#minute_select").val());
		ymdhms_local[5] = 0;
		var jd_local = jd_from_array(ymdhms_local);
		fullDateSet(jd_local);
		cosmic_update(jd_local);
		star_precess();
		$("#settings_button").collapsible("collapse");
		$('html, body').animate({scrollTop: $("#svg_astrolabe").offset().top}, 600);
	});
}


function initialize_bcce_radio_buttons(){
	var svg_radio1 = document.getElementById("svg_radio1");
	var g0 = document.createElementNS(xmlns, "g");
	svg_radio1.appendChild(g0);
	g0.setAttribute("transform", "matrix(1,0,0,-1,18,5)");
	g0.setAttribute("font-family", "Arial, Helvetica, sans-serif");
	g0.setAttribute("font-size", 3.5);
	g0.setAttribute("font-weight", "bold");
	g0.setAttribute("fill", "#222");
	g0.setAttribute("stroke", "none");
	g0.setAttribute("text-anchor","left");
	var button_labels = ["BC", "CE"];
	for (var i=0; i<button_labels.length; i++){
		var g1 = document.createElementNS(xmlns, "g");
		g0.appendChild(g1);
		g1.setAttribute("class","radio1");
		g1.setAttribute("id", "radio1_" + button_labels[i]);
		var x = -15 + 18 * i;
		var rect = document.createElementNS(xmlns, "rect");
		rect.setAttribute("x", x);
		rect.setAttribute("y", -5);
		rect.setAttribute("width", 14);
		rect.setAttribute("height", 10);
		rect.setAttribute("fill", "white");
		g1.appendChild(rect);
		var tx = document.createElementNS(xmlns, "text");
		tx.setAttributeNS(null,"transform", "matrix(1,0,0,-1,0,0)");
		tx.setAttributeNS(null,"x", x + 8);
		tx.setAttributeNS(null,"y", 2.2);
		var tn = document.createTextNode(button_labels[i]);
		tx.appendChild(tn);
		g1.appendChild(tx);
		var c = document.createElementNS(xmlns, "circle");
		c.setAttribute("cx", x + 4);
		c.setAttribute("cy", -1);
		c.setAttribute("r", 3);
		c.setAttribute("fill", "white");
		c.setAttribute("stroke", "#222");
		c.setAttribute("stroke-width", 0.3);
		g1.appendChild(c);
		var c = document.createElementNS(xmlns, "circle");
		c.setAttribute("cx", x + 4);
		c.setAttribute("cy", -1);
		c.setAttribute("r", 2);
		c.setAttribute("fill", "#333");
		c.setAttribute("stroke", "#333");
		c.setAttribute("stroke-width", 0.3);
		c.setAttribute("class", "radio1_on");
		g1.appendChild(c);
	}
	$(".radio1_on").addClass("hidden");
	$(".radio1").on("vmouseover", function(){
	  $(this).css("cursor","pointer");
	});
	$("#radio1_BC").on("click", function(){
		$(".radio1_on").removeClass("visible").addClass("hidden");
		$("#radio1_BC > .radio1_on").removeClass("hidden").addClass("visible");
		year_rangecheck();
	});
	$("#radio1_CE").on("click", function(){
		$(".radio1_on").removeClass("visible").addClass("hidden");
		$("#radio1_CE > .radio1_on").removeClass("hidden").addClass("visible");
		year_rangecheck();
	});
}

function initialize_dst_radio_buttons(){
	var svg_radio2 = document.getElementById("svg_radio2");
	var g0 = document.createElementNS(xmlns, "g");
	svg_radio2.appendChild(g0);
	g0.setAttribute("transform", "matrix(1,0,0,-1,18,5)");
	g0.setAttribute("font-family", "Arial, Helvetica, sans-serif");
	g0.setAttribute("font-size", 3.5);
	g0.setAttribute("font-weight", "bold");
	g0.setAttribute("fill", "#222");
	g0.setAttribute("stroke", "none");
	g0.setAttribute("text-anchor","left");
	var button_labels = ["ON", "OFF"];
	for (var i=0; i<button_labels.length; i++){
		var g1 = document.createElementNS(xmlns, "g");
		g0.appendChild(g1);
		g1.setAttribute("class","radio2");
		g1.setAttribute("id", "radio2_" + button_labels[i]);
		var x = -15 + 18 * i;
		var rect = document.createElementNS(xmlns, "rect");
		rect.setAttribute("x", x);
		rect.setAttribute("y", -5);
		rect.setAttribute("width", 14);
		rect.setAttribute("height", 10);
		rect.setAttribute("fill", "white");
		g1.appendChild(rect);
		var tx = document.createElementNS(xmlns, "text");
		tx.setAttributeNS(null,"transform", "matrix(1,0,0,-1,0,0)");
		tx.setAttributeNS(null,"x", x + 8);
		tx.setAttributeNS(null,"y", 2.2);
		var tn = document.createTextNode(button_labels[i]);
		tx.appendChild(tn);
		g1.appendChild(tx);
		var c = document.createElementNS(xmlns, "circle");
		c.setAttribute("cx", x + 4);
		c.setAttribute("cy", -1);
		c.setAttribute("r", 3);
		c.setAttribute("fill", "white");
		c.setAttribute("stroke", "#222");
		c.setAttribute("stroke-width", 0.3);
		g1.appendChild(c);
		var c = document.createElementNS(xmlns, "circle");
		c.setAttribute("cx", x + 4);
		c.setAttribute("cy", -1);
		c.setAttribute("r", 2);
		c.setAttribute("fill", "#333");
		c.setAttribute("stroke", "#333");
		c.setAttribute("stroke-width", 0.3);
		c.setAttribute("class", "radio2_on");
		g1.appendChild(c);
	}
	$(".radio2_on").addClass("hidden");
	$(".radio2").on("vmouseover", function(){
	  $(this).css("cursor","pointer");
	});
	$("#radio2_ON").on("click", function(){
		$(".radio2_on").addClass("hidden");
		$("#radio2_ON > .radio2_on").removeClass("hidden").addClass("visible");
		$("#dst_radiospan").text(1);
		longitude_adjust();
	});
	$("#radio2_OFF").on("click", function(){
		$(".radio2_on").addClass("hidden");
		$("#radio2_OFF > .radio2_on").removeClass("hidden").addClass("visible");
		$("#dst_radiospan").text(0);
		longitude_adjust();
	});
}


function populate_month_select(){
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	$("#month_select").empty();
	for (i=0; i<months.length; i++){
		var optiontext = months[i];
		var optionvalue = String(i + 1);
		$("#month_select").append(new Option(optiontext, optionvalue));
	}
}

function populate_hour_select(){
	var hours = ["12 AM","1 AM","2 AM","3 AM","4 AM","5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM"];
	$("#hour_select").empty();
	for (i=0; i<hours.length; i++){
		var optiontext = hours[i];
		var optionvalue = String(i);
		$("#hour_select").append(new Option(optiontext, optionvalue));
	}
}

function populate_minute_select(){
	$("#minute_select").empty();
	for (i=0; i<60; i++){
		var optiontext = ("0"+String(i)).slice(-2);
		var optionvalue = String(i);
		$("#minute_select").append(new Option(optiontext, optionvalue));
	}
}

function year_rangecheck(){
	var yearval = Number($("#year_numberinput").val());
	if ($("#radio1_BC > .radio1_on").hasClass("visible")){
		yearval = 1 - yearval;
	}
	yearval = Math.min(3000, yearval);
	yearval = Math.max(-1999, yearval);
	if (yearval < 1) {
		$(".radio1_on").addClass("hidden");
		$("#radio1_BC > .radio1_on").removeClass("hidden").addClass("visible");
		yearval = 1 - yearval;
	}
	document.getElementById("year_numberinput").value = yearval;
}

function dayselect_configure(){
	var y = Number($("#year_numberinput").val());
	var m = Number($("#month_select").val());
	var d = Number($("#day_select").val());
	if ($("#radio1_BC > .radio1_on").hasClass("visible")){
		y = 1 - y;
	}
	var days28 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]; 
	var days29 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
	var days30 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
	var days31 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
	var oct1582 = [1,2,3,4,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
	var days = days31;
	var thirtydaymonths = [4,6,9,11];
	if (thirtydaymonths.includes(m)) {
		days = days30;
	}
	if (m==2){
		if (leapYearQuery(y) == 1) {days = days29;}
		else {days = days28;}
	}
	if (y == 1582 && m == 10) {days = oct1582;}
	// Remove all options from day_select and append new ones
	$("#day_select").empty();
	for (i=0; i<days.length; i++){
		var optionvalue = String(days[i]);
		var optiontext = days[i];
		$("#day_select").append(new Option(optionvalue, optiontext));
	}
	// Keep old day value unless it is not present in the new month
	if (days.includes(d) == false){
		d = days[days.length - 1];
	}
	$("#day_select").val(d).selectmenu("refresh");
	// Ensure daylight savings is off for December, January, February
	if ([12,1,2].includes(m)){
		$(".radio2_on").addClass("hidden");
		$("#radio2_OFF > .radio2_on").removeClass("hidden").addClass("visible");
		$("#dst_radiospan").text(0);
	}
}

function longitude_adjust(){
	var dst = Number($("#dst_radiospan").text());
	var lon = 15 * (Number($("#timeZoneSlider").val()) - dst);
	var lonstring = Math.abs(lon) + "°" + ["W","","E"][(1 + Math.sign(lon))];
	$("#lonspan").text(lonstring);
}

