/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MODE: "development" | "staging" | "production"
    readonly VITE_API_BASE_DEV: string
    readonly VITE_API_BASE_STAGING: string
    readonly VITE_API_BASE: string
    readonly VITE_STRIPE_PUBLISH_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
