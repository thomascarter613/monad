package main

import (
	"fmt"
	"os"

	"github.com/thomascarter613/monad/bootstrap"
)

const (
	Name    = "Monad"
	Version = "0.1.0-dev"
)

func main() {
	if len(os.Args) < 2 {
		usage()
		os.Exit(1)
	}

	command := os.Args[1]

	switch command {

	case "version":
		version()

	case "bootstrap":
		runBootstrap()

	default:
		fmt.Println("Unknown command:", command)
		usage()
		os.Exit(1)
	}
}

func version() {
	fmt.Printf("%s %s\n", Name, Version)
}

func runBootstrap() {
	if err := bootstrap.Run("."); err != nil {
		fmt.Println("Bootstrap failed:", err)
		os.Exit(1)
	}

	fmt.Println("Monad repository initialized.")
}

func usage() {
	fmt.Println(Name)
	fmt.Println()
	fmt.Println("Usage:")
	fmt.Println()
	fmt.Println("  monad version")
	fmt.Println("  monad bootstrap")
}
