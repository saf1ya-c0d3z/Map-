//------------------------------
//--- Document ready -----------
//------------------------------
$(document).ready(function() {
  var ticktock = setInterval(set_clockhands, 10000);
  nav_button_init();
  panel_button_init();
  wheel_init();
  settings_menu_init();

  // Draw astrolabe
  mater();
  tympanum();
  star_init();
  rete();
  rule();

  // Initialize latitude slider
  $("#latitudeSlider").change(function(){
      tympanum();
      planet_advance();
      if (document.getElementById("sky_flag").innerHTML == 1){
        sky_coloration();
      }
  });

  // Ephemeris table sizing
  ephemeris_format($("#ephemerisDiv").width());
  $(window).resize(function(){
    ephemeris_format($("#ephemerisDiv").width());
  });

  // Toggle settings
  toggle_settings();

  // Ready, set, go!
  now_button_pressed();
});


//-----------------------------------
//--------- TIME FUNCTIONS ----------
//----------------------------------- 
Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

function now(){
  var rightnow = new Date(); 
  var ymdhms_utc = new Array(0,0,0,0,0,0);
  ymdhms_utc[0] = rightnow.getUTCFullYear();
  ymdhms_utc[1] = 1 + Number(rightnow.getUTCMonth());
  ymdhms_utc[2] = rightnow.getUTCDate();
  ymdhms_utc[3] = rightnow.getUTCHours();
  ymdhms_utc[4] = rightnow.getUTCMinutes();
  ymdhms_utc[5] = rightnow.getUTCSeconds();
  var tzo = rightnow.getTimezoneOffset();
  var dst = rightnow.dst() ? 1 : 0;
  var jd = jd_from_array(ymdhms_utc);
  var lon = -(tzo + 60 * Number(dst))/4;
  document.getElementById("longitude").innerHTML = lon;
  document.getElementById("daylightsaving").innerHTML = dst;
  document.getElementById("utc_offset").innerHTML = tzo;
  var ymdhms_local = new Array(0,0,0,0,0,0);
  ymdhms_local[0] = rightnow.getFullYear();
  ymdhms_local[1] = 1 + Number(rightnow.getMonth());
  ymdhms_local[2] = rightnow.getDate();
  ymdhms_local[3] = rightnow.getHours();
  ymdhms_local[4] = rightnow.getMinutes();
  ymdhms_local[5] = rightnow.getSeconds();
  var jd_local = jd_from_array(ymdhms_local);
  fullDateSet(jd_local);
  cosmic_update(jd_local);
}



function jd_from_array(ymdhms_array){
  var Y = ymdhms_array[0];
  var M = ymdhms_array[1];
  var day = ymdhms_array[2];
  var hour = ymdhms_array[3];
  var minute = ymdhms_array[4];
  var second = ymdhms_array[5];
  var D = day + hour/24 + minute/1440 + second/86400;
    var julian = false;
  if (Y <= 1582) {
        julian = true
    }
    if (Y == 1582 && (30 * M + day > 304)){
        julian = false
    }
    if (M <= 2) {
    Y = Y - 1
    M = M + 12
    }   
    A = Math.floor(Y/100)
    B = 2 - A + Math.floor(A/4)
    if (julian){
        B = 0    
    }
    return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5;
}

//--- JD to array ---
function jd_to_array(jd){
  var ymdhms = new Array(0,0,0,0,0,0);
  var Z = Math.floor(jd + .5);
  var F = jd + .5 - Z;
  var A = Z;
  if (Z >= 2299161){
    var alpha = Math.floor((Z - 1867216.25)/36524.25);
    A = Z + 1 + alpha - Math.floor(alpha/4);
  }
  var B = A + 1524;
  var C = Math.floor((B - 122.1)/365.25);
  var D = Math.floor(365.25 * C);
  var E = Math.floor((B-D)/30.6001);
  var m = E - 1;
  if (E >= 14) {
    m = E - 13;
  }
  var y = C - 4716;
  if (m <= 2) {
    y = C - 4715;
  }
  ymdhms[0] = y;
  ymdhms[1] = m;
  var dd = B - D - Math.floor(30.6001 * E) + F + 0.0000001;
  var d = Math.floor(dd);
  ymdhms[2] = d;
  var hh = 24 * (dd - d);
  var h = Math.floor(hh);
  ymdhms[3] = h;
  var mm = 60 * (hh - h);
  var m = Math.floor(mm);
  ymdhms[4] = m;
  var ss = 60 * (mm - m);
  var s = Math.floor(ss);
  ymdhms[5] = s;
  return ymdhms;
}

