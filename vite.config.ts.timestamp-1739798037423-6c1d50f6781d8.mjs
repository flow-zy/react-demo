// build/config/application.ts
import dayjs from "file:///E:/project/sect/react-demo/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js";
import { readPackageJSON as readPackageJSON2 } from "file:///E:/project/sect/node_modules/.pnpm/pkg-types@1.3.1/node_modules/pkg-types/dist/index.mjs";
import { defineConfig, loadEnv, mergeConfig } from "file:///E:/project/sect/react-demo/node_modules/.pnpm/vite@5.4.14_@types+node@22.10.10_lightningcss@1.29.1_sass@1.83.4_terser@5.37.0/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "node:path";

// build/config/common.ts
var commonConfig = (mode) => ({
  server: {
    host: true
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : []
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      // TODO: Prevent memory overflow
      maxParallelFileOps: 3
    }
  },
  plugins: []
});

// build/plugins/index.ts
import react from "file:///E:/project/sect/react-demo/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.2_vite@5.4.14_@types+node@22.10.10_lightningcss@1.29.1_sass@1.83.4_terser@5.37.0_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import purgeIcons from "file:///E:/project/sect/react-demo/node_modules/.pnpm/vite-plugin-purge-icons@0.10.0_vite@5.4.14_@types+node@22.10.10_lightningcss@1.29.1_sass@1.83.4_terser@5.37.0_/node_modules/vite-plugin-purge-icons/dist/index.mjs";
import { vanillaExtractPlugin } from "file:///E:/project/sect/react-demo/node_modules/.pnpm/@vanilla-extract+vite-plugin@4.0.19_@types+node@22.10.10_babel-plugin-macros@3.1.0_lightningc_mypm5a54nwhlvlt55ujyewkmta/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import tailwindcss from "file:///E:/project/sect/react-demo/node_modules/.pnpm/@tailwindcss+vite@4.0.0_vite@5.4.14_@types+node@22.10.10_lightningcss@1.29.1_sass@1.83.4_terser@5.37.0_/node_modules/@tailwindcss/vite/dist/index.mjs";
import tsconfigPaths from "file:///E:/project/sect/react-demo/node_modules/.pnpm/vite-tsconfig-paths@5.1.4_typescript@5.6.3_vite@5.4.14_@types+node@22.10.10_lightningcss@1.29_wzxexo7ih6nynk4o2erjwz2ffe/node_modules/vite-tsconfig-paths/dist/index.js";

// build/plugins/appConfig.ts
import colors from "file:///E:/project/sect/node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js";
import { readPackageJSON } from "file:///E:/project/sect/node_modules/.pnpm/pkg-types@1.3.1/node_modules/pkg-types/dist/index.mjs";

// build/utils/env.ts
import dotenv from "file:///E:/project/sect/node_modules/.pnpm/dotenv@16.4.7/node_modules/dotenv/lib/main.js";
import * as fs from "file:///E:/project/sect/react-demo/node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/index.js";
import { join } from "node:path";
function getConfFiles() {
  const script = process.env.npm_lifecycle_script;
  const reg = new RegExp("--mode ([a-z_\\d]+)");
  const result = reg.exec(script);
  if (result) {
    const mode = result[1];
    return [".env", `.env.${mode}`];
  }
  return [".env", ".env.production"];
}
async function getEnvConfig(match = "VITE_GLOB_", confFiles = getConfFiles()) {
  let envConfig = {};
  for (const confFile of confFiles) {
    try {
      const envPath = await fs.readFile(join(process.cwd(), confFile), {
        encoding: "utf8"
      });
      const env = dotenv.parse(envPath);
      envConfig = { ...envConfig, ...env };
    } catch (e) {
      console.error(`Error in parsing ${confFile}`, e);
    }
  }
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}

// build/utils/hash.ts
import { createHash } from "node:crypto";
function createContentHash(content, hashLSize = 12) {
  const hash = createHash("sha256").update(content);
  return hash.digest("hex").slice(0, hashLSize);
}

// build/plugins/appConfig.ts
var GLOBAL_CONFIG_FILE_NAME = "_app.config.js";
var PLUGIN_NAME = "app-config";
async function createAppConfigPlugin({
  root,
  isBuild
}) {
  let publicPath;
  let source;
  if (!isBuild) {
    return {
      name: PLUGIN_NAME
    };
  }
  const { version = "" } = await readPackageJSON(root);
  return {
    name: PLUGIN_NAME,
    async configResolved(_config) {
      const appTitle = _config?.env?.VITE_GLOB_APP_TITLE ?? "";
      publicPath = _config.base;
      source = await getConfigSource(appTitle);
    },
    async transformIndexHtml(html) {
      publicPath = publicPath.endsWith("/") ? publicPath : `${publicPath}/`;
      const appConfigSrc = `${publicPath || "/"}${GLOBAL_CONFIG_FILE_NAME}?v=${version}-${createContentHash(source)}`;
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: appConfigSrc
            }
          }
        ]
      };
    },
    async generateBundle() {
      try {
        this.emitFile({
          type: "asset",
          fileName: GLOBAL_CONFIG_FILE_NAME,
          source
        });
        console.log(colors.cyan("\u2728configuration file is build successfully!"));
      } catch (error) {
        console.log(
          colors.red(
            "configuration file configuration file failed to package:\n" + error
          )
        );
      }
    }
  };
}
var getVariableName = (title) => {
  function strToHex(str) {
    const result = [];
    for (let i = 0; i < str.length; ++i) {
      const hex = str.charCodeAt(i).toString(16);
      result.push(("000" + hex).slice(-4));
    }
    return result.join("").toUpperCase();
  }
  return `__PRODUCTION__${strToHex(title) || "__APP"}__CONF__`.toUpperCase().replace(/\s/g, "");
};
async function getConfigSource(appTitle) {
  const config = await getEnvConfig();
  const variableName = getVariableName(appTitle);
  const windowVariable = `window.${variableName}`;
  let source = `${windowVariable}=${JSON.stringify(config)};`;
  source += `
    Object.freeze(${windowVariable});
    Object.defineProperty(window, "${variableName}", {
      configurable: false,
      writable: false,
    });
  `.replace(/\s/g, "");
  return source;
}

// build/plugins/compress.ts
import compressPlugin from "file:///E:/project/sect/react-demo/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.4.14_@types+node@22.10.10_lightningcss@1.29.1_sass@1.83.4_terser@5.37.0_/node_modules/vite-plugin-compression/dist/index.mjs";
function configCompressPlugin({
  compress,
  deleteOriginFile = false
}) {
  const compressList = compress.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      compressPlugin({
        ext: ".gz",
        deleteOriginFile
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      compressPlugin({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile
      })
    );
  }
  return plugins;
}

// build/plugins/html.ts
import { createHtmlPlugin } from "file:///E:/project/sect/react-demo/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.4.14_@types+node@22.10.10_lightningcss@1.29.1_sass@1.83.4_terser@5.37.0_/node_modules/vite-plugin-html/dist/index.mjs";
function configHtmlPlugin({ isBuild }) {
  const htmlPlugin = createHtmlPlugin({
    minify: isBuild
  });
  return htmlPlugin;
}

