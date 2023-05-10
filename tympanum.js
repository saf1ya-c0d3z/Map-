//------------------------------
//---------- Global Parameters
//------------------------------
var xmlns = "http://www.w3.org/2000/svg";
var Rlimb = 102; // outermost edge of the astrolabe
var c1r = 97; // outer-radius of the 5-degree tick marks
var c2r = 93; // outer-radius of the 1-degree tick marks
var c3r = 91; // inner-radius of the 1-degree tick marks
var Rcapricorn = 87; // tropic of capricorn
var e0 = 23.4; // mean obliquity of the ecliptic (approximate year = 2000)
var obliquity = 23.4; // mean obliquity of the ecliptic (approximate year = 2000)
var Req = Rcapricorn/Math.tan((Math.PI/180)*(90+obliquity)/2);  // equator
var Rcancer = Req*Math.tan((Math.PI/180)*(90-obliquity)/2); // tropic of cancer
var Recliptic = (Rcapricorn+Rcancer)/2; // radius of ecliptic disk
var yce = Rcapricorn-Recliptic; // center of ecliptic disk


//-----------------------------------
//---------- Mater
//-----------------------------------               
function mater(){
  
  var astrolabe_svg = document.getElementById("svg_astrolabe");

  // Mater Group 
  var mater_group = document.getElementById("mater_group");
  mater_group.setAttribute("stroke","rgb(105,85,60)");
  mater_group.setAttribute("stroke-width",0.25);
  
 // Brass Linear Gradient
  var brass = document.getElementById("brass");
  brass.setAttribute("x1", 0);
  brass.setAttribute("x2", 1.2);
  brass.setAttribute("y1", 0);
  brass.setAttribute("y2", 1);
  var stop1 = document.createElementNS(xmlns, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "rgb(135,115,10)");
  brass.appendChild(stop1);
  var stop2 = document.createElementNS(xmlns, "stop");
  stop2.setAttribute("offset", "45%");
  stop2.setAttribute("stop-color", "rgb(245,225,120)");
  brass.appendChild(stop2);
  var stop3 = document.createElementNS(xmlns, "stop");
  stop3.setAttribute("offset", "55%");
  stop3.setAttribute("stop-color", "rgb(245,225,120)");
  brass.appendChild(stop3); 
  var stop4 = document.createElementNS(xmlns, "stop");
  stop4.setAttribute("offset", "100%");
  stop4.setAttribute("stop-color", "rgb(135,115,10)");
  brass.appendChild(stop4); 

  // Twilight Radial Gradient
  var twilight = document.getElementById("twilight"); 
  var stop1 = document.createElementNS(xmlns, "stop");
  stop1.setAttributeNS(null, "id", "twilightStop1");
  stop1.setAttributeNS(null, "offset", "10%");
  stop1.setAttributeNS(null, "stop-color", "white");
  twilight.appendChild(stop1);
  var stop2 = document.createElementNS(xmlns, "stop");
  stop2.setAttributeNS(null, "id", "twilightStop2");
  stop2.setAttributeNS(null, "offset", "100%");
  stop2.setAttributeNS(null, "stop-color", "rgb(225,250,255)");
  twilight.appendChild(stop2);

  // Solar Halo
  var halo = document.getElementById("halo");
  halo.setAttribute("stroke","none"); 
  halo.setAttribute("clip-path", "url(#skyClip)");

  // Mater
  var mater = document.getElementById("mater");
  mater.setAttribute("r", Rlimb); 
  mater.setAttribute("fill", "url(#brass)");
  mater.setAttribute("stroke","none"); 

  // Limb
  var limb = document.getElementById("limb");
  var m = [0,Rlimb];
  var a1 = [Rlimb,Rlimb,0,1,1,0,-Rlimb];
  var a2 = [Rlimb,Rlimb,0,1,1,0,Rlimb];
  var l = [0,c3r];
  var a3 = [c3r,c3r,0,1,1,0,-c3r];
  var a4 = [c3r,c3r,0,1,1,0,c3r];
  var d = "M"+m+"A"+a1+"A"+a2+"M"+l+"A"+a3+"A"+a4+"Z";
  limb.setAttribute("d",d); 
  limb.setAttribute("fill", "url(#brass)");
  limb.setAttribute("fill-rule", "evenodd");
  limb.setAttribute("stroke","none"); 

  
  // Limb markings
  var limb_markings_group = document.getElementById("limb_markings_group");

  // Degree Circle 1 
  var c = document.createElementNS(xmlns, "circle");
  c.cx.baseVal.value = 0;
  c.cy.baseVal.value = 0;
  c.r.baseVal.value = c1r;
  limb_markings_group.appendChild(c);
  
  // Degree Circle 2  
  var c = document.createElementNS(xmlns, "circle");
  c.cx.baseVal.value = 0;
  c.cy.baseVal.value = 0;
  c.r.baseVal.value = c2r;
  limb_markings_group.appendChild(c);

  // Degree Circle 3  
  var c = document.createElementNS(xmlns, "circle");
  c.cx.baseVal.value = 0;
  c.cy.baseVal.value = 0;
  c.r.baseVal.value = c3r;
  mater_group.appendChild(c);

  // Tropic of Capricorn
  var tropicOfCapricorn = document.getElementById("tropicOfCapricorn");
  tropicOfCapricorn.setAttribute("r", Rcapricorn);
  var CapricornClipCircle = document.getElementById("CapricornClipCircle");
  CapricornClipCircle.setAttribute("r", Rcapricorn); 
  
  // 1 Degree Marks
  for (i=0;i<360;i++){
    var ptick = document.createElementNS(xmlns, "path");
    var pString = "M 0 "+c3r+"L 0 "+c2r;
    var pRotateString = "rotate("+i+")";
    ptick.setAttributeNS(null, "d", pString);
    ptick.setAttributeNS(null, "transform", pRotateString);
    limb_markings_group.appendChild(ptick);
  }

  // 5 Degree Marks
  for (i=0;i<360;i+=5){
    var ptick = document.createElementNS(xmlns, "path");
    var pString = "M 0 "+c2r+"L 0 "+c1r;
    var pRotateString = "rotate("+i+")";
    ptick.setAttributeNS(null, "d", pString);
    ptick.setAttributeNS(null, "transform", pRotateString);
    limb_markings_group.appendChild(ptick);
  }

 // Numerals
  var textGroup = document.createElementNS(xmlns, "g");
  astrolabe_svg.appendChild(textGroup); 
  textGroup.setAttributeNS(null,"transform","matrix(1,0,0,1,105,105)");
  textGroup.setAttributeNS(null,"font-size","4");
  textGroup.setAttributeNS(null,"font-family","georgia");
  textGroup.setAttributeNS(null, "fill", "rgb(105,85,60)");
  textGroup.setAttributeNS(null, "stroke", "none");
  textGroup.setAttributeNS(null, "text-anchor", "middle");
  textGroup.setAttributeNS(null, "id", "limbtext");
  var radius = 1.01*c1r;
  var numerals = ["I","II","III","IIII","V","VI","VII","VIII","IX","X","XI","XII"];
  numerals = numerals.concat(numerals);
  for (var indx=0;indx<24;indx++){
    var phi = 15 + 15*indx;
    var x = radius*Math.sin(phi*Math.PI/180);
    var y = -radius*Math.cos(phi*Math.PI/180);
    var rotationString = "rotate("+phi+")";
    var translationString = "translate("+x+","+y+")";
    var tx = document.createElementNS(xmlns, "text");
    tx.setAttributeNS(null,"x",0);
    tx.setAttributeNS(null,"y",0);
    tx.setAttributeNS(null, "transform", rotationString);
    var tn = document.createTextNode(numerals[indx]);
    tx.appendChild(tn);
    var textGroup2 = document.createElementNS(xmlns, "g");
    textGroup2.setAttributeNS(null, "transform", translationString);
    textGroup2.appendChild(tx);
    textGroup.appendChild(textGroup2);
  }  

  // Altitude Group
  var altitudeGroup = document.getElementById("altitudeGroup");
  for (var altitude = 5; altitude <= 85; altitude += 5){
    var altitude_id_c = "al" + altitude.toString() + "c";
    var altitude_id_p = "al" + altitude.toString() + "p";
    var c = document.createElementNS(xmlns, "circle");
    var p = document.createElementNS(xmlns, "path");
    altitudeGroup.appendChild(c);
    altitudeGroup.appendChild(p);
    c.setAttributeNS(null, "id", altitude_id_c);
    p.setAttributeNS(null, "id", altitude_id_p);
  }
  
  // Horizon (isolated for highlighting)
  var horizon_p = document.createElementNS(xmlns, "path");
  horizon_p.setAttributeNS(null, "id", "horizon");
  horizon_p.setAttributeNS(null, "stroke", "none");
  horizon_p.setAttributeNS(null, "stroke-width", "1");
  altitudeGroup.appendChild(horizon_p);

  document.getElementById("sky").setAttributeNS(null, "stroke", "none");

  // Azimuth Group
  var azimuthGroup = document.getElementById("azimuthGroup");
  for (var azimuth = 10; azimuth <= 170; azimuth += 10){
    var azimuth_id1 = "az" + azimuth.toString() + "p";
    var azimuth_id2 = "az-" + azimuth.toString() + "p";
    var p1 = document.createElementNS(xmlns, "path");
    var p2 = document.createElementNS(xmlns, "path");
    azimuthGroup.appendChild(p1);
    azimuthGroup.appendChild(p2);
    p1.setAttributeNS(null, "id", azimuth_id1);
    p2.setAttributeNS(null, "id", azimuth_id2);
  } 

  // Nocturnal Group
  var nocturnalGroup = document.getElementById("nocturnalGroup");
  for (var indx = 1; indx <= 5; indx ++){
    var noct_id1 = "noct" + (indx).toString();
    var noct_id2 = "noct" + (12-indx).toString();
    var p1 = document.createElementNS(xmlns, "path");
    var p2 = document.createElementNS(xmlns, "path");
    nocturnalGroup.appendChild(p1);
    nocturnalGroup.appendChild(p2);
    p1.setAttributeNS(null, "id", noct_id1);
    p2.setAttributeNS(null, "id", noct_id2);
  } 
  
  // Upper Cusp Numerals
  var uppercusps_textgroup = document.getElementById("uppercusps_textgroup");
  uppercusps_textgroup.setAttributeNS(null,"transform","matrix(1,0,0,-1,0,0)");
  uppercusps_textgroup.setAttributeNS(null,"font-size","4.5");
  uppercusps_textgroup.setAttributeNS(null,"font-family","georgia");
  uppercusps_textgroup.setAttributeNS(null, "stroke", "none");
  uppercusps_textgroup.setAttributeNS(null, "text-anchor", "end");
  uppercusps_textgroup.setAttributeNS(null, "text-shadow", "none");

  // Lower Cusp Numerals
  var lowercusps_textgroup = document.getElementById("lowercusps_textgroup");
  lowercusps_textgroup.setAttributeNS(null,"transform","matrix(1,0,0,-1,0,0)");
  lowercusps_textgroup.setAttributeNS(null,"font-size","4.5");
  lowercusps_textgroup.setAttributeNS(null,"font-family","georgia");
  lowercusps_textgroup.setAttributeNS(null, "stroke", "none");
  lowercusps_textgroup.setAttributeNS(null, "fill", "rgb(125,105,80)");
  lowercusps_textgroup.setAttributeNS(null, "text-anchor", "start");
  lowercusps_textgroup.setAttributeNS(null, "text-shadow", "none"); 

  // Highlight Group
  document.getElementById("capricorn_highlight").setAttribute("r", Rcapricorn);
  document.getElementById("equator_highlight").setAttribute("r", Req);  
  document.getElementById("cancer_highlight").setAttribute("r", Rcancer);

  // Alternate Cusps 1: Regiomontanus
  var regiomontanus_group = document.getElementById("regiomontanus_group");
  regiomontanus_group.setAttribute("clip-path", "url(#CapricornClip)");
  var p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", "cusp_reg_meridian");
  regiomontanus_group.appendChild(p);
  for (var eqangle = 0; eqangle <= 150; eqangle += 30){
    var cusp_reg_id_c = "cusp_reg_" + eqangle.toString() + "c";
    var cusp_reg_id_p = "cusp_reg_" + eqangle.toString() + "p";
    var c = document.createElementNS(xmlns, "circle");
    var p = document.createElementNS(xmlns, "path");
    c.setAttributeNS(null, "id", cusp_reg_id_c);
    p.setAttributeNS(null, "id", cusp_reg_id_p);
    regiomontanus_group.appendChild(c);
    regiomontanus_group.appendChild(p);
  } 

  // Alternate Cusps 2: Alchabitius
  var alchabitius_group = document.getElementById("alchabitius_group");
  var alc_cusp_names = ['asc','12','11','mc','9','8','dus','6','5','imc','3','2'];
  for (var indx = 0; indx < alc_cusp_names.length; indx ++){
    var alc_cusp_id = "alc_" + alc_cusp_names[indx];
    var p = document.createElementNS(xmlns, "path");
    p.setAttributeNS(null, "id", alc_cusp_id);
    alchabitius_group.appendChild(p);
  }



} // end mater


