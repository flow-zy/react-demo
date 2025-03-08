/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin({ isBuild }: { isBuild: boolean }) {
  return viteMockServe({
    mockPath: 'mock',
    enable: true,
    logger: !isBuild,
    cors: true,
  })
}
