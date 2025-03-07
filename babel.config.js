/* eslint-disable no-undef */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@assets': './src/assets',
          },
        },
      ],
      [
        'inline-dotenv',
        {
          path: '.env',
        },
      ],
    ],
  };
};
