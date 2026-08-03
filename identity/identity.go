package identity

type ArtifactIdentity struct {
	ID        string `yaml:"id"`
	Type      string `yaml:"type"`
	Version   string `yaml:"version"`
	CreatedBy string `yaml:"created_by"`
}
