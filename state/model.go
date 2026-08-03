package state

type RepositoryState struct {
	State      StateInfo      `yaml:"state"`
	Repository RepositoryInfo `yaml:"repository"`
	Cache      CacheInfo      `yaml:"cache"`
}

type StateInfo struct {
	Lifecycle string `yaml:"lifecycle"`
}

type RepositoryInfo struct {
	Initialized bool `yaml:"initialized"`
}

type CacheInfo struct {
	Enabled bool `yaml:"enabled"`
}
