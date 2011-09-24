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

var rarray = (function()
{
  function enigma_event(name, supcheck, sbcheck, def, cnst, prefx, handler) {
    this.name = name;
    this.supercheck = supcheck;
    this.subcheck = sbcheck;
    this.handler = handler;
    this.def = def;
    this.cnst = cnst;
    this.prefix = prefx;
    this.callbacks = new Object;
  }

  var ENIGMA_INSTANCE_EVENT_ITERATOR;
  var ENIGMA_CURRENT_EVENT_NAME;
  function keyCodeLookup() {
    keys = new Array();
    keys[8]  = "backspace";    keys[40] = "down arrow";    keys[106] = "multiply";      keys[123] = "F12";
    keys[9]  = "tab";          keys[45] = "insert";        keys[107] = "add";           keys[144] = "num lock";
    keys[13] = "enter";        keys[46] = "delete";        keys[109] = "subtract";      keys[145] = "scroll lock";
    keys[16] = "shift";        keys[91] = "left window";   keys[110] = "decimal point"; keys[186] = ";";
    keys[17] = "ctrl";         keys[92] = "right window";  keys[111] = "divide";        keys[187] = "=";
    keys[18] = "alt";          keys[93] = "select key";    keys[112] = "F1";            keys[188] = ",";
    keys[19] = "pause/break";  keys[96] = "numpad 0";      keys[113] = "F2";            keys[189] = "-";
    keys[20] = "caps lock";    keys[97] = "numpad 1";      keys[114] = "F3";            keys[190] = ".";
    keys[27] = "escape";       keys[98] = "numpad 2";      keys[115] = "F4";            keys[191] = "/";
    keys[33] = "page up";      keys[99] = "numpad 3";      keys[116] = "F5";            keys[192] = "`";
    keys[34] = "page down";    keys[100] = "numpad 4";     keys[117] = "F6";            keys[219] = "[";
    keys[35] = "end";          keys[101] = "numpad 5";     keys[118] = "F7";            keys[220] = "\\";
    keys[36] = "home";         keys[102] = "numpad 6";     keys[119] = "F8";            keys[221] = "]";
    keys[37] = "left arrow";   keys[103] = "numpad 7";     keys[120] = "F9";            keys[222] = "'";
    keys[38] = "up arrow";     keys[104] = "numpad 8";     keys[121] = "F10";
    keys[39] = "right arrow";  keys[105] = "numpad 9";     keys[122] = "F11";
  }
  keyCodeLookup.prototype.lookup = function(key) { return keys[key]; }

  linear_events = new Array();
  events = new Object;
  event_lookup = new Array();
  {
    var nev;
    function register_event(nev,id1,id2) {
      nev.id1 = id1; nev.id2 = id2;
      nev.lin_id = linear_events.length;
      nev.callbacks=new Array;
      linear_events.push(nev);
      if (!event_lookup[id1])
        event_lookup[id1] = new Array();
      event_lookup[id1][id2] = nev;
    }
    function register_event_stacked(nev,id1,namefunc) {
      nev.id1 = id1; nev.namefunc = namefunc;
      nev.lin_id = linear_events.length;
      nev.callbacks=new Array;
      linear_events.push(nev);
      if (!event_lookup[id1])
        event_lookup[id1] = nev;
    }
    
    nev = new enigma_event("Begin Step",null,null,null,
      "{ xprevious = x; yprevious = y; image_index = fmod(image_index + image_speed, sprite_get_number(sprite_index)); }"
    );
    register_event(nev,3,1);
    
    var keys = new keyCodeLookup();
    var rnum = function(x) { return x.toString(); }
    var rkey = function(x) { return keys[x] ? keys[x] : "<invalid>"; }
    
    
    nev = new enigma_event("Alarm %s", null,
      "{ if ((alarm[%1] == -1) or (alarm[%1]--)) return 0; }"
    ); register_event_stacked(nev,2,rnum);
    
    nev = new enigma_event("Key Press %s",
    	      function(id2) { return enigma.global.keyboard_check_pressed(id2); }
    	    ); register_event_stacked(nev,9,rkey);
    
    nev = new enigma_event("Keyboard %s", 
      function(id2) { return enigma.global.keyboard_check(id2); }
    ); register_event_stacked(nev,5,rkey);
    

    nev = new enigma_event("Key Release %s",
      function(id2) { return enigma.global.keyboard_check_released(id2); }
    ); register_event_stacked(nev,10,rkey);

    // There are a million different specialized mouse events.
    // These are frequently-used sub checks.
    var fcheck_mleft = function() { return mouse_check_button(mb_left); }
    var fcheck_mright = function() { return mouse_check_button(mb_right); }
    var fcheck_mmiddle = function() { return mouse_check_button(mb_middle); }
    var fcheck_mnone = function() { return mouse_check_button(mb_none); }
    var fcheck_many = function() { return mouse_check_button(mb_any); }
    
    var fcheck_mpleft = function() { return mouse_check_button(mb_left); }
    var fcheck_mpright = function() { return mouse_check_button(mb_right); }
    var fcheck_mpmiddle = function() { return mouse_check_button(mb_middle); }
    
    var fcheck_mrleft = function() { return mouse_check_button(mb_left); }
    var fcheck_mrright = function() { return mouse_check_button(mb_right); }
    var fcheck_mrmiddle = function() { return mouse_check_button(mb_middle); }
    
    nev = new enigma_event("Mouse Left Button",
      "mouse_x > x + bbox_left and mouse_x < x + bbox_right and mouse_y > y + bbox_top and mouse_y < y + bbox_bottom"
    ); register_event(nev,6,0);

    nev = new enigma_event("Mouse Right Button",fcheck_mright,
      "mouse_x > x + bbox_left and mouse_x < x + bbox_right and mouse_y > y + bbox_top and mouse_y < y + bbox_bottom"
    ); register_event(nev,6,1);

    nev = new enigma_event("Mouse Middle Button",fcheck_mmiddle,
      "mouse_x > x + bbox_left and mouse_x < x + bbox_right and mouse_y > y + bbox_top and mouse_y < y + bbox_bottom"
    ); register_event(nev,6,2);

    nev = new enigma_event("Mouse No Button",fcheck_mnone,
      "!(mouse_x > x + bbox_left and mouse_x < x + bbox_right and mouse_y > y + bbox_top and mouse_y < y + bbox_bottom)"
    ); register_event(nev,6,3);

    nev = new enigma_event("Mouse Left Press",fcheck_mleft,
      "mouse_x > x + bbox_left and mouse_x < x + bbox_right and mouse_y > y + bbox_top and mouse_y < y + bbox_bottom"
    ); register_event(nev,6,4);

    nev = new enigma_event("Mouse Right Press",fcheck_mright,
      "mouse_x > x + bbox_left and mouse_x < x + bbox_right and mouse_y > y + bbox_top and mouse_y < y + bbox_bottom"
    ); register_event(nev,6,5);

    nev = new enigma_event("Mouse Middle Press",fcheck_many,
      "mouse_x > x + bbox_left and mouse_x < x + bbox_right and mouse_y > y + bbox_top and mouse_y < y + bbox_bottom"
    ); register_event(nev,6,6);

    nev = new enigma_event("Mouse Left Release",fcheck_mrleft,
      "mouse_x > x + bbox_left and mouse_x < x + bbox_right and mouse_y > y + bbox_top and mouse_y < y + bbox_bottom"
    ); register_event(nev,6,7);

    nev = new enigma_event("Mouse Right Release",fcheck_mrright,
      "mouse_x > x + bbox_left and mouse_x < x + bbox_right and mouse_y > y + bbox_top and mouse_y < y + bbox_bottom"
    ); register_event(nev,6,8);

    nev = new enigma_event("Mouse Middle Release",fcheck_mrmiddle,
      "mouse_x > x + bbox_left and mouse_x < x + bbox_right and mouse_y > y + fcheck_mr and mouse_y < y + bbox_bottom"
    ); register_event(nev,6,9);

    nev = new enigma_event("Mouse Enter",null,
      "{ const bool wasin = $innowEnter; $innowEnter = mouse_x > x + bbox_left and mouse_x < x + bbox_right and mouse_y > y + bbox_top and mouse_y < y + bbox_bottom; if (!$innowEnter or wasin) return 0; }"
    ); register_event(nev,6,10);

    nev = new enigma_event("Mouse Leave",null,
      "{ const bool wasin = $innowLeave; $innowLeave = mouse_x > x + bbox_left and mouse_x < x + bbox_right and mouse_y > y + bbox_top and mouse_y < y + bbox_bottom; if ($innowLeave or !wasin) return 0; }"
    ); register_event(nev,6,11);

    nev = new enigma_event("Mouse Any Button?",null,
      "{ return 0; }"
    ); register_event(nev,6,12);
    
    nev = new enigma_event("Mouse Any Button Released?",null,
      "{ return 0; }"
    ); register_event(nev,6,13);

    nev = new enigma_event("Mouse Wheel Up",function() { return mouse_vscrolls > 0; });
      register_event(nev,6,60);
    nev = new enigma_event("Mouse Wheel Down",function() { return mouse_vscrolls < 0; });
      register_event(nev,6,61);
    
    nev = new enigma_event("Mouse Global Left Button",fcheck_mleft);
      register_event(nev,6,50);
    nev = new enigma_event("Mouse Global Right Button",fcheck_mright);
      register_event(nev,6,51);
    nev = new enigma_event("Mouse Global Middle Button",fcheck_mmiddle);
      register_event(nev,6,52);
    
    nev = new enigma_event("Mouse Global Left Press",fcheck_mpleft);
      register_event(nev,6,53);
    nev = new enigma_event("Mouse Global Right Press",fcheck_mpright);
      register_event(nev,6,54);
    nev = new enigma_event("Mouse Global Middle press",fcheck_mpmiddle);
      register_event(nev,6,55);
    
    nev = new enigma_event("Mouse Global Left Release",fcheck_mrleft);
      register_event(nev,6,56);
    nev = new enigma_event("Mouse Global Right Release",fcheck_mrright);
      register_event(nev,6,57);
    nev = new enigma_event("Mouse Global Middle Release",fcheck_mrmiddle);
      register_event(nev,6,58);
    
    // Finally, some general-purpose events
    nev = new enigma_event("Step");
      register_event(nev,3,0);
    
    nev = new enigma_event("Locals sweep", null, null, null, "enigma::propagate_locals(this);");
      register_event(nev,100000,0);
    
    // Other events
    nev = new enigma_event("Path End", function() { return false; });
    register_event(nev,7,8);
    
    nev = new enigma_event("Outside Room",null,
      "(x+bbox_right < 0) || (x+bbox_left > room_width) || (y+bbox_bottom < 0) || (y+bbox_top > room_height)"
    ); register_event(nev,7,0);
    
    nev = new enigma_event("Intersect Boundary", null,
      "(x+bbox_left < 0) or (x+bbox_right > room_width) or (y+bbox_top < 0) or (y+bbox_bottom > room_height)"
    ); register_event(nev,7,1);
    
    
    // Collisions stuck here for some reason, possibly so that you
    // can deduct lives/health right before the "No more Lives" event
    
    nev = new enigma_event("Collision with %1", function() { return instance_number(this.id2); },
      "(instance_other = enigma::place_meeting_inst(x,y,%1))",
      "if (solid || ENIGMA_glaccess(other)->solid) {x = xprevious; y = yprevious;}"
    ); register_event_stacked(nev, 4);
    
    // Check for detriment from collision events above
    
    nev = new enigma_event("No More Lives",function() { return lives <= 0; });
    register_event(nev, 7,6);
    
    nev = new enigma_event("No More Health",function() { return health <= 0; });
    register_event(nev, 7,9);
    
    // General purpose once again!
    nev = new enigma_event("End Step");
    register_event(nev,3,2);
    
    // Fun fact: Draw comes after End Step.
    nev = new enigma_event("Draw",null,"visible",
      "if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; }\n" +
      "if (this.visible && this.sprite_index != -1) draw_sprite_ext(this.sprite_index,this.image_index," +
        "this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);\n",
      null, null, function() { enigma.global.screen_redraw(); enigma.global.screen_refresh(); } // We never want to iterate draw; we let screen_redraw() handle it.
    ); register_event(nev,8,0);
    
    nev = new enigma_event("Animation End",null,
      "{if (image_index + image_speed < sprite_get_number(sprite_index)) return 0; }"
    ); register_event(nev,7,7);
  }
  
  
  return [
    function()
    {
      // Linear event iteration
      for (var lei = 0; lei < linear_events.length; lei++)
      {
    	  if (linear_events[lei].handler) { linear_events[lei].handler(); continue;}
    	  if (linear_events[lei].callbacks.length==0) continue; 
          
            for (ENIGMA_INSTANCE_EVENT_ITERATOR in linear_events[lei].callbacks)
              {
            	if (!linear_events[lei].supercheck || linear_events[lei].supercheck(linear_events[lei].callbacks[ENIGMA_INSTANCE_EVENT_ITERATOR].id2))
            	{enigma.global.current_instance=linear_events[lei].callbacks[ENIGMA_INSTANCE_EVENT_ITERATOR].whom;
            		linear_events[lei].callbacks[ENIGMA_INSTANCE_EVENT_ITERATOR]();}
              }
      }
    }
  ,
    function(id,id1,id2,callback,whom) {
      var ev1 = event_lookup[id1];
      if (!ev1) return;
      var ev2 = ev1[id2];
      
      if (!ev2) {
    	  // stacked event
    	  linear_events[ev1.lin_id].callbacks[id] = callback.bind(whom);
    	  linear_events[ev1.lin_id].callbacks[id].id2=id2;
    	  linear_events[ev1.lin_id].callbacks[id].whom=whom; //tgmg temp
      }
      else {
    	 
      linear_events[ev2.lin_id].callbacks[id] = callback.bind(whom);
      linear_events[ev2.lin_id].callbacks[id].id2=id2;
      linear_events[ev2.lin_id].callbacks[id].whom=whom; //tgmg
      }
    }
  ,
  function(id,id1,id2,callback,whom) {
    var ev1 = event_lookup[id1];
    if (!ev1) return;
    var ev2 = ev1[id2];
    
    if (!ev2) {
  	  // stacked event
  	  delete linear_events[ev1.lin_id].callbacks[id];
    }
    else 
    delete linear_events[ev2.lin_id].callbacks[id];
    
  }
  ];
})();

enigma.system.event_loop = rarray[0];

/** Links in an event for object with id @param id with
 * given event main id @param id1 and sub id @param id2
 * as function() @param callback.
 * */
enigma.system.event_loop.link_event = rarray[1];
enigma.system.event_loop.unlink_event = rarray[2];
