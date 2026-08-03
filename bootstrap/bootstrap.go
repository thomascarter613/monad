package bootstrap

import (
	"fmt"
	"os"
	"path/filepath"
)

func Run(root string) error {
	directories := []string{
		".monad",
		"docs",
		"schemas",
		"templates",
		"examples",
		"tests",
		"scripts",
	}

	for _, directory := range directories {
		path := filepath.Join(root, directory)

		if err := os.MkdirAll(path, 0755); err != nil {
			return fmt.Errorf("create directory %s: %w", path, err)
		}
	}

	files := map[string]string{
		"monad.yaml": `name: monad
version: 0.1.0
`,
		"workspace.yaml": `name: workspace
version: 0.1.0
`,
		".monad/repository.yaml": `type: monad-repository
version: 0.1.0
`,
	}

	for filename, content := range files {
		path := filepath.Join(root, filename)

		if err := os.WriteFile(path, []byte(content), 0644); err != nil {
			return fmt.Errorf("create file %s: %w", path, err)
		}
	}

	return nil
}
