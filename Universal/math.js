/*******************************************************************************
 *  Copyright (C) 2011 Josh Ventura
 *  Copyright (C) 2011 Alasdair Morrison
 * 
 * This file is a part of the ENIGMA Development Environment.
 * 
 * ENIGMA is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3 of the license or any later version.
 * 
 * This application and its source code is distributed AS-IS, WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * 
 * You should have recieved a copy of the GNU General Public License along with
 * this code. If not, see <http://www.gnu.org/licenses/> \
 ******************************************************************************/

(function() {
	var g = enigma.global;
	g.abs = Math.abs;
	g.abs.argc_min = g.abs.argc_max = 1;

	g.sin = Math.sin;
	g.sin.argc_min = g.sin.argc_max = 1;
	g.cos = Math.cos;
	g.cos.argc_min = g.cos.argc_max = 1;
	g.tan = Math.tan;
	g.tan.argc_min = g.tan.argc_max = 1;

	g.arcsin = Math.asin;
	g.arcsin.argc_min = g.arcsin.argc_max = 1;
	g.arccos = Math.acos;
	g.arccos.argc_min = g.arccos.argc_max = 1;
	g.arctan = Math.atan;
	g.arctan.argc_min = g.arctan.argc_max = 1;
	g.arctan2 = Math.atan2;
	g.arctan2.argc_min = g.arctan2.argc_max = 1;

	g.ceil = Math.ceil;
	g.ceil.argc_min = g.ceil.argc_max = 1;
	g.floor = Math.floor;
	g.floor.argc_min = g.floor.argc_max = 1;

	g.exp = Math.exp;
	g.exp.argc_min = g.exp.argc_max = 1;
	g.log = Math.log;
	g.log.argc_min = g.log.argc_max = 1;
	g.pow = Math.pow;
	g.pow.argc_min = g.pow.argc_max = 1;
	g.sqrt = Math.sqrt;
	g.sqrt.argc_min = g.sqrt.argc_max = 1;
	g.round = Math.round;
	g.round.argc_min = g.round.argc_max = 1;

	g.random = Math.random; // g.random.argc_min = g.random.argc_max = 0;

	g.min = Math.min;
	g.min.argc_min = 2;
	g.min.argc_max = -1;
	g.max = Math.max;
	g.max.argc_min = 2;
	g.max.argc_max = -1;

	g['true'] = true;
	g['false'] = false;
	g['NULL'] = null;
})();

enigma.global.point_direction = function(x1, y1, x2, y2) {
	return ((Math.atan2(y1 - y2, x2 - x1) * (180 / Math.PI)) + 360) % 360;
};

enigma.global.is_string = function(x) {
	return typeof (x) === "string";
};

enigma.global.is_real = function(x) {
	return typeof (x) === "number";
};

enigma.global.lengthdir_y = function(len, dir) {
	return len * -Math.sin(degtorad(dir));
};
enigma.global.lengthdir_x = function(len, dir) {
	return len * Math.cos(degtorad(dir));
};
enigma.global.degtorad = function(x) {
	return x * (Math.PI / 180.0);
};
enigma.global.radtodeg = function(x) {
	return x * (180.0 / Math.PI);
};

enigma.global.hypot = function(x, y) {
	return Math.sqrt(x * x + y * y);
}

enigma.global.point_distance = function(x1, y1, x2, y2) {
	return hypot(x2 - x1, y2 - y1);
};

enigma.global.median = function(ary) {
	var ary = Array.prototype.slice.call(arguments, 0);
	if (ary.length == 0)
		return null;
	ary.sort(function(a, b) {
		return a - b
	})
	var mid = Math.floor(ary.length / 2);
	if ((ary.length % 2) == 1) // length is odd
		return ary[mid];
	else
		return (ary[mid - 1] + ary[mid]) / 2;
};

enigma.global.mean = function() {
	var num = arguments.length;
	var total = 0;
	for ( var i = 0; i < num; i++) {
		total += arguments[i];
	}
	return (total / num);
};

enigma.global.power = function(x, n) {
	return Math.pow(x, n);
};

enigma.global.sqr = function(x) {
	return x * x;
};

enigma.global.frac = function(f) {
	return (f - Math.floor(f));
};

enigma.global.sign=function(x) {return (x>0)-(x<0);};

enigma.global.choose=function() {
    var len=arguments.length;
return arguments[Math.floor(Math.random()*len)];
};
