package main

import (
	"fmt"
	"os"

	"github.com/thomascarter613/monad/bootstrap"
	"github.com/thomascarter613/monad/manifest"
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

	case "inspect":
		runInspect()

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

func runInspect() {
	result, err := manifest.Load("monad.yaml")

	if err != nil {
		fmt.Println("Manifest error:", err)
		os.Exit(1)
	}

	fmt.Println("Monad Repository")
	fmt.Println("Name:", result.Name)
	fmt.Println("Version:", result.Version)
	fmt.Println("Type:", result.Type)
}

func usage() {
	fmt.Println(Name)
	fmt.Println()
	fmt.Println("Usage:")
	fmt.Println()
	fmt.Println("  monad version")
	fmt.Println("  monad bootstrap")
	fmt.Println("  monad inspect")
}
