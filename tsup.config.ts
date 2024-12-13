import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["components/ui/select/select.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  inject: ["react-shim.js"],
})
