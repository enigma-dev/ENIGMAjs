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

enigma.graphics.draw_color = 0;

enigma.global.draw_clear = function(color) {
	var width = enigma.graphics.canvas.clientWidth;
	  var height = enigma.graphics.canvas.clientHeight;
	  context.clearRect ( 0 , 0 , width , height );
};
enigma.global.draw_clear.argc_min = 1;
enigma.global.draw_clear.argc_max = 1;

enigma.global.draw_diamond = function(x,y,x2,y2,outline)
{
	//Canvas commands go here
	// Create the yellow face
	context.strokeStyle = "#000000";
	context.fillStyle = "#FFFF00";
	context.beginPath();
	context.arc(100,100,50,0,Math.PI*2,true);
	context.closePath();
	context.stroke();
	context.fill();
};
enigma.global.draw_diamond.argc_min = 4;
enigma.global.draw_diamond.argc_max = 5;

enigma.global.draw_sprite_ext=function(sprite_index,image_index,
        xx,yy,image_xscale,image_yscale,image_angle,image_blend,image_alpha){
	context.drawImage(spritestructarray[sprite_index].image, xx, yy);
};