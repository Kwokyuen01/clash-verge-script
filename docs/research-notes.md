# Research Notes

整理日期：2026-03-20  
调研方式：使用 `grok-search` MCP 检索官方文档与公开仓库模式，再结合当前仓库体量做落地取舍。

## 结论

### 1. 仓库应采用模块化目录，而不是继续把配置平铺在根目录

结论：`configs/<domain>/<tool>` 这种按领域再按工具分层的方式，最适合当前仓库从“单一 Clash 配置仓”升级为“个人配置仓库”。

适用条件：

- 当前仓库已经不只服务单个文件。
- 后续明确还会继续加入 shell、editor、terminal、system 等配置。

边界与限制：

- 现在还没有引入 `chezmoi`、`yadm` 或 `GNU Stow`，所以这里只先采用兼容这些工具的目录风格，不强制绑定某个工具。

置信度：高

依据：

- GNU Stow 官方手册明确把一个 package 视为一组相关文件，并要求 package directory 反映目标目录结构。[GNU Project, 2024, https://www.gnu.org/software/stow/manual/stow.html]
- chezmoi 官方快速开始明确把 dotfiles 的“desired state”保存在专门仓库里，并推荐将其推送到名为 `dotfiles` 的 GitHub 仓库。[chezmoi, Quick start, https://chezmoi.io/quick-start/]

### 2. 仓库名使用 `dotfiles` 更利于后续迁移和工具兼容

结论：把仓库名从 `clash-verge-script` 改成 `dotfiles` 是合理的，因为它与当前“个人配置仓库”的目标一致，也与 chezmoi 的官方惯例对齐。

适用条件：

- 仓库用途已经扩展为个人配置集合，而不是单一的 Clash 脚本发布仓。
- 计划以后在新机器上快速恢复配置。

边界与限制：

- `dotfiles` 是约定俗成的名字，不代表仓库已经完全采用 dotfiles 管理器。
- 旧订阅链接需要改到新仓库名和新路径。

置信度：高

依据：

- chezmoi 官方快速开始直接建议“Create a new repository on GitHub called `dotfiles`”。[chezmoi, Quick start, https://chezmoi.io/quick-start/]
- yadm 官方文档默认把仓库视作 dotfiles repository，并围绕 clone / bootstrap / alternates 设计工作流。[yadm, Getting Started, Updated 2025-03-18, https://yadm.io/docs/getting_started]

### 3. 便于迁移与备份的关键，不是堆更多文件，而是保留稳定的结构、校验脚本和机型差异边界

结论：本仓库应优先做到三件事：稳定路径、脚本化校验、将机器私有信息与公共配置分离。

适用条件：

- 需要跨机器恢复。
- 需要长期维护，而不是一次性归档。

边界与限制：

- 当前仓库没有引入加密 secrets 流程，所以这里只能先把“不要提交私密信息”的边界写清楚。

置信度：高

依据：

- chezmoi 官方文档建议用 `chezmoi.toml`、模板和 `.chezmoiignore` 处理 machine-to-machine differences，并要求私有数据至少留在本地私有配置中。[chezmoi, Manage machine-to-machine differences, https://chezmoi.io/user-guide/manage-machine-to-machine-differences/]
- yadm 官方文档建议使用 idempotent bootstrap、alternate files 和 encryption 来处理跨机器差异与敏感信息。[yadm, Bootstrap / Encryption / Alternate Files, Updated 2025-03-18, https://yadm.io/docs/bootstrap ; https://yadm.io/docs/encryption ; https://yadm.io/docs/alternates]

### 4. GitHub 仓库改名后，本地 remote 仍应显式更新

结论：虽然 GitHub 会对旧地址做重定向，但本地仓库仍应执行 `git remote set-url origin NEW_URL`，避免后续混淆。

适用条件：

- 远端托管在 GitHub。
- 当前本地仓库已经绑定旧仓库 URL。

边界与限制：

- GitHub Actions 中被外部工作流直接引用的 action 仓库不会被自动重定向。
- GitHub Pages 站点 URL 也不是完全等价的重定向场景。

置信度：高

依据：

- GitHub 官方文档说明：重命名后，除 project site URLs 外，既有信息会自动重定向；`git clone`、`git fetch`、`git push` 也会继续工作，但官方“strongly recommend updating any existing local clones”。[GitHub Docs, Renaming a repository, https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository]
- GitHub 官方文档提供了 `git remote set-url origin ...` 和 `git remote -v` 的标准更新与校验命令。[GitHub Docs, Managing remote repositories, https://docs.github.com/en/get-started/git-basics/managing-remote-repositories]
