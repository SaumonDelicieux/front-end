import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        define: {
            __APP_ENV__: env.APP_ENV,
        },
        plugins: [],
        server: {
            host: true,
            port: 3001,
        },
    }
})