//--- Day of the year ---
function day_of_year(y,m,d){
  return 1 + jd_from_array([y,m,d,0,0,0]) - jd_from_array([y,1,1,0,0,0]);  
}

//--- Leap year query ---
function leapYearQuery(year){
  if(year<=1582){
    var leapYearOffset = Number(year % 4 == 0);
    }
  else{
    var leapYearOffset = Number(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
    }
  if(year == 1582){var leapYearOffset = -10};        
  return leapYearOffset;
}


//--- Greenwich Mean Sidereal Time ---
function GMST_from_jd(jd){
  var T = (jd - 2451545.0)/36525.0;
  return (280.46061837 + 360.98564736629*(jd - 2451545.0) + 0.000387933*T*T - T*T*T/38710000.0) % 360; 
}




//--- Update Text ---
function cosmic_update(jd_local){
  update_text_from_local(jd_local);
  planet_advance();
  if (document.getElementById("sky_flag").innerHTML == 1){
    sky_coloration();
  }
  rotate_rete();
}

//--- Update Text ---
function update_text_from_local(jd_local){
  document.getElementById("julian_day_local").innerHTML = jd_local;
  var ymdhms_local = jd_to_array(jd_local);
  document.getElementById("local_year").innerHTML = ymdhms_local[0];
  document.getElementById("local_month").innerHTML = ymdhms_local[1];
  document.getElementById("local_day").innerHTML = ymdhms_local[2];
  document.getElementById("local_hour").innerHTML = ymdhms_local[3];
  document.getElementById("local_minutes").innerHTML = ymdhms_local[4];
  document.getElementById("local_seconds").innerHTML = ymdhms_local[5];
  document.getElementById("century_val").innerHTML = 1 + Math.floor((ymdhms_local[0] - 1)/100);
  var leapval = leapYearQuery(ymdhms_local[0]);
  document.getElementById("leapyearval").innerHTML = leapval;
  document.getElementById("daysinyear").innerHTML = 365 + leapval;

  var utc_offset = Number(document.getElementById("utc_offset").innerHTML);
  jd = jd_local + utc_offset/1440;
  var ymdhms_utc = jd_to_array(jd);
  document.getElementById("julian_day").innerHTML = jd;
  document.getElementById("utc_year").innerHTML = ymdhms_utc[0];
  document.getElementById("utc_month").innerHTML = ymdhms_utc[1];
  document.getElementById("utc_day").innerHTML = ymdhms_utc[2];
  document.getElementById("utc_hour").innerHTML = ymdhms_utc[3];
  document.getElementById("utc_minutes").innerHTML = ymdhms_utc[4];

  var gmst = GMST_from_jd(jd);
  var lon = Number(document.getElementById("longitude").innerHTML);
  var lmst = (gmst + lon) % 360;
  document.getElementById("gmst_span").innerHTML = gmst;
  document.getElementById("lmst_span").innerHTML = lmst;

  var dayname_index = (Math.trunc(1 + jd_local + 0.5) % 7);
  var dayname_string = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayname_index];
  document.getElementById("dayname_span").innerHTML = dayname_string;
  var monthname_string = ["January","February","March","April","May","June","July","August","September","October","November","December"][ymdhms_local[1] - 1];
  document.getElementById("monthname_span").innerHTML = monthname_string;
  document.getElementById("daynum_span").innerHTML = ymdhms_local[2];
  document.getElementById("yearspan").innerHTML = ymdhms_local[0];
  document.getElementById("yearspan").innerHTML = (ymdhms_local[0] > 0) ? ymdhms_local[0] : String(1 - ymdhms_local[0]) + " BC";
  document.getElementById("hourspan").innerHTML = [12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11][ymdhms_local[3]];
  document.getElementById("minutesspan").innerHTML = ("0" + ymdhms_local[4].toString()).slice(-2);
  var ampm = ["AM","PM"][Math.floor(ymdhms_local[3]/12)];
  document.getElementById("ampm_span").innerHTML = ampm;
  var utc_sign = "+"
  if (utc_offset>0){utc_sign = "-";}
  document.getElementById("utcoffset_sign").innerHTML = utc_sign;
  document.getElementById("utcoffset_span").innerHTML = Math.trunc(Math.abs(utc_offset)/60);
  document.getElementById("juliandate_span").innerHTML = jd.toFixed(6);

}