//-----------------------------------
//---------- Tympanum
//-----------------------------------               
function tympanum(latitude){
  var latitude = $("#latitudeSlider").val();
  var pcn = 3; // precision of numbers

// Zenith Circle (Altitude = 85)
  altitude = 85;
  var altitude_id_c = "al" + altitude.toString() + "c";
  var c = document.getElementById(altitude_id_c);
  var y1 = Req*Math.tan((Math.PI/180)*(180-altitude-latitude)/2);
  var y2 = Req*Math.tan((Math.PI/180)*(altitude-latitude)/2);
  var r_altitude = (y1-y2)/2;
  var yca = y1-r_altitude;
  c.setAttribute("cy", yca);
  c.setAttribute("r", r_altitude);
  var Rzenith = r_altitude;
  var ycz = yca;

  // Altitudes 5 through 80
  for (var altitude = 5; altitude <= 80; altitude += 5) {
    var altitude_id_c = "al" + altitude.toString() + "c";
    var altitude_id_p = "al" + altitude.toString() + "p";
    var c = document.getElementById(altitude_id_c);
    var p = document.getElementById(altitude_id_p);
    y1 = Req*Math.tan((Math.PI/180)*(180-altitude-latitude)/2);
    y2 = Req*Math.tan((Math.PI/180)*(altitude-latitude)/2);
    r_altitude = (y1-y2)/2;
    yca = y1-r_altitude;
    if (y1<=Rcapricorn){
      p.setAttribute("d", "");
      c.setAttribute("cy", yca);
      c.setAttribute("r", r_altitude);
    }
    else {
    c.setAttribute("r", 0);
    yAC = (Math.pow(Rcapricorn,2) - Math.pow(r_altitude,2) + Math.pow(yca,2))/(2*yca); // y-intersection of altitude arc and Tropic of Capricorn
    xAC = Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(yAC,2)); // x-intersection of altitude arc and Tropic of Capricorn
    m = [xAC,yAC];
    if (yAC >=yca){
      largeArcFlag = 1;
    }
    else{largeArcFlag=0};
    a = [r_altitude,r_altitude,0,largeArcFlag,0,-xAC,yAC];
    d = "M"+m+"A"+a;
    p.setAttribute("d", d);
    }
  }

  // Sky (Union of Horizon and Tropic of Capricorn)
  altitude = 0;
  if (latitude > 0){
    y1 = Req*Math.tan((Math.PI/180)*(180-altitude-latitude)/2);
    y2 = Req*Math.tan((Math.PI/180)*(altitude-latitude)/2);
    r_altitude = (y1-y2)/2;
    yca = y1-r_altitude;
    if (y1<=Rcapricorn){
      m = [0,yca-r_altitude];
      a1 = [r_altitude,r_altitude,0,1,0,0,yca+r_altitude];
      a2 = [r_altitude,r_altitude,0,1,0,0,yca-r_altitude];
      d = "M"+m+"A"+a1+"A"+a2;
      d_horizon = d;
    }
    else{
      yAC = (Math.pow(Rcapricorn,2) - Math.pow(r_altitude,2) + Math.pow(yca,2))/(2*yca); // y-intersection of altitude arc and Tropic of Capricorn
      xAC = Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(yAC,2)); // x-intersection of altitude arc and Tropic of Capricorn
      m = [xAC,yAC];
      if (yAC >= yca){
        largeArcFlag = 1;
      }
      else{largeArcFlag=0};
      a1 = [r_altitude,r_altitude,0,largeArcFlag,0,-xAC,yAC];
      a2 = [Rcapricorn,Rcapricorn,0,0,0,xAC,yAC];
      d = "M"+m+"A"+a1+"A"+a2;
      d_horizon = "M"+m+"A"+a1;
    }
  }
  else{
    m = [Rcapricorn,0];
    a = [Rcapricorn,Rcapricorn,0,1,1,-Rcapricorn,0];
    l = m;
    d = "M"+m+"A"+a+"L"+l;
    d_horizon = "M"+m+"L"+[-Rcapricorn,0];
  }
  var Rhorizon = r_altitude;
  var yc = yca;
  document.getElementById("horizon").setAttribute("d", d_horizon);
  document.getElementById("sky").setAttribute("d", d);
  document.getElementById("sky_outline").setAttribute("d", d);
  document.getElementById("skyClipPath").setAttribute("d", d);

  // Zenith Great Circle
  var y_zenith = Req*Math.cos(latitude*Math.PI/180)/(1+Math.sin(latitude*Math.PI/180));
  var y_nadir = -Req*Math.cos(latitude*Math.PI/180)/(1-Math.sin(latitude*Math.PI/180));
  var ycaz = (y_zenith + y_nadir)/2;  

  // Azimuth Lines 10 through 110
  for (var azimuth = 10; azimuth <= 110; azimuth += 10){
    xcaz = (y_zenith-ycaz)*Math.tan(Math.PI*(90-azimuth)/180);
    raz = Math.sqrt(Math.pow(xcaz,2) + Math.pow(y_zenith-ycaz,2));
    if (latitude > 0 && latitude < 90){
      // Intersection of Azimuth Circle and the Horizon
      q = Math.sqrt(Math.pow(xcaz,2) + Math.pow(ycaz-yc,2)); // distance between the two circle centers
      k = (Math.pow(q,2) + Math.pow(Rhorizon,2) - Math.pow(raz,2))/(2*q); // an auxiliary quantity
      xZH = xcaz*k/q + ((ycaz-yc)/q)*Math.sqrt(Math.pow(Rhorizon,2) - Math.pow(k,2));
      yZH = yc + (ycaz-yc)*k/q - (xcaz/q)*Math.sqrt(Math.pow(Rhorizon,2) - Math.pow(k,2)); 
      if(xZH*xZH + yZH*yZH > Rcapricorn*Rcapricorn){
        q = Math.sqrt(Math.pow(xcaz,2) + Math.pow(ycaz,2)); // distance between the two circle centers
        k = (Math.pow(q,2) + Math.pow(Rcapricorn,2) - Math.pow(raz,2))/(2*q); // an auxiliary quantity
        xZH = xcaz*k/q + (ycaz/q)*Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(k,2));
        yZH = ycaz*k/q - (xcaz/q)*Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(k,2));
      }
      // Intersection of Azimuth Circle and the Zenith Circle
      q = Math.sqrt(Math.pow(xcaz,2) + Math.pow(ycaz-ycz,2)); // distance between the two circle centers
      k = (Math.pow(q,2) + Math.pow(Rzenith,2) - Math.pow(raz,2))/(2*q); // an auxiliary quantity
      xZZ = xcaz*k/q + ((ycaz-ycz)/q)*Math.sqrt(Math.pow(Rzenith,2) - Math.pow(k,2));
      yZZ = ycz + (ycaz-ycz)*k/q - (xcaz/q)*Math.sqrt(Math.pow(Rzenith,2) - Math.pow(k,2));  
      // Construct Path
      m = [-xZH, yZH];
      a = [raz,raz,0,0,1,-xZZ,yZZ];
      d1 = "M"+m+"A"+a;
      // Construct Mirror Path
      m = [xZH,yZH];
      a = [raz,raz,0,0,0,xZZ,yZZ];
      d2 = "M"+m+"A"+a;
    }
    else if (latitude == 0){
      // Intersection of Azimuth Circle and the Zenith Circle
      q = Math.sqrt(Math.pow(xcaz,2) + Math.pow(ycaz-ycz,2)); // distance between the two circle centers
      k = (Math.pow(q,2) + Math.pow(Rzenith,2) - Math.pow(raz,2))/(2*q); // an auxiliary quantity
      xZZ = xcaz*k/q + ((ycaz-ycz)/q)*Math.sqrt(Math.pow(Rzenith,2) - Math.pow(k,2));
      yZZ = ycz + (ycaz-ycz)*k/q - (xcaz/q)*Math.sqrt(Math.pow(Rzenith,2) - Math.pow(k,2));
      // Construct Path  
      m1 = [-xZZ,yZZ];
      a1= [raz,raz,0,0,0,(raz-xcaz),0];
      d1 = "M"+m1+"A"+a1;
      // Construct Mirror Path
      m2 = [xZZ,yZZ];
      a2 = [raz,raz,0,0,1,(xcaz-raz),0];
      d2 = "M"+m2+"A"+a2;
    }
    else if (latitude == 90){
      m1 = [-Rzenith*Math.sin(Math.PI*azimuth/180),-Rzenith*Math.cos(Math.PI*azimuth/180)];
      l1 = [-Req*Math.sin(Math.PI*azimuth/180),-Req*Math.cos(Math.PI*azimuth/180)];
      d1 = "M"+m1+"L"+l1;
      m2 = [Rzenith*Math.sin(Math.PI*azimuth/180),-Rzenith*Math.cos(Math.PI*azimuth/180)];
      l2 = [Req*Math.sin(Math.PI*azimuth/180),-Req*Math.cos(Math.PI*azimuth/180)];
      d2 = "M"+m2+"L"+l2;
    }
    var azimuth_id1 = "az" + azimuth.toString() + "p";
    var azimuth_id2 = "az-" + azimuth.toString() + "p";
    document.getElementById(azimuth_id1).setAttribute("d", d1);
    document.getElementById(azimuth_id2).setAttribute("d", d2);
  }

  // Azimuth Lines 120 through 170
  for (var azimuth = 120; azimuth <= 170; azimuth += 10){
    xcaz = (y_zenith-ycaz)*Math.tan(Math.PI*(90-azimuth)/180);
    raz = Math.sqrt(Math.pow(xcaz,2) + Math.pow(y_zenith-ycaz,2));
    if (latitude > 0 && latitude < 90){
      // Intersection of Azimuth Circle and the Horizon
      q = Math.sqrt(Math.pow(xcaz,2) + Math.pow(ycaz-yc,2)); // distance between the two circle centers
      k = (Math.pow(q,2) + Math.pow(Rhorizon,2) - Math.pow(raz,2))/(2*q); // an auxiliary quantity
      xZH = xcaz*k/q + ((ycaz-yc)/q)*Math.sqrt(Math.pow(Rhorizon,2) - Math.pow(k,2));
      yZH = yc + (ycaz-yc)*k/q - (xcaz/q)*Math.sqrt(Math.pow(Rhorizon,2) - Math.pow(k,2)); 
      if(xZH*xZH + yZH*yZH > Rcapricorn*Rcapricorn){
        q = Math.sqrt(Math.pow(xcaz,2) + Math.pow(ycaz,2)); // distance between the two circle centers
        k = (Math.pow(q,2) + Math.pow(Rcapricorn,2) - Math.pow(raz,2))/(2*q); // an auxiliary quantity
        xZH = xcaz*k/q + (ycaz/q)*Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(k,2));
        yZH = ycaz*k/q - (xcaz/q)*Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(k,2));
      }
      // Intersection of Azimuth Circle and the Zenith Circle
      q = Math.sqrt(Math.pow(xcaz,2) + Math.pow(ycaz-ycz,2)); // distance between the two circle centers
      k = (Math.pow(q,2) + Math.pow(Rzenith,2) - Math.pow(raz,2))/(2*q); // an auxiliary quantity
      xZZ = xcaz*k/q + ((ycaz-ycz)/q)*Math.sqrt(Math.pow(Rzenith,2) - Math.pow(k,2));
      yZZ = ycz + (ycaz-ycz)*k/q - (xcaz/q)*Math.sqrt(Math.pow(Rzenith,2) - Math.pow(k,2));  
      // Construct Path
      m = [-xZH,yZH];
      a = [raz,raz,0,0,1,-xZZ,yZZ];
      d1 = "M"+m+"A"+a;
      // Construct Mirror Path
      m = [xZH,yZH];
      a = [raz,raz,0,0,0,xZZ,yZZ];
      d2 = "M"+m+"A"+a;
    }
    else if (latitude == 0){
      // Intersection of Azimuth Circle and the Zenith Circle
      q = Math.sqrt(Math.pow(xcaz,2) + Math.pow(ycaz-ycz,2)); // distance between the two circle centers
      k = (Math.pow(q,2) + Math.pow(Rzenith,2) - Math.pow(raz,2))/(2*q); // an auxiliary quantity
      xZZ = xcaz*k/q + ((ycaz-ycz)/q)*Math.sqrt(Math.pow(Rzenith,2) - Math.pow(k,2));
      yZZ = ycz + (ycaz-ycz)*k/q - (xcaz/q)*Math.sqrt(Math.pow(Rzenith,2) - Math.pow(k,2));
      xZH = raz-xcaz;
      yZH = 0;
      if(xZH > Rcapricorn){
        q = Math.sqrt(Math.pow(xcaz,2) + Math.pow(ycaz,2)); // distance between the two circle centers
        k = (Math.pow(q,2) + Math.pow(Rcapricorn,2) - Math.pow(raz,2))/(2*q); // an auxiliary quantity
        xZH = -xcaz*k/q + (ycaz/q)*Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(k,2));
        yZH = ycaz*k/q - (xcaz/q)*Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(k,2));
      }
      // Construct Path  
      m1 = [-xZZ,yZZ];
      a1= [raz,raz,0,0,0,xZH,yZH];
      l1 = [xZH,yZH];
      d1 = "M"+m1+"A"+a1;
      // Construct Mirror Path
      m2 = [xZZ,yZZ];
      a2= [raz,raz,0,0,1,-xZH,yZH];
      d2 = "M"+m2+"A"+a2;
    }
    else if (latitude == 90){
      m1 = [-Rzenith*Math.sin(Math.PI*azimuth/180),-Rzenith*Math.cos(Math.PI*azimuth/180)];
      l1 = [-Req*Math.sin(Math.PI*azimuth/180),-Req*Math.cos(Math.PI*azimuth/180)];
      d1 = "M"+m1+"L"+l1;
      m2 = [Rzenith*Math.sin(Math.PI*azimuth/180),-Rzenith*Math.cos(Math.PI*azimuth/180)];
      l2 = [Req*Math.sin(Math.PI*azimuth/180),-Req*Math.cos(Math.PI*azimuth/180)];
      d2 = "M"+m2+"L"+l2;
    }
    var azimuth_id1 = "az" + azimuth.toString() + "p";
    var azimuth_id2 = "az-" + azimuth.toString() + "p";
    document.getElementById(azimuth_id1).setAttribute("d", d1);
    document.getElementById(azimuth_id2).setAttribute("d", d2);
  }

