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
enigma.global.sprite_exists = function(ind) {
    if (spritestructarray[ind]) return true;
    return false;
};
enigma.global.sprite_get_name = function(ind) {
    return spritestructarray[ind].name;
};
enigma.global.sprite_get_number = function(ind) {
return spritestructarray[ind].subImageCount;
};

enigma.global.sprite_get_transparent = function(ind) {
return spritestructarray[ind].transparent;
};
enigma.global.sprite_get_smooth = function(ind) {
return spritestructarray[ind].smooth;
};

enigma.global.sprite_get_xoffset = function(ind) {
return spritestructarray[ind].originX;
};
enigma.global.sprite_get_yoffset = function(ind) {
return spritestructarray[ind].originY;
};
enigma.global.sprite_get_bbox_left = function(ind) {
return spritestructarray[ind].bbLeft;
};
enigma.global.sprite_get_bbox_right = function(ind) {
return spritestructarray[ind].bbRight;
};
enigma.global.sprite_get_bbox_top = function(ind) {
return spritestructarray[ind].bbTop;
};
enigma.global.sprite_get_bbox_bottom = function(ind) {
return spritestructarray[ind].bbBottom;
};

enigma.global.sprite_get_precise = function(ind) {
return spritestructarray[ind].precise;
};
enigma.global.sprite_get_width = function(ind) {
return spritestructarray[ind].width;
};
enigma.global.sprite_get_height = function(ind) {
return spritestructarray[ind].height;
};
enigma.global.sprite_get_preload = function(ind) {
return spritestructarray[ind].preload;
};

/*
Sound functions
*/
enigma.global.sound_exists=function(ind) {
    if (soundstructarray[ind]) return true;
    return false;
};
enigma.global.sound_get_name=function(ind) {
    return soundstructarray[ind].name;
};
enigma.global.sound_get_kind=function(ind) {
    return soundstructarray[ind].kind;
};
enigma.global.sound_get_preload=function(ind) {
    return soundstructarray[ind].preload;
};

/*
Background functions
*/
enigma.global.background_exists=function(ind) {
    if (backgroundstructarray[ind]) return true;
    return false;
};
enigma.global.background_get_name=function(ind) {
    return backgroundstructarray[ind].name;
};
enigma.global.background_get_width=function(ind) {
    return backgroundstructarray[ind].width;
};
enigma.global.background_get_height=function(ind) {
    return backgroundstructarray[ind].height;
};
enigma.global.background_get_transparent=function(ind) {
    return backgroundstructarray[ind].transparent;
};
enigma.global.background_get_smooth=function(ind) {
    return backgroundstructarray[ind].smooth;
};
enigma.global.background_get_preload=function(ind) {
    return backgroundstructarray[ind].preload;
};

/*
Font functions
*/
enigma.global.font_exists=function(ind) {
    if (fontstructarray[ind]) return true;
    return false;
};
enigma.global.font_get_name=function(ind) {
    return fontstructarray[ind].name;
};
enigma.global.font_get_fontname=function(ind) {
    return fontstructarray[ind].fontName;
};
enigma.global.font_get_bold=function(ind) {
    return fontstructarray[ind].bold;
};
enigma.global.font_get_italic=function(ind) {
    return fontstructarray[ind].italic;
};
enigma.global.font_get_first=function(ind) {
    return fontstructarray[ind].rangeMin;
};
enigma.global.font_get_last=function(ind) {
    return fontstructarray[ind].rangeMax;
};

/*
Path functions
*/
enigma.global.path_exists=function(ind) {
    if (pathstructarray[ind]) return true;
    return false;
};
enigma.global.path_get_name=function(ind) {
    return pathstructarray[ind].name;
};

enigma.global.path_get_kind=function(ind) {
    return pathstructarray[ind].smooth;
};
enigma.global.path_get_closed=function(ind) {
    return pathstructarray[ind].closed;
};
enigma.global.path_get_precision=function(ind) {
    return pathstructarray[ind].precision;
};
enigma.global.path_get_number=function(ind) {
    return pathstructarray[ind].points.length;
};
enigma.global.path_get_point_x=function(ind, n) {
    return pathstructarray[ind].points[n].x;
};
enigma.global.path_get_point_y=function(ind, n) {
    return pathstructarray[ind].points[n].y;
};
enigma.global.path_get_point_speed=function(ind, n) {
    return pathstructarray[ind].points[n].speed;
};

/*
Timeline functions
*/
enigma.global.timeline_exists=function(ind) {return (eval(" (typeof(timelineid_"+ind+") != 'undefined')? 1: 0;"));};

/*
 * Room functions
 */

enigma.global.room_exists=function(ind) {
    if (roomarray[ind]) return true;
    return false;
};
enigma.global.room_get_name=function(ind) {
    return roomarray[ind].name;
};
