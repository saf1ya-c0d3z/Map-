var xmlns = "http://www.w3.org/2000/svg";

//-----------------------------------
//--- Initialize buttons ------------
//-----------------------------------
function nav_button_init(){

	var fontcolor1 = "rgb(95,85,75)";
	var textlength = 86;

	var bannertop = document.getElementById("bannertop");
	var g = document.createElementNS(xmlns, "g");
	g.setAttribute("font-family", "'Book Antiqua', Palatino, serif");
	g.setAttribute("font-size", 7.2);
	g.setAttribute("font-weight", "normal");
	g.setAttribute("fill",fontcolor1);
	g.setAttribute("stroke","none");
	g.setAttribute("text-anchor","left");
	var tx = document.createElementNS(xmlns, "text");
	tx.setAttributeNS(null,"x",7);
	tx.setAttributeNS(null,"y",7.8);
	tx.setAttribute("textLength", textlength);
	var tn = document.createTextNode("ALEXANDER BOXER");
	tx.appendChild(tn);
	g.appendChild(tx);
	bannertop.appendChild(g);

	var button_names = ["navbutton1", "navbutton2", "navbutton3", "navbutton4"];
	var button_labels = [["Who?"], ["Book"], ["Star","Store"], ["More"]];
	var N = button_names.length;
	var icon_width = 10;
	var label_width = 10;
	var button_width = icon_width + label_width;
	var button_leftright_padding = (100 - textlength)/2;
	var button_spacing = (100 - 2*button_leftright_padding - N*button_width + 1)/3;
	var button_xoffset = 0;

	var navbutton_group = document.getElementById("navbutton_group");
	navbutton_group.setAttribute("font-family", "Georgia, serif")
	navbutton_group.setAttribute("font-size", 3);
	navbutton_group.setAttribute("font-weight", "normal");
	navbutton_group.setAttribute("font-style", "italic");
	navbutton_group.setAttribute("fill", fontcolor1);
	navbutton_group.setAttribute("stroke","none");
	navbutton_group.setAttribute("text-anchor","left");

	for (var i=0; i<N; i++){
		var g = document.getElementById(button_names[i] + "_group");
		var x = -50 + button_leftright_padding + button_width * i + button_spacing * i + button_xoffset;
		var rect = document.createElementNS(xmlns, "rect");
		rect.setAttribute("x", x);
		rect.setAttribute("y", -5);
		rect.setAttribute("width", button_width);
		rect.setAttribute("height", 10);
		rect.setAttribute("fill", "rgb(230,242,255)");
		rect.setAttribute("stroke", "none");
		rect.setAttribute("stroke-width", 0.25);
		g.appendChild(rect);
		// Create navbutton_icon groups
		var g_icon = document.createElementNS(xmlns, "g");
		g.appendChild(g_icon);
	 	g_icon.setAttribute("id", button_names[i] + "_icon_group");
		var icon_cx = x + (icon_width/2)
		var transform_string = "translate(" + icon_cx + ")";
		g_icon.setAttribute("transform", transform_string);
		var icon_rect = document.createElementNS(xmlns, "rect");
		icon_rect.setAttribute("x", -icon_width/2);
		icon_rect.setAttribute("y", -5);
		icon_rect.setAttribute("width", icon_width);
		icon_rect.setAttribute("height", 10);
		icon_rect.setAttribute("fill", "none");
		icon_rect.setAttribute("stroke", "none");
		icon_rect.setAttribute("stroke-width", 0.25);
		g_icon.appendChild(icon_rect);
		// Add button labels
		var y0 = .8;
		var n_strings = button_labels[i].length;
		for (var j=0; j<n_strings; j++){
			var tx = document.createElementNS(xmlns, "text");
			tx.setAttributeNS(null,"transform", "matrix(1,0,0,-1,0,0)");
			tx.setAttributeNS(null,"x", x + icon_width);
			tx.setAttributeNS(null,"dx",.5);
			var ytx = y0 + 3.6 * (j - (n_strings - 1)/2);
			tx.setAttributeNS(null,"y",ytx);
			var tn = document.createTextNode(button_labels[i][j]);
			tx.appendChild(tn);
			g.appendChild(tx);
		}
	}
	
	draw_navbutton1();
	draw_navbutton2();
	draw_navbutton3();
	draw_navbutton4();
	$(".navbutton").on("vmouseover", function(){
	  $(this).css("cursor","pointer");
	});
	document.getElementById("navbutton1_group").addEventListener("click", navbutton1_pressed);
	document.getElementById("navbutton2_group").addEventListener("click", navbutton2_pressed);
	document.getElementById("navbutton3_group").addEventListener("click", navbutton3_pressed);
	document.getElementById("navbutton4_group").addEventListener("click", navbutton4_pressed);

	// Draw toparrows
	for (var j=1; j<=5; j++){
		svg_id = "svg_toparrow" + String(j); 
		var svg_toparrow = document.getElementById(svg_id);
		var g0 = document.createElementNS(xmlns, "g");
		svg_toparrow.appendChild(g0);
		g0.setAttribute("transform", "matrix(1,0,0,-1,5,5)");
		var g1 = document.createElementNS(xmlns, "g");
		g0.appendChild(g1);
		g1.setAttribute("transform", "scale(0.9)");
		var p = document.createElementNS(xmlns, "path");
		g1.appendChild(p);
		var x = 3;
		var ybottom = -2.5;
		var ytop = 2.5;
		var ynotch = -.8;
		var d = "M"+[-x,ybottom]+"L"+[0,ytop]+"L"+[x,ybottom]+"L"+[0,ynotch]+"Z";
		p.setAttributeNS(null, "d", d);
		p.setAttributeNS(null, "fill", "rgb(95,85,75)");
		p.setAttributeNS(null, "stroke", "none");
	}


	$(".toparrow").on("vmouseover", function(){
	  $(this).css("cursor","pointer");
	});

	$(".toparrow").on("click", function(){
	  $('html, body').animate({scrollTop: 0}, 600);
	});
}

