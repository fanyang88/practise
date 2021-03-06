/*
Given an array consisting of n integers, find the contiguous subarray of given length k that has the maximum average value. And you need to output the maximum average value.
Example 1:
Input: [1,12,-5,-6,50,3], k = 4
Output: 12.75
Explanation: Maximum average is (12-5-6+50)/4 = 51/4 = 12.75
*/

var findMaxAverage = function(nums, k) {
    var sum = nums.slice(0, k).reduce((a, b) => a + b, 0);
    var maxVal = sum;
    for(let i = k; i< nums.length; i++) {
        sum = sum - nums[i-k] + nums[i];
        if(sum > maxVal) {
            maxVal = sum;
        }
    }
    return maxVal/k;
};