// South Axis Inside
  if(latitude<90-obliquity){
    m = [0,Rcapricorn];
  }
  else{
    m = [0,yc+Rhorizon];
  }  
  l = [0,ycz+Rzenith];
  d = "M"+m+"L"+l;
  document.getElementById("south_in").setAttribute("d", d);

// South Axis Outside
  if(latitude<90-obliquity){
    d = "";
  }
  else{
    m = [0,Rcapricorn];
    l = [0,yc+Rhorizon];
    d = "M"+m+"L"+l;
  }  
  document.getElementById("south_out").setAttribute("d", d);
      
// North Axis Inside
  if(latitude==0){
    m = [0,0];
  }
  else{
    m = [0,yc-Rhorizon]; 
  }
  l = [0,ycz-Rzenith];
  d = "M"+m+"L"+l;
  document.getElementById("north_in").setAttribute("d", d);

  // North Axis Outside
  if(latitude==0){
    m = [0,0];
  }
  else{
    m = [0,yc-Rhorizon]; 
  }
  l = [0,-Rcapricorn];
  d = "M"+m+"L"+l;
  document.getElementById("north_out").setAttribute("d", d);

// East/West Axes Inside
  if(latitude==0){
    document.getElementById("east_in").setAttribute("d", "");
    document.getElementById("west_in").setAttribute("d", "");
    document.getElementById("east_in90").setAttribute("d", "");
    document.getElementById("west_in90").setAttribute("d", "");
  }
  else if(ycz-Rzenith>0){
    m = [-Req,0];
    l = [0,0];
    d = "M"+m+"L"+l;
    document.getElementById("east_in").setAttribute("d", d);
    document.getElementById("east_in90").setAttribute("d", "");
    m = [Req,0];
    d = "M"+m+"L"+l;
    document.getElementById("west_in").setAttribute("d", d);
    document.getElementById("west_in90").setAttribute("d", "");
  } 
  else{
    m = [-Req,0];
    l = [-Math.sqrt(Rzenith*Rzenith - ycz*ycz),0];
    d = "M"+m+"L"+l;
    document.getElementById("east_in").setAttribute("d", d);
    if(latitude==90){document.getElementById("east_in90").setAttribute("d", d)}
    else{document.getElementById("east_in90").setAttribute("d", "")}
    m = [Req,0];
    l = [Math.sqrt(Rzenith*Rzenith - ycz*ycz),0];
    d = "M"+m+"L"+l;
    document.getElementById("west_in").setAttribute("d", d);
    if(latitude==90){document.getElementById("west_in90").setAttribute("d", d)}
    else{document.getElementById("west_in90").setAttribute("d", "")} 
  }

