enigma.global.move_towards_point=function(point_x, point_y, newspeed){
	var inst=enigma.global.current_instance;
    inst.direction = enigma.global.point_direction ( inst.x,inst.y, (point_x), (point_y) );
    inst.speed = (newspeed);
    alert(inst.$hspeed);
};