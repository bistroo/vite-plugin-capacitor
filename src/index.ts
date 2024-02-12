import {
  type ResolvedConfig,
  type Plugin
} from 'vite'
// @ts-ignore
import { runCommand } from '@capacitor/cli/dist/tasks/run'
// @ts-ignore
import { buildCommand } from '@capacitor/cli/dist/tasks/build'
// @ts-ignore
import { syncCommand } from '@capacitor/cli/dist/tasks/sync'
// @ts-ignore
import { loadConfig } from '@capacitor/cli/dist/config'
import prompts from 'prompts'

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

      if (process.env.PLATFORM !== undefined) {
        platform = process.env.PLATFORM
      } else {
        const result = await prompts([
          {
            type: 'select',
            name: 'platform',
            message: 'Choose a platform',
            choices: [
              { title: 'Android', value: 'android' },
              { title: 'iOS', value: 'ios' },
              { title: 'Web', value: 'web' }
            ],
            initial: 1
          }
        ])
  
        platform = result.platform
      }
    },
    async configureServer() {
      if (command === 'serve') {
        await runCommand(config, platform, capacitorConfig?.runOptions ?? { sync: true })
      }
    },
    async closeBundle() {
      if (command === 'build') {
        // deployment option is set default to false:
        // see: https://capacitorjs.com/docs/v2/cli/sync#sync
        await syncCommand(config, platform, false)

        await buildCommand(config, platform, capacitorConfig?.buildOptions ?? {})
      }
    }
  }
}
