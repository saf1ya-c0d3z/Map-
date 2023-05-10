//------------------------------
//---------- Global Parameters
//------------------------------
var wec = 7;  // width of ecliptic
var w = 4;  // width of rete components
var rPlanet = 3.5; // radius of the planets

//------------------------------
//---------- RETE --------------
//------------------------------
function rete(){

  //------------------------------
  //------------------------------
  //------------------------------

  // RetebrassGroup (retePath + reteMarks)
  var retebrassGroup = document.getElementById("retebrassGroup");
  retebrassGroup.setAttribute("stroke","rgb(105,85,60)");
  retebrassGroup.setAttribute("stroke-width",0.25);
  retebrassGroup.setAttribute("fill","rgb(235,215,110)");

 // Rete Path
  var retePath = document.getElementById("retePath");
  var d = "m 78.80896,45.49997 c -3.20492,5.55127 -6.975,10.72371 -11.23303,15.44459 l 0.001,10e-4 c -0.0117,0.013 -0.024,0.0247 -0.0357,0.0378 -6.34501,7.02744 -13.77364,13.05156 -22.04126,17.82493 2.15526,-2.14048 3.61018,-4.88455 4.1719,-7.86984 2.28497,-1.59971 4.46459,-3.29343 6.54608,-5.06573 -2.63635,-0.046 -5.26789,-0.78613 -7.60124,-2.23623 C 37.2049,77.87771 19.66908,87 -3.9e-4,87 c -19.66947,0 -37.2053,-9.12229 -48.61711,-23.36351 -2.33129,1.44838 -4.95974,2.18853 -7.59334,2.23588 2.09555,1.78809 4.27484,3.48147 6.53819,5.06608 0.56172,2.98529 2.01629,5.72936 4.17189,7.86984 -43.52456,-25.12895 -58.43743,-80.78371 -33.30825,-124.30824 25.12917,-43.52452 80.78442,-58.43726 124.30932,-33.3083 43.52491,25.12895 58.43778,80.78371 33.3086,124.30824 z m 1.09908,-78.88171 c -5.98951,-10.22548 -18.82363,-14.14376 -29.50318,-9.007 0.62246,-7.37848 -4.8544,-13.86445 -12.23294,-14.48656 -4.86881,-0.41074 -9.57566,1.8598 -12.2851,5.92632 -2.36457,-1.20132 -4.81013,-2.23691 -7.31883,-3.09853 -4.0168,-1.3801 -8.43129,0.45775 -10.28219,4.28029 -2.02041,4.17255 -0.27554,9.19264 3.89704,11.21269 l -1.59972,1.9147 c 19.46805,3.33358 35.84853,15.70298 44.67306,32.63954 l 19.74427,0 0,4.00029 11.6026,0 c 0.01,-11.2796 -2.17997,-22.63297 -6.68506,-33.38757 l -0.01,0.006 z m -87.22893,-3.72715 c 2.40163,-0.28138 4.84376,-0.43064 7.32089,-0.43064 2.47713,0 4.91926,0.14926 7.32089,0.43064 -3.4664,-3.27936 -4.80636,-8.35573 -3.20149,-13.0272 1.4103,-4.10495 4.76209,-6.98936 8.67629,-7.98548 C 6.80824,-63.15608 2.38482,-69.7625 -3.4e-4,-77.14681 c -2.38517,7.38431 -6.80859,13.99039 -12.79604,19.02524 3.9142,0.99612 7.26599,3.88053 8.6763,7.98548 1.60555,4.67181 0.26559,9.74784 -3.20081,13.0272 z m -39.97924,90.43101 c 1.68344,1.77848 3.79821,3.09098 6.13911,3.81053 7.49453,2.30348 15.43753,-1.90509 17.74069,-9.39955 1.59834,0.94329 3.3511,1.59525 5.17729,1.92637 6.40574,1.16084 12.60697,-1.74348 15.95292,-6.87475 -6.8e-4,-10e-4 -10e-4,-0.002 -0.002,-0.003 0.31431,-0.85304 0.59294,-1.71706 0.84412,-2.58862 L -6.3e-4,24.73134 1.44673,40.1931 c 0.25118,0.87156 0.52981,1.73593 0.84413,2.58862 -6.9e-4,10e-4 -10e-4,0.002 -0.002,0.003 3.34596,5.13127 9.54718,8.03593 15.95292,6.87475 1.82619,-0.33078 3.57895,-0.98308 5.1773,-1.92637 2.3035,7.49446 10.24616,11.70269 17.74068,9.39955 2.3409,-0.71955 4.45567,-2.03205 6.13912,-3.81053 l 0.01,-0.002 c 3.4e-4,-6.8e-4 6.8e-4,-0.001 10e-4,-0.002 C 41.95312,50.25597 37.62441,45.602 34.98223,39.93475 29.05757,27.22736 32.78373,12.49546 43.15205,4.00041 l -19.97075,0 0,-4.00063 -11.18224,0 c 0,6.62735 -5.37255,11.99984 -11.99995,11.99984 -6.62741,0 -11.99961,-5.37249 -11.99961,-11.99984 l -11.18225,0 0,3.99995 -19.97074,0 c 10.36831,8.49538 14.09413,23.22694 8.16982,35.93433 -2.64218,5.66725 -6.97055,10.32122 -12.32765,13.38338 3.4e-4,6.8e-4 6.9e-4,0.001 0.001,0.002 l 0.009,0.002 z M 0,-3.99995 c -2.20914,0 -3.99998,1.79083 -3.99998,3.99995 0,2.20912 1.79084,3.99995 3.99998,3.99995 C 2.20914,3.99995 3.99998,2.20912 3.99998,0 3.99998,-2.20912 2.20914,-3.99995 0,-3.99995 Z m 2.00016,-7.83107 c 4.33592,0.72779 7.88193,3.77897 9.31454,7.83107 l 15.86782,0 0,3.99995 22.25572,0 C 40.64322,-17.547 22.78415,-29.75993 2.00016,-30.49973 l 0,18.66871 z m 49.24643,15.83097 -0.79334,0 C 44.58487,6.97151 40.01561,12.07293 37.73957,18.32626 33.33845,30.41772 38.45433,43.64668 49.255,49.8283 53.10057,42.29678 55.2699,33.76708 55.2699,24.73023 55.27025,17.39842 53.83901,10.4022 51.24659,3.99995 Z M -49.25535,49.8283 C -38.45467,43.64668 -33.3388,30.41807 -37.73991,18.32626 -40.01596,12.07293 -44.58521,6.97151 -50.45359,3.99995 l -0.79334,0 c -2.59242,6.4019 -4.02332,13.39847 -4.02332,20.73028 0,9.03685 2.16968,17.56655 6.0149,25.09807 z M -27.18218,0 l 0,-3.99995 15.86782,0 c 1.43261,-4.0521 4.97862,-7.10328 9.31454,-7.83107 l 0,-18.66871 C -22.78381,-29.75993 -40.64287,-17.54734 -49.4379,0 l 22.25572,0 z M 63.9359,58.39265 c 0.12799,-0.12799 0.2529,-0.25941 0.37403,-0.39392 l 0.013,0.0117 C 77.97784,42.89696 85.58251,23.68678 86.50693,3.99998 l -15.50616,0 0,-3.99995 -13.83918,0 c 3.28454,7.58127 5.10867,15.94214 5.10867,24.73023 0,13.13425 -4.06998,25.3163 -11.01273,35.36095 4.02434,2.30211 9.24213,1.73765 12.67833,-1.69853 z M 0,79.99999 c 16.56131,0 31.41893,-7.28617 41.54876,-18.82553 -4.29782,1.11348 -9.00982,0.67015 -13.22187,-1.61034 C 25.48055,58.02309 23.09675,55.75084 21.4212,52.98173 13.48025,55.51099 4.98754,52.74565 0,46.43707 c -4.98788,6.30858 -13.48025,9.07392 -21.4212,6.54466 -1.67555,2.76945 -4.05935,5.04171 -6.90569,6.58239 -4.21205,2.28049 -8.92405,2.72382 -13.22187,1.61034 C -31.41893,72.71382 -16.56131,79.99999 0,79.99999 Z M -64.19532,58.11917 c 0.0858,0.092 0.17089,0.18461 0.25976,0.27348 3.4362,3.43618 8.65399,4.00064 12.67834,1.69853 -6.94276,-10.04465 -11.01274,-22.22636 -11.01274,-35.36095 0,-8.78809 1.82413,-17.14896 5.10867,-24.73023 l -13.83918,0 0,3.99995 -15.51508,0 c 0.7182,15.85739 5.7977,31.7062 15.5765,45.67153 2.07222,2.9599 4.32734,5.77877 6.74373,8.44769 z M -86.60305,0 l 11.6026,0 0,-3.99995 19.74427,0 c 8.82419,-16.93655 25.20467,-29.30596 44.67306,-32.63953 l -1.59972,-1.91471 c 4.17258,-2.02039 5.9171,-7.04048 3.89704,-11.21268 -1.8509,-3.82255 -6.26539,-5.66039 -10.28219,-4.2803 -2.50836,0.86196 -4.95391,1.89721 -7.31883,3.09853 -2.7091,-4.06652 -7.41595,-6.33705 -12.2851,-5.92632 -7.37854,0.62245 -12.8554,7.10843 -12.23294,14.48656 -10.67955,-5.13676 -23.51367,-1.21882 -29.50318,9.007 l -0.006,-0.003 C -84.32288,-22.80454 -86.59309,-11.4419 -86.60305,0 Z m 12.4378,-44.74335 c 5.93461,-3.60397 13.19545,-4.85779 20.271,-3.12152 1.06476,-4.12485 3.60983,-7.747 7.19804,-10.13729 7.07761,-4.71505 16.34788,-3.56142 22.08346,2.30519 12.52599,-5.41676 21.15699,-17.24915 22.4544,-30.87958 -16.46935,0.39529 -33.00732,5.48127 -47.51357,15.63847 -10.23243,7.16401 -18.43691,16.14322 -24.49333,26.19473 z m 76.32394,-41.8308 c 1.2981,13.6294 9.92876,25.46076 22.45406,30.87684 5.73558,-5.86627 15.00619,-7.0199 22.08346,-2.3052 3.58821,2.39064 6.13328,6.01245 7.19804,10.1373 7.06148,-1.73284 14.30723,-0.48691 20.23531,3.10024 -1.00334,-1.65803 -2.06261,-3.29617 -3.19051,-4.90686 C 54.55171,-73.07514 28.68376,-85.89165 2.15869,-86.57415 Z";
  retePath.setAttributeNS(null, "d", d);

  // Rete Marks Group
  var reteMarks = document.getElementById("reteMarks");
  reteMarks.setAttribute("fill","none");

  // Pole2
  var c = document.createElementNS(xmlns, "circle");
  var cx = 0;
  var cy = 0;
  var r = 2*w;
  c.cx.baseVal.value = cx;
  c.cy.baseVal.value = cy;
  c.r.baseVal.value = r;
  reteMarks.appendChild(c);

  // Pole3
  var c = document.createElementNS(xmlns, "circle");
  var cx = 0;
  var cy = 0;
  var r = 3*w;
  c.cx.baseVal.value = cx;
  c.cy.baseVal.value = cy;
  c.r.baseVal.value = r;
  reteMarks.appendChild(c);

 
  //------------------------------
  //---------- ECLIPTIC ----------
  //------------------------------

  // eclipticGroup (eclipticPath + eclipticMarks)
  var eclipticGroup = document.getElementById("eclipticGroup");
  eclipticGroup.setAttribute("stroke","rgb(105,85,60)");
  eclipticGroup.setAttribute("stroke-width",0.25);
  eclipticGroup.setAttribute("fill","rgb(235,215,110)");


  // Ecliptic
  var ecliptic = document.getElementById("ecliptic");
  var m1 = [0,Recliptic+yce];
  var a1 = [Recliptic,Recliptic,0,1,1,0,-Recliptic+yce];
  var a2 = [Recliptic,Recliptic,0,1,1,0,Recliptic+yce];
  var m2 = [0,yce + Recliptic - wec];
  var a3 = [Recliptic-wec,Recliptic-wec,0,1,1,0,-(Recliptic-wec)+yce];
  var a4 = [Recliptic-wec,Recliptic-wec,0,1,1,0,Recliptic-wec+yce];
  var d = "M"+m1+"A"+a1+"A"+a2+"M"+m2+"A"+a3+"A"+a4+"Z";
  ecliptic.setAttributeNS(null, "d", d);
  ecliptic.setAttribute("fill-rule", "evenodd");
  ecliptic.setAttribute("stroke","none"); 

  // Ecliptic Marks Group
  var eclipticMarks = document.getElementById("eclipticMarks");
  eclipticMarks.setAttribute("fill","none");

  // Ecliptic Disc Outer Stroke
  var c = document.createElementNS(xmlns, "circle");
  c.cx.baseVal.value = 0;
  c.cy.baseVal.value = yce;
  c.r.baseVal.value = Recliptic;
  eclipticMarks.appendChild(c);

  // Ecliptic Disc Middle Stroke
  var c = document.createElementNS(xmlns, "circle");
  c.cx.baseVal.value = 0;
  c.cy.baseVal.value = yce;
  c.r.baseVal.value = Recliptic  - wec/3;
  eclipticMarks.appendChild(c);

  // Ecliptic Disc Inner Stroke
  var c = document.createElementNS(xmlns, "circle");
  c.cx.baseVal.value = 0;
  c.cy.baseVal.value = yce;
  c.r.baseVal.value = Recliptic  - wec;
  eclipticMarks.appendChild(c);

  //  Ecliptic Tick Marks
  for(var lambda = 0; lambda<360; lambda+=5){
    var alpha = Math.atan2(Math.sin(Math.PI*lambda/180)*Math.cos(Math.PI*e0/180),Math.cos(Math.PI*lambda/180));
    var delta = Math.asin(Math.sin(Math.PI*lambda/180)*Math.sin(Math.PI*e0/180));
    var theta = Math.PI/2 - delta;
    var ecTick_x1 = Req*Math.cos(alpha)*Math.tan(theta/2);
    var ecTick_y1 = -Req*Math.sin(alpha)*Math.tan(theta/2);
    var ecTick_r = Math.sqrt(Math.pow(ecTick_x1,2) + Math.pow(ecTick_y1,2));
    var ecTick_phi = Math.atan2(ecTick_y1,ecTick_x1);
    var cosTick = (Math.pow(ecTick_r,2)+Math.pow(Recliptic,2)-Math.pow(yce,2))/(2*Recliptic*ecTick_r);
    if(lambda%30==0){
      var rTick = 1*wec;
      }
    else{
      var rTick = wec/3;
      }
    var ecTick_x2 = ecTick_x1 - (rTick/cosTick)*Math.cos(ecTick_phi);
    var ecTick_y2 = ecTick_y1 - (rTick/cosTick)*Math.sin(ecTick_phi);
    
    var p = document.createElementNS(xmlns, "path");
    var m1 = [ecTick_x1,ecTick_y1];
    var l1 = [ecTick_x2,ecTick_y2];
    var pString = "M"+m1+"L"+l1;
    p.setAttributeNS(null, "d",pString);
    p.setAttributeNS(null, "stroke-width", .25);
    eclipticMarks.appendChild(p);
    }  
  
  // Ecliptic Text Group
  var gte = document.createElementNS(xmlns, "g");
  eclipticMarks.appendChild(gte);
  gte.setAttributeNS(null,"transform","scale(1,-1)");
  gte.setAttributeNS(null,"font-size","4");
  gte.setAttributeNS(null,"font-family","georgia");
  gte.setAttributeNS(null, "fill", "rgb(105,85,60)");
  gte.setAttributeNS(null, "stroke", "none");
  gte.setAttributeNS(null, "text-anchor", "middle");
  gte.setAttributeNS(null, "id", "ecliptic_textgroup");
  
  //  Ecliptic Text Paths
  var zodiac = ["ARIES","TAVRVS","GEMINI","CANCER","LEO","VIRGO","LIBRA","SCORPIO","SAGITTARIVS","CAPRICORN","AQVARIVS","PISCES"];
  var dq = [[.06, .02], // aries
            [.06, .03], // taurus
            [.04, .03], // gemini
            [.04, .04], // cancer
            [.05, .08], // leo
            [.04, .07], // virgo
            [.03, -.1], // libra
            [.08, .05], // scorpio
            [.04, .045],// sagittarius
            [.04, .04], // capricorn
            [.04, .08], // aquarius
            [.01, .03]]; // pisces

  var rTick = .5*wec;
  var rarc = Recliptic - rTick;
  var x_center = 0;
  var y_center = -yce;
  var x0 = -rarc;
  var y0 = y_center;

  for (var indx=0;indx<12;indx++){
    var lambda = 30*(indx);
    var alpha = Math.atan2(Math.sin(Math.PI*lambda/180)*Math.cos(Math.PI*e0/180),Math.cos(Math.PI*lambda/180));
    var delta = Math.asin(Math.sin(Math.PI*lambda/180)*Math.sin(Math.PI*e0/180));
    var theta = Math.PI/2 - delta;
    var ecTick_x = -Req*Math.cos(alpha)*Math.tan(theta/2);
    var ecTick_y = Req*Math.sin(alpha)*Math.tan(theta/2);
    var ecTick_phi = Math.atan2(ecTick_y,ecTick_x);
    var ecTick_x1 = ecTick_x - rTick*Math.cos(ecTick_phi);
    var ecTick_y1 = ecTick_y - rTick*Math.sin(ecTick_phi);
    lambda = 30*(indx+1);
    alpha = Math.atan2(Math.sin(Math.PI*lambda/180)*Math.cos(Math.PI*e0/180),Math.cos(Math.PI*lambda/180));
    delta = Math.asin(Math.sin(Math.PI*lambda/180)*Math.sin(Math.PI*e0/180));
    theta = Math.PI/2 - delta;
    ecTick_x = -Req*Math.cos(alpha)*Math.tan(theta/2);
    ecTick_y = Req*Math.sin(alpha)*Math.tan(theta/2);
    ecTick_phi = Math.atan2(ecTick_y,ecTick_x);
    var ecTick_x2 = ecTick_x - rTick*Math.cos(ecTick_phi);
    var ecTick_y2 = ecTick_y - rTick*Math.sin(ecTick_phi);
    var dot1 = ((ecTick_x1 - x_center) * (x0 - x_center) + (ecTick_y1 - y_center) * (y0 - y_center)) / Math.pow(rarc,2);
    var dot2 = ((ecTick_x2 - x_center) * (x0 - x_center) + (ecTick_y2 - y_center) * (y0 - y_center)) / Math.pow(rarc,2);
    var q1 = Math.acos(dot1);
    var q2 = Math.acos(dot2);
    if (indx > 6){
      q1 = 2*Math.PI - q1;
      q2 = 2*Math.PI - q2;
    }
    if (indx == 11){
      q2 = 4*Math.PI - q2;
    }
    q1 += dq[indx][0];
    q2 -= dq[indx][1];
    for (var k=0;k<zodiac[indx].length;k++){
      var q = q1 + k*(q2-q1)/(zodiac[indx].length - 1);
      var letter = zodiac[indx][k];
      var letter_x = x_center - rarc*Math.cos(q);
      var letter_y = y_center + rarc*Math.sin(q);
      var letter_rot = 90 - 180*q/Math.PI;
      var letter_group = document.createElementNS(xmlns, "g");
      gte.append(letter_group);
      var letter_transform_string = "translate(" + [letter_x, letter_y] + ") rotate(" + letter_rot +")";
      letter_group.setAttributeNS(null,"transform", letter_transform_string);
      var tx = document.createElementNS(xmlns, "text");
      tx.setAttribute(null,"x",0);
      tx.setAttribute(null,"y",0);
      letter_group.appendChild(tx); 
      var textnode = document.createTextNode(letter);
      tx.appendChild(textnode);
    }
  }

//------------------------------
//--- Star Names ------------
//------------------------------ 
  var starnames_textgroup = document.getElementById("starnames_textgroup");
  starnames_textgroup.setAttribute("transform","matrix(1,0,0,-1,0,0)");
  starnames_textgroup.setAttribute("stroke","none");
  starnames_textgroup.setAttribute("font-size",3.0);
  starnames_textgroup.setAttribute("font-family","georgia");
  starnames_textgroup.setAttribute("fill","rgb(115,95,70)");
  var pcn = 4;

  // Sirius
  var starname = "SIRIVS";
  var starpathname = "sirius_text";
  var star_textlength = 3.0 * starname.length;
  var p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  var r_outer = Rcancer + w;
  var r = r_outer - 2.6;
  var cx = 40;
  var cy = 90;
  var phi_start = 200;
  var phi_stop = phi_start + 90;
  var x1 = cx + r * Math.cos((Math.PI/180) * phi_start);
  var y1 = cy + r * Math.sin((Math.PI/180) * phi_start);
  var x2 = cx + r * Math.cos((Math.PI/180) * phi_stop);
  var y2 = cy + r * Math.sin((Math.PI/180) * phi_stop);
  var d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  var a = "A" + [r.toFixed(pcn),r.toFixed(pcn),0,0,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a;
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  var startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  var startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  var startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);

  // Capella
  starname = "CAPELLA";
  starpathname = "capella_text";
  star_textlength = 2.4 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  d = "M-1,13L-1,30";
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);
 
  // Vega
  starname = "VEGA";
  starpathname = "vega_text";
  star_textlength = 2.4 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  r = 8.7;
  cx = 0;
  cy = 0;
  phi_start = 239;
  phi_stop = phi_start + 90;
  x1 = cx + r * Math.cos((Math.PI/180) * phi_start);
  y1 = cy + r * Math.sin((Math.PI/180) * phi_start);
  x2 = cx + r * Math.cos((Math.PI/180) * phi_stop);
  y2 = cy + r * Math.sin((Math.PI/180) * phi_stop);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  a = "A" + [r.toFixed(pcn),r.toFixed(pcn),0,0,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a;
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);

  // Procyon
  starname = "PROCYON";
  starpathname = "procyon_text";
  star_textlength = 3.0 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  r = 12.0;
  cx = 16.2;
  cy = 45.8;
  phi_start = 165;
  phi_stop = phi_start + 90;
  x1 = cx + r * Math.cos((Math.PI/180) * phi_start);
  y1 = cy + r * Math.sin((Math.PI/180) * phi_start);
  x2 = cx + r * Math.cos((Math.PI/180) * phi_stop);
  y2 = cy + r * Math.sin((Math.PI/180) * phi_stop);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  a = "A" + [r.toFixed(pcn),r.toFixed(pcn),0,1,0,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a;
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);

  // Altair
  starname = "ALTAIR";
  starpathname = "altair_text";
  star_textlength = 3.0 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  r = 15.0;
  cx = -15.0;
  cy = -36.0;
  phi_start = 253;
  phi_stop = phi_start + 90;
  x1 = cx + r * Math.cos((Math.PI/180) * phi_start);
  y1 = cy + r * Math.sin((Math.PI/180) * phi_start);
  x2 = cx + r * Math.cos((Math.PI/180) * phi_stop);
  y2 = cy + r * Math.sin((Math.PI/180) * phi_stop);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  a = "A" + [r.toFixed(pcn),r.toFixed(pcn),0,0,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a;
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);

  // Aldebaran
  starname = "ALDEBARAN";
  starpathname = "aldebaran_text";
  star_textlength = 3.0 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  r = Rcancer + 3.0;
  cx = -40.6;
  cy = 91.8;
  phi_start = 290.3;
  phi_stop = phi_start + 90;
  x1 = cx + r * Math.cos((Math.PI/180) * phi_start);
  y1 = cy + r * Math.sin((Math.PI/180) * phi_start);
  x2 = cx + r * Math.cos((Math.PI/180) * phi_stop);
  y2 = cy + r * Math.sin((Math.PI/180) * phi_stop);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  a = "A" + [r.toFixed(pcn),r.toFixed(pcn),0,0,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a;
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);

  // Spica
  starname = "SPICA";
  starpathname = "spica_text";
  star_textlength = 2.8 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  d = "M72,-1L" + [Rcapricorn.toFixed(pcn),-1];
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);

  // Deneb
  starname = "DENEB";
  starpathname = "deneb_text";
  star_textlength = 2.4 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  r = 8.7;
  cx = 0;
  cy = 0;
  phi_start = 148;
  phi_stop = phi_start + 90;
  x1 = cx + r * Math.cos((Math.PI/180) * phi_start);
  y1 = cy + r * Math.sin((Math.PI/180) * phi_start);
  x2 = cx + r * Math.cos((Math.PI/180) * phi_stop);
  y2 = cy + r * Math.sin((Math.PI/180) * phi_stop);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  a = "A" + [r.toFixed(pcn),r.toFixed(pcn),0,0,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a;
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);

  // Alkaid
  starname = "ALKAID";
  starpathname = "alkaid_text";
  star_textlength = 2.4 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  r = 8.7;
  cx = 0;
  cy = 0;
  phi_start = 312;
  phi_stop = phi_start + 90;
  x1 = cx + r * Math.cos((Math.PI/180) * phi_start);
  y1 = cy + r * Math.sin((Math.PI/180) * phi_start);
  x2 = cx + r * Math.cos((Math.PI/180) * phi_stop);
  y2 = cy + r * Math.sin((Math.PI/180) * phi_stop);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  a = "A" + [r.toFixed(pcn),r.toFixed(pcn),0,0,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a;
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);

  // Alphard
  starname = "ALPHARD";
  starpathname = "alphard_text";
  star_textlength = 3.0 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  r = Rcancer - 10;
  cx = 60.0;
  cy = 20.2;
  phi_start = 106;
  phi_stop = phi_start + 90;
  x1 = cx + r * Math.cos((Math.PI/180) * phi_start);
  y1 = cy + r * Math.sin((Math.PI/180) * phi_start);
  x2 = cx + r * Math.cos((Math.PI/180) * phi_stop);
  y2 = cy + r * Math.sin((Math.PI/180) * phi_stop);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  a = "A" + [r.toFixed(pcn),r.toFixed(pcn),0,1,0,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a;
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);

  // Diphda
  starname = "DIPHDA";
  starpathname = "diphda_text";
  star_textlength = 2.9 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  d = "M-74.5,3.0L0.0,3.0" ;
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);

  // Algol
  starname = "ALGOL";
  starpathname = "algol_text";
  star_textlength = 2.7 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  d = "M-26.5,3.0L0.0,3.0" ;
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);

  // Alphecca
  starname = "ALPHECCA";
  starpathname = "alphecca_text";
  star_textlength = 3.0 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  r = Rcancer - 11.5;
  cx = 61.3;
  cy = -27.0;
  phi_start = 155;
  phi_stop = phi_start + 90;
  x1 = cx + r * Math.cos((Math.PI/180) * phi_start);
  y1 = cy + r * Math.sin((Math.PI/180) * phi_start);
  x2 = cx + r * Math.cos((Math.PI/180) * phi_stop);
  y2 = cy + r * Math.sin((Math.PI/180) * phi_stop);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  a = "A" + [r.toFixed(pcn),r.toFixed(pcn),0,0,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a;
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);

  // Baten Kaitos
  starname = "BATEN KAITOS";
  starpathname = "batenkaitos_text";
  star_textlength = 2.7 * starname.length;
  p = document.createElementNS(xmlns, "path");
  p.setAttributeNS(null, "id", starpathname);
  r = Rcancer - 10;
  cx = -60.0;
  cy = 20.2;
  phi_start = 139;
  phi_stop = phi_start + 90;
  x1 = cx + r * Math.cos((Math.PI/180) * phi_start);
  y1 = cy + r * Math.sin((Math.PI/180) * phi_start);
  x2 = cx + r * Math.cos((Math.PI/180) * phi_stop);
  y2 = cy + r * Math.sin((Math.PI/180) * phi_stop);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  a = "A" + [r.toFixed(pcn),r.toFixed(pcn),0,1,0,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a;
  p.setAttributeNS(null, "d", d);
  p.setAttributeNS(null, "fill", "none");
  starnames_textgroup.appendChild(p);
  startext = document.createElementNS(xmlns, "text");
  starnames_textgroup.appendChild(startext);
  startextPath = document.createElementNS(xmlns, "textPath");
  startextPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#"+starpathname);
  startextPath.setAttributeNS(null, "textLength", star_textlength);
  startext.appendChild(startextPath);
  startext.setAttributeNS(null, "textLength", star_textlength);
  startext.setAttributeNS(null, "lengthAdjust", "spacing");
  startextnode = document.createTextNode(starname);
  startextPath.appendChild(startextnode);
 
//------------------------------
//--- Star Pointers ------------
//------------------------------ 
  var starpointer_group = document.getElementById("starpointer_group");
  var r_base = 2.5;
  var base_offset = 13.5;
  var r_aperture = 1.4;
  var pcn = 4;

  // Sirius
  var starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  var x_star = -75.292666895846139;
  var y_star = -15.027288040737258;
  var x_base = -68; 
  var y_base = -10.9;
  var phi_open = 330;
  var phi_close = 240;
  var x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  var y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  var d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  var x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  var y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  var a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  var base_control_x1 = x2; 
  var base_control_y1 = y2;
  var star_control_x1 = (x2 + x_star)/2 + 1.6;
  var star_control_y1 = (y2 + y_star)/2 - 1.5;
  var c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  var base_control_x2 = x1;
  var base_control_y2 = y1;
  var star_control_x2 = (x1 + x_star)/2 + 2.5;
  var star_control_y2 = (y1 + y_star)/2 - 3;
  var c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  var a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  var a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);


  // Capella
  var capellaPath = document.getElementById("capella");
  x_star = -22.663215350770002;
  y_star = 4.3345243487683573;
  x1 = -12.0;
  y1 = 2.0;
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  base_control_x1 = x1; 
  base_control_y1 = y1;
  star_control_x1 = (x1 + x_star)/2 - 1.0;
  star_control_y1 = (y1 + y_star)/2 - 2.0;
  x2 = -20.0;
  y2 = 0.0;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 =  x2; 
  base_control_y2 = y2;
  star_control_x2 = (x2 + x_star)/2 - 2.0;
  star_control_y2 = (y2 + y_star)/2 + 2.0;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x2.toFixed(pcn),y2.toFixed(pcn)];
  d += c2;
  capellaPath.setAttributeNS(null, "d", d);
  capellaPath.setAttributeNS(null, "transform", "rotate(-270)");


  // Vega
  starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  x_star = 27.016563575148876;
  y_star = 4.3924593049816272;
  x_base = base_offset; 
  y_base = 0;
  phi_open = 85;
  phi_close = -15;
  x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  base_control_x1 = 16.5; 
  base_control_y1 = 3;
  star_control_x1 = 26;
  star_control_y1 = -7.3;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 = 17;
  base_control_y2 = 3.0;
  star_control_x2 = 24.5;
  star_control_y2 = -4.5;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);

  // Procyon
  starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  x_star = -47.306697345422918;
  y_star = -21.884216173651016;
  x_base = -53; 
  y_base = -17;
  phi_open = 60;
  phi_close = 340;
  x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  base_control_x1 = x2; 
  base_control_y1 = y2;
  star_control_x1 = (x2 + x_star)/2 + .5;
  star_control_y1 = (y2 + y_star)/2 + 1.5;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 = x1;
  base_control_y2 = y1;
  star_control_x2 = (x1 + x_star)/2 + 1.5;
  star_control_y2 = (y1 + y_star)/2 + 1.5;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);

  // Altair
  starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  x_star = 43.286684489967271;
  y_star = 22.72198592431684;
  x_base = 48.7; 
  y_base = 16;
  phi_open = 230;
  phi_close = 165;
  x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  base_control_x1 = x2; 
  base_control_y1 = y2;
  star_control_x1 = (x2 + x_star)/2 - 1.0;
  star_control_y1 = (y2 + y_star)/2 - 1.5;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 = x1;
  base_control_y2 = y1;
  star_control_x2 = (x1 + x_star)/2 - 2.2;
  star_control_y2 = (y1 + y_star)/2 - 2.0;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);

  // Aldebaran
  starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  x_star = -39.79970413796368;
  y_star = 15.293632674451914;
  x_base = -52.1; 
  y_base = 20.0;
  phi_open = 18;
  phi_close = 340;
  x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  base_control_x1 = x2; 
  base_control_y1 = y2;
  star_control_x1 = (x2 + x_star)/2 + 0.0;
  star_control_y1 = (y2 + y_star)/2 + 2.0;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 = x1;
  base_control_y2 = y1;
  star_control_x2 = (x1 + x_star)/2 + 0.0;
  star_control_y2 = (y1 + y_star)/2 + 2.0;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);

  // Spica
  starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  x_star = 25.235298313340998;
  y_star = -64.730817060470997;
  x_base = 5.4; 
  y_base = -74.0;
  phi_open = -20;
  phi_close = -90;
  x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  base_control_x1 = x2; 
  base_control_y1 = y2 - 0.3;
  star_control_x1 = (x2 + x_star)/2 + 3.0;
  star_control_y1 = (y2 + y_star)/2 - 4.8;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 = x1;
  base_control_y2 = y1;
  star_control_x2 = (x1 + x_star)/2 + 1.1;
  star_control_y2 = (y1 + y_star)/2 - 3.8;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);

  // Deneb
  starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  x_star = 17.900605429516695;
  y_star = 15.211946172360358;
  x_base = base_offset * Math.cos((Math.PI/180) * 50); 
  y_base = base_offset * Math.sin((Math.PI/180) * 50);
  phi_open = 140;
  phi_close = 70;
  x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  base_control_x1 = x2; 
  base_control_y1 = y2;
  star_control_x1 = (x2 + x_star)/2 - 2.0;
  star_control_y1 = (y2 + y_star)/2 + 0.8;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 = x1;
  base_control_y2 = y1;
  star_control_x2 = (x1 + x_star)/2 - 3.4;
  star_control_y2 = (y1 + y_star)/2 + 2.6;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);

  // Alkaid
  starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  x_star = 9.5747977688221759;
  y_star = -18.885220524443938;
  x_base = base_offset * Math.cos((Math.PI/180) * 50); 
  y_base = -base_offset * Math.sin((Math.PI/180) * 50);
  phi_open = 40;
  phi_close = 320;
  x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  base_control_x1 = x2; 
  base_control_y1 = y2;
  star_control_x1 = (x2 + x_star)/2 + 1.5;
  star_control_y1 = (y2 + y_star)/2 + 1.0;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 = x1;
  base_control_y2 = y1;
  star_control_x2 = (x1 + x_star)/2 + 4.3;
  star_control_y2 = (y1 + y_star)/2 + 1.5;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);
   
  // Alphard
  starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  x_star = -41.012591901002999;
  y_star = -52.298999278432206;
  x_base = -43.2; 
  y_base = -62.0;
  phi_open = 10;
  phi_close = 295;
  x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  base_control_x1 = x2 + 0.2; 
  base_control_y1 = y2;
  star_control_x1 = (x2 + x_star)/2 + 6.0;
  star_control_y1 = (y2 + y_star)/2 - 3.7;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 = x1;
  base_control_y2 = y1;
  star_control_x2 = (x1 + x_star)/2 + 2.5;
  star_control_y2 = (y1 + y_star)/2 - 2.2;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);

  // Diphda
  starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  x_star = -14.856168326256588;
  y_star = 77.165245395260513;
  x_base = -5.4; 
  y_base = 71.5;
  phi_open = 270;
  phi_close = 190;
  x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  base_control_x1 = x2; 
  base_control_y1 = y2;
  star_control_x1 = (x2 + x_star)/2 + 0.0;
  star_control_y1 = (y2 + y_star)/2 - 2.2;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 = x1;
  base_control_y2 = y1;
  star_control_x2 = (x1 + x_star)/2 - 0.5;
  star_control_y2 = (y1 + y_star)/2 - 4.8;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);

  // Algol
  starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  x_star = -19.066323413652416;
  y_star = 17.753484240032662;
  x_base = -5.2; 
  y_base = 18.0;
  phi_open = 300;
  phi_close = 223;
  x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  base_control_x1 = x2; 
  base_control_y1 = y2;
  star_control_x1 = (x2 + x_star)/2 + 4.0;
  star_control_y1 = (y2 + y_star)/2 - 2.4;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 = x1;
  base_control_y2 = y1;
  star_control_x2 = (x1 + x_star)/2 + 3.6;
  star_control_y2 = (y1 + y_star)/2 - 4.7;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);

  // Alphecca
  starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  x_star = 28.351495748789326;
  y_star = -20.847530628733796;
  x_base = 29.0; 
  y_base = -31.0;
  phi_open = 68;
  phi_close = 348;
  x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  base_control_x1 = x2; 
  base_control_y1 = y2;
  star_control_x1 = (x2 + x_star)/2 + 3.2;
  star_control_y1 = (y2 + y_star)/2 - 0.5;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 = x1;
  base_control_y2 = y1;
  star_control_x2 = (x1 + x_star)/2 + 2.4;
  star_control_y2 = (y1 + y_star)/2 - 2.5;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);

  // Baten Kaitos
  starpointer = document.createElementNS(xmlns, "path"); 
  starpointer_group.appendChild(starpointer);
  x_star = -31.999075128718012;
  y_star = 60.525155761908245;
  x_base = -42.7; 
  y_base = 65.0;
  phi_open = 75;
  phi_close = 0;
  x1 = x_base + r_base * Math.cos((Math.PI/180) * phi_open);
  y1 = y_base + r_base * Math.sin((Math.PI/180) * phi_open);
  d = "M" + [x1.toFixed(pcn),y1.toFixed(pcn)];
  x2 = x_base + r_base * Math.cos((Math.PI/180) * phi_close);
  y2 = y_base + r_base * Math.sin((Math.PI/180) * phi_close);
  a1 = "A" + [r_base,r_base,0,1,1,x2.toFixed(pcn),y2.toFixed(pcn)];
  d += a1;
  base_control_x1 = x2; 
  base_control_y1 = y2;
  star_control_x1 = (x2 + x_star)/2 - 1.0;
  star_control_y1 = (y2 + y_star)/2 + 2.0;
  c1 = "C" + [base_control_x1.toFixed(pcn),base_control_y1.toFixed(pcn),star_control_x1.toFixed(pcn),star_control_y1.toFixed(pcn),x_star.toFixed(pcn),y_star.toFixed(pcn)];
  d += c1;
  base_control_x2 = x1;
  base_control_y2 = y1;
  star_control_x2 = (x1 + x_star)/2 + 0.5;
  star_control_y2 = (y1 + y_star)/2 + 2.1;
  c2 = "C" + [star_control_x2.toFixed(pcn),star_control_y2.toFixed(pcn),base_control_x2.toFixed(pcn),base_control_y2.toFixed(pcn),x1.toFixed(pcn),y1.toFixed(pcn)];
  d += c2;
  d += "M" + [(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a2 = "A" + [r_aperture,r_aperture,0,1,1,(x_base + r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  a3 = "A" + [r_aperture,r_aperture,0,1,1,(x_base - r_aperture).toFixed(pcn),y_base.toFixed(pcn)];
  d += a2 + a3;
  starpointer.setAttributeNS(null, "d", d);
  
//------------------------------
//---------- Moon
//------------------------------
  var moonGroup = document.getElementById("moonGroup");
  
  // Moon
  var Moon = document.createElementNS(xmlns, "circle");
  Moon.setAttributeNS(null, "id", "Moon");
  var rmoon = 1.3*rPlanet;
  Moon.cx.baseVal.value = 0;
  Moon.cy.baseVal.value = 0;
  Moon.r.baseVal.value = rmoon;
  Moon.setAttributeNS(null, "fill", "rgb(0,0,10)");
  moonGroup.appendChild(Moon);

  // Moon Face
  var moonface =  document.createElementNS(xmlns, "path");
  moonGroup.appendChild(moonface);
  moonface.setAttributeNS(null, "id", "moonface");
  moonface.setAttributeNS(null, "d", "");
  moonface.setAttributeNS(null, "stroke", "none");
  moonface.setAttributeNS(null, "fill", "rgb(255,250,235)");


//------------------------------
//---------- Sun
//------------------------------
  var sunGroup = document.getElementById("sunGroup");
  sunGroup.setAttributeNS(null, "id", "sunGroup");
  sunGroup.setAttributeNS(null, "fill", "rgb(255,250,245)");
  sunGroup.setAttributeNS(null, "stroke", "rgb(150,70,30)");
  sunGroup.setAttributeNS(null, "stroke-width", .5);
  sunGroup.setAttributeNS(null, "transform","translate(0,0)");
  
  var rSun = rPlanet;
  var xSun = 0;
  var ySun = 0;
  var rRay = 1.0*rSun
  var rRay2 = 2.5*rSun
  var qRay = 15*(Math.PI/180); // the angular-width of the sun-rays
  
  for(var q1=0;q1<2*Math.PI;q1+=Math.PI/6)
  {
    var p = document.createElementNS(xmlns, "path");
    var m1 = [xSun+rRay*Math.cos(q1+qRay),ySun+rRay*Math.sin(q1+qRay)];
    var l1 = [xSun+rRay*Math.cos(q1-qRay),ySun+rRay*Math.sin(q1-qRay)];
    var l2 = [xSun+rRay2*Math.cos(q1),ySun+rRay2*Math.sin(q1)];
    var pString = "M"+m1+"L"+l1+"L"+l2+"Z";
    p.setAttributeNS(null, "d", pString);
    sunGroup.appendChild(p);
  }

  var c = document.createElementNS(xmlns, "circle");
  c.cx.baseVal.value = xSun;
  c.cy.baseVal.value = ySun;
  c.r.baseVal.value = rSun;
  sunGroup.appendChild(c);

	$("#sunGroup").on("vmouseover", function(){
	  $(this).css("cursor","pointer");
	});
  sunGroup.addEventListener("click", sunClick);
  function sunClick(){
    document.getElementById("sunpin_span").innerHTML = 1;
    planet_advance();
  }
  
//------------------------------
//---------- Mercury
//------------------------------
  
  // Mercury Radial Gradient
  var mercuryGrad = document.getElementById("mercuryGrad"); 
  var stop1 = document.createElementNS(xmlns, "stop");
  stop1.setAttributeNS(null, "offset", "1%");
  stop1.setAttributeNS(null, "stop-color", "rgb(255,255,255)");
  mercuryGrad.appendChild(stop1);
  var stop2 = document.createElementNS(xmlns, "stop");
  stop2.setAttributeNS(null, "offset", "100%");
  stop2.setAttributeNS(null, "stop-color", "rgb(100,100,150)");
  mercuryGrad.appendChild(stop2);
  mercuryGrad.setAttributeNS(null, "cx", .7);
  mercuryGrad.setAttributeNS(null, "cy", .5);

  // Mercury
  var mercuryplanet = document.getElementById("mercuryplanet");
  mercuryplanet.setAttributeNS(null, "r", 0.7 * rPlanet); 

  // Glyph
  var mercurytext = document.getElementById("mercurytext"); 
  mercurytext.setAttributeNS(null, "fill", "rgb(245,245,245)");
  mercurytext.setAttributeNS(null,"font-size","4.4");
  mercurytext.setAttributeNS(null,"font-family","arial");
  mercurytext.setAttributeNS(null, "stroke", "rgb(245,245,245)");
  mercurytext.setAttributeNS(null, "stroke-width", "0.3");
  mercurytext.setAttributeNS(null,"text-anchor","middle");
  mercurytext.setAttributeNS(null,"dx","0");
  mercurytext.setAttributeNS(null,"dy","1.3");


//------------------------------
//---------- Venus
//------------------------------
  
  // Venus Radial Gradient
  var venusGrad = document.getElementById("venusGrad"); 
  var stop1 = document.createElementNS(xmlns, "stop");
  stop1.setAttributeNS(null, "id", "stop1");
  stop1.setAttributeNS(null, "offset", "1%");
  stop1.setAttributeNS(null, "stop-color", "rgb(255,255,200)");
  venusGrad.appendChild(stop1);
  var stop2 = document.createElementNS(xmlns, "stop");
  stop2.setAttributeNS(null, "id", "stop2");
  stop2.setAttributeNS(null, "offset", "100%");
  stop2.setAttributeNS(null, "stop-color", "rgb(200,100,20)");
  venusGrad.appendChild(stop2);
  venusGrad.setAttributeNS(null, "cx", .7);
  venusGrad.setAttributeNS(null, "cy", .5);

  // Venus
  var venusplanet = document.getElementById("venusplanet");
  venusplanet.setAttributeNS(null, "r", rPlanet); 

  // Glyph
  var venustext = document.getElementById("venustext"); 
  venustext.setAttributeNS(null, "fill", "rgb(255,245,245)");
  venustext.setAttributeNS(null,"font-size","4.5");
  venustext.setAttributeNS(null,"font-family","arial");
  venustext.setAttributeNS(null, "stroke", "rgb(255,245,245)");
  venustext.setAttributeNS(null, "stroke-width", "0.4");
  venustext.setAttributeNS(null,"text-anchor","middle");
  venustext.setAttributeNS(null,"dx","0");
  venustext.setAttributeNS(null,"dy","1.3");


//------------------------------
//---------- Mars
//------------------------------
  
  // Mars Radial Gradient
  var marsGrad = document.getElementById("marsGrad"); 
  var stop1 = document.createElementNS(xmlns, "stop");
  stop1.setAttributeNS(null, "id", "stop1");
  stop1.setAttributeNS(null, "offset", "1%");
  stop1.setAttributeNS(null, "stop-color", "rgb(255,120,120)");
  marsGrad.appendChild(stop1);
  var stop2 = document.createElementNS(xmlns, "stop");
  stop2.setAttributeNS(null, "id", "stop2");
  stop2.setAttributeNS(null, "offset", "100%");
  stop2.setAttributeNS(null, "stop-color", "rgb(100,0,0)");
  marsGrad.appendChild(stop2);
  marsGrad.setAttributeNS(null, "cx", .7);
  marsGrad.setAttributeNS(null, "cy", .5);


  // Mars 
  var marsplanet = document.getElementById("marsplanet");
  marsplanet.setAttributeNS(null, "r", rPlanet); 

  // Glyph
  var marstext = document.getElementById("marstext"); 
  marstext.setAttributeNS(null, "fill", "rgb(255,245,245)");
  marstext.setAttributeNS(null,"font-size","4.5");
  marstext.setAttributeNS(null,"font-family","arial");
  marstext.setAttributeNS(null, "stroke", "rgb(255,245,245)");
  marstext.setAttributeNS(null, "stroke-width", "0.4");
  marstext.setAttributeNS(null,"text-anchor","middle");
  marstext.setAttributeNS(null,"dx","0");
  marstext.setAttributeNS(null,"dy","1.3");


//------------------------------
//---------- Jupiter
//------------------------------

  // Jupiter Radial Gradient
  var jupiterGrad = document.getElementById("jupiterGrad"); 
  var stop1 = document.createElementNS(xmlns, "stop");
  stop1.setAttributeNS(null, "offset", "1%");
  stop1.setAttributeNS(null, "stop-color", "rgb(0,220,0)");
  jupiterGrad.appendChild(stop1);
  var stop2 = document.createElementNS(xmlns, "stop");
  stop2.setAttributeNS(null, "offset", "100%");
  stop2.setAttributeNS(null, "stop-color", "rgb(0,50,0)");
  jupiterGrad.appendChild(stop2);
  jupiterGrad.setAttributeNS(null, "cx", .7);
  jupiterGrad.setAttributeNS(null, "cy", .5);

  // Jupiter
  var jupiterplanet = document.getElementById("jupiterplanet");
  jupiterplanet.setAttributeNS(null, "r", 1.2*rPlanet); 

  // Glyph
  var jupitertext = document.getElementById("jupitertext"); 
  jupitertext.setAttributeNS(null, "fill", "rgb(230,255,230)");
  jupitertext.setAttributeNS(null,"font-size","5.5");
  jupitertext.setAttributeNS(null,"font-family","georgia");
  jupitertext.setAttributeNS(null, "stroke", "none");
  jupitertext.setAttributeNS(null, "stroke", "rgb(230,255,230)");
  jupitertext.setAttributeNS(null, "stroke-width", "0.2");
  jupitertext.setAttributeNS(null,"text-anchor","middle");
  jupitertext.setAttributeNS(null,"dx","0");
  jupitertext.setAttributeNS(null,"dy","2");


//------------------------------
//---------- Saturn
//------------------------------
  
  // Saturn Radial Gradient
  var saturnGrad = document.getElementById("saturnGrad"); 
  var stop1 = document.createElementNS(xmlns, "stop");
  stop1.setAttributeNS(null, "offset", "1%");
  stop1.setAttributeNS(null, "stop-color", "rgb(215,215,215)");
  saturnGrad.appendChild(stop1);
  var stop2 = document.createElementNS(xmlns, "stop");
  stop2.setAttributeNS(null, "offset", "100%");
  stop2.setAttributeNS(null, "stop-color", "rgb(0,0,0)");
  saturnGrad.appendChild(stop2);
  saturnGrad.setAttributeNS(null, "cx", .7);
  saturnGrad.setAttributeNS(null, "cy", .5);

  // Saturn
  var saturnplanet = document.getElementById("saturnplanet");
  saturnplanet.setAttributeNS(null, "r", rPlanet);
  saturnplanet.setAttributeNS(null, "stroke", "none");

  // Glyph
  var saturntext = document.getElementById("saturntext"); 
  saturntext.setAttributeNS(null, "fill", "rgb(240,240,240)");
  saturntext.setAttributeNS(null,"font-size","5.5");
  saturntext.setAttributeNS(null,"font-family","arial");
  saturntext.setAttributeNS(null, "stroke", "rgb(240,240,240)");
  saturntext.setAttributeNS(null, "stroke-width", "0.2");
  saturntext.setAttributeNS(null,"text-anchor","middle");
  saturntext.setAttributeNS(null,"dx","0");
  saturntext.setAttributeNS(null,"dy","2");


//------------------------------
//--- Rete drag functionality --
//------------------------------
  var rete_drag = d3.drag()
  .on("start", function() {
    stop_button_pressed();
    var x = d3.event.x;
    var y = d3.event.y;
    var phi0 = (180/Math.PI) * Math.atan2(y, x);
    document.getElementById("cursor_phi0").innerHTML = phi0;
    document.getElementById("fringe_counter").innerHTML = 0;
    var rete_rotation_0 = document.getElementById("reteGroup").getAttribute("transform");
    rete_rotation_0 = rete_rotation_0.replace("rotate(", "");
    rete_rotation_0 = (Number(rete_rotation_0.replace(")", ""))) % 360;
    document.getElementById("reterot0").innerHTML = rete_rotation_0;
    document.getElementById("jdlocalbuffer").innerHTML = document.getElementById("julian_day_local").innerHTML;
  })
  .on("drag", function() {
    var phi0 = Number(document.getElementById("cursor_phi0").innerHTML);
    var fringes = Number(document.getElementById("fringe_counter").innerHTML);
    var x = d3.event.x;
    var y = d3.event.y;
    var phi1 = (180/Math.PI) * Math.atan2(y, x);
    var dphi = phi1 - Number(document.getElementById("cursor_phi1").innerHTML);
    if(Math.abs(dphi) > 100){
      fringes -= Math.sign(dphi);
    }
    var rete_rotation_0 = Number(document.getElementById("reterot0").innerHTML);
    var rete_rotation_1 = rete_rotation_0 + 360 * fringes + phi1 - phi0;
    var transform_string = "rotate(" + (rete_rotation_1 % 360) + ")";
    var delta_theta = (rete_rotation_0 - rete_rotation_1);
    var jd_local0 = Number(document.getElementById("jdlocalbuffer").innerHTML);
    var jd_local = jd_local0 + (delta_theta / 360) * (1/1.00273790935);
    wheelSet(jd_local);
    update_text_from_local(jd_local);
    reteGroup.setAttribute("transform", transform_string);
    document.getElementById("cursor_phi1").innerHTML = phi1;
    document.getElementById("dphi_span").innerHTML = dphi;
    document.getElementById("fringe_counter").innerHTML = fringes;
    document.getElementById("reterot1").innerHTML = (rete_rotation_1 % 360);
    document.getElementById("dtheta_span").innerHTML = delta_theta;
  })
  .on("end", function() {
    document.getElementById("fringe_counter").innerHTML = 0;
  });
  d3.select("#reteGroup").call(rete_drag);

  $("#reteGroup").on("vmouseover", function(){
    $(this).css("cursor","pointer");
  });

//------------------------------
//--- Rete drag functionality --
//------------------------------
  var rete_drag = d3.drag()
  .on("start", function() {
    stop_button_pressed();
    var x = d3.event.x;
    var y = d3.event.y;
    var phi0 = (180/Math.PI) * Math.atan2(y, x);
    document.getElementById("cursor_phi0").innerHTML = phi0;
    document.getElementById("fringe_counter").innerHTML = 0;
    var rete_rotation_0 = document.getElementById("reteGroup").getAttribute("transform");
    rete_rotation_0 = rete_rotation_0.replace("rotate(", "");
    rete_rotation_0 = (Number(rete_rotation_0.replace(")", ""))) % 360;
    document.getElementById("reterot0").innerHTML = rete_rotation_0;
    document.getElementById("jdlocalbuffer").innerHTML = document.getElementById("julian_day_local").innerHTML;
  })
  .on("drag", function() {
    var phi0 = Number(document.getElementById("cursor_phi0").innerHTML);
    var fringes = Number(document.getElementById("fringe_counter").innerHTML);
    var x = d3.event.x;
    var y = d3.event.y;
    var phi1 = (180/Math.PI) * Math.atan2(y, x);
    var dphi = phi1 - Number(document.getElementById("cursor_phi1").innerHTML);
    if(Math.abs(dphi) > 100){
      fringes -= Math.sign(dphi);
    }
    var rete_rotation_0 = Number(document.getElementById("reterot0").innerHTML);
    var rete_rotation_1 = rete_rotation_0 + 360 * fringes + phi1 - phi0;
    var transform_string = "rotate(" + (rete_rotation_1 % 360) + ")";
    var delta_theta = (rete_rotation_0 - rete_rotation_1);
    var jd_local0 = Number(document.getElementById("jdlocalbuffer").innerHTML);
    var jd_local = jd_local0 + (delta_theta / 360) * (1/1.00273790935);
    wheelSet(jd_local);
    update_text_from_local(jd_local);
    reteGroup.setAttribute("transform", transform_string);
    document.getElementById("cursor_phi1").innerHTML = phi1;
    document.getElementById("dphi_span").innerHTML = dphi;
    document.getElementById("fringe_counter").innerHTML = fringes;
    document.getElementById("reterot1").innerHTML = (rete_rotation_1 % 360);
    document.getElementById("dtheta_span").innerHTML = delta_theta;
  })
  .on("end", function() {
    document.getElementById("fringe_counter").innerHTML = 0;
  });
  d3.select("#reteGroup").call(rete_drag);

  $("#reteGroup").on("vmouseover", function(){
    $(this).css("cursor","pointer");
  });
  
//------------------------------
//--- End rete -----------------
//------------------------------  
}

//-----------------------------------
//--- Rotate rete -------------------
//-----------------------------------
function rotate_rete(){
  var lmst = Number(document.getElementById("lmst_span").innerHTML);
  var rete_transform_string = "rotate(" + ((270 - lmst) % 360).toFixed(4) + ")";
  document.getElementById("reteGroup").setAttributeNS(null, "transform", rete_transform_string);
  document.getElementById("starGroup").setAttributeNS(null, "transform", rete_transform_string);
  document.getElementById("planetsGroup").setAttributeNS(null, "transform", rete_transform_string);
} 

//------------------------------
//---------- RULE --------------
//------------------------------
function rule(){
  var ruleGroup = document.getElementById("ruleGroup");
  ruleGroup.setAttribute("stroke","rgb(105,85,60)");
  ruleGroup.setAttribute("stroke-width",0.25);
  ruleGroup.setAttribute("fill","rgb(240,220,115)");
  var rulepath = document.createElementNS(xmlns, "path");
  var rulewidth = 8;
  var d = "M" + [0,0];
  var x_top_edge = 98;
  var y_top_edge = 0;
  var l1 = "L" + [x_top_edge, y_top_edge];
  d += l1;
  var fiducial_width = 1;
  var x_fiducial = x_top_edge;
  var y_fiducial = y_top_edge + fiducial_width;
  var l2 = "L" + [x_fiducial, y_fiducial];
  d += l2;
  var x_bottom_edge = x_top_edge - 4;
  var y_bottom_edge = y_top_edge + rulewidth;
  var r2 = rulewidth;
  var a2 = "A" + [r2,r2,0,0,0,x_bottom_edge,y_bottom_edge];
  d += a2;
  var l3 = "L" + [0, y_bottom_edge];
  d += l3 + "Z";
  rulepath.setAttributeNS(null, "d", d);
  ruleGroup.appendChild(rulepath);

  var fiducial_line = document.createElementNS(xmlns, "path");
  var fiducial_linewidth = .3;
  d = "M" + [0, fiducial_linewidth/2] + "L" + [x_top_edge, fiducial_linewidth/2];
  fiducial_line.setAttributeNS(null, "d", d);
  fiducial_line.setAttribute("stroke","rgb(105,85,60)");
  fiducial_line.setAttributeNS(null, "stroke-width", fiducial_linewidth);
  ruleGroup.appendChild(fiducial_line);

  var rule_midline = document.createElementNS(xmlns, "path");
  var midrule_y = 3;
  d = "M" + [0, midrule_y] + "L" + [Rcapricorn, midrule_y];
  rule_midline.setAttributeNS(null, "d", d);
  ruleGroup.appendChild(rule_midline);

  var caparc = document.createElementNS(xmlns, "path");
  var caparc_theta = Math.asin(rulewidth/Rcapricorn);
  var x2 = Rcapricorn * Math.cos(caparc_theta);
  d = "M" + [Rcapricorn, 0] + "A" + [Rcapricorn,Rcapricorn,0,0,1,x2, rulewidth];
  caparc.setAttributeNS(null, "d", d);
  ruleGroup.appendChild(caparc);

  for (dec=-20;dec<70;dec+=10){
    var decarc = document.createElementNS(xmlns, "path");
    var Rarc = Req*Math.tan((Math.PI/180) * ((90 - dec)/2));
    var yheight = midrule_y;
    d = "M" + [Rarc,0] + "L" + [Rarc, yheight];
    decarc.setAttributeNS(null, "d", d);
    ruleGroup.appendChild(decarc);
  }

  for (dec=-15;dec<70;dec+=10){
    var decarc = document.createElementNS(xmlns, "path");
    var Rarc = Req*Math.tan((Math.PI/180) * ((90 - dec)/2));
    d = "M" + [Rarc,0] + "L" + [Rarc,midrule_y/2.5];
    decarc.setAttributeNS(null, "d", d);
    ruleGroup.appendChild(decarc);
  }

  var hubcircle = document.createElementNS(xmlns, "circle");
  ruleGroup.appendChild(hubcircle);
  hubcircle.setAttributeNS(null, "cx", "0"); 
  hubcircle.setAttributeNS(null, "cy", "0");
  hubcircle.setAttributeNS(null, "r", "8");
  hubcircle.setAttributeNS(null, "fill", "rgb(245,225,120)");

  var hubcircle2 = document.createElementNS(xmlns, "circle");
  hubcircle2.setAttribute("stroke","rgb(125,105,80)");
  ruleGroup.appendChild(hubcircle2);
  hubcircle2.setAttributeNS(null, "cx", "0"); 
  hubcircle2.setAttributeNS(null, "cy", "0");
  hubcircle2.setAttributeNS(null, "r", "7.4");
  hubcircle2.setAttributeNS(null, "fill", "rgb(245,225,120)");

  var bosscircle = document.createElementNS(xmlns, "circle");
  ruleGroup.appendChild(bosscircle);
  bosscircle.setAttributeNS(null, "cx", "0"); 
  bosscircle.setAttributeNS(null, "cy", "0");
  bosscircle.setAttributeNS(null, "r", "4");
  bosscircle.setAttributeNS(null, "fill", "rgb(245,225,120)");

  var rivet1 = document.createElementNS(xmlns, "circle");
  ruleGroup.appendChild(rivet1);
  rivet1.setAttributeNS(null, "cx", "0"); 
  rivet1.setAttributeNS(null, "cy", "5");
  rivet1.setAttributeNS(null, "r", "0.5");
  rivet1.setAttributeNS(null, "fill", "none");

  var rivet2 = document.createElementNS(xmlns, "circle");
  ruleGroup.appendChild(rivet2);
  rivet2.setAttributeNS(null, "cx", "0"); 
  rivet2.setAttributeNS(null, "cy", "-5");
  rivet2.setAttributeNS(null, "r", "0.5");
  rivet2.setAttributeNS(null, "fill", "none");

  //---------- rule text ----------
  var g = document.createElementNS(xmlns, "g");
  ruleGroup.appendChild(g);
  g.setAttributeNS(null,"transform","scale(1,-1)");
  g.setAttributeNS(null,"font-size","2.5");
  g.setAttributeNS(null,"font-family","georgia");
  g.setAttributeNS(null, "fill", "rgb(105,85,60)");
  g.setAttributeNS(null, "fill", "rgb(125,105,80)");
  g.setAttributeNS(null, "stroke", "none");
  g.setAttributeNS(null, "text-anchor", "left");
  g.setAttributeNS(null, "id", "rule_textgroup");

  var gmer = document.createElementNS(xmlns, "g");
  g.appendChild(gmer);
  var tx = document.createElementNS(xmlns, "text");
	tx.setAttributeNS(null,"x", Req + 2);
	tx.setAttributeNS(null,"y", -(midrule_y + 1.5));
  tx.setAttribute("textLength", 26);
  var tn = document.createTextNode("DECLINATIO MERI");
  tx.appendChild(tn);
	gmer.appendChild(tx);

  var gdiv = document.createElementNS(xmlns, "g");
  g.appendChild(gdiv);
  gdiv.setAttributeNS(null, "text-anchor", "middle");
  gdiv.setAttributeNS(null,"font-size","2.5");
  var tx = document.createElementNS(xmlns, "text");
	tx.setAttributeNS(null,"x", Req);
	tx.setAttributeNS(null,"y", -(midrule_y + 1.5));
  var tn = document.createTextNode("✧");
  tx.appendChild(tn);
	gdiv.appendChild(tx);

  var gsep = document.createElementNS(xmlns, "g");
  g.appendChild(gsep);
  gsep.setAttributeNS(null,"transform","scale(-1,-1)");
  var tx = document.createElementNS(xmlns, "text");
	tx.setAttributeNS(null,"x", -(Req - 2));
	tx.setAttributeNS(null,"y", midrule_y + 3.2);
  tx.setAttribute("textLength", 45.5);
  var tn = document.createTextNode("DECLINATIO SEPTENTRIONALIS");
  tx.appendChild(tn);
	gsep.appendChild(tx);

//------------------------------
//--- rule drag functionality --
//------------------------------
  var rule_drag = d3.drag()
  .on("start", function() {
    $("#sunpin-flip").prop("checked", false).flipswitch("refresh");
    document.getElementById("sunpin_span").innerHTML = 0;
  })
  .on("drag", function() {
    var x = d3.event.x;
    var y = d3.event.y;
    var phi1 = (180/Math.PI) * Math.atan2(y, x);
    var transform_string = "rotate(" + (phi1 % 360) + ")";
    ruleGroup.setAttribute("transform", transform_string);
  })
  d3.select("#ruleGroup").call(rule_drag);
  $("#ruleGroup").on("vmouseover", function(){
    $(this).css("cursor","pointer");
  });

}

