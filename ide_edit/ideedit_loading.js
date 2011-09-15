var spritestructarray = {0:{name:"spr_myplane",id:0,transparent:true,mask:false,smooth:false,originX:32,originY:32,bbLeft:3,bbRight:61,bbTop:13,bbBottom:55,subImageCount:3},1:{name:"spr_life",id:1,transparent:true,mask:false,smooth:false,originX:0,originY:0,bbLeft:4,bbRight:26,bbTop:6,bbBottom:23,subImageCount:1},2:{name:"spr_bottom",id:2,transparent:false,mask:false,smooth:false,originX:0,originY:0,bbLeft:0,bbRight:639,bbTop:0,bbBottom:75,subImageCount:1},3:{name:"spr_island1",id:3,transparent:true,mask:false,smooth:false,originX:0,originY:0,bbLeft:3,bbRight:50,bbTop:4,bbBottom:55,subImageCount:1},4:{name:"spr_island2",id:4,transparent:true,mask:false,smooth:false,originX:0,originY:0,bbLeft:0,bbRight:63,bbTop:2,bbBottom:61,subImageCount:1},5:{name:"spr_island3",id:5,transparent:true,mask:false,smooth:false,originX:0,originY:0,bbLeft:15,bbRight:54,bbTop:18,bbBottom:53,subImageCount:1},6:{name:"spr_enemy1",id:6,transparent:true,mask:false,smooth:false,originX:16,originY:16,bbLeft:0,bbRight:31,bbTop:1,bbBottom:31,subImageCount:3},7:{name:"spr_bullet",id:7,transparent:true,mask:false,smooth:false,originX:16,originY:16,bbLeft:11,bbRight:19,bbTop:7,bbBottom:26,subImageCount:1},8:{name:"spr_explosion1",id:8,transparent:true,mask:false,smooth:false,originX:15,originY:15,bbLeft:1,bbRight:29,bbTop:3,bbBottom:29,subImageCount:6},9:{name:"spr_explosion2",id:9,transparent:true,mask:false,smooth:false,originX:32,originY:32,bbLeft:6,bbRight:57,bbTop:7,bbBottom:58,subImageCount:7},10:{name:"spr_enemy2",id:10,transparent:true,mask:false,smooth:false,originX:16,originY:16,bbLeft:0,bbRight:31,bbTop:0,bbBottom:31,subImageCount:3},11:{name:"spr_enemy3",id:11,transparent:true,mask:false,smooth:false,originX:16,originY:16,bbLeft:0,bbRight:31,bbTop:1,bbBottom:31,subImageCount:3},12:{name:"spr_enemybullet1",id:12,transparent:true,mask:false,smooth:false,originX:16,originY:16,bbLeft:14,bbRight:19,bbTop:13,bbBottom:18,subImageCount:1},13:{name:"spr_enemybullet2",id:13,transparent:true,mask:false,smooth:false,originX:16,originY:16,bbLeft:13,bbRight:19,bbTop:13,bbBottom:19,subImageCount:1},14:{name:"spr_enemy4",id:14,transparent:true,mask:false,smooth:false,originX:16,originY:16,bbLeft:0,bbRight:31,bbTop:0,bbBottom:31,subImageCount:3}};var soundstructarray = {0:{name:"snd_explosion2",id:0,fileType:".wav",fileName:"",chorus:false,echo:false,flanger:false,gargle:false,reverb:false,volume:1.0,pan:0.0,preload:true},1:{name:"snd_explosion1",id:1,fileType:".wav",fileName:"",chorus:false,echo:false,flanger:false,gargle:false,reverb:false,volume:1.0,pan:0.0,preload:true},2:{name:"snd_explosion3",id:2,fileType:".wav",fileName:"",chorus:false,echo:false,flanger:false,gargle:false,reverb:false,volume:1.0,pan:0.0,preload:true},3:{name:"snd_background",id:3,fileType:".mid",fileName:"",chorus:false,echo:false,flanger:false,gargle:false,reverb:false,volume:1.0,pan:0.0,preload:false}};
var backgroundstructarray = {0:{name:"back_water",id:0,transparent:false,smoothEdges:false,preload:false},2:{name:"back_score",id:2,transparent:false,smoothEdges:false,preload:false}};
var pathstructarray = {}; //no paths 
var fontstructarray = {}; //no fonts 

enigma.objects.obj_myplane = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 0; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){this.can_shoot = 1 ; }; this.event_0_0();
this.event_2_0=function(){this.can_shoot = 1 ; };enigma.system.event_loop.link_event(this.id,2,0,this.event_2_0,this);