//-----------------------------------
//--- Rotation Functions ------------
//-----------------------------------
function Rot_x(v,theta_deg){
	var theta = (Math.PI/180) * theta_deg;
	var v_prime = new Array(v.length);
	for (var i=0; i<v_prime.length; i++){
		var x_prime = v[i][0];
		var y_prime = Math.cos(theta) * v[i][1] - Math.sin(theta) * v[i][2];
		var z_prime = Math.sin(theta) * v[i][1] + Math.cos(theta) * v[i][2];
		v_prime[i] = [x_prime, y_prime, z_prime];
	}
	return v_prime
}

function Rot_y(v,theta_deg){
	var theta = (Math.PI/180) * theta_deg;
	var v_prime = new Array(v.length);
	for (var i=0; i<v_prime.length; i++){
		var x_prime = Math.cos(theta) * v[i][0] + Math.sin(theta) * v[i][2];
		var y_prime = v[i][1];
		var z_prime = -Math.sin(theta) * v[i][0] + Math.cos(theta) * v[i][2];
		v_prime[i] = [x_prime, y_prime, z_prime];
	}
	return v_prime
}

function Rot_z(v,theta_deg){
	var theta = (Math.PI/180) * theta_deg;
	var v_prime = new Array(v.length);
	for (var i=0; i<v_prime.length; i++){
		var x_prime = Math.cos(theta) * v[i][0] - Math.sin(theta) * v[i][1];
		var y_prime = Math.sin(theta) * v[i][0] + Math.cos(theta) * v[i][1];
		var z_prime = v[i][2];
		v_prime[i] = [x_prime, y_prime, z_prime];
	}
	return v_prime
}

