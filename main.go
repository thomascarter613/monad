package main

import (
	"fmt"
	"os"
)

const Version = "0.1.0-dev"

func main() {
	if len(os.Args) < 2 {
		usage()
		return
	}

	switch os.Args[1] {

	case "version":
		fmt.Println("Monad", Version)

	case "bootstrap":
		fmt.Println("Bootstrap not implemented yet.")

	default:
		usage()
	}
}

func usage() {
	fmt.Println("Monad")
	fmt.Println()
	fmt.Println("Usage:")
	fmt.Println("    monad version")
	fmt.Println("    monad bootstrap")
}
