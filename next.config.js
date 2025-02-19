module.exports = {
  distDir: '.next',
  // Add the following exportPathMap function
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' }
      // Add other routes here if needed
    };
  },
};
