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
      "@components": path.resolve(srcPath, "components"),
      "@helpers": path.resolve(srcPath, "helpers"),
      "@router": path.resolve(srcPath, "router"),
      "@theme": path.resolve(srcPath, "theme"),
      "@views": path.resolve(srcPath, "views"),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
