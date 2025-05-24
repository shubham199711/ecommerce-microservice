# Longest Consecutive Subsequence
# Given an array of integers, the task is to find the length of the longest subsequence such that elements in the subsequence are consecutive integers.
# Print the count of the Longest Consecutive Subsequence
# the consecutive numbers can be in any order.
# duplicates can be there and to be ignored
# eg: input: [1, 3, 5, 7, 3, 4, 4]
# output: 3 as the 3,4,5 is the longest subsequence

# input = [1, 3, 5, 7, 3, 4, 4]
# # o(n * m)
def longest_con_sub(arr):
    arr = set(arr) # O(n)
    path = []
    ans = 0
    def dfs():
        nonlocal path, ans
        ans = max(ans, len(path))
        for num in arr: 
            if len(path) == 0:
                path.append(num)
                dfs()
                path.pop()
            elif (path[-1] + 1) == num:
                path.append(num)
                dfs()
                path.pop()
            else:
                continue
    dfs()
    return ans
    

def main():
    input = [1, 3, 5, 7, 3, 4, 4]
    print(longest_con_seb(input))
    input = [1, 3, 5, 7, 3, 4, 4, 6]
    print(longest_con_seb(input))

if __name__ == "__main__":
    main()
 