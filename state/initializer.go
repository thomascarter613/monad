package state

import (
	"gopkg.in/yaml.v3"
)

func NewRepositoryState() ([]byte, error) {
	state := RepositoryState{
		State: StateInfo{
			Lifecycle: "active",
		},
		Repository: RepositoryInfo{
			Initialized: true,
		},
		Cache: CacheInfo{
			Enabled: true,
		},
	}

	return yaml.Marshal(state)
}
