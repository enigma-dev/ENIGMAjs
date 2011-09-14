/*
 * Copyright (C) 2011 Alasdair Morrison <amorri40@gmail.com>
 *
 * This file is part of the EnigmaJS Library.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either 
 * version 2.1 of the License, or (at your option) any later version.
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public 
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 */

var mousestatus=[];
var last_mousestatus=[];
var last_keybdstatus=[];
var keybdstatus=[];

enigma.global.input_initialize=function()
{
	//Clear the input arrays
	for(var i=0;i<3;i++){
		last_mousestatus[i]=0;
		mousestatus[i]=0;
	}
	for(var i=0;i<256;i++){
		last_keybdstatus[i]=0;
		keybdstatus[i]=0;
	}
}

enigma.global.keyboard_check=function(key)
{
  if (key == vk_anykey) {
    for(var i=0; i<255; i++)
      if (keybdstatus[i]==1) return 1;
    return 0;
  }
  if (key == vk_nokey) {
    for(var i=0;i<255;i++)
      if(keybdstatus[i]==1) return 0;
    return 1;
  }

return keybdstatus[key];
};

enigma.global.keyboard_check_pressed=function(key)
{
  if (key == vk_anykey) {
    for(var i=0;i<255;i++)
      if (keybdstatus[i] && !last_keybdstatus[i]) return 1;
    return 0;
  }
  if (key == vk_nokey) {
    for(var i=0;i<255;i++)
      if (keybdstatus[i] && !last_keybdstatus[i]) return 0;
    return 1;
  }
  return keybdstatus[key] && !last_keybdstatus[key];
};

enigma.global.keyboard_check_released=function(key)
{
  if(key == vk_anykey) {
		for(var i=0;i<255;i++)
			if (!keybdstatus[i] && last_keybdstatus[i]) return 1;
		return 0;
  }
  if(key == vk_nokey) {
		for(var i=0;i<255;i++)
			if (!keybdstatus[i] && last_keybdstatus[i]) return 0;
		return 1;
  }
	return keybdstatus[key]==0 && last_keybdstatus[key]==1;
};





function handleKeyDown(evt){
var actualKey = evt.keyCode;//keymap[keycode]; //get the actual keycode if its different
	
	if (keybdstatus[actualKey]==1) {
		keybdstatus[actualKey]=1; //its already updated the last_keybdstatus
	} else {
		keybdstatus[actualKey]=1;
	last_keybdstatus[actualKey]=0; //handle key press
		
	}
	
}

function handleKeyUp(evt){
	
	var actualKey =evt.keyCode;//keymap[keycode]; //get the actual keycode if its different
	keybdstatus[actualKey]=0;
}

enigma.global.io_handle=function() {

	for(var i=0;i<256;i++){
		if (last_keybdstatus[i]==0 && keybdstatus[i]==1) {
            //in the last frame, i was pressed event, so make last_keybdstatus now equal 1
			last_keybdstatus[i]=1;
		}
		else if (last_keybdstatus[i]==1 && keybdstatus[i]==0) {
			//in the last frame, i was released event, so make last_keybdstatus now equal 0
			last_keybdstatus[i]=0;
		}
	}
    for(var i=0;i<3;i++){
		if (last_mousestatus[i]==0 && mousestatus[i]==1) {
            //in the last frame, i was pressed event, so make last_keybdstatus now equal 1
			last_mousestatus[i]=1;
		}
		else if (last_mousestatus[i]==1 && mousestatus[i]==0) {
			//in the last frame, i was released event, so make last_keybdstatus now equal 0
			last_mousestatus[i]=0;
		}
	}
}

var vk_anykey = 1;
var vk_nokey  = 0;

var vk_left  = 37;
var vk_right = 39;
var vk_up    = 38;
var vk_down  = 40;

var vk_tab    = 9;
var vk_enter  = 13;
var vk_shift  = 16;
var vk_control= 17;
var vk_alt    = 18;
var vk_space  = 32;

var vk_numpad0 = 96;
var vk_numpad1 = 97;
var vk_numpad2 = 98;
var vk_numpad3 = 99;
var vk_numpad4 = 100;
var vk_numpad5 = 101;
var vk_numpad6 = 102;
var vk_numpad7 = 103;
var vk_numpad8 = 104;
var vk_numpad9 = 105;

var vk_multiply = 106;
var vk_add      = 107;
var vk_subtract = 109;
var vk_decimal  = 110;
var vk_divide   = 111;

var vk_f1  = 112;
var vk_f2  = 113;
var vk_f3  = 114;
var vk_f4  = 115;
var vk_f5  = 116;
var vk_f6  = 117;
var vk_f7  = 118;
var vk_f8  = 119;
var vk_f9  = 120;
var vk_f10 = 121;
var vk_f11 = 122;
var vk_f12 = 123;

var vk_backspace = 8;
var vk_escape    = 27;
var vk_pageup    = 33;
var vk_pagedown  = 34;
var vk_end       = 35;
var vk_home      = 36;
var vk_insert    = 45;
var vk_delete    = 46;

// These are for check_direct only
var vk_lcontrol = 162;
var vk_rcontrol = 163;
var vk_lalt     = 164;
var vk_ralt     = 165;

// This one's Windows only
var vk_printscreen = 42;

//These are ENIGMA-only
var vk_caps   = 20;
var vk_scroll = 145;
var vk_pause  = 19;
var vk_lsuper = 91;
var vk_rsuper = 92;

if (typeof window === "undefined") {} else {
window.addEventListener('keydown',handleKeyDown,true);
window.addEventListener('keyup', handleKeyUp, true);
}