//-----------------------------------
//--- Draw button svgs --------------
//-----------------------------------
function draw_navbutton1(){
	var g0 = document.getElementById("navbutton1_icon_group");
	var c = document.createElementNS(xmlns, "circle");
	c.setAttribute("cx", 0);
	c.setAttribute("cy", 0);
	c.setAttribute("r", 4.5);
	c.setAttribute("fill", "white");
	c.setAttribute("stroke", "rgb(95,85,75)");
	c.setAttribute("stroke-width", "0.25");
	g0.appendChild(c);
	var g1 = document.createElementNS(xmlns, "g");
	g0.appendChild(g1);
	g1.setAttribute("transform", "translate(-.2,-.6)");
	var g2 = document.createElementNS(xmlns, "g");
	g1.appendChild(g2);
	g2.setAttribute("transform", "scale(3.3)");
	var edges = tetrahedron(12, -82);
	for (var i=0; i<edges.length; i++){
		var p = document.createElementNS(xmlns, "path");
		var d = "M" + [edges[i][0][0].toFixed(6), edges[i][0][1].toFixed(6)] + "L" + [edges[i][1][0].toFixed(6), edges[i][1][1].toFixed(6)];
		var kz = 0.6 * (edges[i][0][2] + edges[i][1][2]);
		var sig_z = 0.11 / (1 + Math.exp(-kz));
		p.setAttributeNS(null, "d", d);
		p.setAttributeNS(null, "stroke-width", sig_z);
		p.setAttributeNS(null, "stroke", "rgb(95,85,75)");
		g2.appendChild(p);
	}
}


function draw_navbutton2(){
	var g0 = document.getElementById("navbutton2_icon_group");
	var c = document.createElementNS(xmlns, "circle");
	c.setAttribute("cx", 0);
	c.setAttribute("cy", 0);
	c.setAttribute("r", 4.5);
	c.setAttribute("fill", "white");
	c.setAttribute("fill", "rgb(95,85,75)");
	g0.appendChild(c);
	var g1 = document.createElementNS(xmlns, "g");
	g0.appendChild(g1);
	g1.setAttribute("transform", "translate(0,0)");
	var g2 = document.createElementNS(xmlns, "g");
	g1.appendChild(g2);
	g2.setAttribute("transform", "scale(3.6)");
	var edges = octahedron(18, 12);
	for (var i=0; i<edges.length; i++){
		var p = document.createElementNS(xmlns, "path");	
		var d = "M" + [edges[i][0][0].toFixed(6), edges[i][0][1].toFixed(6)] + "L" + [edges[i][1][0].toFixed(6), edges[i][1][1].toFixed(6)];
		var kz = 0.8 * (edges[i][0][2] + edges[i][1][2]);
		var sig_z = 0.09 / (1 + Math.exp(-kz));
		p.setAttributeNS(null, "d", d);
		p.setAttributeNS(null, "stroke-width", sig_z);
		p.setAttributeNS(null, "stroke", "white");
		g2.appendChild(p);
	}
}


function draw_navbutton3(){
	var g0 = document.getElementById("navbutton3_icon_group");
	var c = document.createElementNS(xmlns, "circle");
	c.setAttribute("cx", 0);
	c.setAttribute("cy", 0);
	c.setAttribute("r", 4.5);
	c.setAttribute("fill", "white");
	c.setAttribute("stroke", "rgb(95,85,75)");
	c.setAttribute("stroke-width", "0.25");
	g0.appendChild(c);
	var g1 = document.createElementNS(xmlns, "g");
	g0.appendChild(g1);
	g1.setAttribute("transform", "translate(0,0)");
	var g2 = document.createElementNS(xmlns, "g");
	g1.appendChild(g2);
	g2.setAttribute("transform", "scale(2.6)");
	var edges = dodecahedron(3, 18);
	for (var i=0; i<30; i++){
		var p = document.createElementNS(xmlns, "path");
		var d = "M" + [edges[i][0][0].toFixed(6), edges[i][0][1].toFixed(6)] + "L" + [edges[i][1][0].toFixed(6), edges[i][1][1].toFixed(6)];
		var kz = 0.5 * (edges[i][0][2] + edges[i][1][2]);
		var sig_z = 0.125 / (1 + Math.exp(-kz));
		p.setAttributeNS(null, "d", d);
		p.setAttributeNS(null, "stroke-width", sig_z);
		p.setAttributeNS(null, "stroke", "rgb(95,85,75)");
		g2.appendChild(p);
	}
}


