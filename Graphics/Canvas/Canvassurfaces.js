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

var surfaces = [];
var propercontext;
enigma.global.surface_create = function(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width=w;
    canvas.height=h;
    return surfaces.push(canvas)-1;
};
enigma.global.surface_free = function(id) {
    surfaces[id] = null;
};
enigma.global.surface_exists = function(id) {
    if (surfaces[id]) {
        return true;
    }
    return false;
};

enigma.global.surface_get_width = function(id) {
    return surfaces[id].width;
};
enigma.global.surface_get_height = function(id) {
    return surfaces[id].height;
};

enigma.global.surface_set_target=function(id) {
    propercontext=context;
    context=surfaces[id].getContext('2d');
};

enigma.global.surface_reset_target=function() {
context=propercontext;
};

enigma.global.draw_surface=function(id, x, y) {
context.drawImage(surfaces[id], x, y);
};