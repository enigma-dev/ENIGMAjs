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

enigma.graphics.initialize = (function()
{
  function getShader(gl, id)
  {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }
    
    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }
    
    var shader;
    if (shaderScript.type == "x-shader/x-fragment")
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    else if (shaderScript.type == "x-shader/x-vertex")
      shader = gl.createShader(gl.VERTEX_SHADER);
    else
      return null;
    
    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
  }
    
  function initShaders()
  {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");
    
    enigma.graphics.shaderProgram = gl.createProgram();
    gl.attachShader(enigma.graphics.shaderProgram, vertexShader);
    gl.attachShader(enigma.graphics.shaderProgram, fragmentShader);
    gl.linkProgram(enigma.graphics.shaderProgram);
    
    if (!gl.getProgramParameter(enigma.graphics.shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
    
    gl.useProgram(enigma.graphics.shaderProgram);
    
    enigma.graphics.ATTRL_VERTEX = gl.getAttribLocation(enigma.graphics.shaderProgram, "vertex");
    enigma.graphics.ATTRL_COLOR = gl.getAttribLocation(enigma.graphics.shaderProgram, "color");
    gl.enableVertexAttribArray(enigma.graphics.ATTRL_VERTEX);
    gl.enableVertexAttribArray(enigma.graphics.ATTRL_COLOR);
    
    enigma.graphics.shaderProgram.pMatrixUniform = gl.getUniformLocation(enigma.graphics.shaderProgram, "uPMatrix");
    enigma.graphics.shaderProgram.mvMatrixUniform = gl.getUniformLocation(enigma.graphics.shaderProgram, "uMVMatrix");
    enigma.graphics.ATTRL_U_COLOR = gl.getUniformLocation(enigma.graphics.shaderProgram, "uColor");
    enigma.graphics.USE_UNICOLOR = gl.getUniformLocation(enigma.graphics.shaderProgram, "useUniformColor");
  }
  
  
  return function(canvas)
  {
    if (canvas == null)
      alert("Passed null canvas. Check IDs.");
    enigma.graphics.canvas = canvas;
    gl = null;
    try {
      gl = canvas.getContext("webgl");
    } catch (err) {}
    if (!gl) {
      try {
        gl = canvas.getContext("experimental-webgl");
      } catch (err) {}
    }
    if (!gl) {
      alert("Failed to init WebGL. Your browser probably doesn't support it.");
      return 1;
    }
    
    enigma.graphics.mvMatrix = mat4.create();
    enigma.graphics.pMatrix = mat4.create();
    
    initShaders();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.SCISSOR_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    //gl.blendFunc(gl.SRC_ALPHA,gl.DST_ALPHA);
  }
})();
