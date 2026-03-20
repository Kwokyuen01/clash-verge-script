# Migration And Backup

本文档描述这个仓库以后在“换机器继续用”或“做长期备份”时的最低操作面。

## 当前策略

- Git 仓库保存手工维护的规范配置。
- `configs/` 保存可复用配置源。
- `docs/` 保存结构说明和迁移约束。
- `scripts/` 保存校验和辅助输出脚本。
- 临时文件、缓存和本地工作目录不进 Git。

## 新机器恢复流程

1. 克隆仓库。
2. 运行 `pwsh ./scripts/Test-RepoLayout.ps1`，确认骨架和关键文件没有缺失。
3. 运行 `pwsh ./scripts/Get-ConfigUrls.ps1`，拿到当前远端下各配置的 raw URL。
4. 根据你要恢复的工具，手工导入对应配置文件：
   - Clash Verge Rev / Mihomo Party：`configs/network/clash-verge/`
   - Mihomo：`configs/network/mihomo/`
   - Loon：`configs/network/loon/`
5. 如果未来引入 shell、editor、terminal、system 配置，就按同一目录约定继续补齐。

## 备份检查清单

- 改动是否已经 `git commit` 并推送到远端。
- `configs/` 下的规范源是否为最新版本。
- 是否误把本地缓存、导出文件或凭据提交进仓库。
- 结构说明、迁移文档和脚本是否仍与当前目录一致。

## 私有信息边界

- 账号、密钥、令牌、机器专属订阅地址不要直接写入公开仓库。
- 如果以后需要统一管理敏感文件，优先考虑：
  - chezmoi 的模板和加密能力；
  - yadm 的 encryption / alternates；
  - 单独的本地私有文件或私有仓库。

## 为什么这次不直接引入 chezmoi / yadm / GNU Stow

当前仓库主要还是网络配置源，不是已经完整映射到家目录的 dotfiles 集合。现在先做的是“结构归位 + 文档收口 + 迁移边界明确”，让仓库先从平铺状态升级为可扩展骨架。等后续真的开始纳入 PowerShell、Git、VS Code、Windows Terminal 等配置，再决定是否切换到更强的 dotfiles 管理工具。