// East/West Axes Outside
  if(latitude==0){
    document.getElementById("east_out").setAttribute("d", "");
    document.getElementById("west_out").setAttribute("d", "");
  }
  else{
    m = [-Rcapricorn,0];
    l = [-Req,0];
    d = "M"+m+"L"+l;
    document.getElementById("east_out").setAttribute("d", d);
    m = [Rcapricorn,0];
    l = [Req,0];
    d = "M"+m+"L"+l;
    document.getElementById("west_out").setAttribute("d", d); 
  }
    
// Equator Inside
  if(ycz+Rzenith<Req || ycz-Rzenith>Req){
    m = [-Req,0];
    a = [Req,Req,0,1,0,Req,0];
    d = "M"+m+"A"+a;
    document.getElementById("eq_in1").setAttribute("d", d); 
    document.getElementById("eq_in2").setAttribute("d", "");
    document.getElementById("eq_in0_1").setAttribute("d", "");
    document.getElementById("eq_in0_2").setAttribute("d", "");
  }            
  else{
    // Intersection of the Equator and the Zenith Circle
    yZE = (Req*Req + ycz*ycz - Rzenith*Rzenith)/(2*ycz); 
    xZE = Math.sqrt(Req*Req - yZE*yZE);
    m = [-Req,0];    
    a = [Req,Req,0,0,0,-xZE,yZE];
    d = "M"+m+"A"+a;
    document.getElementById("eq_in1").setAttribute("d", d);
    if(latitude==0){
      document.getElementById("eq_in0_1").setAttribute("d", d);
      document.getElementById("eq_in1").setAttribute("d", "");
    }
    else{document.getElementById("eq_in0_1").setAttribute("d", "")} 
    m = [Req,0];    
    a = [Req,Req,0,0,1,xZE,yZE];
    d = "M"+m+"A"+a;
    document.getElementById("eq_in2").setAttribute("d", d);
    if(latitude==0){
      document.getElementById("eq_in0_2").setAttribute("d", d);
      document.getElementById("eq_in2").setAttribute("d", "");
    }
    else{document.getElementById("eq_in0_2").setAttribute("d", "")}  
  }

