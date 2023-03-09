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
  // https://github.com/ionic-team/capacitor/blob/main/cli/src/tasks/build.ts#L7-L14
  runOptions?: {}
  // https://github.com/ionic-team/capacitor/blob/main/cli/src/tasks/run.ts#L21-L27
  buildOptions?: {}
}

export function viteCapacitorPlugin(capacitorConfig?: CapacitorPluginConfig): Plugin {
  let command: ResolvedConfig['command']
  // https://github.com/ionic-team/capacitor/blob/main/cli/src/definitions.ts#L129
  let config: any
  let platform: string

  return {
    name: 'vite-capacitor-plugin',
    async configResolved(viteConfig: ResolvedConfig) {
      command = viteConfig.command

      config = await loadConfig()

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
      if (command === 'serve') {
        await runCommand(config, platform, capacitorConfig?.runOptions ?? { sync: true })
      }
    },
    async closeBundle() {
      if (command === 'build') {
        await buildCommand(config, platform, capacitorConfig?.buildOptions ?? {})
      }
    }
  }
}