this.event_3_0=function(){this.room_caption = ( this.fps ) ; };enigma.system.event_loop.link_event(this.id,3,0,this.event_3_0,this);

this.event_5_40=function(){if ( enigma.global.action_if_variable ( this.y , this.room_height - 120 , 1 ) ) { argument_relative = true ; enigma.global.action_move_to ( 0 , 2 ) ; } ; };enigma.system.event_loop.link_event(this.id,5,40,this.event_5_40,this);

this.event_5_39=function(){if ( enigma.global.action_if_variable ( this.x , this.room_width - 40 , 1 ) ) { argument_relative = true ; enigma.global.action_move_to ( 4 , 0 ) ; } ; };enigma.system.event_loop.link_event(this.id,5,39,this.event_5_39,this);

this.event_5_38=function(){if ( enigma.global.action_if_variable ( this.y , 40 , 2 ) ) { argument_relative = true ; enigma.global.action_move_to ( 0 , - 2 ) ; } ; };enigma.system.event_loop.link_event(this.id,5,38,this.event_5_38,this);

this.event_5_37=function(){if ( enigma.global.action_if_variable ( this.x , 40 , 2 ) ) { argument_relative = true ; enigma.global.action_move_to ( - 4 , 0 ) ; } ; };enigma.system.event_loop.link_event(this.id,5,37,this.event_5_37,this);

this.event_5_32=function(){if ( enigma.global.action_if_variable ( this.can_shoot , 1 , 0 ) ) { if ( enigma.global.action_if_variable ( this.score , 400 , 2 ) ) { { argument_relative = true ; enigma.global.action_create_object ( this.obj_bullet , - 24 , - 8 ) ; } { argument_relative = true ; enigma.global.action_create_object ( this.obj_bullet , 24 , - 8 ) ; } if ( enigma.global.action_if_variable ( this.score , 1000 , 2 ) ) { argument_relative = true ; enigma.global.action_create_object ( this.obj_bullet , 0 , - 48 ) ; } ; } else { { argument_relative = true ; enigma.global.action_create_object ( this.obj_bullet , 0 , - 16 ) ; } ; } this.can_shoot = 0 ; { argument_relative = false ; enigma.global.action_set_alarm ( 15 , 0 ) ; } ; } ; };enigma.system.event_loop.link_event(this.id,5,32,this.event_5_32,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, -100);};

enigma.objects.controller_life = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = -1; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){{ argument_relative = false ; enigma.global.action_set_score ( 0 ) ; } { argument_relative = false ; enigma.global.action_set_life ( 3 ) ; } { argument_relative = false ; enigma.global.action_set_health ( 100 ) ; } enigma.global.action_set_caption ( 0 , "score: " , 0 , "lives: " , 0 , "health: " ) ; enigma.global.action_sound ( this.snd_background , true ) ; }; this.event_0_0();
this.event_7_9=function(){{ argument_relative = false ; enigma.global.action_set_health ( 100 ) ; } enigma.global.action_sound ( this.snd_explosion2 , false ) ; for (var $wi0=enigma.system.getIterator( ( this.obj_myplane ) ); !$wi0.atEnd(); $wi0.goNext()) { enigma.global.action_change_object ( this.obj_explosion2 , 0 ) ; } ; };enigma.system.event_loop.link_event(this.id,7,9,this.event_7_9,this);

this.event_7_6=function(){enigma.global.action_restart_game ( ) ; };enigma.system.event_loop.link_event(this.id,7,6,this.event_7_6,this);

this.event_8_0=function(){{ argument_relative = false ; enigma.global.action_draw_sprite ( this.spr_bottom , 0 , 404 , - 1 ) ; } enigma.global.action_color ( 0xFFFFFF ) ; { argument_relative = false ; enigma.global.action_draw_score ( 180 , 440 , "" ) ; } { argument_relative = false ; enigma.global.action_draw_health ( 12 , 449 , 138 , 459 , 0 , 0 ) ; } { argument_relative = false ; enigma.global.action_draw_life_images ( 16 , 410 , this.spr_life ) ; } ; };enigma.system.event_loop.link_event(this.id,8,0,this.event_8_0,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, -10000);};

enigma.objects.obj_island1 = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 3; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){{ argument_relative = false ; enigma.global.action_set_vspeed ( 2 ) ; } ; }; this.event_0_0();
this.event_3_0=function(){if ( enigma.global.action_if_variable ( this.y , this.room_height , 2 ) ) { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , - 65 ) ; } ; };enigma.system.event_loop.link_event(this.id,3,0,this.event_3_0,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 10000);};

