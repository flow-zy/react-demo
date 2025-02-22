import { defineApplicationConfig } from './build'

export default defineApplicationConfig({
  overrides: {
    server: {
      open: false, // 项目启动后，自动打开
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
    // 优化依赖预构建
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'antd',
        '@ant-design/icons',
        'axios',
        'dayjs',
      ],
      exclude: ['@iconify/react'], // 排除不需要预构建的依赖
    },
  },
})