// Equator Outside
  m = [Req,0];
  a = [Req,Req,0,1,0,-Req,0];
  d = "M"+m+"A"+a;
  document.getElementById("eq_out").setAttribute("d", d);

// Tropic of Cancer Inside
  if(latitude==0){ 
    m = [Rcancer,0];
    a = [Rcancer,Rcancer,0,1,1,-Rcancer,0];
    d = "M"+m+"A"+a;
    document.getElementById("cancer_in1").setAttribute("d", d);
    document.getElementById("cancer_in2").setAttribute("d", "");
  }
  else if(latitude>90-obliquity){ 
    m = [0,Rcancer];
    a = [Rcancer,Rcancer,0,1,1,0,-Rcancer];
    d = "M"+m+"A"+a;
    document.getElementById("cancer_in1").setAttribute("d", d);
    a = [Rcancer,Rcancer,0,1,0,0,-Rcancer];
    d = "M"+m+"A"+a;
    document.getElementById("cancer_in2").setAttribute("d", d);
  }
  else if(ycz+Rzenith<Rcancer || ycz-Rzenith>Rcancer){ 
    // Intersection of the Tropic of Cancer and the Horizon
    yEC = (Rcancer*Rcancer + yc*yc - Rhorizon*Rhorizon)/(2*yc); 
    xEC = Math.sqrt(Rcancer*Rcancer - yEC*yEC); 
    m = [-xEC,yEC];
    a = [Rcancer,Rcancer,0,1,0,xEC,yEC];
    d = "M"+m+"A"+a;
    document.getElementById("cancer_in1").setAttribute("d", d);
    document.getElementById("cancer_in2").setAttribute("d", "");
  } 
  else{
    // Intersection of the Tropic of Cancer and the Horizon
    yEC = (Rcancer*Rcancer + yc*yc - Rhorizon*Rhorizon)/(2*yc); 
    xEC = Math.sqrt(Rcancer*Rcancer - yEC*yEC); 
    // Intersection of the Tropic of Cancer and the Zenith Circle    
    yZC = (Rcancer*Rcancer + ycz*ycz - Rzenith*Rzenith)/(2*ycz); 
    xZC = Math.sqrt(Rcancer*Rcancer - yZC*yZC);   
    m = [-xEC,yEC];
    a = [Rcancer,Rcancer,0,0,0,-xZC,yZC];
    d = "M"+m+"A"+a;
    document.getElementById("cancer_in1").setAttribute("d", d);
    m = [xZC,yZC];
    a = [Rcancer,Rcancer,0,0,0,xEC,yEC];
    d = "M"+m+"A"+a;
    document.getElementById("cancer_in2").setAttribute("d", d);
  }

// Tropic of Cancer Outside
  if(latitude==0){ 
    m = [-Rcancer,0];
    a = [Rcancer,Rcancer,0,1,1,Rcancer,0];
    d = "M"+m+"A"+a;
    document.getElementById("cancer_out").setAttribute("d", d);
  }
  else if(latitude<90-obliquity){ 
    // Intersection of the Tropic of Cancer and the Horizon
    yEC = (Rcancer*Rcancer + yc*yc - Rhorizon*Rhorizon)/(2*yc); 
    xEC = Math.sqrt(Rcancer*Rcancer - yEC*yEC); 
    m = [-xEC,yEC];
    a = [Rcancer,Rcancer,0,0,1,xEC,yEC];
    d = "M"+m+"A"+a;
    document.getElementById("cancer_out").setAttribute("d", d);
  }
  else{
    document.getElementById("cancer_out").setAttribute("d","");
  } 

// Optional cusps of various types
  draw_nocturnals(latitude, Rhorizon, yc);
  campanus_cusps(latitude);
  regiomontanus_cusps(latitude);

} // end tympanum


