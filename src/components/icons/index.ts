import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import AppIcon from './AppIcon.vue'

export type IconName = keyof typeof ElementPlusIconsVue

export { AppIcon }

export const iconNames = Object.keys(ElementPlusIconsVue) as IconName[]
