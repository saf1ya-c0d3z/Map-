//------------------------------
//--- Global parameters --------
//------------------------------
// Instantiate planet objects
var moon = new Planet('Moon', 1);
var mercury = new Planet('Mercury', 2);
var venus = new Planet('Venus', 3);
var sun = new Planet('Sun', 4);
var mars = new Planet('Mars', 5);
var jupiter = new Planet('Jupiter', 6);
var saturn = new Planet('Jupiter', 7);

var helioXYZmatrix = [];
var geoXYZmatrix = [];
var geoLBRmatrix = [];


//-----------------------------------
//--- Planet advance ----------------
//-----------------------------------
function planet_advance() {
  var jdn = Number(document.getElementById("julian_day").innerHTML);
  var t = (jdn - 2451545.0)/36525; // The ELP 2000-85 calculations use 't', the Julian centuries from J2000.0 (Chapront p. 8)
  var tau = (jdn - 2451545.0)/365250; // The VSOP87 calculations use 'tau', the Julian millennia from J2000.0 (Meeus p. 218)
  var U  = tau/10; // U is the number of Julian decamillennia from J2000.0 (Meeus p. 147)
  var lmst = Number(document.getElementById("lmst_span").innerHTML);

  //----- Compute the obliquity of the ecliptic
  var epsilon_deg = 23 + (26/60) + (21.448/3600) + (1/3600)*(-4680.93*U 
    - 1.55*Math.pow(U,2)
    + 1999.25*Math.pow(U,3)
    - 51.38*Math.pow(U,4)
    - 249.67*Math.pow(U,5)
    - 39.05*Math.pow(U,6)
    + 7.12*Math.pow(U,7)
    + 27.87*Math.pow(U,8)
    + 5.79*Math.pow(U,9)
    + 2.45*Math.pow(U,10));
  e0 = Math.PI*epsilon_deg/180; // Note: e0 is global (it is used in planet methods)

  //----- Compute the heliocentric coordinates of the planets
  helioXYZmatrix[0] = earth_XYZ(tau); 
  helioXYZmatrix[1] = [0,0,0]; // moon
  helioXYZmatrix[2] = mercury_XYZ(tau); 
  helioXYZmatrix[3] = venus_XYZ(tau);
  helioXYZmatrix[4] = [0,0,0]; // sun
  helioXYZmatrix[5] = mars_XYZ(tau);
  helioXYZmatrix[6] = jupiter_XYZ(tau);
  helioXYZmatrix[7] = saturn_XYZ(tau);

  //----- Compute the geocentric xyz coordinates of the planets
  geoXYZmatrix[0] = [0,0,0]; // earth
  geoXYZmatrix[1] = [0,0,0]; // moon
  for (var j = 2; j <= 7; j ++){
    geoXYZmatrix[j] = [helioXYZmatrix[j][0]-helioXYZmatrix[0][0], helioXYZmatrix[j][1]-helioXYZmatrix[0][1], helioXYZmatrix[j][2]-helioXYZmatrix[0][2]];
  }

  //----- Compute the geocentric lambda-beta-R coordinates of the planets
  geoLBRmatrix[0] = [0,0,0]; // earth
  geoLBRmatrix[1] = moon_VUR(t);  // moon
  for (var j = 2; j <= 7; j ++){
    geoLBRmatrix[j] = [Math.atan2(geoXYZmatrix[j][1],geoXYZmatrix[j][0]),
                      Math.atan2(geoXYZmatrix[j][2], Math.sqrt(Math.pow(geoXYZmatrix[j][0],2) + Math.pow(geoXYZmatrix[j][1],2))),
                      Math.sqrt(Math.pow(geoXYZmatrix[j][0],2) + Math.pow(geoXYZmatrix[j][1],2) + Math.pow(geoXYZmatrix[j][2],2))];
  }

  //------------------------------
  //----- MOON -------------------
  //------------------------------
  var moonGroup = document.getElementById("moonGroup");
  var moonface = document.getElementById("moonface");
  var rmoon = Number(document.getElementById("Moon").getAttribute("r"));
  var bx = rmoon*(1 - 2*moon.illuminated_fraction()); // x-value of the terminator ellipse along the moon's x-axis
  var chi = -90 + (180/Math.PI)*moon.limb_angle();
  var cx2 = (bx*bx - rmoon*rmoon)/(2*bx); // center of the circle that connects {(0,rmoon), (bx,0), (0,-rmoon)}
  var r2 = Math.sqrt(cx2*cx2 + rmoon*rmoon); // radius of the circle that connects {(0,rmoon), (bx,0), (0,-rmoon)}
  var m = [0,rmoon];
  var a1 = [rmoon,rmoon,0,0,0,0,-rmoon];
  if (bx > 0){
    var a2 = [r2,r2,0,0,1,0,rmoon];
  }
  else {
   var a2 = [r2,r2,0,0,0,0,rmoon]; 
  }
  var d = "M"+m+"A"+a1+"A"+a2+"Z";
  moonface.setAttributeNS(null, "d", d);
  var phi2sun = (180/Math.PI) * Math.atan2(sun.astrolabe_y() - moon.astrolabe_y(), sun.astrolabe_x() - moon.astrolabe_x());
  var transform_string = "translate(" + moon.astrolabe_x() + "," + moon.astrolabe_y().toFixed(4) +")";
  transform_string += " rotate(" + phi2sun.toFixed(4) + ")";
  moonGroup.setAttributeNS(null, "transform", transform_string);

  var eph = moon.ephemeris();
  document.getElementById("moonAlpha").innerHTML = eph[0];
  document.getElementById("moonDelta").innerHTML = eph[1];
  document.getElementById("moonLambdaSign").innerHTML = eph[2];
  document.getElementById("moonLambda").innerHTML = eph[3];
  document.getElementById("moonBeta").innerHTML = eph[4];
  document.getElementById("moonAZ").innerHTML = eph[5];
  document.getElementById("moonAL").innerHTML = eph[6];
  document.getElementById("moonHouse").innerHTML = eph[7];
  document.getElementById("moonHouseVal").innerHTML = eph[8]; 

  //------------------------------
  //----- SUN --------------------
  //------------------------------
  var sunGroup = document.getElementById("sunGroup");
  var sunTranString = "translate(" + sun.astrolabe_x() + "," + sun.astrolabe_y() + ")";
  sunGroup.setAttributeNS(null, "transform",sunTranString);

  var eph = sun.ephemeris();  
  document.getElementById("sunAlpha").innerHTML = eph[0];
  document.getElementById("sunDelta").innerHTML = eph[1];
  document.getElementById("sunLambdaSign").innerHTML = eph[2];
  document.getElementById("sunLambda").innerHTML = eph[3];
  //document.getElementById("sunBeta").innerHTML = eph[4];
  document.getElementById("sunAZ").innerHTML = eph[5];
  document.getElementById("sunAL").innerHTML = eph[6];
  document.getElementById("sunHouse").innerHTML = eph[7];
  document.getElementById("sunHouseVal").innerHTML = eph[8];

  // Rule (index)
  if(Number(document.getElementById("sunpin_span").innerHTML) == 1) {
    var ruleGroup = document.getElementById("ruleGroup");
    var solarphi = 270 - lmst + (180/Math.PI) * Math.atan2(sun.astrolabe_y(), sun.astrolabe_x());
    var ruleGroup_transform_string = "rotate(" + solarphi.toFixed(4) + ")";
    ruleGroup.setAttributeNS(null, "transform", ruleGroup_transform_string); 
  }

  //------------------------------
  //----- MERCURY ----------------
  //------------------------------
  var mercuryGroup = document.getElementById("mercuryGroup");
  var phi2sun = (180/Math.PI) * Math.atan2(sun.astrolabe_y() - mercury.astrolabe_y(), sun.astrolabe_x() - mercury.astrolabe_x());
  var transform_string = "translate(" + mercury.astrolabe_x().toFixed(4) + "," + mercury.astrolabe_y().toFixed(4) +")";
  transform_string += " rotate(" + phi2sun.toFixed(4) + ")";
  mercuryGroup.setAttributeNS(null, "transform", transform_string);
  var mercurytext = document.getElementById("mercurytext");
  var transform_string = "scale(1 -1) rotate(" + (phi2sun - lmst + 270).toFixed(4) + ")";
  mercurytext.setAttributeNS(null, "transform", transform_string);

  var eph = mercury.ephemeris();
  document.getElementById("mercuryAlpha").innerHTML = eph[0];
  document.getElementById("mercuryDelta").innerHTML = eph[1];
  document.getElementById("mercuryLambdaSign").innerHTML = eph[2];
  document.getElementById("mercuryLambda").innerHTML = eph[3];
  document.getElementById("mercuryBeta").innerHTML = eph[4];
  document.getElementById("mercuryAZ").innerHTML = eph[5];
  document.getElementById("mercuryAL").innerHTML = eph[6];
  document.getElementById("mercuryHouse").innerHTML = eph[7];
  document.getElementById("mercuryHouseVal").innerHTML = eph[8];

  //------------------------------
  //----- VENUS ------------------
  //------------------------------
  var venusGroup = document.getElementById("venusGroup");
  var phi2sun = (180/Math.PI) * Math.atan2(sun.astrolabe_y() - venus.astrolabe_y(), sun.astrolabe_x() - venus.astrolabe_x());
  var transform_string = "translate(" + venus.astrolabe_x().toFixed(4) + "," + venus.astrolabe_y().toFixed(4) +")";
  transform_string += " rotate(" + phi2sun.toFixed(4) + ")";
  venusGroup.setAttributeNS(null, "transform", transform_string);
  var venustext = document.getElementById("venustext");
  var transform_string = "scale(1 -1) rotate(" + (phi2sun - lmst + 270).toFixed(4) + ")";
  venustext.setAttributeNS(null, "transform", transform_string);

  var eph = venus.ephemeris();
  document.getElementById("venusAlpha").innerHTML = eph[0];
  document.getElementById("venusDelta").innerHTML = eph[1];
  document.getElementById("venusLambdaSign").innerHTML = eph[2];
  document.getElementById("venusLambda").innerHTML = eph[3];
  document.getElementById("venusBeta").innerHTML = eph[4];
  document.getElementById("venusAZ").innerHTML = eph[5];
  document.getElementById("venusAL").innerHTML = eph[6];
  document.getElementById("venusHouse").innerHTML = eph[7];
  document.getElementById("venusHouseVal").innerHTML = eph[8];

  //------------------------------
  //----- MARS ----------------
  //------------------------------
  var marsGroup = document.getElementById("marsGroup");
  var phi2sun = (180/Math.PI) * Math.atan2(sun.astrolabe_y() - mars.astrolabe_y(), sun.astrolabe_x() - mars.astrolabe_x());
  var transform_string = "translate(" + mars.astrolabe_x().toFixed(4) + "," + mars.astrolabe_y().toFixed(4) +")";
  transform_string += " rotate(" + phi2sun.toFixed(4) + ")";
  marsGroup.setAttributeNS(null, "transform", transform_string);
  var marstext = document.getElementById("marstext");
  var transform_string = "scale(1 -1) rotate(" + (phi2sun - lmst + 270).toFixed(4) + ")";
  marstext.setAttributeNS(null, "transform", transform_string);

  var eph = mars.ephemeris();
  document.getElementById("marsAlpha").innerHTML = eph[0];
  document.getElementById("marsDelta").innerHTML = eph[1];
  document.getElementById("marsLambdaSign").innerHTML = eph[2];
  document.getElementById("marsLambda").innerHTML = eph[3];
  document.getElementById("marsBeta").innerHTML = eph[4];
  document.getElementById("marsAZ").innerHTML = eph[5];
  document.getElementById("marsAL").innerHTML = eph[6];
  document.getElementById("marsHouse").innerHTML = eph[7];
  document.getElementById("marsHouseVal").innerHTML = eph[8];

  //------------------------------
  //----- JUPITER ----------------
  //------------------------------
  var jupiterGroup = document.getElementById("jupiterGroup");
  var phi2sun = (180/Math.PI) * Math.atan2(sun.astrolabe_y() - jupiter.astrolabe_y(), sun.astrolabe_x() - jupiter.astrolabe_x());
  var transform_string = "translate(" + jupiter.astrolabe_x().toFixed(4) + "," + jupiter.astrolabe_y().toFixed(4) +")";
  transform_string += " rotate(" + phi2sun.toFixed(4) + ")";
  jupiterGroup.setAttributeNS(null, "transform", transform_string);
  var jupitertext = document.getElementById("jupitertext");
  var transform_string = "scale(1 -1) rotate(" + (phi2sun - lmst + 270).toFixed(4) + ")";
  jupitertext.setAttributeNS(null, "transform", transform_string);

  var eph = jupiter.ephemeris();
  document.getElementById("jupiterAlpha").innerHTML = eph[0];
  document.getElementById("jupiterDelta").innerHTML = eph[1];
  document.getElementById("jupiterLambdaSign").innerHTML = eph[2];
  document.getElementById("jupiterLambda").innerHTML = eph[3];
  document.getElementById("jupiterBeta").innerHTML = eph[4];
  document.getElementById("jupiterAZ").innerHTML = eph[5];
  document.getElementById("jupiterAL").innerHTML = eph[6];
  document.getElementById("jupiterHouse").innerHTML = eph[7];
  document.getElementById("jupiterHouseVal").innerHTML = eph[8];

  //------------------------------
  //----- SATURN -----------------
  //------------------------------
  var saturnGroup = document.getElementById("saturnGroup");
  var phi2sun = (180/Math.PI) * Math.atan2(sun.astrolabe_y() - saturn.astrolabe_y(), sun.astrolabe_x() - saturn.astrolabe_x());
  var transform_string = "translate(" + saturn.astrolabe_x().toFixed(4) + "," + saturn.astrolabe_y().toFixed(4) +")";
  transform_string += " rotate(" + phi2sun.toFixed(4) + ")";
  saturnGroup.setAttributeNS(null, "transform", transform_string);
  var saturntext = document.getElementById("saturntext");
  var transform_string = "scale(1 -1) rotate(" + (phi2sun - lmst + 270).toFixed(4) + ")";
  saturntext.setAttributeNS(null, "transform", transform_string);

  var eph = saturn.ephemeris();
  document.getElementById("saturnAlpha").innerHTML = eph[0];
  document.getElementById("saturnDelta").innerHTML = eph[1];
  document.getElementById("saturnLambdaSign").innerHTML = eph[2];
  document.getElementById("saturnLambda").innerHTML = eph[3];
  document.getElementById("saturnBeta").innerHTML = eph[4];
  document.getElementById("saturnAZ").innerHTML = eph[5];
  document.getElementById("saturnAL").innerHTML = eph[6];
  document.getElementById("saturnHouse").innerHTML = eph[7];
  document.getElementById("saturnHouseVal").innerHTML = eph[8];

  //------------------------------
  //----- MIDHEAVEN --------------
  //------------------------------
  var lmst_rad = (Math.PI/180)*lmst;
  var mc_delta = Math.atan(Math.tan(e0)*Math.sin(lmst_rad));
  var mc_deg = (360 + 90 - (180/Math.PI)*Math.atan2(Math.cos(lmst_rad), Math.sin(lmst_rad)*Math.cos(e0) + Math.tan(mc_delta)*Math.sin(e0))) % 360;
  var mc_rad = (Math.PI/180) * mc_deg;
  document.getElementById("mc_span").innerHTML = mc_deg;

  //------------------------------
  //----- ASCENDANT --------------
  //------------------------------
  var lat_rad = (Math.PI/180)*$("#latitudeSlider").val();
  var asc_deg = (180 + (180/Math.PI)*Math.atan2(-Math.cos(lmst_rad), Math.sin(e0)*Math.tan(lat_rad) + Math.cos(e0)*Math.sin(lmst_rad))) % 360;
  var asc_rad = (Math.PI/180) * asc_deg;
  var asc_alpha = Math.atan2(Math.sin(asc_rad)*Math.cos(e0), Math.cos(asc_rad));
  var asc_eq = (720 + lmst - (180/Math.PI) * asc_alpha) % 360;
  if (asc_eq < 180){
    asc_deg = (asc_deg + 180) % 360; 
    asc_rad = (Math.PI/180) * asc_deg;
    asc_alpha = Math.atan2(Math.sin(asc_rad)*Math.cos(e0), Math.cos(asc_rad));
  }
  document.getElementById("asc_span").innerHTML = asc_deg;
  var alpha_deg = (360 + 180*asc_alpha/Math.PI) % 360;
  var alpha_hour = Math.floor(alpha_deg/15);
  var alpha_minute = '0' + (Math.floor(4*(alpha_deg % 15))).toString();
  var alpha_string = alpha_hour.toString() + '<sup>h </sup>' + alpha_minute.slice(-2) + '<sup>m</sup>';  
  var asc_delta = Math.asin(Math.sin(e0)*Math.sin(asc_rad));
  var delta_deg = 180*asc_delta/Math.PI;
  var delta_string = delta_deg.toFixed(1)+"°";
  var zodiac_symbols = '\u2648\u2649\u264A\u264B\u264C\u264D\u264E\u264F\u2650\u2651\u2652\u2653';
  var zindex = Math.floor(asc_deg/30);
  var zsign = zodiac_symbols.slice(zindex, zindex + 1) + '\uFE0E';
  var zdeg = Math.floor(asc_deg - 30*zindex);
  var zmin = '0' + (Math.floor(60*(asc_deg % 1))).toString();
  var asc_part_string = zdeg + "°" + zmin.slice(-2) + "'";
  var H_asc = lmst_rad - asc_alpha;
  var asc_az = Math.atan2(Math.sin(H_asc), Math.cos(H_asc)*Math.sin(lat_rad) - Math.tan(asc_delta)*Math.cos(lat_rad));
  var az_deg = (180 + (360 + (180*asc_az/Math.PI) % 360)) % 360;
  var az_string = az_deg.toFixed(1)+"°";
  document.getElementById("ascendantAlpha").innerHTML = alpha_string;
  document.getElementById("ascendantDelta").innerHTML = delta_string;
  document.getElementById("ascendantLambdaSign").innerHTML = zsign;
  document.getElementById("ascendantLambda").innerHTML = asc_part_string;
  document.getElementById("ascendantAZ").innerHTML = az_string;

  //------------------------------
  //----- ALCHABITIUS ------------
  //------------------------------
  var p1 = document.getElementById("alc_asc");
  var p2 = document.getElementById("alc_dus");
  var x1 = Rcapricorn * Math.cos(asc_alpha);
  var y1 = Rcapricorn * Math.sin(asc_alpha);
  var m = [0,0];
  var l1 = [-x1, -y1];
  var d1 = "M"+m+"L"+l1;
  p1.setAttribute("d", d1);
  var l2 = [x1, y1];
  var d2 = "M"+m+"L"+l2;
  p2.setAttribute("d", d2);

  p1 = document.getElementById("alc_mc");
  p2 = document.getElementById("alc_imc");
  x1 = Rcapricorn * Math.cos(lmst_rad);
  y1 = Rcapricorn * Math.sin(lmst_rad);
  l1 = [-x1,-y1];
  d1 = "M"+m+"L"+l1;
  p1.setAttribute("d", d1);
  l2 = [x1, y1];
  d2 = "M"+m+"L"+l2;
  p2.setAttribute("d", d2);

  p1 = document.getElementById("alc_12");
  p2 = document.getElementById("alc_6");
  var mc2asc = asc_deg - mc_deg;
  if (mc2asc < 0){
    mc2asc = 360 + asc_deg - mc_deg;
  }
  var alc12_deg = (mc_deg + 2*mc2asc/3) % 360;
  var alc12_alpha = (Math.PI/180)*alc12_deg;
  x1 = Rcapricorn * Math.cos(alc12_alpha);
  y1 = Rcapricorn * Math.sin(alc12_alpha);
  l1 = [-x1,-y1];
  d1 = "M"+m+"L"+l1;
  p1.setAttribute("d", d1);
  l2 = [x1, y1];
  d2 = "M"+m+"L"+l2;
  p2.setAttribute("d", d2);

  p1 = document.getElementById("alc_11");
  p2 = document.getElementById("alc_5");
  var alc11_deg = (mc_deg + mc2asc/3) % 360;
  var alc11_alpha = (Math.PI/180)*alc11_deg;
  x1 = Rcapricorn * Math.cos(alc11_alpha);
  y1 = Rcapricorn * Math.sin(alc11_alpha);
  l1 = [-x1,-y1];
  d1 = "M"+m+"L"+l1;
  p1.setAttribute("d", d1);
  l2 = [x1, y1];
  d2 = "M"+m+"L"+l2;
  p2.setAttribute("d", d2);

  p1 = document.getElementById("alc_2");
  p2 = document.getElementById("alc_8");
  var imc2asc = 180 - mc2asc;
  var alc2_deg = (180 + mc_deg - 2*imc2asc/3) % 360;
  var alc2_alpha = (Math.PI/180)*alc2_deg;
  x1 = Rcapricorn * Math.cos(alc2_alpha);
  y1 = Rcapricorn * Math.sin(alc2_alpha);
  l1 = [-x1,-y1];
  d1 = "M"+m+"L"+l1;
  p1.setAttribute("d", d1);
  l2 = [x1, y1];
  d2 = "M"+m+"L"+l2;
  p2.setAttribute("d", d2);

  p1 = document.getElementById("alc_3");
  p2 = document.getElementById("alc_9");
  var alc3_deg = (180 + mc_deg - imc2asc/3) % 360;
  var alc3_alpha = (Math.PI/180)*alc3_deg;
  x1 = Rcapricorn * Math.cos(alc3_alpha);
  y1 = Rcapricorn * Math.sin(alc3_alpha);
  l1 = [-x1,-y1];
  d1 = "M"+m+"L"+l1;
  p1.setAttribute("d", d1);
  l2 = [x1, y1];
  d2 = "M"+m+"L"+l2;
  p2.setAttribute("d", d2);


} // end planet_advance()