//-----------------------------------
//--- Nocturnal Hour Lines ----------
//----------------------------------- 
function draw_nocturnals(latitude, Rhorizon, yc){
  for (var indx = 1; indx <= 5; indx ++){
    if (latitude > 0 && latitude <= 90-obliquity) {
      var alpha_capricorn = Math.acos((Math.pow(Rcapricorn,2)+Math.pow(yc,2)-Math.pow(Rhorizon,2))/(2*Rcapricorn*yc));
      var alpha_equator = Math.acos((Math.pow(Req,2)+Math.pow(yc,2)-Math.pow(Rhorizon,2))/(2*Req*yc));
      var alpha_cancer = Math.acos((Math.pow(Rcancer,2)+Math.pow(yc,2)-Math.pow(Rhorizon,2))/(2*Rcancer*yc));
      var beta_capricorn = alpha_capricorn + indx*(Math.PI-alpha_capricorn)/6;
      var beta_equator = alpha_equator + indx*(Math.PI-alpha_equator)/6;
      var beta_cancer = alpha_cancer + indx*(Math.PI-alpha_cancer)/6;
      var x1 = Rcapricorn*Math.sin(beta_capricorn);
      var y1 = Rcapricorn*Math.cos(beta_capricorn);
      var x2 = Req*Math.sin(beta_equator);
      var y2 = Req*Math.cos(beta_equator);
      var x3 = Rcancer*Math.sin(beta_cancer);
      var y3 = Rcancer*Math.cos(beta_cancer);
      var D = 2*(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2));
      var x0_hour = ((x1*x1+y1*y1)*(y2-y3)+(x2*x2+y2*y2)*(y3-y1)+(x3*x3+y3*y3)*(y1-y2))/D; 
      var y0_hour = ((x1*x1+y1*y1)*(x3-x2)+(x2*x2+y2*y2)*(x1-x3)+(x3*x3+y3*y3)*(x2-x1))/D;
      var r_hour = Math.sqrt(Math.pow(x0_hour-x1,2)+Math.pow(y0_hour-y1,2));
      // Construct right-side path
      var m1 = [x1,y1];
      var a1 = [r_hour,r_hour,0,0,0,x3,y3];
      var d1 = "M"+m1+"A"+a1;
      // Construct left-side path
      var m2 = [-x1,y1];
      var a2 = [r_hour,r_hour,0,0,1,-x3,y3];
      var d2 = "M"+m2+"A"+a2;
    }
    else if(latitude>90-obliquity){
      var d1 = "";
      var d2 = "";
    }
    else if (latitude==0){
      var x1 = Rcapricorn*Math.cos(Math.PI*(1+indx/12));
      var y1 = Rcapricorn*Math.sin(Math.PI*(1+indx/12));
      var x3 = Rcancer*Math.cos(Math.PI*(1+indx/12));
      var y3 = Rcancer*Math.sin(Math.PI*(1+indx/12));
      // Construct right-side path
      var m1 = [x1,y1];
      var l1 = [x3,y3];
      var d1 = "M"+m1+"L"+l1;
      // Construct left-side path
      var m2 = [-x1,y1];
      var l2 = [-x3,y3];
      var d2 = "M"+m2+"L"+l2;
    }
    var noct_id1 = "noct" + (indx).toString();
    var noct_id2 = "noct" + (12-indx).toString();
    document.getElementById(noct_id1).setAttribute("d", d1);
    document.getElementById(noct_id2).setAttribute("d", d2);
  }
}

