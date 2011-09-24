var ds_precision = 0.0000001;

ds_set_precision = function(prec) {
	ds_precision = prec;
};

var ds_lists = [];

ds_list_create = function() {
	return ds_lists.push( []) - 1;
};
ds_list_destroy = function(id) {
	ds_lists[id] = null;
};
ds_list_clear = function(id) {
	ds_lists[id] = [];
};
ds_list_copy = function(id, source) {
	if (!ds_lists[id] || !ds_lists[source])
		return;
	ds_lists[id] = ds_lists[source];
};
ds_list_size = function(id) {
	if (!ds_lists[id])
		return -1;
	return ds_lists[id].length;
};
ds_list_empty = function(id) {
	if (!ds_lists[id])
		return 1;
	return ds_lists[id].length === 0 ? 1 : 0;
};
ds_list_add = function(id, val) {
	if (!ds_lists[id])
		return -1;
	ds_lists[id].push(val);
};
ds_list_insert = function(id, pos, val) {
	if (!ds_lists[id])
		return -1;
	ds_lists[id].splice(pos, 0, val);
};
ds_list_replace = function(id, pos, val) {
	if (!ds_lists[id])
		return -1;
	ds_lists[id][pos] = val;
};
ds_list_delete = function(id, pos) {
	if (!ds_lists[id])
		return -1;
	ds_lists[id].splice(pos, 1);
};

ds_list_find_index = function(id, val) {
	if (!ds_lists[id])
		return -1;
	var i = 0;
	for ( var value in ds_lists[id]) {
		if (ds_lists[id][value] === val)
			return i;
		i++;
	}
	return -1;
};

ds_list_find_value = function(id, pos) {
	if (!ds_lists[id])
		return -1;
	return ds_lists[id][pos];
};

function sortAsc(a, b) {
	return a - b;
}

function sortDesc(a, b) {
	return b - a;
}

ds_list_sort = function(id, ascend) {
	if (!ds_lists[id])
		return -1;
	if (ascend)
		ds_lists[id].sort(sortAsc);
	else
		ds_lists[id].sort(sortDesc);
};

ds_list_shuffle = function(id) {
	if (!ds_lists[id])
		return -1;
	shuffle(ds_lists[id]);
};

// + Jonas Raoni Soares Silva
// @ http://jsfromhell.com/array/shuffle [rev. #1]
shuffle = function(v) {
	for ( var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x)
		;
	return v;
};

/*
 * Stacks
 */
var ds_stacks = [];

ds_stack_create = function() {
	return ds_stacks.push( []) - 1;
};
ds_stack_destroy = function(id) {
	ds_stacks[id] = null;
};
ds_stack_clear = function(id) {
	ds_stacks[id] = [];
};
ds_stack_copy = function(id, source) {
	if (!ds_stacks[id] || !ds_stacks[source])
		return;
	ds_stacks[id] = ds_stacks[source];
};
ds_stack_size = function(id) {
	if (!ds_stacks[id])
		return -1;
	return ds_stacks[id].length;
};
ds_stack_empty = function(id) {
	if (!ds_stacks[id])
		return 1;
	return ds_stacks[id].length === 0 ? 1 : 0;
};
ds_stack_push = function(id, val) {
	if (!ds_stacks[id])
		return -1;
	ds_stacks[id].push(val);
};
ds_stack_pop = function(id) {
	if (!ds_stacks[id])
		return -1;
	return ds_stacks[id].pop();
};
ds_stack_top = function(id) {
	if (!ds_stacks[id])
		return -1;
	return ds_stacks[id][ds_stacks[id].length - 1];
};

/* Queue functions */

var ds_queues = [];

ds_queue_create = function() {
    return ds_queues.push([]) - 1;
};
ds_queue_destroy = function(id) {
    ds_queues[id] = null;
};
ds_queue_clear = function(id) {
    ds_queues[id] = [];
};
ds_queue_copy = function(id, source) {
    if (!ds_queues[id] || !ds_queues[source]) return;
    ds_queues[id] = ds_queues[source];
};
ds_queue_size = function(id) {
    if (!ds_queues[id]) return -1;
    return ds_queues[id].length;
};
ds_queue_empty = function(id) {
    if (!ds_queues[id]) return 1;
    return ds_queues[id].length === 0 ? 1 : 0;
};
ds_queue_enqueue = function(id, val) {
    if (!ds_queues[id]) return -1;
    ds_queues[id].push(val);
};
ds_queue_dequeue = function(id) {
    if (!ds_queues[id]) return -1;
    return ds_queues[id].pop();
};
ds_queue_head = function(id) {};
ds_queue_tail = function(id) {};