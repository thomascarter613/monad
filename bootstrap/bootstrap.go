package bootstrap

import (
	"fmt"
	"os"
	"path/filepath"
)

func Run(root string) error {
	directories := []string{
		".monad",
		".monad/cache",
	}

	for _, directory := range directories {
		path := filepath.Join(root, directory)

		if err := os.MkdirAll(path, 0755); err != nil {
			return fmt.Errorf("create directory %s: %w", path, err)
		}
	}

	files := map[string]string{
		"monad.yaml": `# Monad Project Manifest

    manifest:
      version: "1"

    project:
      name: example-project
      type: application
      version: "0.1.0"

    description: >
      Example Monad-managed software project.

    technology:
      languages:
        - go

    architecture:
      style: modular

    lifecycle:
      stage: development
    `,
		"workspace.yaml": `# Monad Workspace Manifest

    workspace:
      name: example-workspace
      version: "1"

    members:
      - .

    defaults:
      language: go
    `,
		".monad/identity.yaml": `# Monad Artifact Identity

    identity:
      id: "replace-with-generated-uuid"

    artifact:
      type: repository
      version: "1"

    created:
      by: monad
      version: "0.1.0"
    `,
		".monad/state.yaml": `# Monad Runtime State

    state:
      lifecycle: active

    repository:
      initialized: true

    cache:
      enabled: true
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