//-----------------------------------
//--- Campanus House Cusps ----------
//----------------------------------- 
function campanus_cusps(latitude){
  var pcn = 4; // precision of numbers
  
  // Circle 1: The great circle with north and south poles on the north and south horizon
  var y_south = Req*Math.tan((Math.PI/180)*(90-(latitude/2)));
  var y_north = -Req*Math.tan((Math.PI/180)*(latitude/2));
  var r_sky = (y_south - y_north)/2;
  var y_sky = (y_south + y_north)/2;
  var yCh = (Math.pow(Rcapricorn,2) - Math.pow(r_sky,2) + Math.pow(y_sky,2))/(2*y_sky); // y-intersection of horizon and Tropic of Capricorn
  var xCh = Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(yCh,2)); // x-intersection of horizon and Tropic of Capricorn
  var m = [0, y_north.toFixed(pcn)];
  var m2 = [0, y_south.toFixed(pcn)];

  // Circle 2: The east-west great circle through the local zenith (the azimuth = 90 circle)
  var y_zenith = Req*Math.cos(latitude*Math.PI/180)/(1+Math.sin(latitude*Math.PI/180));
  var y_nadir = -Req*Math.cos(latitude*Math.PI/180)/(1-Math.sin(latitude*Math.PI/180));
  var caz90 = (y_zenith + y_nadir)/2; // astrolabe center of the east-west (azimuth = 90) circle
  var raz90 = (y_zenith - y_nadir)/2; // astrolabe radius of the east-west (azimuth = 90) circle

  // Cusps 2,3,5,6,8,9,11,12
  var altitude_array = [30,60];
  var cusp_array = [6,5];
  if (latitude > 0) {
    for (var indx = 0; indx < altitude_array.length; indx ++){
      // Circle 3: An altitude circle (with reference to the local zenith)
      var altitude = altitude_array[indx];
      var ya1 = Req*Math.tan((Math.PI/180)*(180-altitude-latitude)/2);
      var ya2 = Req*Math.tan((Math.PI/180)*(altitude-latitude)/2);
      var r_altitude = (ya1-ya2)/2;
      var yca = ya1-r_altitude;

      // Find the intersection (x3,y3) of the east-west great circle (Circle 2) and the altitude circle (Circle 3)
      if (latitude == 90) {
        var x3 = Req*Math.tan((Math.PI/180)*(90-altitude)/2);
        var y3 = 0;
      }
      else {
        var y3 = ((raz90*raz90 - caz90*caz90) - (r_altitude*r_altitude - yca*yca))/(2*(yca - caz90));
        var x3 = Math.sqrt(r_altitude*r_altitude - (yca-y3)*(yca-y3));
      }

      // Find the center (cusp_xc, cusp_yc) of the circle that passes through the 3 points: {(0,y_south), (0,y_north), (x3,y3)}
      var cusp_yc = (y_south + y_north)/2;
      var cusp_xc = -1*(x3*x3 + (cusp_yc - y3)*(cusp_yc - y3) - (y_south - cusp_yc)*(y_south - cusp_yc))/(2*x3);
      var r_cusp = Math.sqrt(cusp_xc*cusp_xc + (cusp_yc - y_south)*(cusp_yc - y_south));

      // Find the first intersection (xCc1, yCc1) of the cusp circle with the Tropic of Capricorn
      var q = Math.sqrt(Math.pow(cusp_xc,2) + Math.pow(cusp_yc,2)); // distance between the two circle centers
      var k = (Math.pow(q,2) + Math.pow(Rcapricorn,2) - Math.pow(r_cusp,2))/(2*q); // an auxiliary quantity (distance from center of circle 0 to the intersection line)
      var xCc1 = cusp_xc*k/q + (cusp_yc/q)*Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(k,2));
      var yCc1 = cusp_yc*k/q - (cusp_xc/q)*Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(k,2)); 

      // Find the second intersection (xCc2, yCc2) of the cusp circle with the Tropic of Capricorn
      var xCc2 = cusp_xc*k/q - (cusp_yc/q)*Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(k,2));
      var yCc2 = cusp_yc*k/q + (cusp_xc/q)*Math.sqrt(Math.pow(Rcapricorn,2) - Math.pow(k,2)); 
      
      // Draw the circular arc from y_north to the the 1st intersection with the Tropic of Capricorn
      var cusp1 = cusp_array[indx];
      var cusp_id1 = "cusp" + cusp1.toString();
      var a = [r_cusp.toFixed(pcn),r_cusp.toFixed(pcn),0,0,1,xCc1.toFixed(pcn),yCc1.toFixed(pcn)];
      var d = "M"+m+"A"+a;
      document.getElementById(cusp_id1).setAttribute("d", d);

      // Draw the circular arc from y_north to the the 2nd intersection with the Tropic of Capricorn
      var cusp2 = cusp1 + 6; // An elaborate counting scheme to name the mirror-image cusps in the correct order
      var cusp_id2 = "cusp" + cusp2.toString();
      var cusp_id2a = "cusp" + cusp1.toString() + "a";
      a = [r_cusp.toFixed(pcn),r_cusp.toFixed(pcn),0,0,0,xCc2.toFixed(pcn),yCc2.toFixed(pcn)];
      d = "M"+m+"A"+a;
      document.getElementById(cusp_id2).setAttribute("d", d);
      document.getElementById(cusp_id2a).setAttribute("d", "");
      if (latitude > 90 - obliquity) {
        a = [r_cusp.toFixed(pcn),r_cusp.toFixed(pcn),0,0,0,0,y_south.toFixed(pcn)];
        d = "M"+m+"A"+a;
        document.getElementById(cusp_id2).setAttribute("d", d);
        a = [r_cusp.toFixed(pcn),r_cusp.toFixed(pcn),0,0,0,xCc2.toFixed(pcn),yCc2.toFixed(pcn)];
        d = "M"+m2+"A"+a;
        document.getElementById(cusp_id2a).setAttribute("d", d);
      }

      // Draw the mirror image of arc 1
      var cusp3 = (10-(cusp1-10)) % 12; // An elaborate counting scheme to name the mirror-image cusps in the correct order
      var cusp_id3 = "cusp" + cusp3.toString();
      a = [r_cusp,r_cusp,0,0,0,-xCc1,yCc1];
      d = "M"+m+"A"+a;
      document.getElementById(cusp_id3).setAttribute("d", d);

      // Draw the mirror image of arc 2
      var cusp4 = cusp3 + 6; // An elaborate counting scheme to name the mirror-image cusps in the correct order
      var cusp_id4 = "cusp" + cusp4.toString();
      var cusp_id4a = "cusp" + cusp3.toString() + "a";
      a = [r_cusp,r_cusp,0,0,1,-xCc2,yCc2];
      d = "M"+m+"A"+a;
      document.getElementById(cusp_id4).setAttribute("d", d);
      document.getElementById(cusp_id4a).setAttribute("d", "");
      if (latitude > 90 - obliquity) {
        a = [r_cusp,r_cusp,0,0,1,0,y_south];
        d = "M"+m+"A"+a;
        document.getElementById(cusp_id4).setAttribute("d", d);
        a = [r_cusp,r_cusp,0,0,1,-xCc2,yCc2];
        d = "M"+m2+"A"+a;
        document.getElementById(cusp_id4a).setAttribute("d", d);
      }

      // Annotations
      var dR1 = 3;
      var dR2 = 6;
      var dphi = .02;
      q = Math.sqrt(Math.pow(cusp_xc,2) + Math.pow(cusp_yc,2)); // distance between the two circle centers
      k1 = (Math.pow(q,2) + Math.pow(Rcapricorn-dR1,2) - Math.pow(r_cusp,2))/(2*q); 
      k2 = (Math.pow(q,2) + Math.pow(Rcapricorn-dR2,2) - Math.pow(r_cusp,2))/(2*q); 
      xCc1 = cusp_xc*k1/q + (cusp_yc/q)*Math.sqrt(Math.pow(Rcapricorn-dR1,2) - Math.pow(k,2));
      yCc1 = cusp_yc*k1/q - (cusp_xc/q)*Math.sqrt(Math.pow(Rcapricorn-dR1,2) - Math.pow(k,2)); 
      xCc2 = cusp_xc*k2/q - (cusp_yc/q)*Math.sqrt(Math.pow(Rcapricorn-dR2,2) - Math.pow(k,2));
      yCc2 = cusp_yc*k2/q + (cusp_xc/q)*Math.sqrt(Math.pow(Rcapricorn-dR2,2) - Math.pow(k,2));
      var cusptext_id1 = cusp_id1 + "text";
      var cusptext_id2 = cusp_id2 + "text";
      var cusptext_id3 = cusp_id3 + "text";
      var cusptext_id4 = cusp_id4 + "text";
      var phi1 = Math.atan2(yCc1,xCc1);
      var phi2 = Math.atan2(yCc2,xCc2);
      var xtx1 = (Rcapricorn-dR1)*Math.cos(phi1+dphi);
      var ytx1 = -(Rcapricorn-dR1)*Math.sin(phi1+dphi);
      if(cusp3 == 2 && latitude > 25){var dphi3 = 2.5*dphi + 0.001 * Math.pow(latitude - 25, 1.2);} // a kludge to address the positioning of numeral "2"
      else{var dphi3 = 2.5*dphi;}
      if(cusp3 == 3){dphi3 = 2*dphi;}
      var xtx3 = -(Rcapricorn-dR1)*Math.cos(phi1-dphi3);
      var ytx3 = -(Rcapricorn-dR1)*Math.sin(phi1-dphi3);

      if(latitude <= 62){
        var xtx_1 = -(xCh - 3) - 16 * Math.pow((1 - (62 - latitude)/62), 4);
        var ytx_1 = -(yCh - 6) + 12 * (1 - (62 - latitude)/62);  
        var xtx2 = (Rcapricorn-dR2)*Math.cos(phi2+2*dphi);
        var ytx2 = -(Rcapricorn-dR2)*Math.sin(phi2+2*dphi);
        var xtx4 = -(Rcapricorn-dR2)*Math.cos(phi2-dphi);
        var ytx4 = -(Rcapricorn-dR2)*Math.sin(phi2-dphi);
        var xtx7 = xCh - 3;
        var ytx7 = -(yCh + 3) + 8 * (1 - (62 - latitude)/62);        
        var xtx10 = -1;
        var ytx10 = -(Rcapricorn-dR2);
      }
      else{
        var dR2 = 2 - (cusp2 - 11.2);
        var dR4 = -2 + .8 * (cusp4 - 8);
        var phi2 = (Math.PI/180)*(90 - altitude);
        var phi4 = (Math.PI/180)*(90 + altitude);
        var dphi2 = -.123 - 0.2*(cusp2 - 11);
        var dphi4 = .105 + .18*(9 - cusp4) - .00005*(cusp4 - 8) * (latitude - 62);
        var xtx2 = cusp_xc - (r_cusp + dR2) * Math.cos(phi2 + dphi2);
        var ytx2 = -cusp_yc - (r_cusp + dR2) * Math.sin(phi2 + dphi2);;
        var xtx4 = -cusp_xc - (r_cusp + dR4) * Math.cos(phi4 + dphi4);
        var ytx4 = -cusp_yc - (r_cusp + dR4) * Math.sin(phi4 + dphi4);
        var dR_1 = 3.5;
        var phi_1 = (Math.PI/180) * (90 - latitude);
        var dphi_1 = -0.1;
        var xtx_1 = -(r_sky + dR_1)*Math.cos(phi_1 + dphi_1);
        var ytx_1 = -(y_sky + (r_sky + dR_1)*Math.sin(phi_1 + dphi_1));
        var dR7 = 1.5 + 0.1 * (90 - latitude);
        var dphi7 = .05 + 0.005 * (90 - latitude);
        var phi7 = (Math.PI/180) * (90 - latitude);
        var xtx7 = (r_sky - dR7)*Math.cos(phi7 + dphi7);
        var ytx7 = -(y_sky + (r_sky - dR7)*Math.sin(phi7 + dphi7));
        var xtx10 = -1 + .02 * (latitude - 62)
        var ytx10 = -(y_south - 12.9 + .1*(latitude-62) - .001*(latitude-62)*(latitude-62));
      }
      document.getElementById(cusptext_id1).setAttribute("x", xtx1);
      document.getElementById(cusptext_id1).setAttribute("y", ytx1);
      document.getElementById(cusptext_id2).setAttribute("x", xtx2);
      document.getElementById(cusptext_id2).setAttribute("y", ytx2);
      document.getElementById(cusptext_id3).setAttribute("x", xtx3);
      document.getElementById(cusptext_id3).setAttribute("y", ytx3);
      document.getElementById(cusptext_id4).setAttribute("x", xtx4);
      document.getElementById(cusptext_id4).setAttribute("y", ytx4);
      document.getElementById("cusp1text").setAttribute("x", xtx_1);
      document.getElementById("cusp1text").setAttribute("y", ytx_1);
      document.getElementById("cusp4text").setAttribute("x", 2);
      document.getElementById("cusp4text").setAttribute("y", Rcapricorn-dR1);
      document.getElementById("cusp7text").setAttribute("x", xtx7);
      document.getElementById("cusp7text").setAttribute("y", ytx7);
      document.getElementById("cusp10text").setAttribute("x", xtx10);
      document.getElementById("cusp10text").setAttribute("y", ytx10);
    }

  }
  else if (latitude == 0){
    var cusp_array = [2,3,5,6,8,9,11,12];
    for (var indx = 0; indx < cusp_array.length; indx ++){
      var cusp = cusp_array[indx];
      var cusp_id = "cusp" + cusp.toString();
      var m = [0,0];
      var x2 = -Rcapricorn*Math.cos((Math.PI/180)*(30*(cusp-1)));
      var y2 = -Rcapricorn*Math.sin((Math.PI/180)*(30*(cusp-1)));
      var l = [x2,y2];
      var d = "M"+m+"L"+l;
      document.getElementById(cusp_id).setAttribute("d", d);
    }
    // Annotations
    var dR1 = 3;
    var dR2 = 6;
    var dphi0 = .02;
    var cusp_array = [2,3,5,6];
    var dphi_array = [2.5*dphi0, 2*dphi0, dphi0, dphi0];
    for (var indx = 0; indx < cusp_array.length; indx ++){
      var cusp = cusp_array[indx];
      var dphi = dphi_array[indx];
      var phi = (Math.PI/180)*(30*(cusp-1));
      var xtx = -(Rcapricorn-dR1)*Math.cos(phi+dphi);
      var ytx = (Rcapricorn-dR1)*Math.sin(phi+dphi);
      var cusptext_id = "cusp" + cusp.toString() + "text";
      document.getElementById(cusptext_id).setAttribute("x", xtx);
      document.getElementById(cusptext_id).setAttribute("y", ytx);
    }
    cusp_array = [8,9,11,12];
    dphi_array = [dphi0, dphi0, 2*dphi0, 2*dphi0];
    for (var indx = 0; indx < cusp_array.length; indx ++){
      var cusp = cusp_array[indx];
      var dphi = dphi_array[indx];
      var phi = (Math.PI/180)*(30*(cusp-1));
      var xtx = -(Rcapricorn-dR2)*Math.cos(phi+dphi);
      var ytx = (Rcapricorn-dR2)*Math.sin(phi+dphi);
      var cusptext_id = "cusp" + cusp.toString() + "text";
      document.getElementById(cusptext_id).setAttribute("x", xtx);
      document.getElementById(cusptext_id).setAttribute("y", ytx);
    }
    document.getElementById("cusp1text").setAttribute("x", -Rcapricorn + 3);
    document.getElementById("cusp1text").setAttribute("y", 6);
    document.getElementById("cusp4text").setAttribute("x", 2);
    document.getElementById("cusp4text").setAttribute("y", Rcapricorn-dR1);
    document.getElementById("cusp7text").setAttribute("x", Rcapricorn - 3);
    document.getElementById("cusp7text").setAttribute("y", -3);
    document.getElementById("cusp10text").setAttribute("x", -1);
    document.getElementById("cusp10text").setAttribute("y", -(Rcapricorn-dR2));
  }
}


