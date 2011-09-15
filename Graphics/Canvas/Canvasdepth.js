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

enigma.global.screen_refresh = function() {
  
}; enigma.global.screen_refresh.argc_min = enigma.global.screen_refresh.argc_max = 0;

enigma.global.screen_redraw = function()
{
  var width = enigma.graphics.canvas.clientWidth;
  var height = enigma.graphics.canvas.clientHeight;
  context.clearRect ( 0 , 0 , width , height );
  
  for (var i in enigma.global.screen_redraw.depths) {
    for (var x in enigma.global.screen_redraw.depths[i]) {
      enigma.global.screen_redraw.depths[i][x]();
    }
  }
}; enigma.global.screen_redraw.argc_min = enigma.global.screen_redraw.argc_max = 0;
enigma.global.screen_redraw.depths = {};

enigma.classes.depth = function(whom,startdepth)
{
  whom.$depth = startdepth;
  Object.defineProperty(whom,"depth", {
    get: function()  { return this.$depth; },
    set: function(x) {
      delete enigma.global.screen_redraw.depths[this.$depth][this.id];
      this.$depth = x;
      if (!enigma.global.screen_redraw.depths[this.$depth])
        enigma.global.screen_redraw.depths[this.$depth] = {};
      enigma.global.screen_redraw.depths[this.$depth][this.id] = this.myevent_draw.bind(whom);
    }
  });
  if (!enigma.global.screen_redraw.depths[whom.$depth])
    enigma.global.screen_redraw.depths[whom.$depth] = {};
  enigma.global.screen_redraw.depths[whom.$depth][whom.id] = whom.myevent_draw.bind(whom);
};
