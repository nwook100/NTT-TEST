import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// 뮤직비디오 제작기를 더블클릭으로 열 수 있는 HTML 파일 하나로 만든다
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-mv',
    rollupOptions: { input: path.resolve(__dirname, 'mv.html') },
  },
});