function draw_navbutton4(){
	var g0 = document.getElementById("navbutton4_icon_group");
	var c = document.createElementNS(xmlns, "circle");
	c.setAttribute("cx", 0);
	c.setAttribute("cy", 0);
	c.setAttribute("r", 4.5);
	c.setAttribute("fill", "rgb(95,85,75)");
	g0.appendChild(c);
	var g1 = document.createElementNS(xmlns, "g");
	g0.appendChild(g1);
	g1.setAttribute("transform", "translate(.1,.1)");
	var g2 = document.createElementNS(xmlns, "g");
	g1.appendChild(g2);
	g2.setAttribute("transform", "scale(3.9)");
	var edges = icosahedron(8, 12);
	for (var i=0; i<30; i++){
		var p = document.createElementNS(xmlns, "path");
		var d = "M" + [edges[i][0][0].toFixed(6), edges[i][0][1].toFixed(6)] + "L" + [edges[i][1][0].toFixed(6), edges[i][1][1].toFixed(6)];
		var kz = 1.0 * (edges[i][0][2] + edges[i][1][2]);
		var sig_z = 0.06 / (1 + Math.exp(-kz));
		p.setAttributeNS(null, "d", d);
		p.setAttributeNS(null, "stroke-width", sig_z);
		p.setAttributeNS(null, "stroke", "white");
		g2.appendChild(p);
	}
}

//-----------------------------------
//--- Platonic solids ---------------
//-----------------------------------
function tetrahedron(yaw, pitch){
	// vertices
	var v1 = [1, -1/Math.sqrt(3), -1/Math.sqrt(6)];
	var v2 = [-1, -1/Math.sqrt(3), -1/Math.sqrt(6)];
	var v3 = [0, 2/Math.sqrt(3), -1/Math.sqrt(6)];
	var v4 = [0, 0, 3/Math.sqrt(6)];
	var v = [v1,v2,v3,v4];
	// perform rotations
	v = Rot_x(v, pitch);
	v = Rot_y(v, yaw);
	// collect all 6 edges
	var edges = [[v[0],v[1]], [v[0],v[2]], [v[0],v[3]], [v[1],v[2]], [v[1],v[3]], [v[2],v[3]]];
	// sort edges by depth
	edges.sort(function(x, y) {
	  if ((x[0][2] + x[1][2]) < (y[0][2] + y[1][2])) {
	    return -1;
	  }
	  if ((x[0][2] + x[1][2]) > (y[0][2] + y[1][2])) {
	    return 1;
	  }
	  return 0;
	});
	// return
	return edges
}

function octahedron(yaw, pitch){
	// vertices
	var v1 = [0, 0, 1];
	var v2 = [1, 0, 0];
	var v3 = [-1, 0, 0];
	var v4 = [0, 1, 0];
	var v5 = [0, -1, 0];
	var v6 = [0, 0, -1];
	var v = [v1, v2, v3, v4, v5, v6];
	// perform rotations
	v = Rot_y(v, yaw);
	v = Rot_x(v, pitch);
	// collect all 12 edges
	var e1 = [v[0], v[1]]; 
	var e2 = [v[0], v[2]]; 
	var e3 = [v[0], v[3]]; 
	var e4 = [v[0], v[4]]; 
	var e5 = [v[5], v[1]]; 
	var e6 = [v[5], v[2]]; 
	var e7 = [v[5], v[3]]; 
	var e8 = [v[5], v[4]]; 
	var e9 = [v[1], v[3]]; 
	var e10 = [v[1], v[4]]; 
	var e11 = [v[2], v[3]]; 
	var e12 = [v[2], v[4]]; 
	var edges = [e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12];
	// sort edges by depth
	edges.sort(function(x, y) {
	  if ((x[0][2] + x[1][2]) < (y[0][2] + y[1][2])) {
	    return -1;
	  }
	  if ((x[0][2] + x[1][2]) > (y[0][2] + y[1][2])) {
	    return 1;
	  }
	  return 0;
	});
	// return
	return edges
}

