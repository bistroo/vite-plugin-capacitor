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
import inquirer from 'inquirer'

type CapacitorPluginConfig = {
  buildOptions?: {}, // BuildCommandOptions
  runOptions?: {} // RunCommandOptions,
}

export function viteCapacitorPlugin(capacitorConfig: CapacitorPluginConfig): Plugin {
  let command: ResolvedConfig['command']
  let platform: string

  return {
    name: 'vite-capacitor-plugin',
    async configResolved(config: ResolvedConfig) {
      command = config.command

      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'platform',
          message: 'Choose a platform:',
          choices: [
            { value: 'android', name: 'Android'},
            { value: 'ios', name: 'iOS'},
            { value: 'web', name: 'Web'},
          ],
        },
      ])

      platform = answers.platform
    },
    async configureServer() {
      const config = await loadConfig()

      if (command === 'serve') {
        runCommand(config, platform, capacitorConfig.runOptions ?? { sync: true })
      } else {
        buildCommand(config, platform, capacitorConfig.buildOptions ?? {})
      }
    }
  }
}
