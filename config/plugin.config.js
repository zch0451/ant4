import path from 'path';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
function getModulePackageName(module) {
  if (!module.context) return null;
  const nodeModulesPath = path.join(__dirname, '../node_modules/');

  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }

  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName = moduleDirName; // handle tree shaking

  if (packageName && packageName.match('^_')) {
    // eslint-disable-next-line prefer-destructuring
    packageName = packageName.match(/^_(@?[^@]+)/)[1];
  }

  return packageName;
}

const webpackPlugin = config => {
  // optimize chunks
  config.optimization // share the same chunks across different modules
    .runtimeChunk(false)
    .splitChunks({
      chunks: 'async',
      name: 'vendors',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: module => {
            const packageName = getModulePackageName(module) || '';

            if (packageName) {
              return [
                'bizcharts',
                'gg-editor',
                'g6',
                '@antv',
                'l7',
                'gg-editor-core',
                'bizcharts-plugin-slider',
              ].includes(packageName);
            }

            return false;
          },

          name(module) {
            const packageName = getModulePackageName(module);

            if (packageName) {
              if (['bizcharts', '@antv_data-set'].indexOf(packageName) >= 0) {
                return 'viz'; // visualization package
              }
            }

            return 'misc';
          },
        },
      },
    });
  //memo.plugin('AntdDayjsWebpackPlugin').use(AntdDayjsWebpackPlugin);
  config.plugin('moment2dayjs').use('antd-dayjs-webpack-plugin');
  config.plugin('CompressionPlugin').use(new CompressionPlugin({
    //filename: "[path].gz[query]",
    algorithm: "gzip",
    test: productionGzipExtensions,
    // 只处理大于xx字节 的文件，默认：0
    threshold: 102400,
    // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
    minRatio: 0.5, // 默认: 0.8
    // 是否删除源文件，默认: false
    deleteOriginalAssets: false
  }));
};

export default webpackPlugin;