enigma.objects.obj_island3 = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 5; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){{ argument_relative = false ; enigma.global.action_set_vspeed ( 2 ) ; } ; }; this.event_0_0();
this.event_3_0=function(){if ( enigma.global.action_if_variable ( this.y , this.room_height , 2 ) ) { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , - 65 ) ; } ; };enigma.system.event_loop.link_event(this.id,3,0,this.event_3_0,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 10000);};

enigma.objects.obj_island2 = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 4; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){{ argument_relative = false ; enigma.global.action_set_vspeed ( 2 ) ; } ; }; this.event_0_0();
this.event_3_0=function(){if ( enigma.global.action_if_variable ( this.y , this.room_height , 2 ) ) { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , - 65 ) ; } ; };enigma.system.event_loop.link_event(this.id,3,0,this.event_3_0,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 10000);};

enigma.objects.obj_enemy1 = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 6; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){{ argument_relative = false ; enigma.global.action_set_vspeed ( 4 ) ; } ; }; this.event_0_0();
this.event_3_0=function(){if ( enigma.global.action_if_variable ( this.y , this.room_height + 32 , 2 ) ) { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , - 16 ) ; } ; };enigma.system.event_loop.link_event(this.id,3,0,this.event_3_0,this);

this.event_4_7=function(){enigma.global.action_sound ( this.snd_explosion1 , false ) ; for (var $wi0=enigma.system.getIterator( ( this.other ) ); !$wi0.atEnd(); $wi0.goNext()) { enigma.global.action_kill_object ( ) ; } { argument_relative = true ; enigma.global.action_create_object ( this.obj_explosion1 , 0 , 0 ) ; } { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , - 16 ) ; } { argument_relative = true ; enigma.global.action_set_score ( 5 ) ; } ; };enigma.system.event_loop.link_event(this.id,4,7,this.event_4_7,this);

this.event_4_0=function(){enigma.global.action_sound ( this.snd_explosion1 , false ) ; { argument_relative = true ; enigma.global.action_create_object ( this.obj_explosion1 , 0 , 0 ) ; } { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , - 16 ) ; } { argument_relative = true ; enigma.global.action_set_health ( - 30 ) ; } ; };enigma.system.event_loop.link_event(this.id,4,0,this.event_4_0,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 0);};

enigma.objects.controller_enemy = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = -1; this.visible = false; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){{ argument_relative = false ; enigma.global.action_create_object ( this.obj_enemy1 , enigma.global.random ( this.room_width ) , - 16 ) ; } { argument_relative = false ; enigma.global.action_create_object ( this.obj_enemy1 , enigma.global.random ( this.room_width ) , - 100 ) ; } { argument_relative = false ; enigma.global.action_set_alarm ( 200 , 0 ) ; } { argument_relative = false ; enigma.global.action_set_alarm ( 1000 , 1 ) ; } { argument_relative = false ; enigma.global.action_set_alarm ( 2000 , 2 ) ; } { argument_relative = false ; enigma.global.action_set_alarm ( 3000 , 3 ) ; } ; }; this.event_0_0();
this.event_2_3=function(){{ argument_relative = false ; enigma.global.action_create_object ( this.obj_enemy4 , enigma.global.random ( this.room_width ) , this.room_height + 16 ) ; } { argument_relative = false ; enigma.global.action_set_alarm ( 500 , 3 ) ; } ; };enigma.system.event_loop.link_event(this.id,2,3,this.event_2_3,this);

this.event_2_2=function(){{ argument_relative = false ; enigma.global.action_create_object ( this.obj_enemy3 , enigma.global.random ( this.room_width ) , - 16 ) ; } if ( enigma.global.action_if_number ( this.obj_enemy3 , 3 , 1 ) ) { argument_relative = false ; enigma.global.action_set_alarm ( 1000 , 2 ) ; } ; };enigma.system.event_loop.link_event(this.id,2,2,this.event_2_2,this);

this.event_2_1=function(){{ argument_relative = false ; enigma.global.action_create_object ( this.obj_enemy2 , enigma.global.random ( this.room_width ) , - 16 ) ; } if ( enigma.global.action_if_number ( this.obj_enemy2 , 5 , 1 ) ) { argument_relative = false ; enigma.global.action_set_alarm ( 500 , 1 ) ; } ; };enigma.system.event_loop.link_event(this.id,2,1,this.event_2_1,this);

