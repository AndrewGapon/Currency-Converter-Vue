import { config } from '@vue/test-utils'
import { DataTestIdPlugin } from '@/tests/plugins/dataTestId'

config.plugins.VueWrapper.install(DataTestIdPlugin)
