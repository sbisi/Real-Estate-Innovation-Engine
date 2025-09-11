export default defineConfig({
  plugins: [react()],
  base: './',              // ← KRITISCH für Render.com!
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
