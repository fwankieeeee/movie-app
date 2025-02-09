module.exports = api => {
  api.cache(false);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      'module:react-native-dotenv',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
          },
        },
      ],
    ],
  };
};
