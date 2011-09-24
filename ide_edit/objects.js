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

enigma.objects.object_locals = function(id,oid,x,y) {
  this.prototype = new enigma.system.object_basic(id,oid);
  enigma.classes.object_planar(this,x,y);
}

enigma.global.game_end = function() { }
enigma.global.show_error = function(error, fatal) {
  alert(error);
  if (fatal)
    enigma.global.game_end();
}
enigma.system.addEventRaw = function (whom, edl) {
  var e = enigma.parser.parse_edl(edl);
  if (e != -1) enigma.global.show_error("Error in parsing event code (position " + e + "/" + edl.length + "): " + enigma.parser.err + "\n" + edl.substr(e),true);
  whom['myevent_draw'] = Function(enigma.parser.code_out);
}
enigma.system.addEventDefaults = function (whom) {
  
}

enigma.objects.object0 = function(id,oid,x,y) {
  this.prototype = new enigma.objects.object_locals(id,oid,x,y);
  enigma.system.addEventRaw(this,
      "draw_clear($FFFF00);\
      dir += .05;\
      if (!mouse_valid || mouse_x <= 0 || mouse_y <= 0 || mouse_x > 640 || mouse_y > 480)\
        draw_diamond(32+32*cos(dir),32+32*sin(dir),640-32-32*cos(dir),480-32-32*sin(dir),0);\
      else\
        draw_diamond(32+32*cos(dir),32+32*sin(dir),mouse_x,mouse_y,0);");
  enigma.system.addEventDefaults(this);
  enigma.classes.depth(this,0);
  this.dir = 0;
}

//var instance = new enigma.objects.object0();