this.event_2_0=function(){{ argument_relative = false ; enigma.global.action_create_object ( this.obj_enemy1 , enigma.global.random ( this.room_width ) , - 16 ) ; } if ( enigma.global.action_if_number ( this.obj_enemy1 , 8 , 1 ) ) { argument_relative = false ; enigma.global.action_set_alarm ( 500 , 0 ) ; } ; };enigma.system.event_loop.link_event(this.id,2,0,this.event_2_0,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 0);};

enigma.objects.obj_bullet = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 7; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){{ argument_relative = false ; enigma.global.action_set_vspeed ( - 8 ) ; } ; }; this.event_0_0();
this.event_3_0=function(){if ( enigma.global.action_if_variable ( this.y , - 16 , 1 ) ) enigma.global.action_kill_object ( ) ; };enigma.system.event_loop.link_event(this.id,3,0,this.event_3_0,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 0);};

enigma.objects.obj_explosion1 = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 8; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_7_7=function(){enigma.global.action_kill_object ( ) ; };enigma.system.event_loop.link_event(this.id,7,7,this.event_7_7,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 0);};

enigma.objects.obj_explosion2 = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 9; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_7_7=function(){enigma.global.action_kill_object ( ) ; enigma.global.action_sleep ( 1000 , true ) ; { argument_relative = true ; enigma.global.action_create_object ( this.obj_myplane , 0 , 0 ) ; } { argument_relative = true ; enigma.global.action_set_life ( - 1 ) ; } ; };enigma.system.event_loop.link_event(this.id,7,7,this.event_7_7,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 0);};

enigma.objects.obj_enemy2 = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 10; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){{ argument_relative = false ; enigma.global.action_set_vspeed ( 4 ) ; } ; }; this.event_0_0();
this.event_3_0=function(){if ( enigma.global.action_if_variable ( this.y , this.room_height + 32 , 2 ) ) { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , - 16 ) ; } if ( enigma.global.action_if_dice ( 30 ) ) { argument_relative = true ; enigma.global.action_create_object ( this.obj_enenybullet1 , 0 , 16 ) ; } ; };enigma.system.event_loop.link_event(this.id,3,0,this.event_3_0,this);

this.event_4_7=function(){enigma.global.action_sound ( this.snd_explosion1 , false ) ; for (var $wi0=enigma.system.getIterator( ( this.other ) ); !$wi0.atEnd(); $wi0.goNext()) { enigma.global.action_kill_object ( ) ; } { argument_relative = true ; enigma.global.action_create_object ( this.obj_explosion1 , 0 , 0 ) ; } { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , - 400 ) ; } { argument_relative = true ; enigma.global.action_set_score ( 10 ) ; } ; };enigma.system.event_loop.link_event(this.id,4,7,this.event_4_7,this);

this.event_4_0=function(){enigma.global.action_sound ( this.snd_explosion1 , false ) ; { argument_relative = true ; enigma.global.action_create_object ( this.obj_explosion1 , 0 , 0 ) ; } { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , - 16 ) ; } { argument_relative = true ; enigma.global.action_set_health ( - 30 ) ; } ; };enigma.system.event_loop.link_event(this.id,4,0,this.event_4_0,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 0);};

enigma.objects.obj_enenybullet1 = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 12; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){{ argument_relative = false ; enigma.global.action_set_vspeed ( 8 ) ; } ; }; this.event_0_0();
this.event_4_0=function(){enigma.global.action_sound ( this.snd_explosion3 , false ) ; enigma.global.action_kill_object ( ) ; { argument_relative = true ; enigma.global.action_set_health ( - 5 ) ; } ; };enigma.system.event_loop.link_event(this.id,4,0,this.event_4_0,this);

this.event_7_0=function(){enigma.global.action_kill_object ( ) ; };enigma.system.event_loop.link_event(this.id,7,0,this.event_7_0,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 0);};

enigma.objects.obj_enemy3 = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 11; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){{ argument_relative = false ; enigma.global.action_set_vspeed ( 4 ) ; } ; }; this.event_0_0();
this.event_3_0=function(){if ( enigma.global.action_if_variable ( this.y , this.room_height + 32 , 2 ) ) { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , - 16 ) ; } if ( enigma.global.action_if_dice ( 80 ) ) { argument_relative = true ; enigma.global.action_create_object ( this.obj_enemybullet2 , 0 , 16 ) ; } ; };enigma.system.event_loop.link_event(this.id,3,0,this.event_3_0,this);

this.event_4_7=function(){enigma.global.action_sound ( this.snd_explosion1 , false ) ; for (var $wi0=enigma.system.getIterator( ( this.other ) ); !$wi0.atEnd(); $wi0.goNext()) { enigma.global.action_kill_object ( ) ; } { argument_relative = true ; enigma.global.action_create_object ( this.obj_explosion1 , 0 , 0 ) ; } { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , - 400 ) ; } { argument_relative = true ; enigma.global.action_set_score ( 20 ) ; } ; };enigma.system.event_loop.link_event(this.id,4,7,this.event_4_7,this);

