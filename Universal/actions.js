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
var argument_relative=false;



enigma.global.action_if_variable=function(variable,value,operation) {
    switch (operation)
    {
        case 0: return (variable==value); break;
        case 1: return (variable<value); break;
        case 2: return (variable>value); break;
        default: return false; //invalid operation
    }
};

enigma.global.action_move_to=function(xx, yy) {
	var instance=enigma.global.current_instance;
    if (argument_relative) {
    	instance.x+=xx;
    	instance.y+=yy;
    }
    else {
    	instance.x=xx;
    	instance.y=yy;
	}
};

enigma.global.action_sound=function(sound, loop) {
	/*if (loop==0) sound_play(sound);
	else sound_loop(sound);*/
}

enigma.global.action_set_vspeed=function(newvspeed) {
	var instance=enigma.global.current_instance;
    if (argument_relative) {
    	instance.vspeed+=newvspeed;
    } else
    	instance.vspeed=newvspeed;
};

enigma.global.action_kill_object=function() { instance_destroy(); }

enigma.global.action_create_object=function(object, x, y)
{
    if (argument_relative)
    {
    	enigma.global.instance_create(this.x+x, this.y+y, object);
    }
    else
    	enigma.global.instance_create(x, y, object);
}

enigma.global.action_draw_sprite=function(sprite, x, y, subimage) {
    if (argument_relative) {
    	enigma.global.draw_sprite(sprite,subimage,x+this.x,y+this.y);
    }
    else
    	enigma.global.draw_sprite(sprite,subimage,x,y);
}

enigma.global.action_set_health=function(value) {
    if (argument_relative) enigma.global.health+= value;
    else enigma.global.health = value;
}

enigma.global.action_set_score=function(newscore) {
    if (argument_relative) enigma.global.score+= newscore;
    else enigma.global.score = newscore;
};

enigma.global.action_restart_game=function() {
    //game_restart();
};

enigma.global.action_if_dice=function(sides) {
    if (sides == 0) {return false;}
    return (random(1) < 1/sides);
}

enigma.global.action_sleep=function(milliseconds, redraw) {
   /* if (redraw) {enigma.global.screen_redraw();}
    enigma.global.sleep(milliseconds/1000);*/
}

enigma.global.action_if_number=function( object,number,operation) {
	switch (operation)
	{
	    case 0: return (enigma.global.instance_number(object) == number); break;
	    case 1:	return (enigma.global.instance_number(object) < number); break;
	    case 2: return (enigma.global.instance_number(object) > number); break;
	    default: return false; //invalid operation
  }
};

enigma.global.action_set_alarm=function(steps,alarmno)
{
	var instance=enigma.global.current_instance;
  if (argument_relative)
	  instance.alarm[alarmno] += (steps);
  else
	  instance.alarm[alarmno] = (steps);
};

enigma.global.action_color=function(color) {
	enigma.global.draw_set_color(color);
};

enigma.global.action_set_life=function(newlives) {
    if (argument_relative) lives+= newlives;
    else lives = newlives;
};

enigma.global.action_change_object=function() {
	//
};

enigma.global.action_draw_score=function(x,y,caption) {
	var instance=enigma.global.current_instance;
    if (argument_relative) {
    	enigma.global.draw_text(x+instance.x,y+instance.y,caption+(score));
    } else enigma.global.draw_text(x,y,caption+(score));
};

enigma.global.action_set_caption=function(score,scoreCaption,lives,livesCaption,health,healthCaption) {
    show_score=score;
    caption_score=scoreCaption;
    show_lives=lives;
    caption_lives=livesCaption;
    show_health=0;
    caption_health=healthCaption;
}

enigma.global.action_draw_health=function(x1,y1,x2,y2,backColor,barColor) {
	 /* var realbar1, realbar2;
	  switch (barColor)
	  {
	      case 0: realbar1=c_green; realbar2=c_red; break;
	      case 1: realbar1=c_white; realbar2=c_black; break;
	      case 2: realbar1=c_black; realbar2=c_black; break;
	      case 3: realbar1=c_gray; realbar2=c_gray; break;
	      case 4: realbar1=c_silver; realbar2=c_silver; break;
	      case 5: realbar1=c_white; realbar2=c_white; break;
	      case 6: realbar1=c_maroon; realbar2=c_maroon; break;
	      case 7: realbar1=c_green; realbar2=c_green; break;
	      case 8: realbar1=c_olive; realbar2=c_olive; break;
	      case 9: realbar1=c_navy; realbar2=c_navy; break;
	      case 10: realbar1=c_purple; realbar2=c_purple; break;
	      case 11: realbar1=c_teal; realbar2=c_teal; break;
	      case 12: realbar1=c_red; realbar2=c_red; break;
	      case 13: realbar1=c_lime; realbar2=c_lime; break;
	      case 14: realbar1=c_yellow; realbar2=c_yellow; break;
	      case 15: realbar1=c_blue; realbar2=c_blue; break;
	      case 16: realbar1=c_fuchsia; realbar2=c_fuchsia; break;
	      case 17: realbar1=c_aqua; realbar2=c_aqua; break;
	      default: realbar1=c_green; realbar2=c_red;
	  }
		if (argument_relative) {
	        draw_healthbar(x1+this.x, y1+this.y, x2+this.x, y2+this.y, health, backColor, realbar2, realbar1, 1, 1, 1);
		}
		else
	        draw_healthbar(x1, y1, x2, y2, health, backColor, realbar2, realbar1, 1, 1, 1);*/
	};
	
	enigma.global.action_draw_life_images=function(x,y,image) {
		var instance=enigma.global.current_instance;
		var actualX=x, actualY=y;
	    var width = enigma.global.sprite_get_width(image);

	    if (argument_relative) {
	        actualX+=instance.x;
	        actualY+=instance.y;
	    }

	    for (var i=0; i<lives; i++)
	        enigma.global.draw_sprite(image,-1, actualX+(i*width), actualY);
	};
	