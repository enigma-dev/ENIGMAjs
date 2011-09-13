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

enigma.classes.object_planar = function(whom,x,y) {
  whom.x = x?x:0; whom.y = y?y:0;
  Object.defineProperty(whom,"hspeed", {
    get: function()  { return this.$hspeed; },
    set: function(x) { this.$hspeed = x; this.$re_dir_spd(); }
  });
  Object.defineProperty(whom,"vspeed", {
    get: function()  { return this.$vspeed; },
    set: function(x) { this.$vspeed = x; this.$re_dir_spd(); }
  });
  Object.defineProperty(whom,"direction", {
    get: function()  { return this.$direction; },
    set: function(x) { this.$direction = x; this.$re_hvspd(); }
  });
  Object.defineProperty(whom,"speed", {
    get: function()  { return this.$speed; },
    set: function(x) { this.$speed = x; this.$re_hvspd(); }
  });
  whom.$re_dir_spd = function() {
    this.$direction = (Math.atan2(vspeed,hspeed) + 6.28318530717958647692528676655900576839433879875021164195) 
    * 57.29577951308232087679815481410517033240547246656432154916 % 360;
    this.$speed = Math.sqrt(vspeed*vspeed + hspeed*hspeed);
  }
  whom.$re_hvspd = function() {
    this.$hspeed = Math.cos(this.$direction) * this.$speed;
    this.$hspeed =-Math.sin(this.$direction) * this.$speed;
  }
}
