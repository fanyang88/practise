/*
You are given coins of different denominations and a total amount of money amount. 
Write a function to compute the fewest number of coins that you need to make up that amount. 
If that amount of money cannot be made up by any combination of the coins, return -1.
Example 1:
coins = [1, 2, 5], amount = 11
return 3 (11 = 5 + 5 + 1)

Example 2:
coins = [2], amount = 3
return -1.
*/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 DP: f(x) = min(f(x-coin[0])+1, f(x-coin[1])+1, ...f(x-coin[n])+1);
 f(0) = 0;
 */
var coinChange = function(coins, amount) {
    var f = [];
    f[0] = 0;
    for(var i=1; i<= amount; i++) {
        f[i] = Number.MAX_SAFE_INTEGER;
        for(j=0; j<coins.length; j++) {
            if(i >= coins[j]) {
                f[i] = Math.min(f[i], f[i-coins[j]] +1);
            } 
        }
    }
    return f[amount] !== Number.MAX_SAFE_INTEGER ? f[amount] : -1;
};
