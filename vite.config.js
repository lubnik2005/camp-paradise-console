import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
// Icons
//https://github.com/antfu/unplugin-icons/blob/main/README.md

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteTsconfigPaths(),
        svgrPlugin(),
        Components({
            resolvers: [
                IconsResolver()
            ],
        }),
        Icons({ compiler: 'jsx', jsx: 'react' })
    ],
    extensions: [
        '.mjs',
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
    ],
    build: {
        minify: false,
    }
});