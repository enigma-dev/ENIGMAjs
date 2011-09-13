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

enigma.parser.parse_edl = (function()
{
  var is_useless  = enigma.parser.is_useless;
  var is_letter   = enigma.parser.is_letter;
  var is_letterd  = enigma.parser.is_letterd;
  var is_digit    = enigma.parser.is_digit;
  var is_hexdigit = enigma.parser.is_hexdigit;
  
  var EDL_Macros  = enigma.parser.EDL_Macros;
  var EDL_Keywords  = enigma.parser.EDL_Keywords;
  
  function token(/*TT*/ t, /*string*/ ct, /*pt*/ p,/*pt*/ l,/*bool*/ s,/*bool*/ bnf,/*bool*/ ol,/*int*/ ml, /*externs* */ex, /*unsigned int*/ m)
  {
    this.type = (t);
    this.content = (ct);
    this.pos = (p);
    this.length = (l);
    this.separator = (s);
    this.breakandfollow = (bnf);
    this.operatorlike = (ol);
    this.macrolevel = (ml);
    this.match = m == null? 0 : m;
    this.ext = ex;
  }

  function open_parenth_info(i, ml, type) {
    this.ind = i;
    this.macrolevel = ml;
    this.type = type;
  };

  function pop_open_parenthesis(ops, lex, pos, ind, opener, whathavewe) {
    var ps = enigma.parser;
    if (ops.length <= 0) {
      ps.err = "Unexpected " + whathavewe + ": None open."; return pos;
    }
    var p = ops[ops.length-1].type;
    if (p != opener) {
      ps.err = "Expected " + (p == '(' ? "closing parenthesis" : p == '[' ? "closing bracket" : p == '{' ? "closing brace" : p == '?' ? "matching ternary symbol" : "closing triangle bracket") + " before " + whathavewe;
      return pos;
    }
    var oi = ops[ops.length-1].ind;
    lex[oi].match = ind;
    lex[ind].match = oi;
    ops.pop();
    return -1;
  }

  runcount = 0;
  function EDL_Parser(code) {
  }
  return function(code)
  {
    var ps = enigma.parser;
    thisrun = runcount++;
    
    ps.err = "No error";
    lex = new Array();
    lex.push_is = function() {
      if (open_parenths.length && open_parenths[open_parenths.length-1].type == '?')
      {
        var ts = open_parenths.pop();
        this[ts.ind].match = this.length;
        this.push(new token(ps.TT.TERNARYCOLON, ":", superPos, 0, true, false, false, mymacroind, null, ts.ind));
      }
      else
        this.push(new token(ps.TT.IMPLICIT_SEMICOLON, ";", superPos, 0, true, false, false, mymacroind));
    }
    lex.top = function() {
      return this[this.length - 1];
    }
    mymacrostack = new Array();
    mymacroind = 0;
    open_parenths = new Array();
    lex.push_is();
    
    var pos = 0;
    
    function superPos() {};
    superPos.toString = function() { return mymacroind ? mymacrostack[0].pos : pos; }
    superPos.valueOf  = function() { return mymacroind ? mymacrostack[0].pos : pos; }
    
    for (pos = 0; pos < code.length; )
    {
      // Handle end of code
      if (pos >= code.length) {
        if (mymacroind)
          mymacrostack[--mymacroind].release(code,pos);
        else break; continue;
      }
      
      if (is_useless(code.charAt(pos))) {
        while (is_useless(code.charAt(++pos)));
        continue;
      }
      
      if (is_letter(code.charAt(pos)))
      {
        var spos = pos;
        while (is_letterd(code.charAt(++pos)));
        var name = code.substr(spos,pos-spos);
        
        // First, check if it's a macro.
        var mi = EDL_Macros[name];
        var wasmacro = true;
        if (mi != null)
        {
          if (!EDL_Macros.macro_recurses(name,mymacrostack,mymacroind))
          {
            var macrostr = mi.value;
            if (mi.argc != -1) //Expect ()
            {
              var cwp = enigma.parser.EDL_Macros.skip_comments(code,pos);
              if (code[cwp] != '(')
                wasmacro = false;
              else if (!EDL_Macros.macro_function_parse(code,code.length,name,pos,macrostr,mi.args,mi.argc,mi.args_uat,false,true)) {
                ps.err = macrostr;
                return superPos;
              }
            }
            if (wasmacro) {
              mymacrostack[mymacroind++].grab(name,code,pos);
              code = macrostr; pos = 0;
            }
          }
          if (wasmacro)
            continue;
        }
        
        not_a_macro:
        if (EDL_Keywords.is_wordop(name)) { //this is actually a word-based operator, such as `and', `or', and `not' 
          var unary = name[0] == 'n'; //not is the only unary word operator.
          if (unary && (!lex.top().separator && !lex.top().operatorlike)) {
            ps.err = "Unexpected unary keyword `not'";
            return pos;
          }
          if (!unary && (!lex.length || lex.top().separator || lex.top().operatorlike)) {
            ps.err = "Expected primary expression before `" + name + "' operator";
            return pos;
          }
          lex.push(new token(unary ? ps.TT.UNARYPRE : ps.TT.OPERATOR, name, superPos, name.length, false, false, true, mymacroind));
          continue;
        }
        
        if ((ext_retriever_var = EDL_Keywords.find_extname(name)) != null)
        {
          if (lex.top().type != ps.TT.DECIMAL)
          {
            // Handle typenames
            if (ext_retriever_var.type == "typename") {
              if (lex.top().type == ps.TT.TYPE_NAME)
                lex.top().length = superPos - lex.top().pos + name.length;
              else {
                if (lex.top().breakandfollow)
                  lex.push_is();
                lex.push(new token(ps.TT.TYPE_NAME, name, superPos, name.length, false, false, false, mymacroind, ext_retriever_var));
              }
              continue;
            }
            
            if (lex.top().breakandfollow)
              lex.push_is();
            
            if (ext_retriever_var.type == "namespace") {
              lex.push(new token(ps.TT.NAMESPACE, name, superPos, name.length, false, false, false, mymacroind, ext_retriever_var));
              continue;
            }
            
            if (ext_retriever_var.type == "function") {
              lex.push(new token(ps.TT.FUNCTION, name, superPos, name.length, false, true, false, mymacroind, ext_retriever_var));
              continue;
            }
            
            // Global variables
            lex.push(new token(ps.TT.VARNAME, name, superPos, name.length, false, true, false, mymacroind, ext_retriever_var));
            continue;
          }
          else
            if (ext_retriever_var.type == "function") {
              lex.push(new token(ps.TT.FUNCTION, name, superPos, name.length, false, true, false, mymacroind, ext_retriever_var));
              continue;
            }
        }
        
        if (EDL_Keywords.is_statement(name)) // Our control statements
        {
          if (!lex.top().separator || lex.top().operatorlike)
          {
            if (lex.top().breakandfollow)
              lex.push_is();
            else
            {
              if (lex.top().operatorlike)
                return (ps.err = "Expected secondary expression before `" + name + "'", superPos);
              if (lex.top().type != ps.TT.S_ELSE && lex.top().type != ps.TT.S_TRY)
                return (ps.err = "Unexpected `" + name + "' statement at this point", superPos);
            }
          }
          var mt = EDL_Keywords.statement_type(name);
          lex.push(new token(mt, name, superPos, name.length, false, EDL_Keywords.breakAndFollow(mt), EDL_Keywords.operatorLike(mt), mymacroind));
          continue;
        }
        
        if (!lex.top().operatorlike && lex.top().breakandfollow)
          lex.push_is();
        
        lex.push(new token(ps.TT.VARNAME, name, superPos, name.length, false, true, false, mymacroind));
        continue;
      }
      
      if (is_digit(code.charAt(pos)))
      {
        if (!lex.top().separator && !lex.top().operatorlike) {
          lex.push_is();
        }
        var spos = pos;
        while (is_digit(code.charAt(++pos)));
        lex.push(new token(ps.TT.DIGIT, code.substr(spos,pos-spos), superPos, pos-spos, false, true, false, mymacroind));
        continue;
      }
      switch (code.charAt(pos))
      {
        case ';':
            if (lex.top().operatorlike) { ps.err = "Expected secondary expression before semicolon"; return superPos; }
            lex.push(new token(ps.TT.SEMICOLON, ";", superPos, 1, true, false, false, mymacroind));
          pos++; continue;
        case ':':
            if (code[pos+1] == '=')
              lex.push(new token(ps.TT.ASSOP, ":=", superPos, 2, true, false, false, mymacroind)), pos += 2;
            else if (code[pos+1] == ':') {
              if (lex.top().type != ps.TT.NAMESPACE)
              {
                if (!lex.top().separator)
                  return (ps.err = lex.top().type == ps.TT.VARNAME?"Unexpected namespace accessor: `"+lex.top().content+"' is not a namespace":"Unexpected namespace accessor at this point", superPos);
                immediate_scope = global_scope;
              } else
                immediate_scope = lex.top().ext;
              lex.push(new token(ps.TT.SCOPEACCESS, "::", superPos, 2, false, false, true, mymacroind)), pos += 2;
            }
            else {
              if (!open_parenths.length || open_parenths[open_parenths.length-1].type != '?') {
                if (lex.top().operatorlike)
                  return (ps.err = "Expected secondary expression before colon", superPos);
                lex.push(new token(ps.TT.COLON, ":", superPos, 1, true, false, false, mymacroind)), ++pos;
              }
              else
              {
                var oto = open_parenths.pop();
                lex[oto.ind].match = lex.length;
                lex.push(new token(ps.TT.TERNARYCOLON, ":", superPos, 1, true, false, false, mymacroind, null, oto.ind)), ++pos;
              }
            }
          continue;
        case ',':
            lex.push(new token(ps.TT.COMMA, ",", superPos, 1, true, false, true, mymacroind));
          pos++; continue;
        case '$': {
            var spos = pos;
            if (!lex.top().separator && !lex.top().operatorlike) {
              lex.push_is();
            }
            if (!is_hexdigit(code.charAt(++pos))) {
              ps.err = "Hexadecimal literal expected after '$' symbol";
              return superPos;
            }
            while (is_hexdigit(code.charAt(++pos)));
            lex.push(new token(ps.TT.DIGIT, "0x"+code.substr(spos+1,pos-spos-1), superPos, pos-spos, false, true, false, mymacroind));
          } continue;
          
        var open_error;
        case '{':
            if (lex.top().operatorlike)
              return (ps.err = "Expected secondary expression before brace", superPos);
            if (lex.top().breakandfollow)
              lex.push_is();
            lex.push(new token(ps.TT.BEGINBRACE, "{", superPos, 1, true, false, false, mymacroind));
            open_parenths.push(new open_parenth_info(lex.length-1, mymacroind, '{'));
          pos++; continue;
        case '}':
            if (lex.top().operatorlike)
              return (ps.err = "Expected secondary expression before closing brace", superPos);
            if (open_parenths.length > 0)
              lex.push(new token(ps.TT.IMPLICIT_SEMICOLON, ";", superPos, 0, true, false, false, mymacroind)),
              lex.push(new token(ps.TT.ENDBRACE, "}", superPos, 1, true, false, false, mymacroind, null, open_parenths[open_parenths.length-1].ind));
            open_error = pop_open_parenthesis(open_parenths, lex, superPos, lex.length-1, '{', "closing brace");
            if (open_error != -1) return open_error;
          pos++; continue;
        case '[':
            if (lex.top().operatorlike)
              return (ps.err = "Expected identifier before bracket; ENIGMA arrays not yet implemented", superPos);
            lex.push(new token(ps.TT.BEGINBRACKET, "[", superPos, 1, true, false, true, mymacroind));
            open_parenths.push(new open_parenth_info(lex.length-1, mymacroind, '['));
          pos++; continue;
        case ']':
            if (lex.top().operatorlike && lex.top().type != ps.TT.BEGINBRACKET)
              return (ps.err = "Expected secondary expression before closing bracket", superPos);
            if (open_parenths.length > 0)
              lex.push(new token(ps.TT.ENDBRACKET, "]",superPos, 1, false, true, false, mymacroind, null, open_parenths[open_parenths.length-1].ind));
            open_error = pop_open_parenthesis(open_parenths, lex, superPos, lex.length-1, '[', "closing bracket");
            if (open_error != -1) return open_error;
          pos++; continue;
        case '(':
            if (lex.top().breakandfollow && lex.top().type != ps.TT.VARNAME  && lex.top().type != ps.TT.FUNCTION)
              lex.push_is();
            lex.push(new token(ps.TT.BEGINPARENTH, "(", superPos, 1, true, false, true, mymacroind));
            open_parenths.push(new open_parenth_info(lex.length-1, mymacroind, '('));
          pos++; continue;
        case ')':
            if (lex.top().operatorlike && lex.top().type != ps.TT.BEGINPARENTH)
              return (ps.err = "Expected secondary expression before closing parenthesis", superPos);
            if (open_parenths.length > 0)
              lex.push(new token(ps.TT.ENDPARENTH, ")", superPos, 1, false, lex.top().type != ps.TT.TYPE_NAME, false, mymacroind, null, open_parenths[open_parenths.length-1].ind));
            open_error = pop_open_parenthesis(open_parenths, lex, superPos, lex.length-1, '(', "closing parenthesis");
            if (open_error != -1) return open_error;
          pos++; continue;
        
        case '.': // We can't really do checking on this yet. It's one of the reasons we have two passes.
            lex.push(new token(ps.TT.DECIMAL, ".", superPos, 1, false, true, true, mymacroind)); ++pos;
          break;
        
        var spos;
        case '"':
            spos = pos;
            if (!lex.top().separator && !lex.top().operatorlike) {
              lex.push_is();
            }
            if (enigma.parser.setting.use_cpp_escapes)
              while (code.charAt(++pos)!='"') {
                if (pos >= code.length) {
                  ps.err = "Unclosed double quote at this point";
                  return superPos;
                }
                if (code.charAt(pos) == '\\')
                  pos++;
              }
            else
              while (code.charAt(++pos)!='"');
            lex.push(new token(ps.TT.STRING, code.substr(spos,pos-spos+1), superPos, pos-spos, false, true, false, mymacroind));
          pos++; break;
        case '\'':
            spos = pos;
            if (!lex.top().separator && !lex.top().operatorlike) {
              lex.push_is();
            }
            if (enigma.parser.setting.use_cpp_escapes)
              while (code.charAt(++pos) != '\'') {
                if (pos >= code.length) {
                  ps.err = "Unclosed quote at this point";
                  return superPos;
                }
                if (code.charAt(pos) == '\\')
                  pos++;
              }
            else
              while (code.charAt(++pos) != '\'');
            lex.push(new token(ps.TT.STRING, code.substr(spos,pos-spos+1), superPos, pos-spos, false, true, false, mymacroind));
          pos++; break;
        
        case '?':
            if (!lex.length || lex.top().separator || lex.top().operatorlike) {
              ps.err = "Primary expression expected before ternary operator";
              return superPos;
            }
            open_parenths.push(new open_parenth_info(lex.length, mymacroind, "?"));
            lex.push(new token(ps.TT.TERNARY, "?", superPos, 1, false, false, true, mymacroind));
            pos++;
          break;
        
        var sz;
        case '+': case '-':
            sz = 1 + (code[pos+1] == code.charAt(pos) && enigma.parser.setting.use_incrementals);
            if (!lex.length || lex.top().separator || lex.top().operatorlike)
              lex.push(new token(ps.TT.UNARYPRE, code.substr(pos,sz), superPos, sz, false, false, true, mymacroind));
            else if (sz == 2)
              lex.push(new token(ps.TT.UNARYPOST, code.substr(pos,sz), superPos, sz, false, true, false, mymacroind));
            else if (code[pos+1] == '=')
              lex.push(new token(ps.TT.ASSOP, code.substr(pos,2), superPos, sz = 2, false, false, true, mymacroind));
            else
              lex.push(new token(ps.TT.OPERATOR, code.substr(pos,sz), superPos, sz, false, false, true, mymacroind));
            pos += sz;
          break;
        case '*':
            if (!lex.length || lex.top().separator || lex.top().operatorlike)
              lex.push(new token(ps.TT.UNARYPRE, "*", superPos, 1, false, false, true, mymacroind)), ++pos;
            else if (code[pos+1] == '=')
              lex.push(new token(ps.TT.ASSOP, "*=", superPos, 2, false, false, true, mymacroind)), pos += 2;
            else
              lex.push(new token(ps.TT.OPERATOR, "*", superPos, 1, false, false, true, mymacroind)), ++pos;
          break;
        case '>': case '<':
            if (code.charAt(pos) == '<')
              if (lex.top().type == ps.TT.TYPE_NAME) {
                lex.push(new token(ps.TT.BEGINTRIANGLE, "<", superPos, 1, false, false, false, mymacroind)), pos++;
                open_parenths.push(new open_parenth_info(lex.length-1, mymacroind, '<'));
                continue;
              } else;
            else if (open_parenths.length && open_parenths[open_parenths.length-1].type == '<') {
              if (open_parenths.length > 0)
                lex.push(new token(ps.TT.ENDTRIANGLE, ">", superPos, 1, false, false, false, mymacroind, null, open_parenths[open_parenths.length-1].ind)), pos++;
              open_error = pop_open_parenthesis(open_parenths, lex, superPos, lex.length-1, '<', "closing triangle bracket");
              if (open_error != -1) return open_error;
              pos++; continue;
            }
        case '&': case '|': case '^':
            if (!lex.length || lex.top().separator || lex.top().operatorlike) {
              if (code.charAt(pos) != '&') {
                ps.err = "Expected primary expression before operator";
                return superPos;
              }
              lex.push(new token(ps.TT.UNARYPRE, code.substr(pos,1), superPos, 1, false, false, true, mymacroind)), ++pos;
            }
            else if (code[pos+1] == code.charAt(pos) || (code[pos+1] == '>' && code.charAt(pos) == '<')) {
              if ((code.charAt(pos) == '<' || code.charAt(pos) == '>') && code.charAt(pos) == code[pos+1] && code[pos+2] == '=')
                lex.push(new token(code.charAt(pos) != code[pos+1] ? ps.TT.OPERATOR : ps.TT.ASSOP, code.substr(pos,3), superPos, 3, false, false, true, mymacroind)), pos += 3; // <<= >>=
              else
                lex.push(new token(ps.TT.OPERATOR, code.substr(pos,2), superPos, 2, false, false, true, mymacroind)), pos += 2; // << >> && || ^^ <>
            }
            else if (code[pos+1] == '=')
              lex.push(new token((code.charAt(pos) == '<' || code.charAt(pos) == '>')?ps.TT.OPERATOR:ps.TT.ASSOP, code.substr(pos,2), superPos, 2, false, false, true, mymacroind)), pos += 2; // >= <= &= |= ^=
            else
              lex.push(new token(ps.TT.OPERATOR, code.substr(pos,1), superPos, 1, false, false, true, mymacroind)), ++pos; // > < & | ^
          break;
        case '/':
            if (code[pos+1] == '/') { // Two-slash comments
              while (++pos < code.length && code.charAt(pos) != '\n' && code.charAt(pos) != '\r');
              continue;
            }
            if (code[pos+1] == '*') { ++pos; // GM /**/ Comments
              while (++pos < code.length && (code.charAt(pos) != '/' || code[pos-1] != '*'));
              pos++; continue;
            }
        case '%': 
            if (!lex.length || lex.top().separator || lex.top().operatorlike) {
              ps.err = "Primary expression expected before operator";
              return superPos;
            }
            if (code[pos+1] == '=')
              lex.push(new token(ps.TT.ASSOP, code.substr(pos,2), superPos, 2, false, false, true, mymacroind)), pos += 2; // %= /=
            else
              lex.push(new token(ps.TT.OPERATOR, code.substr(pos,1), superPos, 1, false, false, true, mymacroind)), ++pos;
          break;
        
        case '!':
            if (code[pos+1] == '=') {
              lex.push(new token(ps.TT.OPERATOR, "!=", superPos, 2, false, false, true, mymacroind)), pos += 2;
              continue;
            }
        case '~':
            if (!lex.length || lex.top().separator || lex.top().operatorlike)
              lex.push(new token(ps.TT.UNARYPRE, code.substr(pos,1), superPos, 1, false, false, true, mymacroind)), ++pos; // ~ !
            else {
              ps.err = "Unexpected unary operator at this point";
              return superPos;
            }
          break;
        
        case '=':
            if (!lex.length || lex.top().separator || lex.top().operatorlike) {
              ps.err = "Primary expression expected before operator";
              return superPos;
            }
            if (lex.top().type == ps.TT.OPERATOR) {
              ps.err = "Unexpected = at this point.";
              return superPos;
            }
            sz = (code[pos+1] == '=') + 1;
            lex.push(new token(sz==2 ? ps.TT.OPERATOR : ps.TT.ASSOP, sz==1?"=":"==", superPos, sz, false, false, true, mymacroind)), pos += sz; 
          break;
        default:
            ps.err = "Unexpected symbol `" + code.substr(pos,1) + "': unknown to compiler";
          return superPos;
      }
    }
    
    if (open_parenths.length) {
      var p = open_parenths[open_parenths.length-1].type;
      ps.err = "Unterminated " + (p == '(' ? "parenthesis" : p == '[' ? "bracket" : p == '{' ? "brace" : p == '?' ? "ternary expression" : "triangle bracket")
             + " at this point";
      return lex[open_parenths[open_parenths.length-1].ind].pos;
    }
    
    if (lex.top().operatorlike) {
      ps.err = "Expected secondary expression before end of code";
      return code.length;
    }

    lex.push_is();
    
    
    
    
    // Reinterpretive/Refurbishing pass
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    var semistack = [];
    var lexn = new Array(lex.length-2), np = 0;
    var reconsider = [];
    var ts = 0; // Number of converted statements this code
    function doinsert(token) {
      switch (token.type)
      {
        case ps.TT.BEGINPARENTH: case ps.TT.BEGINBRACKET: case ps.TT.BEGINBRACE: case ps.TT.BEGINTRIANGLE: case ps.TT.TERNARY:
          open_parenths.push(new open_parenth_info(np, token.macrolevel, token.content)); break;
        case ps.TT.ENDPARENTH: case ps.TT.ENDBRACKET: case ps.TT.ENDBRACE: case ps.TT.ENDTRIANGLE: case ps.TT.TERNARYCOLON:
          var ind = open_parenths.pop().ind; lexn[ind].match = np; token.match = ind; break;
      }
      lexn[np++] = token;
    }
    for (var i = 1; i < lex.length; i++)
    {
      if (lex[i].type != ps.TT.IMPLICIT_SEMICOLON)
      {
        if (lex[i].type == ps.TT.BEGINBRACE) {
          while (semistack.length > 0) {
            var sst = semistack.pop();
            if (sst.type == ps.TT.SEMICOLON) break;
            doinsert(sst);
            if (reconsider.length)
              reconsider.pop();
          }
        }
        doinsert(lex[i]);
      }
      else
      {
        if (semistack.length > 0)
          doinsert(semistack.pop());
        else
          doinsert(new token(ps.TT.SEMICOLON, ";", -1, 1, true, false, false, 0));
        if (reconsider.length)
          reconsider.pop();
        continue;
      }
      
      switch (lex[i].type) 
      {
        case ps.TT.VARNAME:
          if (lex[i+1].type == ps.TT.BEGINPARENTH)
          {
            ps.err = "Unknown function or script `" + lex[i].content + "'";
            if (lex[lex[i+1].match+1].type == ps.TT.DECIMAL)
              ps.err += ": use semicolon to separate object ID and variable name.";
            return lex[i].pos;
          }
          break;
        case ps.TT.FUNCTION:
          if (lex[i+1].type != ps.TT.BEGINPARENTH)
            continue;
          else
          {
            var contented = false;
            var params = 0, exceeded_at = 0;
            var minarg = lex[i].ext.argc_min;
            var maxarg = lex[i].ext.argc_max;
            var lm = lex[i+1].match;
            
            for (var ii = i+2; ii < lm; ii++)
            {
              if (lex[ii].type == ps.TT.COMMA) {
                contented = false;
                if (params++ == maxarg)
                  exceeded_at = ii;
                continue;
              }
              contented = true;
              if (lex[ii].match)


                ii = lex[ii].match;
            }
            params += contented;
            if (maxarg != -1) {
              if (exceeded_at)
                return (ps.err = "Too many arguments to function `" + lex[i].content + "': provided " + (params) + ", allowed " + (maxarg) + ".", lex[exceeded_at].pos);
              if (params > maxarg)
                return (ps.err = "Too many arguments to function `" + lex[i].content + "': provided " + (params) + ", allowed " + (maxarg) + ".", lex[lm].pos);
            }
            if (params < minarg)
              return (ps.err = "Too few arguments to function `" + lex[i].content + "': provided " + (params) + ", required " + (minarg) + ".", lex[lm].pos);
          }
          break;
        
        case ps.TT.SEMICOLON:
            while (semistack.length > 0) {
              var sst = semistack.pop();
              if (sst.type == ps.TT.SEMICOLON) break;
              doinsert(sst);
              if (reconsider.length)
                reconsider.pop();
            }
            if (reconsider.length)
              reconsider.pop();
          break;
        case ps.TT.COMMA:
            if (lex[i-1].separator)
              return (ps.err = "Expected statement before comma", lex[i].pos);
          break;
        case ps.TT.DECIMAL:
            if (lex[i-1].type != ps.TT.DIGIT)
            {
              if (lex[i+1].type != ps.TT.DIGIT)
              {
                if (lex[i+1].type != ps.TT.VARNAME && lex[i+1].type != ps.TT.FUNCTION)
                  return (ps.err = "Stray decimal point", lex[i].pos);
                var is = np-2;
                if (lexn[is].type == ps.TT.VARNAME || lexn[is].type == ps.TT.ENDPARENTH || lexn[is].type == ps.TT.ENDBRACKET)
                {
                  if (is > 0 && (lexn[is].type == ps.TT.VARNAME || lexn[is].type == ps.TT.FUNCTION) && lexn[is-1].type == ps.TT.DECIMAL)
                    is -= 2;
                  while (lexn[is].type == ps.TT.ENDPARENTH || lexn[is].type == ps.TT.ENDBRACKET)
                  {
                    is = lexn[is].match;
                    if (is >= 1)
                    {
                      if (lexn[is-1].type == ps.TT.VARNAME || lexn[is-1].type == ps.TT.FUNCTION
                      ||  lexn[is-1].type == ps.TT.ENDPARENTH || lexn[is-1].type == ps.TT.ENDBRACKET)
                        is--;
                      if (is >= 1 && (lexn[is].type == ps.TT.VARNAME || lexn[is].type == ps.TT.FUNCTION) && lexn[is-1].type == ps.TT.DECIMAL)
                        is -= 2;
                    }
                  }
                  lexn[np+2] = lexn[np-1]; // Move the dot forward three spaces
                  // Move everything else forward two spaces
                  for (var npi = np-2; npi >= is; npi--) {
                    lexn[npi+2] = lexn[npi];
                    if (lexn[npi+2].match && lexn[npi+2].match >= is)
                      lexn[npi+2].match += 2;
                  }
                  var p1 = is, p2 = is+1, p3 = np+1;
                  lexn[p1] = new token(ps.TT.FUNCTION,     "access", superPos, 1, true, false, true, mymacroind,{type:"function",namespace:"enigma.system"});
                  lexn[p2] = new token(ps.TT.BEGINPARENTH, "(", superPos, 1, true, false, true, mymacroind,null,p3);
                  lexn[p3] = new token(ps.TT.ENDPARENTH,   ")", superPos, 1, true, false, true, mymacroind,null,p2);
                  np += 3;
                }
                else
                  return (ps.err = "Expected expression before dot accessor", lex[i].pos);
              }
              else
              {
                // Combine the two. This is safe because no further matches have been established yet.
                lexn[np-1].content += lex[++i].content; 
                lexn[np-1].type = ps.TT.DIGIT;
              }
            }
            else
            {
              if (lex[i+1].type != ps.TT.VARNAME && lex[i+1].type != ps.TT.FUNCTION)
              {
                if (lexn[np-2].content.indexOf('.') == -1)
                {
                  lexn[--np-1].content += ".";
                  if (lex[i+1].type == ps.TT.DIGIT)
                    lexn[np-1].content += lex[++i].content;
                }
                else
                  return (ps.err = "Expected identifier following dot accessor", lex[i].pos);
              }
              if (lex[i+1].type == ps.TT.VARNAME || lex[i+1].type == ps.TT.FUNCTION)
              {
                lexn[np] = lexn[np-2]; // Move the identifier two forward
                lexn[np+2] = lexn[np-1];   // Move the dot three forward
                var p1 = np-2, p2 = np-1, p3 = np+1;
                lexn[p1] = new token(ps.TT.FUNCTION,     "access", superPos, 1, true, false, true, mymacroind,{type:"function",namespace:"enigma.system"});
                lexn[p2] = new token(ps.TT.BEGINPARENTH, "(", superPos, 1, true, false, true, mymacroind,null,p3);
                lexn[p3] = new token(ps.TT.ENDPARENTH,   ")", superPos, 1, true, false, true, mymacroind,null,p2);
                np += 3;
              }
            }
          break;
        
        
        case ps.TT.GEN_STATEMENT:
            if (lex[i].content == "with")
            {
              lexn[np-1].type = ps.TT.PARSED_WITH;
              lexn[np-1].content = "for";
              var vn = "$wi" + (ts++);
              doinsert(new token(ps.TT.BEGINPARENTH, "(var " + vn + "=enigma.system.getIterator(", -1, 1, true, false, true, 0));
              semistack.push(new token(ps.TT.ENDPARENTH, "); !" + vn + ".atEnd(); " + vn + ".goNext())", -1, 1, false, lex.top().type != ps.TT.TYPE_NAME, false, 0, null, np-1));
              break;
            }
            else if (lex[i].content == "repeat")
            {
              lexn[np-1].content = "for";
              var vn = "$ri" + (ts++);
              doinsert(new token(ps.TT.BEGINPARENTH, "(var " + vn + "=(", -1, 1, true, false, true, 0));
              semistack.push(new token(ps.TT.ENDPARENTH, "); " + vn + ">0; --" + vn + ")", -1, 1, false, lex.top().type != ps.TT.TYPE_NAME, false, 0, null, np-1));
              break;
            }
        case ps.TT.S_SWITCH: case ps.TT.S_IF:
            doinsert(new token(ps.TT.BEGINPARENTH, "(", -1, 1, true, false, true, 0));
            semistack.push(new token(ps.TT.ENDPARENTH, ")", -1, 1, false, lex.top().type != ps.TT.TYPE_NAME, false, 0, null, open_parenths[open_parenths.length-1].ind));
          break;
        case ps.TT.S_FOR:
            reconsider.push(false,true,false);
            doinsert(new token(ps.TT.BEGINPARENTH, "(", -1, 1, true, false, true, 0));
            semistack.push(new token(ps.TT.ENDPARENTH, ")", -1, 1, false, lex.top().type != ps.TT.TYPE_NAME, false, 0, null, open_parenths[open_parenths.length-1].ind));
            semistack.push(new token(ps.TT.SEMICOLON, ";", -1, 1, true, false, false, 0));
            semistack.push(new token(ps.TT.SEMICOLON, ";", -1, 1, true, false, false, 0));
          break;
        case ps.TT.ASSOP:
            if (lex[i].content == "=" && ps.setting.use_gml_equals)
            {
              if (reconsider.length) {
                if (reconsider[reconsider.length-1])
                  lex[i].content = "==", lex[i].type = ps.TT.OPERATOR;
                else
                  reconsider[reconsider.length-1] = true;
              }
              else if (open_parenths.length && (open_parenths[open_parenths.length-1].type == "(" || open_parenths[open_parenths.length-1].type == "["))
                lex[i].content = "==", lex[i].type = ps.TT.OPERATOR;
              else
                reconsider.push(true);
            }
            else
            {
              if (lex[i].content == ":=")
                lex[i].content = "=";
              if (reconsider.length) reconsider[reconsider.length-1] = true;
              else reconsider.push(true);
            }
            if (lex[i].type == ps.TT.ASSOP)
            {
              if (lex[i-1].type == ps.TT.FUNCTION)
                { ps.err = "Cannot assign to function `" + lex[i-1].content + "'"; return lex[i].pos; }
              if (lex[i-1].type == ps.TT.STRING)
                { ps.err = "Cannot assign to string literal"; return lex[i].pos; }
              if (lex[i-1].type == ps.TT.DIGIT)
                { ps.err = "Cannot assign to numeric constant"; return lex[i].pos; }
            }
          break;
        case ps.TT.SHORTSTATEMENT:
            reconsider.push(true);
          break;
        
        case ps.TT.TERNARY:
        case ps.TT.TERNARYCOLON:
            if (reconsider.length)
              reconsider[reconsider.length - 1] = false;
            else
              reconsider.push(false);
          break;
        
        case ps.TT.UNARYPRE:
          if (lex[i].content == '*' || lex[i].content == '&') {
            if (lex[i+1].type == ps.TT.DIGIT)
              return (ps.err = "Cannot " + (lex[i].content == '*'?"dereference":"take address of") + " numeric constant", lex[i].pos);
          }
          break;
        
        case ps.TT.BEGINTRIANGLE:
            i = lex[i].match;
            np--;
          break;
        case ps.TT.TYPE_NAME:
            try {
              if (eval("enigma.classes."+lex[i].content) != undefined)
              {
                alert("Unimplemented!");
              }
            } catch (err) {}
            lex[i].content = "var";
          break;
        
        default: ;
      }
    }
    
    lex = lexn;
    if (np < lex.length)
      lex.splice(np);
    
    ps.code_out = "";
    var with_start = -1, with_end = -1;
    try {
      for (var i = 0; i < lex.length; i++)
      {
        if (lex[i].type == ps.TT.GEN_STATEMENT && lex[i].content == "with")
        {
          var ws = lex[i+1].match + 1
          if (with_start == -1 || with_start > lex[i+1].match)
            with_start = ws;
          if (lex[ws].type == ps.TT.BEGINBRACE)
            with_end = with_end < lex[ws].match ? lex[ws].match : with_end;
        }
        else if (lex[i].type == ps.TT.SEMICOLON)
        {
          if ((semistack.length == 0 || semistack[semistack.length-1].type != '(') && with_start != -1 && with_end == -1)
            with_start = -1;
        }
        if (i+1 < lex.length)
        {
          if (lex[i].type == ps.TT.BEGINPARENTH && lex[i+1].type == ps.TT.BEGINPARENTH && lex[i].match == lex[i+1].match+1 && lex[i].content == lex[i+1].content)
            lex[i].content = lex[lex[i].match].content = "";
        }
        
        if (with_end != -1 && i > with_end)
          with_start = with_end = -1;
        if (with_start == -1 || i < with_start)
        {
          if (lex[i].ext && lex[i].ext.namespace && lex[i].ext.namespace != "")
            ps.code_out += lex[i].ext.namespace + ".";
          else if ((!i || lex[i-1].type != ps.TT.DECIMAL) && lex[i].type == ps.TT.VARNAME)
            ps.code_out += "this.";
        }
        else
        {
          if (lex[i].ext && lex[i].ext.namespace && lex[i].ext.namespace != "")
            ps.code_out += (lex[i].ext.namespace == "this" ? "enigma.system.with_obj" : lex[i].ext.namespace) + ".";
          else if ((!i || lex[i-1].type != ps.TT.DECIMAL) && lex[i].type == ps.TT.VARNAME)
            ps.code_out += "enigma.system.with_obj.";
        }
        ps.code_out += lex[i].content + " ";
        if (lex[i].type == ps.TT.VARNAME && lex[i].ext && lex[i].ext && lex[i].ext.type.toLowerCase() == "array" && lex[i+1].type != ps.TT.BEGINBRACKET)
          ps.code_out += "[0] ";
      }
    }
    catch (err) { ps.err = err.toString(); return 0; }
    return -1;
  }
})();

