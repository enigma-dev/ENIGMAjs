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

enigma.parser.is_useless  = function(a) {
  return a.match(/\s/) != null;
}
enigma.parser.is_letter   = function(a) {
  return a.match(/[a-zA-Z_]/) != null;
}
enigma.parser.is_letterd  = function(a) {
  return a.match(/[a-zA-Z_0-9]/) != null;
}
enigma.parser.is_digit    = function(a) {
  return a.match(/[0-9]/) != null;
}
enigma.parser.is_hexdigit = function(a) {
  return a.match(/[0-9a-fA-F]/) != null;
}
