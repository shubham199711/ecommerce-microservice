package main

import (
	"fmt"
)

// seq of number and add them all return -> result int(sum)
func addNumber(nums []int, start int, end int, ch chan int) {
	sum := 0
	for i := start; i < end; i++ {
		sum += nums[i]
	}
	ch <- sum
}

func Add(nums []int) int {
	pull := 10
	result := 0
	window_size := len(nums) / pull
	if window_size == 0 {
		window_size = len(nums)
	}
	ch := make(chan int, pull)
	num_of_ch_to_wait_for := 0
	for i := 0; i <= len(nums); i += window_size {
		end := i + window_size
		if end > len(nums) {
			end = len(nums)
		}
		num_of_ch_to_wait_for++
		go addNumber(nums, i, end, ch)
	}
	for i := 0; i < num_of_ch_to_wait_for; i++ {
		result += <-ch
	}
	return result
}

func main() {
	nums := []int{1, 2, 3, 4, 5}
	fmt.Println(Add(nums))
}
