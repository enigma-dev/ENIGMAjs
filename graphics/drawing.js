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

enigma.graphics.draw_color = 0;

enigma.global.draw_clear = function(color) {
  gl.clearColor((color & 0xFF)/0xFF, ((color & 0xFF00) >> 8)/0xFF, ((color & 0xFF0000) >> 16)/0xFF, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
}
enigma.global.draw_clear.argc_min = 1;
enigma.global.draw_clear.argc_max = 1;

enigma.global.draw_diamond = function(x,y,x2,y2,outline)
{
  var triangleVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
  var vertices = [
       (x+x2)/2,  y,
       x,  (y+y2)/2,
       x2, (y+y2)/2,
       (x+x2)/2, y2
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.vertexAttribPointer(enigma.graphics.ATTRL_VERTEX, 2, gl.FLOAT, false, 0, 0);
  
  if (!this.phase) this.phase = 0;
  if (this.phase++ % 30 > 15)
  {
    gl.uniform1f(enigma.graphics.USE_UNICOLOR,1);
    gl.uniform4f(enigma.graphics.ATTRL_U_COLOR,0,.35,1,1);
  }
  else
  {
    gl.uniform1f(enigma.graphics.USE_UNICOLOR,0);
    var triangleVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
    var colors = [
         1,0,0,1,
         0,1,0,1,
         0,0,1,1,
         1,1,1,0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(enigma.graphics.ATTRL_COLOR, 4, gl.FLOAT, false, 0, 0);
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
enigma.global.draw_diamond.argc_min = 4;
enigma.global.draw_diamond.argc_max = 5;
