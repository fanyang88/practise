/*
We are given a list schedule of employees, which represents the working time for each employee.
Each employee has a list of non-overlapping Intervals, and these intervals are in sorted order.
Return the list of finite intervals representing common, positive-length free time for all employees, also in sorted order.
Example 1:
Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
Output: [[3,4]]
Explanation:
There are a total of three employees, and all common
free time intervals would be [-inf, 1], [3, 4], [10, inf].
We discard any intervals that contain inf as they aren't finite.
Example 2:
Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
Output: [[5,6],[7,9]]
(Even though we are representing Intervals in the form [x, y], the objects inside are Intervals, not lists or arrays. 
For example, schedule[0][0].start = 1, schedule[0][0].end = 2, and schedule[0][0][0] is not defined.)
Also, we wouldn't include intervals like [5, 5] in our answer, as they have zero length.
Note:
schedule and schedule[i] are lists with lengths in range [1, 50].
0 <= schedule[i].start < schedule[i].end <= 10^8.
*/

/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[][]} schedule
 * @return {Interval[]}
 merge intervals first
 */
var employeeFreeTime = function(schedule) {
    // flattern the array and sort
    var arr = schedule.reduce((arr, item) => {return arr.concat(item);}, []);
    arr.sort((a, b) => {
        if(a.start === b.start) {
            if(a.end > b.end) return 1;
            if(a.end < b.end) return -1;
            return 0;
        } else {
            return a.start - b.start;
        }
    });
    
    // Merge intervals
    for(var i=1; i<arr.length; i++) {
        var intervals = _merge(arr[i-1], arr[i]);
        arr[i-1] = intervals[0];
        arr[i] = intervals[1];
    }
    arr = arr.filter(item => item !== undefined);
    
    var res = [];
    for(var i=1; i<arr.length; i++) {
        res.push(new Interval(arr[i-1].end, arr[i].start));
    }
    return res;
};

var _merge = function(interval1, interval2) {
    if(interval1.end < interval2.start) {
        return [interval1, interval2];
    } else {
        var interval = new Interval(Math.min(interval1.start, interval2.start), Math.max(interval1.end, interval2.end));
        return [undefined, interval];
    }
};
