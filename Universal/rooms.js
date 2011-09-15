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

enigma.global.background_color = 0xC0C0C0;
enigma.global.background_showcolor = true;

enigma.global.background_visible  = [0,0,0,0,0,0,0,0];
enigma.global.background_foreground = [0,0,0,0,0,0,0,0],
enigma.global.background_index = [-1,-1,-1,-1,-1,-1,-1,-1];
enigma.global.background_x = [0,0,0,0,0,0,0,0];
enigma.global.background_y = [0,0,0,0,0,0,0,0];
enigma.global.background_htiled = [0,0,0,0,0,0,0,0];
enigma.global.background_vtiled = [0,0,0,0,0,0,0,0];
enigma.global.background_hspeed = [0,0,0,0,0,0,0,0];
enigma.global.background_vspeed = [0,0,0,0,0,0,0,0];
enigma.global.background_alpha = [0,0,0,0,0,0,0,0];

enigma.global.room_first = 0;
enigma.global.room_height = 480;
enigma.global.room_last = 0;
enigma.global.room_persistent = 0;
enigma.global.room_speed = 30;
enigma.global.room_width = 640;

enigma.global.room_caption = "ENIGMA Engine";

enigma.global.view_current;
enigma.global.view_enabled;

enigma.global.view_hborder = [0,0,0,0,0,0,0,0];
enigma.global.view_hport   = [0,0,0,0,0,0,0,0];
enigma.global.view_hspeed  = [0,0,0,0,0,0,0,0];
enigma.global.view_hview   = [0,0,0,0,0,0,0,0];
enigma.global.view_object  = [0,0,0,0,0,0,0,0];
enigma.global.view_vborder = [0,0,0,0,0,0,0,0];
enigma.global.view_visible = [0,0,0,0,0,0,0,0];
enigma.global.view_vspeed  = [0,0,0,0,0,0,0,0];
enigma.global.view_wport   = [0,0,0,0,0,0,0,0];
enigma.global.view_wview   = [0,0,0,0,0,0,0,0];
enigma.global.view_xport   = [0,0,0,0,0,0,0,0];
enigma.global.view_xview   = [0,0,0,0,0,0,0,0];
enigma.global.view_yport   = [0,0,0,0,0,0,0,0];
enigma.global.view_yview   = [0,0,0,0,0,0,0,0];
enigma.global.view_angle   = [0,0,0,0,0,0,0,0];

var room; //current room id
enigma.global.room_goto=function(indx)
{
	if (indx < 0 || indx >= room_idmax || !roomarray[indx])
		return enigma.global.show_error("Attempting to go to nonexisting room");
	roomarray[indx].gotome();
	return 0;
};

enigma.global.room_restart=function()
{
	var indx=room;
	roomarray[indx].gotome();
	return 0;
};

enigma.global.room_get_name=function(index)
{
	if (index < 0 || index >= room_idmax || !roomarray[index])
		return enigma.global.show_error("Room index out of range");
	return roomarray[index].name;
};


enigma.global.room_count=function() {
  return roomarray.length;
};

enigma.global.room_goto_first=function()
{
    var rit = roomarray[roomorder[0]];
    if (0 >= roomorder.length) 
    	return enigma.global.show_error("Game must have at least one room to do anything");
    rit.gotome();
    return 0;
}

enigma.global.room_goto_next=function()
{
    var rit = roomarray[room];

    if (rit.order+1 < 0 || rit.order+1 >= roomorder.length) 
		return enigma.global.show_error("Going to next room after last");
    
    rit = roomarray[roomorder[rit.order + 1]];

    rit.gotome();
    return 0;
}

enigma.global.room_goto_previous=function()
{
    var rit = roomarray[room];

    if (rit.order-1 < 0 || rit.order-1 >= roomorder.length) 
		return enigma.global.show_error("Going to previous room after first");
    
    rit = roomarray[roomorder[rit.order - 1]];
    
    rit.gotome();
    return 0;
};

/*
 * Return index of room after num
 */
enigma.global.room_next=function(num)
{
    if (num < 0 || num >= room_idmax)
      return -1;
    var rit = roomarray[num];
    if (!rit || rit.order+1 >= roomorder.length)
      return -1;
    return roomarray[roomorder[rit.order + 1]].id;
}
enigma.global.room_previous=function(num)
{
    if (num < 0 || num >= room_idmax)
      return -1;
    var rit = roomarray[num];
    if (!rit || rit.order-1 < 0)
      return -1;
    return roomarray[roomorder[rit.order - 1]].id;
}
//order, roomorder,
