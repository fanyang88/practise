/*
Given a binary tree, return the preorder traversal of its nodes' values.
For example: Given binary tree {1,#,2,3},
   1
    \
     2
    /
   3
return [1,2,3].
Note: Recursive solution is trivial, could you do it iteratively?
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let res = [];
    if(!root) return res;
    
    helper(root);
    return res;
    
    function helper(node) {
        if(!node) return;
        res.push(node.val);
        helper(node.left);
        helper(node.right);
    }
};