function dodecahedron(yaw, pitch){
	// define auxiliary variables
	// (complexity is necessary to ensure top and bottom faces are horizontal)
	var t1 = 2*Math.PI/5;
	var t2 = Math.PI/10;
	var t3 = 3*Math.PI/10.
	var t4 = Math.PI/5;
	var d1 = 1/(2*Math.sin(t4));
	var d2 = d1*Math.cos(t4);
	var d3 = d1*Math.cos(t2);
	var d4 = d1*Math.sin(t2);
	var fx = (1 - Math.pow((2*d3),2) - (d1*d1 - d3*d3 - d4*d4)) / (2*(d4 - d1));
	var d5 = Math.sqrt((1/2)*(1 + Math.pow(2*d3,2) - Math.pow((d1-fx),2) - Math.pow((d4-fx),2) - Math.pow(d3,2)));
	var fy = (Math.pow(fx,2) - Math.pow(d1,2) - Math.pow(d5,2)) / (2*d5);
	var ay = d5 + fy;
	// vertex coordinates
	var v_A = [d1, ay, 0];
	var v_B = [d4, ay, d3];
	var v_C = [-d2, ay, 1/2];
	var v_D = [-d2, ay, -1/2];
	var v_E = [d4, ay, -d3];
	var v_F = [fx, fy, 0];
	var v_G = [fx*Math.sin(t2), fy, fx*Math.cos(t2)];
	var v_H = [-fx* Math.sin(t3), fy, fx*Math.cos(t3)];
	var v_I = [-fx*Math.sin(t3), fy, -fx*Math.cos(t3)];
	var v_J = [fx*Math.sin(t2), fy, -fx*Math.cos(t2)];
	var v_K = [fx*Math.sin(t3), -fy, fx*Math.cos(t3)];
	var v_L = [-fx*Math.sin(t2), -fy, fx*Math.cos(t2)];
	var v_M = [-fx, -fy, 0];
	var v_N = [-fx*Math.sin(t2), -fy, -fx*Math.cos(t2)];
	var v_O = [fx*Math.sin(t3), -fy, -fx*Math.cos(t3)];
	var v_P = [d2, -ay, 1/2];
	var v_Q = [-d4, -ay, d3];
	var v_R = [-d1, -ay, 0];
	var v_S = [-d4, -ay, -d3];
	var v_T = [d2, -ay, -1/2];
	var v = [v_A,v_B,v_C,v_D,v_E,v_F,v_G,v_H,v_I,v_J,v_K,v_L,v_M,v_N,v_O,v_P,v_Q,v_R,v_S,v_T];
	// perform rotations
	v = Rot_y(v, yaw);
	v = Rot_x(v, pitch);
	// collect (all 30) edges
	var e1 = [v[0], v[1]]; // AB 
	var e2 = [v[0], v[5]]; // AF
	var e3 = [v[1], v[2]]; // BC
	var e4 = [v[1], v[6]]; // BG
	var e5 = [v[2], v[3]]; // CD
	var e6 = [v[2], v[7]]; // CH
	var e7 = [v[3], v[4]]; // DE
	var e8 = [v[3], v[8]]; // DI
	var e9 = [v[4], v[9]]; // EJ
	var e10 = [v[4], v[0]]; // EA
	var e11 = [v[5], v[10]]; // FK
	var e12 = [v[5], v[14]]; // FO
	var e13 = [v[6], v[10]]; // GK
	var e14 = [v[6], v[11]]; // GL
	var e15 = [v[7], v[11]]; // HL
	var e16 = [v[7], v[12]]; // HM
	var e17 = [v[8], v[12]]; // IM
	var e18 = [v[8], v[13]]; // IN
	var e19 = [v[9], v[13]]; // JN
	var e20 = [v[9], v[14]]; // JO
	var e21 = [v[10], v[15]]; // KP
	var e22 = [v[11], v[16]]; // LQ
	var e23 = [v[12], v[17]]; // MR
	var e24 = [v[13], v[18]]; // NS
	var e25 = [v[14], v[19]]; // OT
	var e26 = [v[15], v[16]]; // PQ
	var e27 = [v[16], v[17]]; // QR
	var e28 = [v[17], v[18]]; // RS
	var e29 = [v[18], v[19]]; // ST
	var e30 = [v[19], v[15]]; // TP
	var edges = [e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19,e20,e21,e22,e23,e24,e25,e26,e27,e28,e29,e30];	
	// sort edges by depth
	edges.sort(function(x, y) {
	  if ((x[0][2] + x[1][2]) < (y[0][2] + y[1][2])) {
	    return -1;
	  }
	  if ((x[0][2] + x[1][2]) > (y[0][2] + y[1][2])) {
	    return 1;
	  }
	  return 0;
	});
	// return
	return edges
}

