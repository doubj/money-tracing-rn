module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/utils': './src/utils',
          '@/pages': './src/pages',
          '@/navigator': './src/navigator',
          '@/components': './src/components',
          '@/assets': './src/assets',
          '@/models': './src/models',
          '@/config': './src/config',
        },
      }
    ]
  ]
};
