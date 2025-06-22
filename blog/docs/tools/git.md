# Git 命令与规范

## Git 基础配置

```bash
# 设置全局用户名/邮箱
$ git config --global user.name "YourName"
$ git config --global user.email "your@email.com"
# 查看配置
$ git config --list
```

## 仓库操作

### 初始化仓库

```bash
# 初始化仓库
$ git init
# 克隆仓库
$ git clone [远程仓库地址]
# 将已存在的项目添加到Git版本控制中
$ git add .
$ git commit -m "first commit"
$ git remote add origin [远程仓库地址]
$ git push -u origin main
# 若远程仓库已存在内容,可以执行以下命令解决冲突
$ git pull --rebase origin main
```

### 日常开发流程

```bash
# 查看状态
$ git status
# 查看差异
$ git diff
# 添加所有文件/单个文件到暂存区
$ git add .
$ git add [file]
# 提交代码
$ git commit -m "message"
# 拉取代码
$ git pull origin [branch]
# 推送代码到远程仓库
$ git push orgin [branch]
# 保存当前未commit的代码到暂存区
git stash
# 恢复堆栈中缓存的改动内容
git stash pop
```

### 分支管理

```bash
# 创建并切换到该分支
$ git checkout -b [branch]
# 切换分支
$ git checkout [branch]
# 查看本地分支
$ git branch
# 查看远程分支
$ git branch -a
# 合并分支
$ git merge [branch]
```

### 版本控制

```bash
# 查看日志
$ git log
# 回退版本
$ git reset --hard [commit-id]
# 撤销工作区修改
$ git checkout -- [file]
# 撤销暂存区修改
git reset HEAD [file]
```

### 实用命令

1. SSH密钥

```bash
# 查看现有密钥
$ ls -al ~/.ssh
# 生成新密钥
$ ssh-keygen -t ed25519 -C "your_email@example.com"
# 若系统不支持Ed25519可改用RSA
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# 查看密钥
$ ~/.ssh/id_ed25519.pub
# 修改现有仓库为SSH协议
$ git remote set-url origin git@github.com:username/repo.git

```

生成过程按Enter使用默认路径，密码可留空

2. 设置别名

```bash
$ git config --global alias.st status
$ git config --global alias.co checkout:ml-citation{ref="7,8" data="citationList"}
```

建议将高频命令配置为简写（如 git st/git ci），可显著提升工作效率

## Git 提交规范

### 标准格式

```text
<type>(<scope>): <subject>
```

1. 类型（Type）定义

   - feat：新功能
   - fix：修复Bug
   - docs：文档更新/注释
   - style：代码格式调整
   - refactor：代码重构（既不增加新功能，也不是修复bug）
   - perf：性能优化
   - test：测试相关
   - build：构建/打包变更
   - revert：回退
   - chore：杂项维护

2. 编写要求

   - 类型（Type）使用小写英文名词
   - scope表示作用范围，选填
   - subject是必填，对提交内容进行简短描述

3. 分支管理配套规范

   - main / master 仅接受合并请求
   - develop 作为集成开发分支

4. 实施工具

   - Commitizen: 交互式生成规范提交信息

   ```bash
    $ npm install -g commitizen cz-conventional-changlog
   ```

   - commitlint: 提交信息校验

   ```bash
   $ npm install --save-dev @commitlint/cli @commitlint/config-conventional

   ```

   需配合husky使用

| 工具                          | 核心作用                                                                   | 解决的问题                                                | 使用场景                                               | 协作关系                                                             |
| ----------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------- |
| **Commitizen**                | 提供交互式命令行工具，引导生成符合规范的Git提交消息                        | 提交消息格式随意、不统一                                  | 需要统一提交格式的团队或项目                           | 依赖适配器定义规范                                                   |
| **cz-conventional-changelog** | Commitizen 的默认适配器，实现 Angular 约定式提交规范（feat，fix，docs 等） | 提交消息缺乏标准化，无法自动生成 changelog                | 需要遵循 Angular 规范并生成日志的项目                  | 被Commitizen 调用，定义提交模版和规范                                |
| **cz-vinyl**                  | Commitizen 的自定义配置适配器，支持灵活定义提交类型、流程和交互问题        | 默认 Angular 规范不满足需求（如需要更多类型或自定义描述） | 需要定制提交规范（如企业规范或扩展类型）               | 替代cz-conventional-changelog，与Commitizen 配合使用                 |
| **commitlint**                | 校验 Git 提交消息是否符合规范（如约定式提交）                              | 错误格式的提交消息进入代码库                              | 在代码审查前自动拦截非法提交消息                       | 通过 husky 的 commit-msg 钩子触发校验                                |
| **husky**                     | 管理 Git 钩子（如 pre-commit,commit-msg），在特定时机触发自定义脚本        | 手动维护 Git 钩子效率低，易遗漏                           | 需要在提交代码前自动执行代码检查、测试、提交校验等操作 | 触发 commitlint 和 lint-staged 等工具                                |
| **lint-staged**               | 仅对 Git 暂存区文件执行指定的 Lint 操作（如 ESLint、Prettier）             | 全量检查所有文件效率低，且可能误改为修改的代码            | 提交前仅检查本次修改的代码，确保风格一致               | 通过 husky 的 pre-commit 钩子触发，与 ESLint/Prettier 等工具配合使用 |
