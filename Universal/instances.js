enigma.global.instances={};
var instance_maxid=20000;

/*
 * Return an array of instances
 */
enigma.global.fetch_inst_iter_by_int=function(x)
{
  if (x < 0) switch (x) // Keyword-based lookup
  {
    case self:
    case local:  return [enigma.global.current_instance];
    case other:  return enigma.global.instance_other ? [enigma.global.instance_other] : null;
    case all:    return [instances];
    case global: return [enigma.global.global_instance];
    case noone:
       default:  return null;
  }

  if (x < 100000) // Object-index-based lookup
    {
	  var returninst=[];
	  for (var instance in instances) {
		  if (instance.object_id===x)
			  returninst.push(instance);
	  }
	  return returninst;}

  // ID-based lookup
  return [instances[x]];
};


enigma.global.instance_create=function(x, y, obj){
	//var instance = new 
	instance_maxid++;
	enigma.global.instances[instance_maxid]=new objectstructarray[obj].actualobject(instance_maxid,obj,x,y);
};

enigma.global.instance_destroy=function(){
	var instance=enigma.global.current_instance;
	instance.myevent_destroy();
	instance.unlink();
};

enigma.global.instance_exists=function(obj){
	 return fetch_instance_by_int(obj) != null;
};

enigma.global.instance_find=function(obj,num){
	var nth=0;
	  for (var inst in enigma.global.fetch_inst_iter_by_int(obj))
	  {
	    nth++;
	    if (nth>num)
	    return inst.id;
	  }
	  return noone;
};

enigma.global.instance_number=function(){};

enigma.global.instance_nearest=function(){};

enigma.global.instance_furthest=function(){};

// need myevent_destroy(), unlink(), fetch_instance_by_int()

