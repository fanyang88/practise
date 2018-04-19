/*
You are given an integer array nums and you have to return a new counts array. 
The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].
Example:  Given nums = [5, 2, 6, 1]
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is only 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller element.
Return the array [2, 1, 1, 0].
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 
 // Methods 1, bucket sort
 [5, 2, 6, 1] -de duplicate
 sorted to be [1,2,5,6]
 store the rank in the map {1:1, 2:2, 5:3, 6:4}
 establish a frequency table, first one to be 0, scan from right to left
 1   [0,1,0,0,0]  put 1 in pos 1 since 1's rank is 1  prefix sum of 1 is 0 = 0
 6   [0,1,0,0,1]  put 1 in pos 4 since 6's rank is 4  prefix sum of 6 is 1 = 1
 2   [0,1,1,0,1]  put 2 in pos 2 since 2's rank is 2  prefix sum of 2 is 1 = 1
 5   [0,1,1,1,1]  put 5 in pos 3 since 5's rank is 3  prefix sum of 5 is 2 = 2
 
 Trick is how to calculate prefix sum.
 */
var countSmaller = function(nums) {
    var arr = [...new Set(nums)].sort((a, b) => a - b);
    var map = {}, rank = 1, res= [], ranking;
    var preSum = new Array(nums.length+1).fill(0);
    for(var item of arr) {
        map[item] = rank;
        rank ++;
    }
    
    for(var i=nums.length-1; i>=0; i--) {
        ranking = map[nums[i]];
         res.push(preSum[ranking-1]);
        // add 1 to prefixSum from ranking to the end
        while(ranking < preSum.length) {
            preSum[ranking] += 1;
            ranking++;
        }
    }
    return res.reverse();  
};

// Method2 BST
/* We reverse the array first, then construct the BST while giving the result
 TREE node include: val -> itself, dup_count -> how many duplicate number,  left_count: how many vals in the left branch
 we recursively insert the node
 if it is equal to the root, root.dup_count++, return root.left_count;
 if it is smaller to the root, root.left_count++, recursively to root.left till left is null, appended it to the left;
 if it is larger to the root, get the current root.left_count+ dup_count + recursively to root.right till right is null, appended it to the right;
 */

function TreeNode(val) {
    this.val = val;
    this.dup = 1;
    this.left_count = 0;
    this.left = null;
    this.right = null;
}

var countSmaller = function(nums) {
    if(nums.length ===0)  return nums;
    var nums = nums.reverse();
    var res = [0];
    var root = new TreeNode(nums[0]);
    for(var i=1; i<nums.length; i++) {
        var val = insert(root, nums[i]);
        res.push(val);
    }
    return res.reverse();
};

var insert = function(root, val) {
    if(val === root.val) {
        root.dup++;
        return root.left_count;
    } else if(val < root.val) {
        root.left_count++;
        if(!root.left) {
            root.left = new TreeNode(val);
            return 0;
        }
        return insert(root.left, val);
    } else {  //val < root.val  go to right 
        if(!root.right) {
            root.right = new TreeNode(val);
            return root.dup + root.left_count;
        }
        return root.dup + root.left_count + insert(root.right, val);
    }
};
