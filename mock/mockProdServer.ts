import { createProdMockServer } from 'vite-plugin-mock/dist/client'

const modules = import.meta.glob('./**/*.ts', { eager: true })

const mockModules: any[] = []
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return
  }
  // @ts-ignore
  mockModules.push(...(modules as Recordable)[key].default)
})

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