//--- Ephemeris table formating ---
function ephemeris_format(w){
  if (w >= 615){
    $("#ephemerisDiv").css("margin-top", ".7em");
    $("#ephemerisTable td").css("font-size", "14px");
    $(".housedigit").css("font-size", "18px");
    $(".zsign_eph").css("font-size", "18px");
  }
  else if (w < 615 && w >= 525){
    $("#ephemerisDiv").css("margin-top", "1.7em");
    $("#ephemerisTable td").css("font-size", "11.5px");
    $(".housedigit").css("font-size", "14px");
    $(".zsign_eph").css("font-size", "14px");
  }
  else if (w >= 510 && w < 525){
    $("#ephemerisDiv").css("margin-top", "1.7em");
    $("#ephemerisTable td").css("font-size", "11px");
    $(".housedigit").css("font-size", "14px");
    $(".zsign_eph").css("font-size", "14px");
  }
  else if (w >= 500 && w < 510){
    $("#ephemerisDiv").css("margin-top", "1.7em");
    $("#ephemerisTable td").css("font-size", "10.5px");
    $(".housedigit").css("font-size", "14px");
    $(".zsign_eph").css("font-size", "14px");
  }
  else if (w >= 450 && w < 500){
    $("#ephemerisDiv").css("margin-top", "1.7em");
    $("#ephemerisTable td").css("font-size", "10px");
    $(".housedigit").css("font-size", "14px");
    $(".zsign_eph").css("font-size", "14px");
  }
  else{
    $("#ephemerisDiv").css("margin-top", "1.7em");
    $("#ephemerisTable td").css("font-size", (w/47).toFixed(2) + "px");
    $(".housedigit").css("font-size", (w/36).toFixed(2) + "px");
    $(".zsign_eph").css("font-size", "12px");
  }
}


