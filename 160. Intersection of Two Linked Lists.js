/*
Write a program to find the node at which the intersection of two singly linked lists begins.
For example, the following two linked lists:
A:          a1 → a2
                   ↘
                     c1 → c2 → c3
                   ↗            
B:     b1 → b2 → b3
begin to intersect at node c1.
Notes:
If the two linked lists have no intersection at all, return null.
The linked lists must retain their original structure after the function returns.
You may assume there are no cycles anywhere in the entire linked structure.
Your code should preferably run in O(n) time and use only O(1) memory.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 get the difference n between to lists first, move the longer one n steps first, then move together till we found a node has same val
 */
var getIntersectionNode = function(headA, headB) {
    var aLen = 0, bLen = 0, nodeA= headA, nodeB = headB;
    while(nodeA) {
        nodeA = nodeA.next;
        aLen++;
    }
    while(nodeB) {
        nodeB = nodeB.next;
        bLen++;
    }
    var diff = Math.abs(aLen - bLen);
    nodeA= headA;
    nodeB = headB;
    while(diff >0) {
        diff --;
        if(aLen > bLen) nodeA = nodeA.next;
        else nodeB = nodeB.next;
    }
    // move together
    while(nodeA !== nodeB) {
        nodeA = nodeA.next;
        nodeB = nodeB.next;
    }
    return nodeA;
};
