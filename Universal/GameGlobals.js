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

enigma.global["current_instance"]=null;

var argument_relative=false;
/*global:     background_alpha
global:     background_blend
global:     background_foreground
global:     background_height
global:     background_hspeed
global:     background_htiled
global:     background_index
global:     background_visible
global:     background_vspeed
global:     background_vtiled
global:     background_width
global:     background_x
global:     background_xscale
global:     background_y
global:     background_yscale
 */
var caption_score="Score:", caption_lives="Lives:", caption_health="Health:";

/*
global:     current_day
global:     current_hour
global:     current_minute
global:     current_month
global:     current_second
global:     current_time
global:     current_weekday
global:     current_year
global:     cursor_sprite
global:     error_last
global:     error_occurred
global:     event_action
global:     event_number
global:     event_object
global:     event_type*/
var      fps;/*
global:     game_id
*/
var health=100;
/*
global:     instance_id
global:     keyboard_key
global:     keyboard_lastchar
global:     keyboard_lastkey
global:     keyboard_string
*/
var lives=3;
var score=0;
/*
global:     secure_mode
 */
var show_score=0, show_lives=0, show_health=0;
/*
global:     temp_directory
global:     transition_kind
global:     transition_steps
global:     transition_time*/
/*global:  working_directory*/