this.event_4_0=function(){enigma.global.action_sound ( this.snd_explosion1 , false ) ; { argument_relative = true ; enigma.global.action_create_object ( this.obj_explosion1 , 0 , 0 ) ; } { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , - 16 ) ; } { argument_relative = true ; enigma.global.action_set_health ( - 30 ) ; } ; };enigma.system.event_loop.link_event(this.id,4,0,this.event_4_0,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 0);};

enigma.objects.obj_enemybullet2 = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 13; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){if ( enigma.global.action_if_number ( this.obj_myplane , 0 , 2 ) ) { argument_relative = false ; this.action_move_point ( enigma.system.access ( this.obj_myplane ) . x , enigma.system.access ( this.obj_myplane ) . y , 8 ) ; } else { argument_relative = false ; enigma.global.action_set_vspeed ( 8 ) ; } ; }; this.event_0_0();
this.event_4_0=function(){enigma.global.action_sound ( this.snd_explosion3 , false ) ; enigma.global.action_kill_object ( ) ; { argument_relative = true ; enigma.global.action_set_health ( - 5 ) ; } ; };enigma.system.event_loop.link_event(this.id,4,0,this.event_4_0,this);

this.event_7_0=function(){enigma.global.action_kill_object ( ) ; };enigma.system.event_loop.link_event(this.id,7,0,this.event_7_0,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 0);};

enigma.objects.obj_enemy4 = function(id, oid, x, y) {this.prototype = new enigma.objects.object_locals(id, oid, x, y); this.id=id;	this.x=x; this.y=y;this.sprite_index = 14; this.visible = true; this.solid = false; this.persistent=false; this.parent=-100;this.mask=-1;
this.event_0_0=function(){{ argument_relative = false ; enigma.global.action_set_vspeed ( - 4 ) ; } ; }; this.event_0_0();
this.event_3_0=function(){if ( enigma.global.action_if_variable ( this.y , - 32 , 1 ) ) { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , this.room_height + 16 ) ; } ; };enigma.system.event_loop.link_event(this.id,3,0,this.event_3_0,this);

this.event_4_7=function(){enigma.global.action_sound ( this.snd_explosion1 , false ) ; for (var $wi0=enigma.system.getIterator( ( this.other ) ); !$wi0.atEnd(); $wi0.goNext()) { enigma.global.action_kill_object ( ) ; } { argument_relative = true ; enigma.global.action_create_object ( this.obj_explosion1 , 0 , 0 ) ; } { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , this.room_height + 400 ) ; } { argument_relative = true ; enigma.global.action_set_score ( 40 ) ; } ; };enigma.system.event_loop.link_event(this.id,4,7,this.event_4_7,this);

this.event_4_0=function(){enigma.global.action_sound ( this.snd_explosion1 , false ) ; { argument_relative = true ; enigma.global.action_create_object ( this.obj_explosion1 , 0 , 0 ) ; } { argument_relative = false ; enigma.global.action_move_to ( enigma.global.random ( this.room_width ) , this.room_height + 16 ) ; } { argument_relative = true ; enigma.global.action_set_health ( - 30 ) ; } ; };enigma.system.event_loop.link_event(this.id,4,0,this.event_4_0,this);
this.myevent_draw=function() {if (this.image_single!=-1) { this.image_speed = 0; this.image_index = this.image_single; } 
if (this.visible && this.sprite_index != -1) enigma.global.draw_sprite_ext(this.sprite_index,this.image_index,this.x,this.y,this.image_xscale,this.image_yscale,this.image_angle,this.image_blend,this.image_alpha);};
enigma.classes.depth(this, 0);};

enigma.rooms.rm_main = function() {this.name="rm_main"; this.id=0; this.caption="1945"; this.width=640; this.height=480;this.speed=30; this.persistent=false; this.backgroundColor=-1061109505;this.drawBackgroundColor=false; this.enableViews=false;

this.creationCode=function(){; }
 new enigma.objects.obj_island3(100007,3,448,432);
 new enigma.objects.obj_island1(100009,2,64,176);
 new enigma.objects.obj_island2(100011,4,352,32);
 new enigma.objects.controller_enemy(100013,6,48,16);
 new enigma.objects.obj_myplane(100012,0,320,352);
 new enigma.objects.controller_life(100003,1,0,0);};
var room = new enigma.rooms.rm_main();