module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended', // 我是使用vue项目的，其它框架这块配置可能不太一样
  ],
  parserOptions: {
    parser: 'babel-eslint', // 需安装eslint和babel-eslint
  },
  rules: {
    quotes: [2, 'single'], //单引号
    semi: [0, 'never'], // 不使用分号
    indent: [2, 2], // 相同的缩进2
    eqeqeq: 2, // 使用全等
    'no-unused-vars': 'warn', // 不使用的变量
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // console在生产模式不生效
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // debugger在生产模式不生效
    'vue/no-unused-components': 'off', // 组件不使用的时候不报错
  },
};
