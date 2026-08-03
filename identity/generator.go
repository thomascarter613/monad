package identity

import (
	"github.com/google/uuid"
)

func NewArtifactIdentity() ArtifactIdentity {
	return ArtifactIdentity{
		ID:        uuid.New().String(),
		Type:      "repository",
		Version:   "1",
		CreatedBy: "monad",
	}
}
