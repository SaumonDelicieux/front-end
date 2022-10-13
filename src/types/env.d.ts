/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MODE: 'development' | 'staging' | 'production'
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
