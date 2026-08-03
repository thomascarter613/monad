package bootstrap

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/thomascarter613/monad/identity"
	"github.com/thomascarter613/monad/state"
	"gopkg.in/yaml.v3"
)

func Run(root string) error {
	if err := createDirectories(root); err != nil {
		return err
	}

	if err := createProjectManifest(root); err != nil {
		return err
	}

	if err := createWorkspaceManifest(root); err != nil {
		return err
	}

	if err := createIdentity(root); err != nil {
		return err
	}

	if err := createState(root); err != nil {
		return err
	}

	return nil
}

func createDirectories(root string) error {
	directories := []string{
		".monad",
		".monad/cache",
	}

	for _, directory := range directories {
		path := filepath.Join(root, directory)

		if err := os.MkdirAll(path, 0755); err != nil {
			return fmt.Errorf(
				"create directory %s: %w",
				path,
				err,
			)
		}
	}

	return nil
}

func createProjectManifest(root string) error {
	path := filepath.Join(root, "monad.yaml")

	content := `# Monad Project Manifest

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
`

	return writeFileIfMissing(path, []byte(content))
}

func createWorkspaceManifest(root string) error {
	path := filepath.Join(root, "workspace.yaml")

	content := `# Monad Workspace Manifest

workspace:
  name: example-workspace
  version: "1"

members:
  - .

defaults:
  language: go
`

	return writeFileIfMissing(path, []byte(content))
}

func createIdentity(root string) error {
	path := filepath.Join(root, ".monad", "identity.yaml")

	if fileExists(path) {
		return nil
	}

	artifact := identity.NewArtifactIdentity()

	data, err := yaml.Marshal(map[string]any{
		"identity": artifact,
	})

	if err != nil {
		return fmt.Errorf(
			"marshal identity: %w",
			err,
		)
	}

	if err := os.WriteFile(path, data, 0644); err != nil {
		return fmt.Errorf(
			"write identity: %w",
			err,
		)
	}

	return nil
}

func createState(root string) error {
	path := filepath.Join(root, ".monad", "state.yaml")

	if fileExists(path) {
		return nil
	}

	data, err := state.NewRepositoryState()

	if err != nil {
		return fmt.Errorf(
			"generate state: %w",
			err,
		)
	}

	if err := os.WriteFile(path, data, 0644); err != nil {
		return fmt.Errorf(
			"write state: %w",
		)
	}

	return nil
}

func writeFileIfMissing(path string, data []byte) error {
	if fileExists(path) {
		return nil
	}

	if err := os.WriteFile(path, data, 0644); err != nil {
		return fmt.Errorf(
			"write file %s: %w",
			path,
			err,
		)
	}

	return nil
}

func fileExists(path string) bool {
	_, err := os.Stat(path)

	return err == nil
}
