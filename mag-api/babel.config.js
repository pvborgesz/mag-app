module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@': './src',
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    function myCustomPlugin() {
      return {
        visitor: {
          StringLiteral(path) {
            const value = path.node.value;
            const entities = '/src/infra/database/postgres/typeorm/**/entities';
            const migrations = '/src/infra/database/config/postgres/typeorm/migrations';
            const subscribers = '/src/infra/database/postgres/typeorm/**/**/subscribers';
            const routes = '**/src/main/routes/**/**.routes.ts';
            if (value.includes(entities) || value.includes(migrations) || value.includes(subscribers) || value.includes(routes)) {
              console.log('value', value);
              let newValue = value.replace('src', 'dist');
              newValue = newValue.replace('.ts', '.js');
              path.replaceWithSourceString("\""+newValue+"\"");
              path.skip();
            }
          },
        },
      };
    },
  ]
}
