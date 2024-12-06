const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("path");
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const srcPath = path.resolve(__dirname, "src");

const config = {
  resolver: {
    extraNodeModules: {
      "@assets": path.resolve(srcPath, "assets"),
      "@components": path.resolve(srcPath, "components"),
      "@configs": path.resolve(srcPath, "configs"),
      "@helpers": path.resolve(srcPath, "helpers"),
      "@models": path.resolve(srcPath, "models"),
      "@router": path.resolve(srcPath, "router"),
      "@services": path.resolve(srcPath, "services"),
      "@theme": path.resolve(srcPath, "theme"),
      "@views": path.resolve(srcPath, "views"),
      "@utils": path.resolve(srcPath, "utils"),
      "@hooks": path.resolve(srcPath, "hooks"),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
