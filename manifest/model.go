package manifest

type Manifest struct {
	Name    string `yaml:"name"`
	Version string `yaml:"version"`
	Type    string `yaml:"type"`
}
