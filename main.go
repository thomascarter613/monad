package main

import (
    "fmt"
    "os"
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
    	bootstrap()

    default:
        fmt.Println("Unknown command:", command)
        usage()
        os.Exit(1)
    }
}

func version() {
    fmt.Printf("%s %s\n", Name, Version)
}

func bootstrap() {
    fmt.Println("Bootstrap command registered.")
    fmt.Println("Repository generation will be implemented in a future commit.")
}

func usage() {
    fmt.Println(Name)
    fmt.Println()
    fmt.Println("Usage:")
    fmt.Println()
    fmt.Println("  monad version")
    fmt.Println("  monad bootstrap")
}