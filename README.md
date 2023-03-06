# @bistroo/vite-plugin-capacitor

> Note: Don't use `"type": "module"` or vite.config.mts/mjs

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

> see https://github.com/ionic-team/capacitor/blob/main/cli/src/tasks/run.ts#L21-L27 for `RunCommandOptions` and https://github.com/ionic-team/capacitor/blob/main/cli/src/tasks/build.ts#L7-L14 for `BuildCommandOptions`
>
> Capacitor doesn't export the types...
