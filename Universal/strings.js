/*******************************************************************************
 * Copyright (C) 2011 Josh Ventura
 * Copyright (C) 2011 Alasdair Morrison
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
	var g = enigma.global, f;

	f = g.string_length = function(str) {
		return str.length;
	};
	f.argc_min = f.argc_max = 1;
})();

enigma.global.chr = function(c) {
	return String.fromCharCode(c);
};
enigma.global.ord = function(c) {
	return String.charCodeAt(c);
};
enigma.global.real = function(str) {
	return 1 * str;
};
enigma.global.string_format = function(val, tot, dec) {
	return "" + val.toFixed(dec);
};

enigma.global.string_pos = function(substr, str) {
	var pos = str.indexOf(substr, 0);
	if (pos === -1)
		return 0;
	else
		return pos + 1;
};

enigma.global.string_copy = function(str, index, count) {
	if (index === 0)
		index = 1;
	return str.substring(index - 1, index + count - 1);
};

enigma.global.string_char_at = function(str, index) {
	if (index === 0)
		index = 1;
	return str.charAt(index - 1);
};

enigma.global.string_delete = function(str, index, count) {
	var start = str.substring(0, index - 1);
	var end = str.substring(index + count - 1, str.length);
	return start + end;
};

enigma.global.string_insert = function(substr, str, index) {
	var start = str.substring(0, index - 1);
	var end = str.substring(index - 1, str.length);
	return start + substr + end;
};

enigma.global.string_replace = function(str, substr, newstr) {
	return str.replace(substr, newstr);
};

enigma.global.string_replace_all = function(str, substr, newstr) {
	return str.replace(new RegExp(substr, 'g'), newstr);
};

enigma.global.string_count = function(substr, str) {
	var count = 0;
	for ( var i = 0; i < str.length; i = i + substr.length) {
		if (substr == str.substr(i, substr.length))
			count++;
	}
	return count;
};

enigma.global.string_lower = function(str) {
	return str.toLowerCase();
};

enigma.global.string_upper = function(str) {
	return str.toUpperCase();
};

enigma.global.string_repeat = function(str, count) {
	var returnstr = "";
	for ( var i = 0; i < count; i++) {
		returnstr += str;
	}
	return returnstr;
};

enigma.global.string_letters = function(str) {
	var len = str.length;
	var returnstring = "";
	for ( var i = 0; i < len; i++) {
		var charcode = str.charCodeAt(i);
		if ((charcode > 65 && charcode < 90)
				|| (charcode > 97 && charcode < 122))
			returnstring += String.fromCharCode(charcode);
	}
	return returnstring;
};

enigma.global.string_digits = function(str) {
	var len = str.length;
	var returnstring = "";
	for ( var i = 0; i < len; i++) {
		var charcode = str.charCodeAt(i);
		if ((charcode > 48 && charcode < 57))
			returnstring += String.fromCharCode(charcode);
	}
	return returnstring;
};

enigma.global.string_lettersdigits = function(str) {
	var len = str.length;
	var returnstring = "";
	for ( var i = 0; i < len; i++) {
		var charcode = str.charCodeAt(i);
		if ((charcode > 65 && charcode < 90)
				|| (charcode > 97 && charcode < 122)
				|| (charcode > 48 && charcode < 57))
			returnstring += String.fromCharCode(charcode);
	}
	return returnstring;
};
