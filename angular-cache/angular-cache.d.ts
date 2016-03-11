declare namespace angular {
    namespace cache {
        interface ICacheConfig {
            storageMode: string;
        }

        interface ICacheFactoryProvider {
            defaults?: ICacheConfig;
        }

        interface ICacheFactory {
            get(name: string): ng.ICacheObject;
            createCache(name: string, config?: ICacheConfig): ICacheObject;
        }
    }
}