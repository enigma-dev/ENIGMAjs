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

(function() {
  var g = enigma.global;
  g.abs = Math.abs; g.abs.argc_min = g.abs.argc_max = 1;

  g.sin = Math.sin; g.sin.argc_min = g.sin.argc_max = 1;
  g.cos = Math.cos; g.cos.argc_min = g.cos.argc_max = 1;
  g.tan = Math.tan; g.tan.argc_min = g.tan.argc_max = 1;

  g.asin = Math.asin; g.asin.argc_min = g.asin.argc_max = 1;
  g.acos = Math.acos; g.acos.argc_min = g.acos.argc_max = 1;
  g.atan = Math.atan; g.atan.argc_min = g.atan.argc_max = 1;
  g.atan2 = Math.atan2; g.atan.argc_min = g.atan.argc_max = 1;

  g.ceil = Math.ceil; g.ceil.argc_min = g.ceil.argc_max = 1;
  g.floor = Math.floor; g.floor.argc_min = g.floor.argc_max = 1;

  g.exp = Math.exp; g.exp.argc_min = g.exp.argc_max = 1;
  g.log = Math.log; g.log.argc_min = g.log.argc_max = 1;
  g.pow = Math.pow; g.pow.argc_min = g.pow.argc_max = 1;
  g.sqrt = Math.sqrt; g.sqrt.argc_min = g.sqrt.argc_max = 1;
  g.round = Math.round; g.round.argc_min = g.round.argc_max = 1;

  g.random = Math.random; g.random.argc_min = g.random.argc_max = 0;

  g.min = Math.min; g.min.argc_min = 2; g.min.argc_max = -1;
  g.max = Math.max; g.max.argc_min = 2; g.max.argc_max = -1;
  
  g['true'] = true;
  g['false'] = false;
  g['NULL'] = null;
})();
