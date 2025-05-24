package main

import (
	"fmt"
	"sync"
	"time"
)

var User struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

/*
* return true if all elements of check are present in source in exact same order; false otherwise
* Examples
* source = {1,2,3,4,5}, check = {1,2,3,4,5} - result: true
* source = {1,2,3,4,5}, check = {2,3} - result: true
* source = {1,2,2,3,4,5}, check = {2,3} - result: true
* source = {2,2,2,3}, check = {2,2,3} - result: true
* source = {1,2,1,3}, check = {2,3} - result: false
* source = {1,2,2,3,4,5}, check = {3,2} - result: false
* source = {1,2,3,4,5}, check = {1,2,3,4,5,6} - result: false
 */

func check_value(source []int, check []int) bool {

	if len(check) > len(source) {
		return false
	}

	windows_size := len(check)

	for start := 0; start+windows_size < len(source); start++ {

		if isEqual(start, start+windows_size, check, source) {
			return true
		}

	}

	return false
}

func isEqual(i int, j int, check []int, source []int) bool {
	for index := i; index < j; index++ {
		if check[index] != source[index] {
			return false
		}
	}
	return true
}

func main_() {
	source := []int{1, 2, 3, 4, 5, 2, 3, 4}
	check := []int{1, 2, 3, 4}
	source = append(source, 10)
	fmt.Println(source)
	fmt.Println(check_value(source, check))

	myMap := map[string]int{"hello": 2, "world": 5}
	fmt.Println(myMap["hello1"])

	for key, value := range myMap {
		fmt.Println(key, value)
	}

	for index, value := range source {
		fmt.Println(index, value)
	}

}

func Total(a int, b int) int {
	return a + b
}

type Person struct {
	name string
	age  int
}

func printTill(till int) {
	for i := 0; i < till; i++ {
		fmt.Println(i)
		time.Sleep(time.Millisecond * 50)
	}
}

func waitForComplete(num int, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Println("Starting task for ", num)
	time.Sleep(time.Millisecond * 500)
	fmt.Println("Completed task for", num)
}

func main() {
	ans := Total(10, 20)
	go printTill(5)

	person := Person{
		name: "Shubham",
		age:  10,
	}
	fmt.Println(ans, person)
	char_list := []string{"a", "b", "a"}
	char_list = append(char_list, "c")
	dict_cache := map[string]int{}
	for i := 0; i < len(char_list); i++ {
		char := char_list[i]
		_, exists := dict_cache[char]
		if exists {
			dict_cache[char] += 1
		} else {
			dict_cache[char] = 1
		}

	}
	fmt.Println(dict_cache)

	array := []int{20, 20}
	fmt.Println(len(array))
	time.Sleep(time.Second * 3)

	list := []string{"1", "2"}
	map_ := map[string]int{
		"a": 1,
	}
	fmt.Println(list, map_)
	time.Sleep(time.Second)
	var wg sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg.Add(1)
		waitForComplete(i, &wg)
	}
	wg.Wait()
	fmt.Println("Completed task!!")

}

// map[string]Product{
//     "laptop": {"MacBook", 1200.99},
//     "phone":  {"iPhone", 999.99},
// }
// []string{}
