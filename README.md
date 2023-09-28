# create-typescript-app

![version](https://img.shields.io/badge/version-0.0.1-green)
![license](https://img.shields.io/badge/license-MIT-green)

> create-typescript-app 是一个快速创建 react + typescript 技术栈开源项目。<br/>



## 项目结构

项目是基于 pnpm 的 monorepo 多项目结构，具体包括:

- cta-template-typescript : react + typescript 项目模板
- tsx-scripts: 基于webpack封装的类似roadhog的脚手架脚本(负责项目模版的开发构建)
- typescript-app-cli: 生成项目的脚手架cli，负责选择模版初始化和生成

```
├── LICENSE
├── README.md
├── package.json
├── packages
│   ├── cta-template-typescript
│   ├── tsx-scripts
│   └── typescript-app-cli
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

## 快速上手

### 安装项目初始化脚手架

确保本地已经安装nodejs，并且拥有npm/yarn/pnpm等包管理工具。

```bash

yarn global add typescript-app-cli

#or
npm install -g typescript-app-cli

#or

pnpm global add typescript-app-cli

```

### 使用方法

![运行效果](https://raw.githubusercontent.com/Harhao/Harhao/master/q3v56-ot2zv.gif)

