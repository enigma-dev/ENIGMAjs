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

var gl;
var enigma = {
  system:   {}, // Holds system methods. Init stuff, event iteration stuff. Boring stuff.
  parser:   {}, // Holds the parser. This does the majority of the conversion work.
  graphics: {}, // Like system, but for graphics utils.
  global:   {}, // Holds ENIGMA's global variables and functions. Like room_speed. Or draw_text.
  classes:  {}, // Anything that doesn't fit into system that drives the backend of the engine.
  objects:  {}  // 
}
enigma.system.init = (function()
{
  return function(canvas)
  {
    enigma.graphics.initialize(canvas);
    
    window.onmousemove = enigma.system.onmousemove;
    window.onmouseover = enigma.system.onmouseover;
    window.onmouseout = enigma.system.onmouseout;
    
    enigma.system.loadResources();
    setTimeout("enigma.system.enigma_frame_timer()",1000/enigma.global.room_speed);
  }
})();

var room_bgcolor = 0;
enigma.system.enigma_frame_timer = function () {
  setTimeout("enigma.system.enigma_frame_timer()",1000/enigma.global.room_speed);
  enigma.system.event_loop();
  enigma.global.io_handle();
}
