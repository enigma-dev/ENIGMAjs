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

enigma.parser.setting = {
  use_cpp_escapes:  true,
  use_incrementals: true,
  use_cpp_scoping:  false,
  use_gml_equals:   true
}

enigma.parser.TT = {
  VARNAME         :   0, // somevar
  SEMICOLON       :   1, // A semicolon.
  COLON           :   2, // A colon.
  COMMA           :   3, // A comma.
  ASSOP           :   4, // = += -= *= /= ...
  DECIMAL         :   5, // A dot. '.'. Whether for number or for access is determined in the second pass.
  OPERATOR        :   6, // Basic operators. = + - *...
  UNARYPRE        :   7, // Unary prefix operators. + - ! ++(int) --(int)
  UNARYPOST       :   8, // Unary postfix operators. ++ --
  TERNARY         :   9, // ?
  TERNARYCOLON    :  10, // :
  BEGINPARENTH    :  11, // (
  ENDPARENTH      :  12, // )
  BEGINBRACKET    :  13, // [
  ENDBRACKET      :  14, // ]
  BEGINBRACE      :  15, // {
  ENDBRACE        :  16, // }
  BEGINTRIANGLE   :  17, // <
  ENDTRIANGLE     :  18, // >
  DIGIT           :  19, // 0 1 2... (...)
  STRING          :  20, // "" ''
  SCOPEACCESS     :  21, // ::
  FUNCTION        :  22, // game_end
  TYPE_NAME       :  23, // int double whatever
  NAMESPACE       :  24, // std enigma sf
  LOCGLOBAL       :  25, // global/local
  GEN_STATEMENT   :  26, // Generic statements, if while switch
  SHORTSTATEMENT  :  27, // Short statements, return mostly
  TINYSTATEMENT   :  28, // break continue exit...
  S_SWITCH        :  29, // switch
  S_CASE          :  30, // case
  S_DEFAULT       :  31, // default
  S_FOR           :  32, // for
  S_IF            :  33, // if
  S_ELSE          :  34, // else
  S_TRY           :  35, // try
  S_CATCH         :  36, // catch
  S_DO            :  37, // do
  S_NEW           :  38, // new
  DECLNAME        :  39, // 'a' in 'var a;'
  
  PARSED_WITH: 45, // with -> for
  
  IMPLICIT_SEMICOLON : 1000,
  ERROR : -1
};

enigma.parser.EDL_Macros = function() { }
enigma.parser.EDL_Macros.macro_recurses = function(name,macrostack,macroind)
{
  for (var i = 0; i < macroind; i++)
  if (macrostack[i].name == name)
    return 1;
  return 0;
}
enigma.parser.EDL_Macros.skip_comments = function(code,cwp) {
  while (enigma.parser.is_useless(code.charAt(cwp)) || (code.charAt(cwp)=='/' && (code.charAt(cwp+1)=='/' || code.charAt(cwp+1)=='*')))
  {
    if (code.charAt(cwp++) == '*') {
      if (code.charAt(cwp) == '/') while (cwp < code.length &&  code.charAt(cwp) != '\r' && code.charAt(cwp)   != '\n') cwp++;
      else             { cwp += 2; while (cwp < code.length && (code.charAt(cwp) != '/'  || code.charAt(cwp-1) != '*')) cwp++; }
    }
  }
  return cwp;
}
enigma.parser.EDL_Macros.macro_function_parse = function(cfile,len,macroname,pos,macrostr, args, numparams, au_at, cppcomments, gmlbrackets) 
{
  return false;
}

enigma.parser.EDL_Keywords = function() {
}
enigma.parser.EDL_Keywords.is_wordop = function(name) {
  return this.wordops[name] != null;
}
enigma.parser.EDL_Keywords.wordops = new Object;
enigma.parser.EDL_Keywords.wordops['and'] = "&&";
enigma.parser.EDL_Keywords.wordops['or']  = "||";
enigma.parser.EDL_Keywords.wordops['not'] = "!";
enigma.parser.EDL_Keywords.wordops['mod'] = "%";
enigma.parser.EDL_Keywords.wordops['div'] = "/";

