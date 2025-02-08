rm -rf ./node_modules
npm i
git update-index --skip-worktree ./src/environments/version.ts

npm i -g source-map-explorer