// build/plugins/mock.ts
import { viteMockServe } from "file:///E:/project/sect/react-demo/node_modules/.pnpm/vite-plugin-mock@2.9.8_mockjs@1.1.0_vite@5.4.14_@types+node@22.10.10_lightningcss@1.29.1_sass@1.83.4_terser@5.37.0_/node_modules/vite-plugin-mock/dist/index.js";
function configMockPlugin({ isBuild }) {
  return viteMockServe({
    ignore: /^_/,
    mockPath: "mock",
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `
  });
}

// build/plugins/svgSprite.ts
import { createSvgIconsPlugin } from "file:///E:/project/sect/react-demo/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.14_@types+node@22.10.10_lightningcss@1.29.1_sass@1.83.4_terser@5.37.0_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { resolve } from "node:path";
function configSvgIconsPlugin({ isBuild }) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), "src/assets/icons")],
    svgoOptions: isBuild
  });
  return svgIconsPlugin;
}

// build/plugins/visualizer.ts
import visualizer from "file:///E:/project/sect/react-demo/node_modules/.pnpm/rollup-plugin-visualizer@5.14.0_rollup@2.79.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
function configVisualizerConfig() {
  return visualizer({
    filename: "./node_modules/.cache/visualizer/stats.html",
    open: true,
    gzipSize: true,
    brotliSize: true
  });
}

// build/plugins/pwa.ts
import { VitePWA } from "file:///E:/project/sect/react-demo/node_modules/.pnpm/vite-plugin-pwa@0.21.1_vite@5.4.14_@types+node@22.10.10_lightningcss@1.29.1_sass@1.83.4_terse_vuf2a4twengcmhjbhzdsmz7rdu/node_modules/vite-plugin-pwa/dist/index.js";
var createPwaPlugin = () => {
  return VitePWA({
    base: "/",
    registerType: "autoUpdate",
    scope: "/",
    includeAssets: ["favicon.ico"],
    manifest: {
      name: "Vite-React-TS",
      short_name: "Vite-React-TS",
      description: "Vite-React-TS",
      theme_color: "#ffffff"
    }
  });
};

// build/plugins/index.ts
var createPlugins = async ({
  isBuild,
  root,
  enableMock,
  compress,
  enableAnalyze
}) => {
  const vitePlugins = [
    react(),
    tailwindcss(),
    vanillaExtractPlugin({
      identifiers: ({ debugId }) => `${debugId}`
    }),
    tsconfigPaths()
  ];
  const appConfigPlugin = await createAppConfigPlugin({ root, isBuild });
  vitePlugins.push(appConfigPlugin);
  vitePlugins.push(configHtmlPlugin({ isBuild }));
  vitePlugins.push(configSvgIconsPlugin({ isBuild }));
  vitePlugins.push(purgeIcons());
  if (isBuild) {
    vitePlugins.push(
      configCompressPlugin({
        compress
      })
    );
    vitePlugins.push(createPwaPlugin());
  }
  if (enableAnalyze) {
    vitePlugins.push(configVisualizerConfig());
  }
  if (enableMock) {
    vitePlugins.push(configMockPlugin({ isBuild }));
  }
  return vitePlugins;
};

// build/config/application.ts
function defineApplicationConfig(defineOptions = {}) {
  const { overrides = {} } = defineOptions;
  return defineConfig(async ({ command, mode }) => {
    const root = process.cwd();
    const isBuild = command === "build";
    const {
      VITE_PUBLIC_PATH,
      VITE_USE_MOCK,
      VITE_BUILD_COMPRESS,
      VITE_ENABLE_ANALYZE
    } = loadEnv(mode, root);
    const defineData = await createDefineData(root);
    const plugins = await createPlugins({
      isBuild,
      root,
      enableAnalyze: VITE_ENABLE_ANALYZE === "true",
      enableMock: VITE_USE_MOCK === "true",
      compress: VITE_BUILD_COMPRESS
    });
    const pathResolve = (pathname) => resolve2(root, ".", pathname);
    const applicationConfig = {
      base: VITE_PUBLIC_PATH,
      resolve: {
        alias: [
          {
            find: "vue-i18n",
            replacement: "vue-i18n/dist/vue-i18n.cjs.js"
          },
          // @/xxxx => src/xxxx
          {
            find: /@\//,
            replacement: pathResolve("src") + "/"
          },
          // #/xxxx => types/xxxx
          {
            find: /#\//,
            replacement: pathResolve("types") + "/"
          }
        ]
      },
      define: defineData,
      build: {
        target: "es2015",
        minify: "esbuild",
        cssTarget: "chrome80",
        cssCodeSplit: true,
        rollupOptions: {
          output: {
            // 入口文件名
            entryFileNames: "assets/entry/[name]-[hash].js",
            manualChunks: {
              "vendor-core": ["react", "react-dom", "react-router-dom"],
              "vendor-ui": [
                "antd",
                "@ant-design/icons",
                "@ant-design/cssinjs",
                "framer-motion",
                "styled-components"
              ],
              "vendor-utils": [
                "axios",
                "dayjs",
                "i18next",
                "zustand",
                "@iconify/react"
              ],
              "vendor-charts": ["apexcharts", "react-apexcharts"]
            }
          }
        }
      },
      esbuild: {
        drop: isBuild ? ["console", "debugger"] : [],
        legalComments: "none",
        target: "esnext"
      },
      plugins
    };
    const mergedConfig = mergeConfig(commonConfig(mode), applicationConfig);
    return mergeConfig(mergedConfig, overrides);
  });
}
async function createDefineData(root) {
  try {
    const pkgJson = await readPackageJSON2(root);
    const { dependencies, devDependencies, name, version } = pkgJson;
    const __APP_INFO__ = {
      pkg: { dependencies, devDependencies, name, version },
      lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
    };
    return {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    };
  } catch (error) {
    console.error(error);
    return {};
  }
}

// build/config/package.ts
import { readPackageJSON as readPackageJSON3 } from "file:///E:/project/sect/node_modules/.pnpm/pkg-types@1.3.1/node_modules/pkg-types/dist/index.mjs";
import { defineConfig as defineConfig2, mergeConfig as mergeConfig2 } from "file:///E:/project/sect/react-demo/node_modules/.pnpm/vite@5.4.14_@types+node@22.10.10_lightningcss@1.29.1_sass@1.83.4_terser@5.37.0/node_modules/vite/dist/node/index.js";

// vite.config.ts
var vite_config_default = defineApplicationConfig({
  overrides: {
    server: {
      open: false,
      // 项目启动后，自动打开
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/*"]
      }
    },
    // 优化依赖预构建
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "antd",
        "@ant-design/icons",
        "axios",
        "dayjs"
      ],
      exclude: ["@iconify/react"]
      // 排除不需要预构建的依赖
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQvY29uZmlnL2FwcGxpY2F0aW9uLnRzIiwgImJ1aWxkL2NvbmZpZy9jb21tb24udHMiLCAiYnVpbGQvcGx1Z2lucy9pbmRleC50cyIsICJidWlsZC9wbHVnaW5zL2FwcENvbmZpZy50cyIsICJidWlsZC91dGlscy9lbnYudHMiLCAiYnVpbGQvdXRpbHMvaGFzaC50cyIsICJidWlsZC9wbHVnaW5zL2NvbXByZXNzLnRzIiwgImJ1aWxkL3BsdWdpbnMvaHRtbC50cyIsICJidWlsZC9wbHVnaW5zL21vY2sudHMiLCAiYnVpbGQvcGx1Z2lucy9zdmdTcHJpdGUudHMiLCAiYnVpbGQvcGx1Z2lucy92aXN1YWxpemVyLnRzIiwgImJ1aWxkL3BsdWdpbnMvcHdhLnRzIiwgImJ1aWxkL2NvbmZpZy9wYWNrYWdlLnRzIiwgInZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxzZWN0XFxcXHJlYWN0LWRlbW9cXFxcYnVpbGRcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHNlY3RcXFxccmVhY3QtZGVtb1xcXFxidWlsZFxcXFxjb25maWdcXFxcYXBwbGljYXRpb24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3Qvc2VjdC9yZWFjdC1kZW1vL2J1aWxkL2NvbmZpZy9hcHBsaWNhdGlvbi50c1wiO2ltcG9ydCBkYXlqcyBmcm9tICdkYXlqcydcbmltcG9ydCB7IHJlYWRQYWNrYWdlSlNPTiB9IGZyb20gJ3BrZy10eXBlcydcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiwgbWVyZ2VDb25maWcsIHR5cGUgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5cbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXG5cbmltcG9ydCB7IGNvbW1vbkNvbmZpZyB9IGZyb20gJy4vY29tbW9uJ1xuXG5pbXBvcnQgeyBjcmVhdGVQbHVnaW5zIH0gZnJvbSAnLi4vcGx1Z2lucydcblxuaW50ZXJmYWNlIERlZmluZU9wdGlvbnMge1xuXHRvdmVycmlkZXM/OiBVc2VyQ29uZmlnXG5cdG9wdGlvbnM/OiBvYmplY3Rcbn1cblxuZnVuY3Rpb24gZGVmaW5lQXBwbGljYXRpb25Db25maWcoZGVmaW5lT3B0aW9uczogRGVmaW5lT3B0aW9ucyA9IHt9KSB7XG5cdGNvbnN0IHsgb3ZlcnJpZGVzID0ge30gfSA9IGRlZmluZU9wdGlvbnNcblxuXHRyZXR1cm4gZGVmaW5lQ29uZmlnKGFzeW5jICh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xuXHRcdGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpXG5cdFx0Y29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCdcblx0XHRjb25zdCB7XG5cdFx0XHRWSVRFX1BVQkxJQ19QQVRILFxuXHRcdFx0VklURV9VU0VfTU9DSyxcblx0XHRcdFZJVEVfQlVJTERfQ09NUFJFU1MsXG5cdFx0XHRWSVRFX0VOQUJMRV9BTkFMWVpFXG5cdFx0fSA9IGxvYWRFbnYobW9kZSwgcm9vdClcblxuXHRcdGNvbnN0IGRlZmluZURhdGEgPSBhd2FpdCBjcmVhdGVEZWZpbmVEYXRhKHJvb3QpXG5cdFx0Y29uc3QgcGx1Z2lucyA9IGF3YWl0IGNyZWF0ZVBsdWdpbnMoe1xuXHRcdFx0aXNCdWlsZCxcblx0XHRcdHJvb3QsXG5cdFx0XHRlbmFibGVBbmFseXplOiBWSVRFX0VOQUJMRV9BTkFMWVpFID09PSAndHJ1ZScsXG5cdFx0XHRlbmFibGVNb2NrOiBWSVRFX1VTRV9NT0NLID09PSAndHJ1ZScsXG5cdFx0XHRjb21wcmVzczogVklURV9CVUlMRF9DT01QUkVTU1xuXHRcdH0pXG5cblx0XHRjb25zdCBwYXRoUmVzb2x2ZSA9IChwYXRobmFtZTogc3RyaW5nKSA9PiByZXNvbHZlKHJvb3QsICcuJywgcGF0aG5hbWUpXG5cblx0XHRjb25zdCBhcHBsaWNhdGlvbkNvbmZpZzogVXNlckNvbmZpZyA9IHtcblx0XHRcdGJhc2U6IFZJVEVfUFVCTElDX1BBVEgsXG5cdFx0XHRyZXNvbHZlOiB7XG5cdFx0XHRcdGFsaWFzOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZmluZDogJ3Z1ZS1pMThuJyxcblx0XHRcdFx0XHRcdHJlcGxhY2VtZW50OiAndnVlLWkxOG4vZGlzdC92dWUtaTE4bi5janMuanMnXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyBAL3h4eHggPT4gc3JjL3h4eHhcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmaW5kOiAvQFxcLy8sXG5cdFx0XHRcdFx0XHRyZXBsYWNlbWVudDogcGF0aFJlc29sdmUoJ3NyYycpICsgJy8nXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyAjL3h4eHggPT4gdHlwZXMveHh4eFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGZpbmQ6IC8jXFwvLyxcblx0XHRcdFx0XHRcdHJlcGxhY2VtZW50OiBwYXRoUmVzb2x2ZSgndHlwZXMnKSArICcvJ1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdGRlZmluZTogZGVmaW5lRGF0YSxcblx0XHRcdGJ1aWxkOiB7XG5cdFx0XHRcdHRhcmdldDogJ2VzMjAxNScsXG5cdFx0XHRcdG1pbmlmeTogJ2VzYnVpbGQnLFxuXHRcdFx0XHRjc3NUYXJnZXQ6ICdjaHJvbWU4MCcsXG5cdFx0XHRcdGNzc0NvZGVTcGxpdDogdHJ1ZSxcblx0XHRcdFx0cm9sbHVwT3B0aW9uczoge1xuXHRcdFx0XHRcdG91dHB1dDoge1xuXHRcdFx0XHRcdFx0Ly8gXHU1MTY1XHU1M0UzXHU2NTg3XHU0RUY2XHU1NDBEXG5cdFx0XHRcdFx0XHRlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9lbnRyeS9bbmFtZV0tW2hhc2hdLmpzJyxcblx0XHRcdFx0XHRcdG1hbnVhbENodW5rczoge1xuXHRcdFx0XHRcdFx0XHQndmVuZG9yLWNvcmUnOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG5cdFx0XHRcdFx0XHRcdCd2ZW5kb3ItdWknOiBbXG5cdFx0XHRcdFx0XHRcdFx0J2FudGQnLFxuXHRcdFx0XHRcdFx0XHRcdCdAYW50LWRlc2lnbi9pY29ucycsXG5cdFx0XHRcdFx0XHRcdFx0J0BhbnQtZGVzaWduL2Nzc2luanMnLFxuXHRcdFx0XHRcdFx0XHRcdCdmcmFtZXItbW90aW9uJyxcblx0XHRcdFx0XHRcdFx0XHQnc3R5bGVkLWNvbXBvbmVudHMnXG5cdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRcdCd2ZW5kb3ItdXRpbHMnOiBbXG5cdFx0XHRcdFx0XHRcdFx0J2F4aW9zJyxcblx0XHRcdFx0XHRcdFx0XHQnZGF5anMnLFxuXHRcdFx0XHRcdFx0XHRcdCdpMThuZXh0Jyxcblx0XHRcdFx0XHRcdFx0XHQnenVzdGFuZCcsXG5cdFx0XHRcdFx0XHRcdFx0J0BpY29uaWZ5L3JlYWN0J1xuXHRcdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0XHQndmVuZG9yLWNoYXJ0cyc6IFsnYXBleGNoYXJ0cycsICdyZWFjdC1hcGV4Y2hhcnRzJ11cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRlc2J1aWxkOiB7XG5cdFx0XHRcdGRyb3A6IGlzQnVpbGQgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdLFxuXHRcdFx0XHRsZWdhbENvbW1lbnRzOiAnbm9uZScsXG5cdFx0XHRcdHRhcmdldDogJ2VzbmV4dCdcblx0XHRcdH0sXG5cdFx0XHRwbHVnaW5zXG5cdFx0fVxuXG5cdFx0Y29uc3QgbWVyZ2VkQ29uZmlnID0gbWVyZ2VDb25maWcoY29tbW9uQ29uZmlnKG1vZGUpLCBhcHBsaWNhdGlvbkNvbmZpZylcblxuXHRcdHJldHVybiBtZXJnZUNvbmZpZyhtZXJnZWRDb25maWcsIG92ZXJyaWRlcylcblx0fSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlRGVmaW5lRGF0YShyb290OiBzdHJpbmcpIHtcblx0dHJ5IHtcblx0XHRjb25zdCBwa2dKc29uID0gYXdhaXQgcmVhZFBhY2thZ2VKU09OKHJvb3QpXG5cdFx0Y29uc3QgeyBkZXBlbmRlbmNpZXMsIGRldkRlcGVuZGVuY2llcywgbmFtZSwgdmVyc2lvbiB9ID0gcGtnSnNvblxuXG5cdFx0Y29uc3QgX19BUFBfSU5GT19fID0ge1xuXHRcdFx0cGtnOiB7IGRlcGVuZGVuY2llcywgZGV2RGVwZW5kZW5jaWVzLCBuYW1lLCB2ZXJzaW9uIH0sXG5cdFx0XHRsYXN0QnVpbGRUaW1lOiBkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpXG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHRfX0FQUF9JTkZPX186IEpTT04uc3RyaW5naWZ5KF9fQVBQX0lORk9fXylcblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihlcnJvcilcblx0XHRyZXR1cm4ge31cblx0fVxufVxuXG5leHBvcnQgeyBkZWZpbmVBcHBsaWNhdGlvbkNvbmZpZyB9XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcc2VjdFxcXFxyZWFjdC1kZW1vXFxcXGJ1aWxkXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxzZWN0XFxcXHJlYWN0LWRlbW9cXFxcYnVpbGRcXFxcY29uZmlnXFxcXGNvbW1vbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovcHJvamVjdC9zZWN0L3JlYWN0LWRlbW8vYnVpbGQvY29uZmlnL2NvbW1vbi50c1wiO2ltcG9ydCB7IHR5cGUgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcblxyXG5jb25zdCBjb21tb25Db25maWc6IChtb2RlOiBzdHJpbmcpID0+IFVzZXJDb25maWcgPSBtb2RlID0+ICh7XHJcblx0c2VydmVyOiB7XHJcblx0XHRob3N0OiB0cnVlXHJcblx0fSxcclxuXHRlc2J1aWxkOiB7XHJcblx0XHRkcm9wOiBtb2RlID09PSAncHJvZHVjdGlvbicgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdXHJcblx0fSxcclxuXHRidWlsZDoge1xyXG5cdFx0cmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxyXG5cdFx0Y2h1bmtTaXplV2FybmluZ0xpbWl0OiAxNTAwLFxyXG5cdFx0cm9sbHVwT3B0aW9uczoge1xyXG5cdFx0XHQvLyBUT0RPOiBQcmV2ZW50IG1lbW9yeSBvdmVyZmxvd1xyXG5cdFx0XHRtYXhQYXJhbGxlbEZpbGVPcHM6IDNcclxuXHRcdH1cclxuXHR9LFxyXG5cdHBsdWdpbnM6IFtdXHJcbn0pXHJcblxyXG5leHBvcnQgeyBjb21tb25Db25maWcgfVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcc2VjdFxcXFxyZWFjdC1kZW1vXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcc2VjdFxcXFxyZWFjdC1kZW1vXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3Qvc2VjdC9yZWFjdC1kZW1vL2J1aWxkL3BsdWdpbnMvaW5kZXgudHNcIjtpbXBvcnQgeyB0eXBlIFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHB1cmdlSWNvbnMgZnJvbSAndml0ZS1wbHVnaW4tcHVyZ2UtaWNvbnMnXG5pbXBvcnQgeyB2YW5pbGxhRXh0cmFjdFBsdWdpbiB9IGZyb20gJ0B2YW5pbGxhLWV4dHJhY3Qvdml0ZS1wbHVnaW4nXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJ1xuXG5pbXBvcnQgeyBjcmVhdGVBcHBDb25maWdQbHVnaW4gfSBmcm9tICcuL2FwcENvbmZpZydcbmltcG9ydCB7IGNvbmZpZ0NvbXByZXNzUGx1Z2luIH0gZnJvbSAnLi9jb21wcmVzcydcbmltcG9ydCB7IGNvbmZpZ0h0bWxQbHVnaW4gfSBmcm9tICcuL2h0bWwnXG5pbXBvcnQgeyBjb25maWdNb2NrUGx1Z2luIH0gZnJvbSAnLi9tb2NrJ1xuaW1wb3J0IHsgY29uZmlnU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICcuL3N2Z1Nwcml0ZSdcbmltcG9ydCB7IGNvbmZpZ1Zpc3VhbGl6ZXJDb25maWcgfSBmcm9tICcuL3Zpc3VhbGl6ZXInXG5pbXBvcnQgeyBjcmVhdGVQd2FQbHVnaW4gfSBmcm9tICcuL3B3YSdcbmludGVyZmFjZSBPcHRpb25zIHtcblx0aXNCdWlsZDogYm9vbGVhblxuXHRyb290OiBzdHJpbmdcblx0Y29tcHJlc3M6IHN0cmluZ1xuXHRlbmFibGVNb2NrPzogYm9vbGVhblxuXHRlbmFibGVBbmFseXplPzogYm9vbGVhblxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlUGx1Z2lucyA9IGFzeW5jICh7XG5cdGlzQnVpbGQsXG5cdHJvb3QsXG5cdGVuYWJsZU1vY2ssXG5cdGNvbXByZXNzLFxuXHRlbmFibGVBbmFseXplXG59OiBPcHRpb25zKSA9PiB7XG5cdGNvbnN0IHZpdGVQbHVnaW5zOiAoUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10pW10gPSBbXG5cdFx0cmVhY3QoKSxcblx0XHR0YWlsd2luZGNzcygpLFxuXHRcdHZhbmlsbGFFeHRyYWN0UGx1Z2luKHtcblx0XHRcdGlkZW50aWZpZXJzOiAoeyBkZWJ1Z0lkIH06IGFueSkgPT4gYCR7ZGVidWdJZH1gXG5cdFx0fSksXG5cdFx0dHNjb25maWdQYXRocygpXG5cdF1cblx0Y29uc3QgYXBwQ29uZmlnUGx1Z2luID0gYXdhaXQgY3JlYXRlQXBwQ29uZmlnUGx1Z2luKHsgcm9vdCwgaXNCdWlsZCB9KVxuXHR2aXRlUGx1Z2lucy5wdXNoKGFwcENvbmZpZ1BsdWdpbilcblx0Ly8gdml0ZS1wbHVnaW4taHRtbFxuXHR2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ0h0bWxQbHVnaW4oeyBpc0J1aWxkIH0pKVxuXHQvLyB2aXRlLXBsdWdpbi1zdmctaWNvbnNcblx0dml0ZVBsdWdpbnMucHVzaChjb25maWdTdmdJY29uc1BsdWdpbih7IGlzQnVpbGQgfSkpXG5cblx0Ly8gdml0ZS1wbHVnaW4tcHVyZ2UtaWNvbnNcblx0dml0ZVBsdWdpbnMucHVzaChwdXJnZUljb25zKCkpXG5cdGlmIChpc0J1aWxkKSB7XG5cdFx0Ly8gcm9sbHVwLXBsdWdpbi1nemlwXG5cdFx0dml0ZVBsdWdpbnMucHVzaChcblx0XHRcdGNvbmZpZ0NvbXByZXNzUGx1Z2luKHtcblx0XHRcdFx0Y29tcHJlc3Ncblx0XHRcdH0pXG5cdFx0KVxuXHRcdHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlUHdhUGx1Z2luKCkpXG5cdH1cblx0aWYgKGVuYWJsZUFuYWx5emUpIHtcblx0XHR2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ1Zpc3VhbGl6ZXJDb25maWcoKSlcblx0fVxuXG5cdC8vIHZpdGUtcGx1Z2luLW1vY2tcblx0aWYgKGVuYWJsZU1vY2spIHtcblx0XHR2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ01vY2tQbHVnaW4oeyBpc0J1aWxkIH0pKVxuXHR9XG5cblx0cmV0dXJuIHZpdGVQbHVnaW5zXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcc2VjdFxcXFxyZWFjdC1kZW1vXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcc2VjdFxcXFxyZWFjdC1kZW1vXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcYXBwQ29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9wcm9qZWN0L3NlY3QvcmVhY3QtZGVtby9idWlsZC9wbHVnaW5zL2FwcENvbmZpZy50c1wiO2ltcG9ydCBjb2xvcnMgZnJvbSAncGljb2NvbG9ycydcclxuaW1wb3J0IHsgcmVhZFBhY2thZ2VKU09OIH0gZnJvbSAncGtnLXR5cGVzJ1xyXG5pbXBvcnQgeyB0eXBlIFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXHJcblxyXG5pbXBvcnQgeyBnZXRFbnZDb25maWcgfSBmcm9tICcuLi91dGlscy9lbnYnXHJcbmltcG9ydCB7IGNyZWF0ZUNvbnRlbnRIYXNoIH0gZnJvbSAnLi4vdXRpbHMvaGFzaCdcclxuXHJcbmNvbnN0IEdMT0JBTF9DT05GSUdfRklMRV9OQU1FID0gJ19hcHAuY29uZmlnLmpzJ1xyXG5jb25zdCBQTFVHSU5fTkFNRSA9ICdhcHAtY29uZmlnJ1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlQXBwQ29uZmlnUGx1Z2luKHtcclxuXHRyb290LFxyXG5cdGlzQnVpbGRcclxufToge1xyXG5cdHJvb3Q6IHN0cmluZ1xyXG5cdGlzQnVpbGQ6IGJvb2xlYW5cclxufSk6IFByb21pc2U8UGx1Z2luT3B0aW9uPiB7XHJcblx0bGV0IHB1YmxpY1BhdGg6IHN0cmluZ1xyXG5cdGxldCBzb3VyY2U6IHN0cmluZ1xyXG5cdGlmICghaXNCdWlsZCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0bmFtZTogUExVR0lOX05BTUVcclxuXHRcdH1cclxuXHR9XHJcblx0Y29uc3QgeyB2ZXJzaW9uID0gJycgfSA9IGF3YWl0IHJlYWRQYWNrYWdlSlNPTihyb290KVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0bmFtZTogUExVR0lOX05BTUUsXHJcblx0XHRhc3luYyBjb25maWdSZXNvbHZlZChfY29uZmlnKSB7XHJcblx0XHRcdGNvbnN0IGFwcFRpdGxlID0gX2NvbmZpZz8uZW52Py5WSVRFX0dMT0JfQVBQX1RJVExFID8/ICcnXHJcblx0XHRcdC8vIGFwcFRpdGxlID0gYXBwVGl0bGUucmVwbGFjZSgvXFxzL2csICdfJykucmVwbGFjZSgvLS9nLCAnXycpO1xyXG5cdFx0XHRwdWJsaWNQYXRoID0gX2NvbmZpZy5iYXNlXHJcblx0XHRcdHNvdXJjZSA9IGF3YWl0IGdldENvbmZpZ1NvdXJjZShhcHBUaXRsZSlcclxuXHRcdH0sXHJcblx0XHRhc3luYyB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCkge1xyXG5cdFx0XHRwdWJsaWNQYXRoID0gcHVibGljUGF0aC5lbmRzV2l0aCgnLycpID8gcHVibGljUGF0aCA6IGAke3B1YmxpY1BhdGh9L2BcclxuXHJcblx0XHRcdGNvbnN0IGFwcENvbmZpZ1NyYyA9IGAke1xyXG5cdFx0XHRcdHB1YmxpY1BhdGggfHwgJy8nXHJcblx0XHRcdH0ke0dMT0JBTF9DT05GSUdfRklMRV9OQU1FfT92PSR7dmVyc2lvbn0tJHtjcmVhdGVDb250ZW50SGFzaChzb3VyY2UpfWBcclxuXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0aHRtbCxcclxuXHRcdFx0XHR0YWdzOiBbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHRhZzogJ3NjcmlwdCcsXHJcblx0XHRcdFx0XHRcdGF0dHJzOiB7XHJcblx0XHRcdFx0XHRcdFx0c3JjOiBhcHBDb25maWdTcmNcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGFzeW5jIGdlbmVyYXRlQnVuZGxlKCkge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHRoaXMuZW1pdEZpbGUoe1xyXG5cdFx0XHRcdFx0dHlwZTogJ2Fzc2V0JyxcclxuXHRcdFx0XHRcdGZpbGVOYW1lOiBHTE9CQUxfQ09ORklHX0ZJTEVfTkFNRSxcclxuXHRcdFx0XHRcdHNvdXJjZVxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGNvbG9ycy5jeWFuKCdcdTI3Mjhjb25maWd1cmF0aW9uIGZpbGUgaXMgYnVpbGQgc3VjY2Vzc2Z1bGx5IScpKVxyXG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFxyXG5cdFx0XHRcdFx0Y29sb3JzLnJlZChcclxuXHRcdFx0XHRcdFx0J2NvbmZpZ3VyYXRpb24gZmlsZSBjb25maWd1cmF0aW9uIGZpbGUgZmFpbGVkIHRvIHBhY2thZ2U6XFxuJyArIGVycm9yXHJcblx0XHRcdFx0XHQpXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjb25maWd1cmF0aW9uIGZpbGUgdmFyaWFibGUgbmFtZVxyXG4gKiBAcGFyYW0gZW52XHJcbiAqL1xyXG5jb25zdCBnZXRWYXJpYWJsZU5hbWUgPSAodGl0bGU6IHN0cmluZykgPT4ge1xyXG5cdGZ1bmN0aW9uIHN0clRvSGV4KHN0cjogc3RyaW5nKSB7XHJcblx0XHRjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW11cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XHJcblx0XHRcdGNvbnN0IGhleCA9IHN0ci5jaGFyQ29kZUF0KGkpLnRvU3RyaW5nKDE2KVxyXG5cdFx0XHRyZXN1bHQucHVzaCgoJzAwMCcgKyBoZXgpLnNsaWNlKC00KSlcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbignJykudG9VcHBlckNhc2UoKVxyXG5cdH1cclxuXHRyZXR1cm4gYF9fUFJPRFVDVElPTl9fJHtzdHJUb0hleCh0aXRsZSkgfHwgJ19fQVBQJ31fX0NPTkZfX2BcclxuXHRcdC50b1VwcGVyQ2FzZSgpXHJcblx0XHQucmVwbGFjZSgvXFxzL2csICcnKVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRDb25maWdTb3VyY2UoYXBwVGl0bGU6IHN0cmluZykge1xyXG5cdGNvbnN0IGNvbmZpZyA9IGF3YWl0IGdldEVudkNvbmZpZygpXHJcblx0Y29uc3QgdmFyaWFibGVOYW1lID0gZ2V0VmFyaWFibGVOYW1lKGFwcFRpdGxlKVxyXG5cdGNvbnN0IHdpbmRvd1ZhcmlhYmxlID0gYHdpbmRvdy4ke3ZhcmlhYmxlTmFtZX1gXHJcblx0Ly8gRW5zdXJlIHRoYXQgdGhlIHZhcmlhYmxlIHdpbGwgbm90IGJlIG1vZGlmaWVkXHJcblx0bGV0IHNvdXJjZSA9IGAke3dpbmRvd1ZhcmlhYmxlfT0ke0pTT04uc3RyaW5naWZ5KGNvbmZpZyl9O2BcclxuXHRzb3VyY2UgKz0gYFxyXG4gICAgT2JqZWN0LmZyZWV6ZSgke3dpbmRvd1ZhcmlhYmxlfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LCBcIiR7dmFyaWFibGVOYW1lfVwiLCB7XHJcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gIGAucmVwbGFjZSgvXFxzL2csICcnKVxyXG5cdHJldHVybiBzb3VyY2VcclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlQXBwQ29uZmlnUGx1Z2luIH1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHNlY3RcXFxccmVhY3QtZGVtb1xcXFxidWlsZFxcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxzZWN0XFxcXHJlYWN0LWRlbW9cXFxcYnVpbGRcXFxcdXRpbHNcXFxcZW52LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9wcm9qZWN0L3NlY3QvcmVhY3QtZGVtby9idWlsZC91dGlscy9lbnYudHNcIjtpbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudidcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMtZXh0cmEnXHJcblxyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJ1xyXG5cclxuLyoqXHJcbiAqIFx1ODNCN1x1NTNENlx1NUY1M1x1NTI0RFx1NzNBRlx1NTg4M1x1NEUwQlx1NzUxRlx1NjU0OFx1NzY4NFx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1NTQwRFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29uZkZpbGVzKCkge1xyXG5cdGNvbnN0IHNjcmlwdCA9IHByb2Nlc3MuZW52Lm5wbV9saWZlY3ljbGVfc2NyaXB0IGFzIHN0cmluZ1xyXG5cdGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoJy0tbW9kZSAoW2Etel9cXFxcZF0rKScpXHJcblx0Y29uc3QgcmVzdWx0ID0gcmVnLmV4ZWMoc2NyaXB0KVxyXG5cdGlmIChyZXN1bHQpIHtcclxuXHRcdGNvbnN0IG1vZGUgPSByZXN1bHRbMV1cclxuXHRcdHJldHVybiBbJy5lbnYnLCBgLmVudi4ke21vZGV9YF1cclxuXHR9XHJcblx0cmV0dXJuIFsnLmVudicsICcuZW52LnByb2R1Y3Rpb24nXVxyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgc3RhcnRpbmcgd2l0aCB0aGUgc3BlY2lmaWVkIHByZWZpeFxyXG4gKiBAcGFyYW0gbWF0Y2ggcHJlZml4XHJcbiAqIEBwYXJhbSBjb25mRmlsZXMgZXh0XHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RW52Q29uZmlnKFxyXG5cdG1hdGNoID0gJ1ZJVEVfR0xPQl8nLFxyXG5cdGNvbmZGaWxlcyA9IGdldENvbmZGaWxlcygpXHJcbik6IFByb21pc2U8e1xyXG5cdFtrZXk6IHN0cmluZ106IHN0cmluZ1xyXG59PiB7XHJcblx0bGV0IGVudkNvbmZpZyA9IHt9XHJcblxyXG5cdGZvciAoY29uc3QgY29uZkZpbGUgb2YgY29uZkZpbGVzKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBlbnZQYXRoID0gYXdhaXQgZnMucmVhZEZpbGUoam9pbihwcm9jZXNzLmN3ZCgpLCBjb25mRmlsZSksIHtcclxuXHRcdFx0XHRlbmNvZGluZzogJ3V0ZjgnXHJcblx0XHRcdH0pXHJcblx0XHRcdGNvbnN0IGVudiA9IGRvdGVudi5wYXJzZShlbnZQYXRoKVxyXG5cdFx0XHRlbnZDb25maWcgPSB7IC4uLmVudkNvbmZpZywgLi4uZW52IH1cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgaW4gcGFyc2luZyAke2NvbmZGaWxlfWAsIGUpXHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYF4oJHttYXRjaH0pYClcclxuXHRPYmplY3Qua2V5cyhlbnZDb25maWcpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdGlmICghcmVnLnRlc3Qoa2V5KSkge1xyXG5cdFx0XHRSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KGVudkNvbmZpZywga2V5KVxyXG5cdFx0fVxyXG5cdH0pXHJcblx0cmV0dXJuIGVudkNvbmZpZ1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxzZWN0XFxcXHJlYWN0LWRlbW9cXFxcYnVpbGRcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcc2VjdFxcXFxyZWFjdC1kZW1vXFxcXGJ1aWxkXFxcXHV0aWxzXFxcXGhhc2gudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3Qvc2VjdC9yZWFjdC1kZW1vL2J1aWxkL3V0aWxzL2hhc2gudHNcIjtpbXBvcnQgeyBjcmVhdGVIYXNoIH0gZnJvbSAnbm9kZTpjcnlwdG8nXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDb250ZW50SGFzaChjb250ZW50OiBzdHJpbmcsIGhhc2hMU2l6ZSA9IDEyKSB7XHJcblx0Y29uc3QgaGFzaCA9IGNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShjb250ZW50KVxyXG5cdHJldHVybiBoYXNoLmRpZ2VzdCgnaGV4Jykuc2xpY2UoMCwgaGFzaExTaXplKVxyXG59XHJcbmZ1bmN0aW9uIHN0clRvSGV4KHN0cjogc3RyaW5nKSB7XHJcblx0Y29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcclxuXHRcdGNvbnN0IGhleCA9IHN0ci5jaGFyQ29kZUF0KGkpLnRvU3RyaW5nKDE2KVxyXG5cdFx0cmVzdWx0LnB1c2goKCcwMDAnICsgaGV4KS5zbGljZSgtNCkpXHJcblx0fVxyXG5cdHJldHVybiByZXN1bHQuam9pbignJykudG9VcHBlckNhc2UoKVxyXG59XHJcblxyXG5leHBvcnQgeyBjcmVhdGVDb250ZW50SGFzaCwgc3RyVG9IZXggfVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcc2VjdFxcXFxyZWFjdC1kZW1vXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcc2VjdFxcXFxyZWFjdC1kZW1vXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcY29tcHJlc3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3Qvc2VjdC9yZWFjdC1kZW1vL2J1aWxkL3BsdWdpbnMvY29tcHJlc3MudHNcIjsvKipcclxuICogVXNlZCB0byBwYWNrYWdlIGFuZCBvdXRwdXQgZ3ppcC4gTm90ZSB0aGF0IHRoaXMgZG9lcyBub3Qgd29yayBwcm9wZXJseSBpbiBWaXRlLCB0aGUgc3BlY2lmaWMgcmVhc29uIGlzIHN0aWxsIGJlaW5nIGludmVzdGlnYXRlZFxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5uY3diL3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXHJcbiAqL1xyXG5pbXBvcnQgY29tcHJlc3NQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXHJcblxyXG5pbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnQ29tcHJlc3NQbHVnaW4oe1xyXG5cdGNvbXByZXNzLFxyXG5cdGRlbGV0ZU9yaWdpbkZpbGUgPSBmYWxzZVxyXG59OiB7XHJcblx0Y29tcHJlc3M6IHN0cmluZ1xyXG5cdGRlbGV0ZU9yaWdpbkZpbGU/OiBib29sZWFuXHJcbn0pOiBQbHVnaW5PcHRpb25bXSB7XHJcblx0Y29uc3QgY29tcHJlc3NMaXN0ID0gY29tcHJlc3Muc3BsaXQoJywnKVxyXG5cclxuXHRjb25zdCBwbHVnaW5zOiBQbHVnaW5PcHRpb25bXSA9IFtdXHJcblxyXG5cdGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2d6aXAnKSkge1xyXG5cdFx0cGx1Z2lucy5wdXNoKFxyXG5cdFx0XHRjb21wcmVzc1BsdWdpbih7XHJcblx0XHRcdFx0ZXh0OiAnLmd6JyxcclxuXHRcdFx0XHRkZWxldGVPcmlnaW5GaWxlXHJcblx0XHRcdH0pXHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdicm90bGknKSkge1xyXG5cdFx0cGx1Z2lucy5wdXNoKFxyXG5cdFx0XHRjb21wcmVzc1BsdWdpbih7XHJcblx0XHRcdFx0ZXh0OiAnLmJyJyxcclxuXHRcdFx0XHRhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXHJcblx0XHRcdFx0ZGVsZXRlT3JpZ2luRmlsZVxyXG5cdFx0XHR9KVxyXG5cdFx0KVxyXG5cdH1cclxuXHRyZXR1cm4gcGx1Z2luc1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxzZWN0XFxcXHJlYWN0LWRlbW9cXFxcYnVpbGRcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxzZWN0XFxcXHJlYWN0LWRlbW9cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxodG1sLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9wcm9qZWN0L3NlY3QvcmVhY3QtZGVtby9idWlsZC9wbHVnaW5zL2h0bWwudHNcIjsvKipcclxuICogUGx1Z2luIHRvIG1pbmltaXplIGFuZCB1c2UgZWpzIHRlbXBsYXRlIHN5bnRheCBpbiBpbmRleC5odG1sLlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5uY3diL3ZpdGUtcGx1Z2luLWh0bWxcclxuICovXHJcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJ1xyXG5cclxuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0h0bWxQbHVnaW4oeyBpc0J1aWxkIH06IHsgaXNCdWlsZDogYm9vbGVhbiB9KSB7XHJcblx0Y29uc3QgaHRtbFBsdWdpbjogUGx1Z2luT3B0aW9uW10gPSBjcmVhdGVIdG1sUGx1Z2luKHtcclxuXHRcdG1pbmlmeTogaXNCdWlsZFxyXG5cdH0pXHJcblx0cmV0dXJuIGh0bWxQbHVnaW5cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcc2VjdFxcXFxyZWFjdC1kZW1vXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcc2VjdFxcXFxyZWFjdC1kZW1vXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbW9jay50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovcHJvamVjdC9zZWN0L3JlYWN0LWRlbW8vYnVpbGQvcGx1Z2lucy9tb2NrLnRzXCI7LyoqXHJcbiAqIE1vY2sgcGx1Z2luIGZvciBkZXZlbG9wbWVudCBhbmQgcHJvZHVjdGlvbi5cclxuICogaHR0cHM6Ly9naXRodWIuY29tL2FubmN3Yi92aXRlLXBsdWdpbi1tb2NrXHJcbiAqL1xyXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWdNb2NrUGx1Z2luKHsgaXNCdWlsZCB9OiB7IGlzQnVpbGQ6IGJvb2xlYW4gfSkge1xyXG5cdHJldHVybiB2aXRlTW9ja1NlcnZlKHtcclxuXHRcdGlnbm9yZTogL15fLyxcclxuXHRcdG1vY2tQYXRoOiAnbW9jaycsXHJcblx0XHRsb2NhbEVuYWJsZWQ6ICFpc0J1aWxkLFxyXG5cdFx0cHJvZEVuYWJsZWQ6IGlzQnVpbGQsXHJcblx0XHRpbmplY3RDb2RlOiBgXHJcbiAgICAgIGltcG9ydCB7IHNldHVwUHJvZE1vY2tTZXJ2ZXIgfSBmcm9tICcuLi9tb2NrL19jcmVhdGVQcm9kdWN0aW9uU2VydmVyJztcclxuXHJcbiAgICAgIHNldHVwUHJvZE1vY2tTZXJ2ZXIoKTtcclxuICAgICAgYFxyXG5cdH0pXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHNlY3RcXFxccmVhY3QtZGVtb1xcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHNlY3RcXFxccmVhY3QtZGVtb1xcXFxidWlsZFxcXFxwbHVnaW5zXFxcXHN2Z1Nwcml0ZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovcHJvamVjdC9zZWN0L3JlYWN0LWRlbW8vYnVpbGQvcGx1Z2lucy9zdmdTcHJpdGUudHNcIjsvKipcclxuICogIFZpdGUgUGx1Z2luIGZvciBmYXN0IGNyZWF0aW5nIFNWRyBzcHJpdGVzLlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5uY3diL3ZpdGUtcGx1Z2luLXN2Zy1pY29uc1xyXG4gKi9cclxuXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xyXG5cclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcclxuXHJcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWdTdmdJY29uc1BsdWdpbih7IGlzQnVpbGQgfTogeyBpc0J1aWxkOiBib29sZWFuIH0pIHtcclxuXHRjb25zdCBzdmdJY29uc1BsdWdpbiA9IGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuXHRcdGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcclxuXHRcdHN2Z29PcHRpb25zOiBpc0J1aWxkXHJcblx0fSlcclxuXHRyZXR1cm4gc3ZnSWNvbnNQbHVnaW4gYXMgUGx1Z2luT3B0aW9uXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHNlY3RcXFxccmVhY3QtZGVtb1xcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHNlY3RcXFxccmVhY3QtZGVtb1xcXFxidWlsZFxcXFxwbHVnaW5zXFxcXHZpc3VhbGl6ZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3Qvc2VjdC9yZWFjdC1kZW1vL2J1aWxkL3BsdWdpbnMvdmlzdWFsaXplci50c1wiOy8qKlxuICogUGFja2FnZSBmaWxlIHZvbHVtZSBhbmFseXNpc1xuICovXG5pbXBvcnQgdmlzdWFsaXplciBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXG5pbXBvcnQgeyB0eXBlIFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdWaXN1YWxpemVyQ29uZmlnKCkge1xuXHRyZXR1cm4gdmlzdWFsaXplcih7XG5cdFx0ZmlsZW5hbWU6ICcuL25vZGVfbW9kdWxlcy8uY2FjaGUvdmlzdWFsaXplci9zdGF0cy5odG1sJyxcblx0XHRvcGVuOiB0cnVlLFxuXHRcdGd6aXBTaXplOiB0cnVlLFxuXHRcdGJyb3RsaVNpemU6IHRydWVcblx0fSkgYXMgdW5rbm93biBhcyBQbHVnaW5PcHRpb25cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxzZWN0XFxcXHJlYWN0LWRlbW9cXFxcYnVpbGRcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxzZWN0XFxcXHJlYWN0LWRlbW9cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxwd2EudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3Qvc2VjdC9yZWFjdC1kZW1vL2J1aWxkL3BsdWdpbnMvcHdhLnRzXCI7aW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVB3YVBsdWdpbiA9ICgpID0+IHtcclxuXHRyZXR1cm4gVml0ZVBXQSh7XHJcblx0XHRiYXNlOiAnLycsXHJcblx0XHRyZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuXHRcdHNjb3BlOiAnLycsXHJcblx0XHRpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24uaWNvJ10sXHJcblx0XHRtYW5pZmVzdDoge1xyXG5cdFx0XHRuYW1lOiAnVml0ZS1SZWFjdC1UUycsXHJcblx0XHRcdHNob3J0X25hbWU6ICdWaXRlLVJlYWN0LVRTJyxcclxuXHRcdFx0ZGVzY3JpcHRpb246ICdWaXRlLVJlYWN0LVRTJyxcclxuXHRcdFx0dGhlbWVfY29sb3I6ICcjZmZmZmZmJ1xyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHNlY3RcXFxccmVhY3QtZGVtb1xcXFxidWlsZFxcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcc2VjdFxcXFxyZWFjdC1kZW1vXFxcXGJ1aWxkXFxcXGNvbmZpZ1xcXFxwYWNrYWdlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9wcm9qZWN0L3NlY3QvcmVhY3QtZGVtby9idWlsZC9jb25maWcvcGFja2FnZS50c1wiO2ltcG9ydCB7IHJlYWRQYWNrYWdlSlNPTiB9IGZyb20gJ3BrZy10eXBlcydcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbWVyZ2VDb25maWcsIHR5cGUgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5cbmltcG9ydCB7IGNvbW1vbkNvbmZpZyB9IGZyb20gJy4vY29tbW9uJ1xuXG5pbnRlcmZhY2UgRGVmaW5lT3B0aW9ucyB7XG5cdG92ZXJyaWRlcz86IFVzZXJDb25maWdcblx0b3B0aW9ucz86IG9iamVjdFxufVxuXG5mdW5jdGlvbiBkZWZpbmVQYWNrYWdlQ29uZmlnKGRlZmluZU9wdGlvbnM6IERlZmluZU9wdGlvbnMgPSB7fSkge1xuXHRjb25zdCB7IG92ZXJyaWRlcyA9IHt9IH0gPSBkZWZpbmVPcHRpb25zXG5cdGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpXG5cdHJldHVybiBkZWZpbmVDb25maWcoYXN5bmMgKHsgbW9kZSB9KSA9PiB7XG5cdFx0Y29uc3QgeyBkZXBlbmRlbmNpZXMgPSB7fSwgcGVlckRlcGVuZGVuY2llcyA9IHt9IH0gPVxuXHRcdFx0YXdhaXQgcmVhZFBhY2thZ2VKU09OKHJvb3QpXG5cdFx0Y29uc3QgcGFja2FnZUNvbmZpZzogVXNlckNvbmZpZyA9IHtcblx0XHRcdGJ1aWxkOiB7XG5cdFx0XHRcdGxpYjoge1xuXHRcdFx0XHRcdGVudHJ5OiAnc3JjL2luZGV4LnRzJyxcblx0XHRcdFx0XHRmb3JtYXRzOiBbJ2VzJ10sXG5cdFx0XHRcdFx0ZmlsZU5hbWU6ICgpID0+ICdpbmRleC5tanMnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdFx0XHRleHRlcm5hbDogW1xuXHRcdFx0XHRcdFx0Li4uT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSxcblx0XHRcdFx0XHRcdC4uLk9iamVjdC5rZXlzKHBlZXJEZXBlbmRlbmNpZXMpXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdH1cblx0XHRjb25zdCBtZXJnZWRDb25maWcgPSBtZXJnZUNvbmZpZyhjb21tb25Db25maWcobW9kZSksIHBhY2thZ2VDb25maWcpXG5cblx0XHRyZXR1cm4gbWVyZ2VDb25maWcobWVyZ2VkQ29uZmlnLCBvdmVycmlkZXMpXG5cdH0pXG59XG5cbmV4cG9ydCB7IGRlZmluZVBhY2thZ2VDb25maWcgfVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHNlY3RcXFxccmVhY3QtZGVtb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxzZWN0XFxcXHJlYWN0LWRlbW9cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3Qvc2VjdC9yZWFjdC1kZW1vL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQXBwbGljYXRpb25Db25maWcgfSBmcm9tICcuL2J1aWxkJ1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVBcHBsaWNhdGlvbkNvbmZpZyh7XHJcblx0b3ZlcnJpZGVzOiB7XHJcblx0XHRzZXJ2ZXI6IHtcclxuXHRcdFx0b3BlbjogZmFsc2UsIC8vIFx1OTg3OVx1NzZFRVx1NTQyRlx1NTJBOFx1NTQwRVx1RkYwQ1x1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFxyXG5cdFx0XHR3YXJtdXA6IHtcclxuXHRcdFx0XHRjbGllbnRGaWxlczogWycuL2luZGV4Lmh0bWwnLCAnLi9zcmMve3ZpZXdzLGNvbXBvbmVudHN9LyonXVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0Ly8gXHU0RjE4XHU1MzE2XHU0RjlEXHU4RDU2XHU5ODg0XHU2Nzg0XHU1RUZBXHJcblx0XHRvcHRpbWl6ZURlcHM6IHtcclxuXHRcdFx0aW5jbHVkZTogW1xyXG5cdFx0XHRcdCdyZWFjdCcsXHJcblx0XHRcdFx0J3JlYWN0LWRvbScsXHJcblx0XHRcdFx0J3JlYWN0LXJvdXRlci1kb20nLFxyXG5cdFx0XHRcdCdhbnRkJyxcclxuXHRcdFx0XHQnQGFudC1kZXNpZ24vaWNvbnMnLFxyXG5cdFx0XHRcdCdheGlvcycsXHJcblx0XHRcdFx0J2RheWpzJ1xyXG5cdFx0XHRdLFxyXG5cdFx0XHRleGNsdWRlOiBbJ0BpY29uaWZ5L3JlYWN0J10gLy8gXHU2MzkyXHU5NjY0XHU0RTBEXHU5NzAwXHU4OTgxXHU5ODg0XHU2Nzg0XHU1RUZBXHU3Njg0XHU0RjlEXHU4RDU2XHJcblx0XHR9XHJcblx0fVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1ULE9BQU8sV0FBVztBQUNyVSxTQUFTLG1CQUFBQSx3QkFBdUI7QUFDaEMsU0FBUyxjQUFjLFNBQVMsbUJBQW9DO0FBRXBFLFNBQVMsV0FBQUMsZ0JBQWU7OztBQ0Z4QixJQUFNLGVBQTZDLFdBQVM7QUFBQSxFQUMzRCxRQUFRO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsTUFBTSxTQUFTLGVBQWUsQ0FBQyxXQUFXLFVBQVUsSUFBSSxDQUFDO0FBQUEsRUFDMUQ7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNOLHNCQUFzQjtBQUFBLElBQ3RCLHVCQUF1QjtBQUFBLElBQ3ZCLGVBQWU7QUFBQTtBQUFBLE1BRWQsb0JBQW9CO0FBQUEsSUFDckI7QUFBQSxFQUNEO0FBQUEsRUFDQSxTQUFTLENBQUM7QUFDWDs7O0FDakJBLE9BQU8sV0FBVztBQUVsQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLGlCQUFpQjtBQUV4QixPQUFPLG1CQUFtQjs7O0FDUHdSLE9BQU8sWUFBWTtBQUNyVSxTQUFTLHVCQUF1Qjs7O0FDRGdRLE9BQU8sWUFBWTtBQUNuVCxZQUFZLFFBQVE7QUFFcEIsU0FBUyxZQUFZO0FBS3JCLFNBQVMsZUFBZTtBQUN2QixRQUFNLFNBQVMsUUFBUSxJQUFJO0FBQzNCLFFBQU0sTUFBTSxJQUFJLE9BQU8scUJBQXFCO0FBQzVDLFFBQU0sU0FBUyxJQUFJLEtBQUssTUFBTTtBQUM5QixNQUFJLFFBQVE7QUFDWCxVQUFNLE9BQU8sT0FBTyxDQUFDO0FBQ3JCLFdBQU8sQ0FBQyxRQUFRLFFBQVEsSUFBSSxF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
