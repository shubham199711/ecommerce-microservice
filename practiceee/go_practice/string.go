package main

import (
	"fmt"
	"strings"
)

func main() {
	aa := "hello world!ððð"
	rr := []rune(aa)
	newRune := []rune("heelo")
	newRune[2] = 'l'

	fmt.Println(aa)
	fmt.Println(len(aa))
	fmt.Println(rr)
	fmt.Println(len(rr))
	fmt.Println(len(string(rr)))
	fmt.Println(len(string(newRune)))
	fmt.Println(strings.ToUpper(string(newRune)))
}
