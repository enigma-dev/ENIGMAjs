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

(function(){
  var g = enigma.global, b = enigma.system.object_basic, f;
  
  f = b.execute_string = g.execute_string = function(str) {
    var esr = enigma.parser.parse_edl(str);
    if (esr != -1)
      throw "Error at position " + esr + ": " + enigma.parser.err;
    return eval("(function(){" + enigma.parser.code_out + "})();"); // Encapsulated in a function to allow return statements
  } f.argc_min = 1; f.argc_max = -1; f.dynamic = true;
  
  f = b.variable_local_exists = g.variable_local_exists = function(vname) {
    return this[vname] != undefined;
  } f.argc_min = f.argc_max = 1; f.dynamic = true;
  
})();

