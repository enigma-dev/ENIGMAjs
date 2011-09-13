/*************************************************************\
Copyright (C) 2011 Josh Ventura

This file is a part of the ENIGMA Development Environment.

ENIGMA is free software: you can redistribute it and/or 
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, version 3 of
the license or any later version.

This application and its source code is distributed AS-IS,
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See
the GNU General Public License for more details.

You should have recieved a copy of the GNU General Public License
along with this code. If not, see <http://www.gnu.org/licenses/>
\*************************************************************/

enigma.global.mouse_x = 0;
enigma.global.mouse_y = 0;
enigma.global.mouse_valid = 0;

enigma.system.onmousemove = function(e) {
  var x;
  var y;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
  }
  else {
    x = e.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;
  }
  // Convert to coordinates relative to the canvas
  x -= enigma.graphics.canvas.offsetLeft;
  y -= enigma.graphics.canvas.offsetTop;
  enigma.global.mouse_x = x;
  enigma.global.mouse_y = y;
  enigma.global.mouse_valid = true;
}

enigma.system.onmouseover = function() {
  enigma.global.mouse_valid = true;
}

enigma.system.onmouseout = function() {
  enigma.global.mouse_valid = false;
}