enigma.parser.EDL_Keywords.is_statement = function(name) {
  return this.statements[name] != null;
}
enigma.parser.EDL_Keywords.statements = new Object;
enigma.parser.EDL_Keywords.statements['break']    = enigma.parser.TT.TINYSTATEMENT;
enigma.parser.EDL_Keywords.statements['case']     = enigma.parser.TT.S_CASE;
enigma.parser.EDL_Keywords.statements['catch']    = enigma.parser.TT.S_CATCH;
enigma.parser.EDL_Keywords.statements['continue'] = enigma.parser.TT.TINYSTATEMENT;
enigma.parser.EDL_Keywords.statements['default']  = enigma.parser.TT.S_DEFAULT;
enigma.parser.EDL_Keywords.statements['do']       = enigma.parser.TT.S_DO;
enigma.parser.EDL_Keywords.statements['else']     = enigma.parser.TT.S_ELSE;
enigma.parser.EDL_Keywords.statements['exit']     = enigma.parser.TT.TINYSTATEMENT;
enigma.parser.EDL_Keywords.statements['for']      = enigma.parser.TT.S_FOR;
enigma.parser.EDL_Keywords.statements['if']       = enigma.parser.TT.S_IF;
enigma.parser.EDL_Keywords.statements['return']   = enigma.parser.TT.SHORTSTATEMENT;
enigma.parser.EDL_Keywords.statements['repeat']   = enigma.parser.TT.GEN_STATEMENT;
enigma.parser.EDL_Keywords.statements['switch']   = enigma.parser.TT.S_SWITCH;
enigma.parser.EDL_Keywords.statements['try']      = enigma.parser.TT.S_TRY;
enigma.parser.EDL_Keywords.statements['then']     = enigma.parser.TT.S_THEN;
enigma.parser.EDL_Keywords.statements['until']    = enigma.parser.TT.GEN_STATEMENT;
enigma.parser.EDL_Keywords.statements['while']    = enigma.parser.TT.GEN_STATEMENT;
enigma.parser.EDL_Keywords.statements['with']     = enigma.parser.TT.GEN_STATEMENT;


enigma.parser.EDL_Keywords.breakAndFollow = function(t) {
  return t == enigma.parser.TT.TINYSTATEMENT;
}
enigma.parser.EDL_Keywords.operatorLike = function(t) {
  return t != enigma.parser.TT.TINYSTATEMENT && t != enigma.parser.TT.S_ELSE && t != enigma.parser.TT.S_DO;
}
enigma.parser.EDL_Keywords.statement_type = function(name)
{
  var ret = enigma.parser.EDL_Keywords.statements[name];
  return ret == null ? TT_ERROR : ret;
}

enigma.parser.EDL_Keywords.types = new Object;
enigma.parser.EDL_Keywords.types['var']     = "";
enigma.parser.EDL_Keywords.types['int']     = "";
enigma.parser.EDL_Keywords.types['char']    = "";
enigma.parser.EDL_Keywords.types['float']   = "";
enigma.parser.EDL_Keywords.types['double']  = "";
enigma.parser.EDL_Keywords.types['string']  = "";

enigma.parser.EDL_Keywords.find_extname = function(name) {
  var it = this.types[name];
  if (it != null) {
    it = new Object;
    it.namespace = "";
    it.type = "typename";
    return it;
  }
  
  var to = "undefined";
  var res = new Object;
  var ns = "";
  try {
    to = eval("typeof(enigma.system.object_basic." + name + ")");
    res.namespace = "this";
    ns = "enigma.system.object_basic.";
  } catch (err) {}
  
  if (to == "undefined") {
    try {
      to = eval("typeof(enigma.global." + name + ")");
      res.namespace = "enigma.global";
      ns = "enigma.global.";
    } catch (err) { }
    if (to == "undefined")
      return null;
  }
  if (to == "function")
  {
    res.type = "function";
    res.argc_min = eval(ns+name + ".argc_min");
    if (res.argc_min == undefined)
      res.argc_min = 0;
    res.argc_max = eval(ns+name + ".argc_max");
    if (res.argc_min == undefined)
      res.argc_min = 65536;
    return res;
  }
  res.type = eval(ns + name + ".constructor == Array")? "array" : to.toLowerCase();
  return res;
}

