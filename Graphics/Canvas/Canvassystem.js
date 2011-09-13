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

var gl,context;
var enigma = {
  system:  {}, // Holds system methods. Init stuff, event iteration stuff. Boring stuff.
  parser:  {}, // Holds the parser. This does the majority of the conversion work.
  graphics:{}, // Like system, but for graphics utils.
  global:  {}, // Holds ENIGMA's global variables and functions. Like room_speed. Or draw_text.
  classes: {}, // Anything that doesn't fit into system that drives the backend of the engine.
  objects: {},  // 
  rooms: {} // All the ide created rooms
}
enigma.system.init = (function()
{
 return function(canvas)
  {
	 if (canvas == null)
	      alert("Passed null canvas. Check IDs.");
	 enigma.graphics.canvas = canvas;
	 
	// var drawingCanvas = document.getElementById('myDrawing');
	// Check the element is in the DOM and the browser supports canvas
	if(/*drawingCanvas*/canvas.getContext) {
	// Initaliase a 2-dimensional drawing context
	context = canvas.getContext('2d');
	
	
	}
	 
	 
    window.onmousemove = enigma.system.onmousemove;
    
    enigma.system.loadResources();
    setTimeout("enigma.system.enigma_frame_timer()",1000/enigma.global.room_speed);
  };
})();

var room_bgcolor = 0;
enigma.system.enigma_frame_timer = function () {
  setTimeout("enigma.system.enigma_frame_timer()",1000/enigma.global.room_speed);
  enigma.system.event_loop();
  enigma.global.io_handle();
};

enigma.system.getIterator=function() { //tempt to make it compile
	return new function() {this.atEnd=function() {return true;};this.goNext=function() {}}
	
}