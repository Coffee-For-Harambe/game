//f = g+h
// g is startpoint to currentnode
// h is currentnode to endpoint

//We need reference to grid
//selectedCharacter is startpoint
//clicked is endpoint

//openList (grid)
//closedList []; currently empty, to fill upon iteration

//push startpoint ('start node') to openlist
//while openlist not empty
//currentnode (in the beginning, this is startpoint, [selectedCharacter]) => find lowest f in openList
//if lowest f node is endpoint, return successful path
//push currentnode to closedList, remove from openList
//for neighbors of curentNode (lowest f node){
//if neighbor is not in the openlist {
//update: save/push g,h,f save parent (currentnode - 1step)
//adding that neighbor to openlist}
//if neighbor is in openlist and g,h better {
//update: save/push g,f,h save parent
