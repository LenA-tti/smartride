module.exports = function(api) {
  api.cache(true);
  let plugins = [];

  // Add alias for "@/" to project root
  const moduleResolver = [
    'module-resolver',
    {
      root: ['.'],
      alias: { '@': '.' },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
  ];

  plugins.push(moduleResolver);

  plugins.push('react-native-worklets/plugin');

  return {
    
      presets: [
        ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
        'nativewind/babel',
      ],
    
    plugins,
  };
};