function icosahedron(yaw, pitch){
	// auxiliary quantities
	var t1 = 2*Math.PI/5;
	var t2 = Math.PI/10;
	var t3 = -3*Math.PI/10.
	var t4 = Math.PI/5;
	var r = 1/(2*Math.sin(t4));
	var h = r*Math.cos(t4);
	var cz = r*Math.cos(t2);
	var cx = r*Math.sin(t2);
	var h1 = Math.sqrt(1 - Math.pow(r,2));
	var h2 = Math.sqrt(Math.pow((h+r),2) - Math.pow(h,2));  
	var y2 = (h2 - h1)/2;
	var y1 = y2 + h1;
	// // vertex coordinates
	var v_a = [0, y1, 0]; 		// 0
	var v_b = [r, y2, 0];  		// 1
	var v_c = [cx, y2, cz];		// 2
	var v_d = [-h, y2, 1/2];	// 3
	var v_e = [-h, y2, -1/2];	// 4
	var v_f = [cx, y2, -cz];	// 5
	var v_g = [-r, -y2, 0];		// 6
	var v_h = [-cx, -y2, -cz];	// 7
	var v_i = [h, -y2, -1/2];	// 8
	var v_j = [h, -y2, 1/2];	// 9
	var v_k = [-cx, -y2, cz];	// 10
	var v_l = [0, -y1, 0];		// 11
	var v = [v_a,v_b,v_c,v_d,v_e,v_f,v_g,v_h,v_i,v_j,v_k,v_l];
	// perform rotations
	v = Rot_y(v, yaw);
	v = Rot_x(v, pitch);
	// collect (all 30) edges
	var e1 = [v[0], v[1]]; // ab 
	var e2 = [v[0], v[2]]; // ac
	var e3 = [v[0], v[3]]; // ad
	var e4 = [v[0], v[4]]; // ae
	var e5 = [v[0], v[5]]; // af
	var e6 = [v[1], v[2]]; // bc
	var e7 = [v[2], v[3]]; // cd
	var e8 = [v[3], v[4]]; // de
	var e9 = [v[4], v[5]]; // ef
	var e10 = [v[5], v[1]]; // fb
	var e11 = [v[1], v[8]]; // bi
	var e12 = [v[1], v[9]]; // bj
	var e13 = [v[2], v[9]]; // cj
	var e14 = [v[2], v[10]]; // ck
	var e15 = [v[3], v[10]]; // dk
	var e16 = [v[3], v[6]]; // dg
	var e17 = [v[4], v[6]]; // eg
	var e18 = [v[4], v[7]]; // eh
	var e19 = [v[5], v[7]]; // fh
	var e20 = [v[5], v[8]]; // fi
	var e21 = [v[6], v[7]]; // gh
	var e22 = [v[7], v[8]]; // hi
	var e23 = [v[8], v[9]]; // ij
	var e24 = [v[9], v[10]]; // jk
	var e25 = [v[10], v[6]]; // kg
	var e26 = [v[11], v[6]]; // lg
	var e27 = [v[11], v[7]]; // lh
	var e28 = [v[11], v[8]]; // li
	var e29 = [v[11], v[9]]; // lj
	var e30 = [v[11], v[10]]; // lk
	var edges = [e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19,e20,e21,e22,e23,e24,e25,e26,e27,e28,e29,e30];	
	// sort edges by depth
	edges.sort(function(x, y) {
	  if ((x[0][2] + x[1][2]) < (y[0][2] + y[1][2])) {
	    return -1;
	  }
	  if ((x[0][2] + x[1][2]) > (y[0][2] + y[1][2])) {
	    return 1;
	  }
	  return 0;
	});
	// return
	return edges
}

//-----------------------------------
//--- Event handlers ----------------
//-----------------------------------
function navbutton1_pressed(){$('html, body').animate({scrollTop: $("#section1").offset().top}, 600);}
function navbutton2_pressed(){$('html, body').animate({scrollTop: $("#section2").offset().top}, 600);}
function navbutton3_pressed(){$('html, body').animate({scrollTop: $("#section3").offset().top}, 600);}
function navbutton4_pressed(){$('html, body').animate({scrollTop: $("#section4").offset().top}, 600);}
