module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@vue/app'
  ];

  const plugins = [];

  return {
    presets,
    plugins,
  };
};