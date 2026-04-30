import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: (_name, filename, css) => {
        const hash = createHash('sha256')
          .update(filename + css)
          .digest('base64url')
          .slice(0, 8);
        return `_${hash}`;
      },
    },
  },
  base: '/kunilingist/',
});
