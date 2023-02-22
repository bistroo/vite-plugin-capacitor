import {
  type ResolvedConfig,
  type Plugin
} from 'vite'
// @ts-ignore
import { runCommand } from '@capacitor/cli/dist/tasks/run'
// @ts-ignore
import { buildCommand } from '@capacitor/cli/dist/tasks/build'
// @ts-ignore
import { loadConfig } from '@capacitor/cli/dist/config'

type CapacitorPluginConfig = {
  platform: 'android' | 'ios' | 'web'
  buildOptions?: {}, // BuildCommandOptions
  runOptions?: {} // RunCommandOptions,
}

export function viteCapacitorPlugin(config: CapacitorPluginConfig): Plugin {
  let command: ResolvedConfig['command']

  return {
    name: 'vite-capacitor-plugin',
    configResolved(config: ResolvedConfig) {
      command = config.command
    },
    async configureServer() {
      const config = await loadConfig()

      if (command === 'serve') {
        runCommand(config, config.platform, config.runOptions ?? { sync: true })
      } else {
        buildCommand(config, config.platform, config.buildOptions ?? {})
      }
    }
  }
}