//-----------------------------------
//--- Regiomontanus House Cusps ----------
//----------------------------------- 
function regiomontanus_cusps(latitude){
  var y_south = Req*Math.tan((Math.PI/180)*(90-(latitude/2)));
  var y_north = -Req*Math.tan((Math.PI/180)*(latitude/2));

  // Meridian cusp
  var m = [0,Rcapricorn];
  var l = [0,-Rcapricorn];
  var d = "M"+m+"L"+l;
  document.getElementById("cusp_reg_90p").setAttribute("d", d);

  // Cusps 2,3,5,6,8,9,11,12
  var equatorial_angle_array = [0,30,60,120,150];
  for (var indx = 0; indx < equatorial_angle_array.length; indx ++){
    var eqangle = equatorial_angle_array[indx];
    var cusp_reg_id_c = "cusp_reg_" + eqangle.toString() + "c";
    var cusp_reg_id_p = "cusp_reg_" + eqangle.toString() + "p";
    var c = document.getElementById(cusp_reg_id_c);
    var p = document.getElementById(cusp_reg_id_p);
    if (latitude > 0 && latitude < 90){
      p.setAttribute("d", "");
      var x3 = -Req*Math.cos(eqangle*Math.PI/180);
      var y3 = Req*Math.sin(eqangle*Math.PI/180);

      // Find the center (cusp_xc, cusp_yc) of the circle that passes through the 3 points: {(0,y_south), (0,y_north), (x3,y3)}
      var cusp_yc = (y_south + y_north)/2;
      var cusp_xc = (x3*x3 + (cusp_yc - y3)*(cusp_yc - y3) - (y_south - cusp_yc)*(y_south - cusp_yc))/(2*x3);
      var r_cusp = Math.sqrt(cusp_xc*cusp_xc + (cusp_yc - y_south)*(cusp_yc - y_south));

      c.setAttribute("cx", cusp_xc);
      c.setAttribute("cy", cusp_yc);
      c.setAttribute("r", r_cusp);  
    }
    else if (latitude == 90){
      p.setAttribute("d", "");
      c.setAttribute("r", "none");
      if (eqangle == 0){
        c.setAttribute("cx", 0);
        c.setAttribute("cy", 0);
        c.setAttribute("r", Req); 
      } 
    }
    else if (latitude == 0){
      c.setAttribute("r", "none");
      var x3 = -Rcapricorn*Math.cos(eqangle*Math.PI/180);
      var y3 = Rcapricorn*Math.sin(eqangle*Math.PI/180);
      var m = [x3,y3];
      var l = [-x3,-y3];
      var d = "M"+m+"L"+l;
      p.setAttribute("d", d);
    }
  }

}
