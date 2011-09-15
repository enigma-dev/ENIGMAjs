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

function loadSprites(){
    for (var src in spritestructarray) {
    	 spritestructarray[src].image = new Image();
    	 spritestructarray[src].image.src = "res/sprites/"+ spritestructarray[src].name+".png";
    }
    alert("Loaded sprites");
}

enigma.system.loadResources = function() {
	enigma.global.input_initialize();
	loadSprites();
  //cubeTexture = gl.createTexture();
  //cubeImage = new Image();
  //cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture); }
  //cubeImage.src = "res/sprites/sprite0.png";
};
function handleTextureLoaded(image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}
