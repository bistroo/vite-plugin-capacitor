# @bistroo/vite-plugin-capacitor

## Install

```bash
pnpm add -D @bistroo/vite-plugin-capacitor
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { capacitor } from '@bistroo/vite-plugin-capacitor'

export default defineConfig({
  plugins: [
    capacitor(),
  ],
})
```

## API
```typescript
capacitor(config: CapacitorPluginConfig)
```

```typescript
type CapacitorPluginConfig = {
  buildOptions?: BuildCommandOptions
  runOptions?: RunCommandOptions
}
```
