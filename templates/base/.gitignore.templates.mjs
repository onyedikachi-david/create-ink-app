const contents = () =>
  `# package management
**/node_modules
**/.pnp
.pnp.js
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env
.env*.local

# vercel
.vercel
.gitsigners

# typescript
*.tsbuildinfo
dist

# turbo
.turbo

# coverage
coverage
coverage.json

# VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
!.vscode/*.code-workspace
.history/`

export default contents