//-----------------------------------
//--- Sky coloration ----------------
//-----------------------------------
function sky_coloration() {
  var lmst = (Number(document.getElementById("lmst_span").innerHTML)) % 360;
  var rete_rotation_angle = 270 - lmst;  

  var sky = document.getElementById("sky");
  var skyGroup = document.getElementById("skyGroup");
  var uppercusps_textgroup = document.getElementById("uppercusps_textgroup");
  var twilightStop1 = document.getElementById("twilightStop1");
  var twilightStop2 = document.getElementById("twilightStop2");
  var starglow_stop1 = document.getElementById("starglow_stop1");
  var starglow_stop2 = document.getElementById("starglow_stop2");
  var sunAltitude = 180*sun.altitude()/Math.PI;

  var rgbday = [225,250,255];
  var rgbdusk = [135,160,255];
  var rgbdusk2 = [55,40,145];
  var rgbnight = [35,20,125];
  var starfill = "rgb(255,255,255)";
  var starstop_offset = 1.0;
  var h1 =[255,255,255,1]; // day halo color
  var h2 = [255,215,100]; // dusk halo color
  var h2a = [255,150,100]; // dusk2 halo color
  var h3 = rgbnight; // night halo color
  var g1 = [100,120,200]; // day grid color
  var g2 = [255,0,125]; // dusk grid color
  var g2a = g1;
  var g3 = g1; // night grid color
  var hr1 = 50; // day+night halo radius
  var hr2 = 75; // dusk halo radius
  var hr2a = 100; // dusk2 halo radius
  var hr3 = 75;
  var deg = [18,6,-6,-18]; // degrees of twilight

  if(sunAltitude >= deg[0]){
    skyHue = "rgb("+rgbday.toString()+")";
    haloHue = "white";
    rHalo = hr1;
    gridHue = "rgb("+g1.toString()+")";
    starfill = "rgb(255,255,255,0)";
    starstop_offset = 0;
  }
  else if(sunAltitude < deg[0] && sunAltitude >= deg[1]){
    var indx = 0;
    var d = deg[indx]-deg[indx+1]; // interval between start and stop altitudes
    var rval = rgbday[0]+Math.round((sunAltitude-deg[indx])*((rgbday[0]-rgbdusk[0])/d));
    var gval = rgbday[1]+Math.round((sunAltitude-deg[indx])*((rgbday[1]-rgbdusk[1])/d));
    var bval = rgbday[2]+Math.round((sunAltitude-deg[indx])*((rgbday[2]-rgbdusk[2])/d));
    var rgbval = [rval,gval,bval];   
    var hueString = "rgb("+rgbval.toString()+")";      
    skyHue = hueString;
    // Change Halo Stop Color
    rval = h1[0]+Math.round((sunAltitude-deg[indx])*((h1[0]-h2[0])/d));
    gval = h1[1]+Math.round((sunAltitude-deg[indx])*((h1[1]-h2[1])/d));
    bval = h1[2]+Math.round((sunAltitude-deg[indx])*((h1[2]-h2[2])/d));
    rgbval = [rval,gval,bval];  
    haloHue = "rgb("+rgbval.toString()+")";
    // Change Halo Radius
    rHalo = hr1 + (sunAltitude-deg[indx])*(hr1-hr2)/d;
    // Change Grid Color
    rval = g1[0]+Math.round((sunAltitude-deg[indx])*((g1[0]-g2[0])/d));
    gval = g1[1]+Math.round((sunAltitude-deg[indx])*((g1[1]-g2[1])/d));
    bval = g1[2]+Math.round((sunAltitude-deg[indx])*((g1[2]-g2[2])/d));
    rgbval = [rval,gval,bval];  
    gridHue = "rgb("+rgbval.toString()+")";
    starfill = "rgb(255,255,255,0)";
    starstop_offset = 0;
  }
  else if(sunAltitude < deg[1] && sunAltitude > deg[2]){
    var indx = 1;
    var d = deg[indx]-deg[indx+1]; // interval between start and stop altitudes
    var rval = rgbdusk[0]+Math.round((sunAltitude-deg[indx])*((rgbdusk[0]-rgbdusk2[0])/d));
    var gval = rgbdusk[1]+Math.round((sunAltitude-deg[indx])*((rgbdusk[1]-rgbdusk2[1])/d));
    var bval = rgbdusk[2]+Math.round((sunAltitude-deg[indx])*((rgbdusk[2]-rgbdusk2[2])/d));
    var rgbval = [rval,gval,bval];
    var hueString = "rgb("+rgbval.toString()+")";      
    skyHue = hueString;
    // Change Halo Stop Color
    rval = h2[0]+Math.round((sunAltitude-deg[indx])*((h2[0]-h2a[0])/d));
    gval = h2[1]+Math.round((sunAltitude-deg[indx])*((h2[1]-h2a[1])/d));
    bval = h2[2]+Math.round((sunAltitude-deg[indx])*((h2[2]-h2a[2])/d));
    rgbval = [rval,gval,bval];  
    haloHue = "rgb("+rgbval.toString()+")";
    // Change Halo Radius
    rHalo = hr2 + (sunAltitude-deg[indx])*(hr2-hr2a)/d;
    // Change Grid Color
    rval = g2[0]+Math.round((sunAltitude-deg[indx])*((g2[0]-g2a[0])/d));
    gval = g2[1]+Math.round((sunAltitude-deg[indx])*((g2[1]-g2a[1])/d));
    bval = g2[2]+Math.round((sunAltitude-deg[indx])*((g2[2]-g2a[2])/d));
    rgbval = [rval,gval,bval];  
    gridHue = "rgb("+rgbval.toString()+")";
    var staralpha = (deg[indx] - sunAltitude)/d;
    starfill = "rgb(255,255,255," + staralpha.toFixed(3) + ")";
    starstop_offset = staralpha.toFixed(3);
  }
  else if(sunAltitude < deg[2] && sunAltitude > deg[3]){
    var indx = 2;
    var d = deg[indx]-deg[indx+1]; // interval between start and stop altitudes
    var rval = rgbdusk2[0]+Math.round((sunAltitude-deg[indx])*((rgbdusk2[0]-rgbnight[0])/d));
    var gval = rgbdusk2[1]+Math.round((sunAltitude-deg[indx])*((rgbdusk2[1]-rgbnight[1])/d));
    var bval = rgbdusk2[2]+Math.round((sunAltitude-deg[indx])*((rgbdusk2[2]-rgbnight[2])/d));
    var rgbval = [rval,gval,bval];
    var hueString = "rgb("+rgbval.toString()+")";      
    skyHue = hueString;
    // Change Halo Stop Color
    rval = h2a[0]+Math.round((sunAltitude-deg[indx])*((h2a[0]-h3[0])/d));
    gval = h2a[1]+Math.round((sunAltitude-deg[indx])*((h2a[1]-h3[1])/d));
    bval = h2a[2]+Math.round((sunAltitude-deg[indx])*((h2a[2]-h3[2])/d));
    rgbval = [rval,gval,bval];  
    haloHue = "rgb("+rgbval.toString()+")";
    // Change Halo Radius
    rHalo = hr2a + (sunAltitude-deg[indx])*(hr2a-hr3)/d;
    // Change Grid Color
    rval = g2a[0]+Math.round((sunAltitude-deg[indx])*((g2a[0]-g3[0])/d));
    gval = g2a[1]+Math.round((sunAltitude-deg[indx])*((g2a[1]-g3[1])/d));
    bval = g2a[2]+Math.round((sunAltitude-deg[indx])*((g2a[2]-g3[2])/d));
    rgbval = [rval,gval,bval];  
    gridHue = "rgb("+rgbval.toString()+")";
    starfill = "rgb(255,255,255,1)";
    starstop_offset = 1.0;

  }
  else{
    skyHue = "rgb("+rgbnight.toString()+")";
    haloHue = skyHue;
    var rHalo = hr3;
    gridHue = "rgb("+g3.toString()+")";
    starfill = "rgb(255,255,255,1)";
    starstop_offset = 1.0;
  } 

  sky.setAttributeNS(null, "fill", skyHue); 
  skyGroup.setAttributeNS(null, "stroke", gridHue);
  uppercusps_textgroup.setAttributeNS(null, "fill", gridHue);
  twilightStop1.setAttributeNS(null, "stop-color", haloHue);
  twilightStop2.setAttributeNS(null, "stop-color", skyHue);
  starglow_stop1.setAttributeNS(null, "stop-color", starfill);
  starglow_stop2.setAttributeNS(null, "offset", starstop_offset);
  
  // Solar Halo
  var sunTheta = Math.atan2(sun.astrolabe_y(),sun.astrolabe_x()); // angular position of sun when rete is upright
  var sunPhi = sunTheta + (Math.PI/180) * rete_rotation_angle; // angular position of sun in standard (plotting) polar coordinates
  var xSun = sun.astrolabe_R()*Math.cos(sunPhi); // cartesian x-coordinate of the sun
  var ySun = sun.astrolabe_R()*Math.sin(sunPhi); // cartesian y-coordinate of the sun
  var halo = document.getElementById("halo");
  halo.setAttributeNS(null, "cx", xSun);
  halo.setAttributeNS(null, "cy", ySun);
  halo.setAttributeNS(null, "r", rHalo);
  halo.setAttributeNS(null, "fill", "url(#twilight)");

}

function remove_sky_coloration() {
  document.getElementById("sky_flag").innerHTML = 0;
  document.getElementById("sky").setAttributeNS(null, "visibility", "hidden"); 
  document.getElementById("skyGroup").setAttributeNS(null, "stroke", "rgb(105,85,60)");
  document.getElementById("starGroup").setAttributeNS(null, "visibility", "hidden"); 
  document.getElementById("halo").setAttributeNS(null, "visibility", "hidden");
  document.getElementById("uppercusps_textgroup").setAttributeNS(null, "fill", "rgb(125,105,80)");
}

function restore_sky_coloration() {
  document.getElementById("sky_flag").innerHTML = 1;
  document.getElementById("sky").setAttributeNS(null, "visibility", "visible"); 
  document.getElementById("starGroup").setAttributeNS(null, "visibility", "visible"); 
  document.getElementById("halo").setAttributeNS(null, "visibility", "visible");
  sky_coloration();
}