//---------- Toggle Settings
function toggle_settings(){

  $("#limb-flip").prop("checked", false).flipswitch("refresh");
  $("#limb-flip").change(function(){
    var piece = document.getElementById("limb");
    var highlight_color = "rgb(180,0,0)";
    if(this.checked) {
      piece.setAttributeNS(null, "fill", highlight_color);
      document.getElementById("limb_markings_group").setAttributeNS(null, "stroke", "white");
      document.getElementById("limbtext").setAttributeNS(null, "fill", "white");
      $(".custom-flipswitch-limb").css("background-color", highlight_color);
      $(".custom-flipswitch-limb").css("color", "white");
    }
    else {
      piece.setAttributeNS(null, "fill", "url(#brass)");
      document.getElementById("limb_markings_group").setAttributeNS(null, "stroke", "rgb(105,85,60)");
      document.getElementById("limbtext").setAttributeNS(null, "fill", "rgb(105,85,60)");
      $(".custom-flipswitch-limb").css("background-color", "black");
      $(".custom-flipswitch-limb").css("color", "white");
    }
  }); 

  $("#index-flip").prop("checked", true).flipswitch("refresh");
  $(".custom-flipswitch-index").css("background-color", "rgb(235,215,110)");
  $("#index-flip").change(function(){
    var piece = document.getElementById("ruleGroup");
    var highlight_color = "rgb(235,215,110)";
    if(this.checked) {
      piece.setAttributeNS(null, "visibility", "visible");
      $(".custom-flipswitch-index").css("background-color", highlight_color);
      $(".custom-flipswitch-index").css("color", "white");
      planet_advance();
    }
    else {
      piece.setAttributeNS(null, "visibility", "hidden");
      $(".custom-flipswitch-index").css("background-color", "black");
      $(".custom-flipswitch-index").css("color", "white");
    }
  }); 

  $("#sunpin-flip").prop("checked", true).flipswitch("refresh");
  var sunpin_highlight_color = "rgb(235,215,110)";
  $(".custom-flipswitch-sunpin").css("background-color", "white");
  $(".custom-flipswitch-sunpin").css("color", sunpin_highlight_color);
  $("#sunpin-flip").change(function(){
    if(this.checked) {
      $(".custom-flipswitch-sunpin").css("background-color", "white");
      $(".custom-flipswitch-sunpin").css("color", sunpin_highlight_color);
    }
    else {
      $(".custom-flipswitch-sunpin").css("background-color", "black");
      $(".custom-flipswitch-sunpin").css("color", "white");
    }
  }); 

  $("#rete-flip").prop("checked", true).flipswitch("refresh");
  $(".custom-flipswitch-rete").css("background-color", "rgb(235,215,110)");
  $("#rete-flip").change(function(){
    var piece = document.getElementById("retebrassGroup");
    var highlight_color = "rgb(235,215,110)";
    if(this.checked) {
      piece.setAttributeNS(null, "visibility", "visible");
      $(".custom-flipswitch-rete").css("background-color", highlight_color);
      $(".custom-flipswitch-rete").css("color", "white");
    }
    else {
      piece.setAttributeNS(null, "visibility", "hidden");
      $(".custom-flipswitch-rete").css("background-color", "black");
      $(".custom-flipswitch-rete").css("color", "white");
    }
  }); 

  $("#ecliptic-flip").prop("checked", false).flipswitch("refresh");
  $("#ecliptic-flip").change(function(){
    var piece = document.getElementById("eclipticGroup");
    var highlight_color = "rgb(0,0,180)";
    if(this.checked) {
      piece.setAttributeNS(null, "fill", highlight_color);
      document.getElementById("eclipticMarks").setAttributeNS(null, "stroke", "white");
      document.getElementById("ecliptic_textgroup").setAttributeNS(null, "fill", "white");
      $(".custom-flipswitch-ecliptic").css("background-color", highlight_color);
      $(".custom-flipswitch-ecliptic").css("color", "white");
    }
    else {
      piece.setAttributeNS(null, "fill", "rgb(235,215,110)");
      document.getElementById("eclipticMarks").setAttributeNS(null, "stroke", "rgb(105,85,60)");
      document.getElementById("ecliptic_textgroup").setAttributeNS(null, "fill", "rgb(105,85,60)");
      $(".custom-flipswitch-ecliptic").css("background-color", "black");
      $(".custom-flipswitch-ecliptic").css("color", "white");
    }
  }); 

  $("#tympanum-flip").prop("checked", false).flipswitch("refresh");
  $("#tympanum-flip").change(function(){
    var piece = document.getElementById("mater");
    var highlight_color = "rgb(255,255,255)";
    if(this.checked) {
      $("#sky-flip").prop("checked", false).flipswitch("refresh");
      piece.setAttributeNS(null, "fill", highlight_color); 
      $(".custom-flipswitch-tympanum").css("background-color", highlight_color);
      $(".custom-flipswitch-tympanum").css("color", "black");
    }
    else {
      piece.setAttributeNS(null, "fill", "url(#brass)");     
      $(".custom-flipswitch-tympanum").css("background-color", "black");
      $(".custom-flipswitch-tympanum").css("color", "white");
    }
  });

  $("#capricorn-flip").prop("checked", false).flipswitch("refresh");
  $("#capricorn-flip").change(function(){
    var piece = document.getElementById("capricorn_highlight");
    var highlight_color = "rgb(150,80,30)";
    if(this.checked) {
      piece.setAttributeNS(null, "stroke", highlight_color);
      $(".custom-flipswitch-capricorn").css("background-color", highlight_color);
      $(".custom-flipswitch-capricorn").css("color", "white");
    }
    else {
      piece.setAttributeNS(null, "stroke", "none");
      $(".custom-flipswitch-capricorn").css("background-color", "black");
      $(".custom-flipswitch-capricorn").css("color", "white");
    }
  }); 

  $("#equator-flip").prop("checked", false).flipswitch("refresh");
  $("#equator-flip").change(function(){
    var piece = document.getElementById("equator_highlight");
    var highlight_color = "rgb(0,180,80)";
    if(this.checked) {
      piece.setAttributeNS(null, "stroke", highlight_color);
      $(".custom-flipswitch-equator").css("background-color", highlight_color);
      $(".custom-flipswitch-equator").css("color", "white");
    }
    else {
      piece.setAttributeNS(null, "stroke", "none");
      $(".custom-flipswitch-equator").css("background-color", "black");
      $(".custom-flipswitch-equator").css("color", "white");
    }
  });

  $("#cancer-flip").prop("checked", false).flipswitch("refresh");
  $("#cancer-flip").change(function(){
    var piece = document.getElementById("cancer_highlight");
    var highlight_color = "rgb(255, 100, 200)";
    if(this.checked) {
      piece.setAttributeNS(null, "stroke", highlight_color);
      $(".custom-flipswitch-cancer").css("background-color", highlight_color);
      $(".custom-flipswitch-cancer").css("color", "white");
    }
    else {
      piece.setAttributeNS(null, "stroke", "none");
      $(".custom-flipswitch-cancer").css("background-color", "black");
      $(".custom-flipswitch-cancer").css("color", "white");
    }
  });

  $("#azimuth-flip").prop("checked", false).flipswitch("refresh");
  $("#azimuth-flip").change(function(){ 
    var highlight_color = "rgb(50,200,200)";
    if(this.checked) {
      $("#azimuthGroup").addClass("azimuthtoggle");
      $(".custom-flipswitch-azimuth").css("background-color", highlight_color);
      $(".custom-flipswitch-azimuth").css("color", "white");
    }
    else {
      $("#azimuthGroup").removeClass("azimuthtoggle");
      $(".custom-flipswitch-azimuth").css("background-color", "black");
      $(".custom-flipswitch-azimuth").css("color", "white");
    }
  });  

  $("#elevation-flip").prop("checked", false).flipswitch("refresh");
  $("#elevation-flip").change(function(){ 
    var highlight_color = "rgb(255,140,0)";
    if(this.checked) {
      $("#altitudeGroup").addClass("elevationtoggle");
      $("#horizon").addClass("elevationtoggle");
      $(".custom-flipswitch-elevation").css("background-color", highlight_color);
      $(".custom-flipswitch-elevation").css("color", "white");
    }
    else {
      $("#altitudeGroup").removeClass("elevationtoggle");
      $("#horizon").removeClass("elevationtoggle");
      $(".custom-flipswitch-elevation").css("background-color", "black");
      $(".custom-flipswitch-elevation").css("color", "white");
    }
  }); 
  
  $("#sky-flip").prop("checked", true).flipswitch("refresh");
  $(".custom-flipswitch-sky").css("background-color", "rgb(100,180,230)");
  $("#sky-flip").change(function(){
    var highlight_color = "rgb(100,180,230)";
    if(this.checked) {
      restore_sky_coloration();
      $(".custom-flipswitch-sky").css("background-color", highlight_color);
      $(".custom-flipswitch-sky").css("color", "white");
    }
    else { 
      remove_sky_coloration(); 
      $(".custom-flipswitch-sky").css("background-color", "black");
      $(".custom-flipswitch-sky").css("color", "white");
    }
  });

  $("#sun-flip").prop("checked", true).flipswitch("refresh");
  var sun_highlight_color = "rgb(250, 200, 0)";
  $(".custom-flipswitch-sun").css("background-color", sun_highlight_color);
  $("#sun-flip").change(function(){
    var piece = document.getElementById("sunGroup");
    if(this.checked) {
      piece.setAttributeNS(null, "visibility", "visible");
      $(".custom-flipswitch-sun").css("background-color", sun_highlight_color);
      $(".custom-flipswitch-sun").css("color", "white");
    }
    else {
      piece.setAttributeNS(null, "visibility", "hidden");
      $(".custom-flipswitch-sun").css("background-color", "black");
      $(".custom-flipswitch-sun").css("color", "white");
    }
  }); 
  
  $("#moon-flip").prop("checked", true).flipswitch("refresh");
  var moon_highlight_color = "rgb(0,0,0)";
  $(".custom-flipswitch-moon").css("background-color", moon_highlight_color);
  $("#moon-flip").change(function(){
    var piece = document.getElementById("moonGroup");
    if(this.checked) {
      piece.setAttributeNS(null, "visibility", "visible");
      $(".custom-flipswitch-moon").css("background-color", moon_highlight_color);
      $(".custom-flipswitch-moon").css("color", "white");
    }
    else {
      piece.setAttributeNS(null, "visibility", "hidden");
      $(".custom-flipswitch-moon").css("background-color", "black");
      $(".custom-flipswitch-moon").css("color", "white");
    }
  }); 
  
  $("#planets-flip").prop("checked", true).flipswitch("refresh");
  var planets_highlight_color = "rgb(130,130,160)";
  $(".custom-flipswitch-planets").css("background-color", planets_highlight_color);
  $("#planets-flip").change(function(){
    var sat = document.getElementById("saturnGroup");
    var jup = document.getElementById("jupiterGroup");
    var mar = document.getElementById("marsGroup");
    var ven = document.getElementById("venusGroup");
    var mer = document.getElementById("mercuryGroup");
    if(this.checked) {
      sat.setAttributeNS(null, "visibility", "visible");
      jup.setAttributeNS(null, "visibility", "visible");
      mar.setAttributeNS(null, "visibility", "visible");
      ven.setAttributeNS(null, "visibility", "visible");
      mer.setAttributeNS(null, "visibility", "visible");
      $(".custom-flipswitch-planets").css("background-color", planets_highlight_color);
      $(".custom-flipswitch-planets").css("color", "white");
    }
    else {
      sat.setAttributeNS(null, "visibility", "hidden");
      jup.setAttributeNS(null, "visibility", "hidden");
      mar.setAttributeNS(null, "visibility", "hidden");
      ven.setAttributeNS(null, "visibility", "hidden");
      mer.setAttributeNS(null, "visibility", "hidden");
      $(".custom-flipswitch-planets").css("background-color", "black");
      $(".custom-flipswitch-planets").css("color", "white");
    }
  });  

  $("#house-flip").prop("checked", false).flipswitch("refresh");
  $("#house-flip").change(function(){ 
    var highlight_color = "rgb(150,0,200)";
    if(this.checked) {
      $("#cusps_above_horizon").addClass("housetoggle");
      $("#cusps_below_horizon").addClass("housetoggle");
      $("#horizon").addClass("housetoggle");
      $("#south_in").addClass("housetoggle");
      $("#north_in").addClass("housetoggle");
      $("#south_out").addClass("housetoggle");
      $("#north_out").addClass("housetoggle");
      $("#lowercusps_textgroup").addClass("housetexttoggle");
      $("#uppercusps_textgroup_inner").addClass("housetexttoggle");
      $(".custom-flipswitch-houses").css("background-color", highlight_color);
      $(".custom-flipswitch-houses").css("color", "white");
    }
    else {
      $("#cusps_above_horizon").removeClass("housetoggle");
      $("#cusps_below_horizon").removeClass("housetoggle");
      $("#horizon").removeClass("housetoggle");
      $("#south_in").removeClass("housetoggle");
      $("#north_in").removeClass("housetoggle");
      $("#south_out").removeClass("housetoggle");
      $("#north_out").removeClass("housetoggle");
      $("#lowercusps_textgroup").removeClass("housetexttoggle");
      $("#uppercusps_textgroup_inner").removeClass("housetexttoggle");
      $(".custom-flipswitch-houses").css("background-color", "black");
      $(".custom-flipswitch-houses").css("color", "white");
    }
  });

  $("#regiomontanus-flip").prop("checked", false).flipswitch("refresh");
  $("#regiomontanus-flip").change(function(){
    var piece = document.getElementById("regiomontanus_group");
    var highlight_color = "rgb(0,120,0)";
    if(this.checked) {
      piece.setAttributeNS(null, "stroke", highlight_color);
      $(".custom-flipswitch-regiomontanus").css("background-color", highlight_color);
      $(".custom-flipswitch-regiomontanus").css("color", "white");
    }
    else {
      piece.setAttributeNS(null, "stroke", "none");
      $(".custom-flipswitch-regiomontanus").css("background-color", "black");
      $(".custom-flipswitch-regiomontanus").css("color", "white");
    }
  }); 

  $("#alchabitius-flip").prop("checked", false).flipswitch("refresh");
  $("#alchabitius-flip").change(function(){
    var piece = document.getElementById("alchabitius_group");
    var highlight_color = "rgb(240,30,50)";
    if(this.checked) {
      piece.setAttributeNS(null, "stroke", highlight_color);
      $(".custom-flipswitch-alchabitius").css("background-color", highlight_color);
      $(".custom-flipswitch-alchabitius").css("color", "white");
    }
    else {
      piece.setAttributeNS(null, "stroke", "none");
      $(".custom-flipswitch-alchabitius").css("background-color", "black");
      $(".custom-flipswitch-alchabitius").css("color", "white");
    }
  }); 

  $("#nocturnal-flip").prop("checked", false).flipswitch("refresh");
  $("#nocturnal-flip").change(function(){
    var piece = document.getElementById("nocturnalGroup");
    var highlight_color = "rgb(105,85,60)";
    var highlight_color = "rgb(135,105,90)";
    if(this.checked) {
      piece.setAttributeNS(null, "visibility", "visible");
      $(".custom-flipswitch-nocturnal").css("background-color", highlight_color);
      $(".custom-flipswitch-nocturnal").css("color", "white");
    }
    else {
      piece.setAttributeNS(null, "visibility", "hidden");
      $(".custom-flipswitch-nocturnal").css("background-color", "black");
      $(".custom-flipswitch-nocturnal").css("color", "white");
    }
  }); 

  //---------- Toggle Presets
  $("#toggle_all").on("click", function(){
    $("#limb-flip").prop("checked", true).flipswitch("refresh");
    $("#index-flip").prop("checked", false).flipswitch("refresh");
    $("#rete-flip").prop("checked", false).flipswitch("refresh");
    $("#ecliptic-flip").prop("checked", true).flipswitch("refresh");
    $("#planets-flip").prop("checked", false).flipswitch("refresh");
    $("#sky-flip").prop("checked", false).flipswitch("refresh");
    $("#tympanum-flip").prop("checked", true).flipswitch("refresh");
    $("#capricorn-flip").prop("checked", true).flipswitch("refresh");
    $("#equator-flip").prop("checked", true).flipswitch("refresh");
    $("#cancer-flip").prop("checked", true).flipswitch("refresh");
    $("#azimuth-flip").prop("checked", true).flipswitch("refresh");
    $("#elevation-flip").prop("checked", true).flipswitch("refresh");
    $("#house-flip").prop("checked", true).flipswitch("refresh");
  });

  $("#instrument_only").on("click", function(){
    toggle_settings(); 
    $("#sky-flip").prop("checked", false).flipswitch("refresh");
    $("#sun-flip").prop("checked", false).flipswitch("refresh");
    $("#moon-flip").prop("checked", false).flipswitch("refresh");
    $("#planets-flip").prop("checked", false).flipswitch("refresh");    
  });

  $("#toggle_reset").on("click", function(){
    toggle_settings(); 
  });

}
