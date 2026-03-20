# dotfiles

个人配置仓库，当前已落地的内容以网络代理相关配置为主，后续按领域继续扩展到 `shell`、`editor`、`terminal`、`system` 等目录。

## 设计目标

- 按领域和工具分层，避免所有配置文件继续堆在仓库根目录。
- 保持“仓库内规范路径”稳定，方便以后迁移、备份和在新机器上定位。
- 将说明文档、辅助脚本和实际配置分开，降低维护时的认知负担。
- 为未来引入 `chezmoi`、`yadm` 或其他 dotfiles 管理方案预留空间。

## 目录结构

```text
dotfiles/
├── configs/
│   ├── network/
│   │   ├── clash-verge/
│   │   ├── loon/
│   │   ├── mihomo/
│   │   └── README.md
│   ├── editor/
│   ├── shell/
│   ├── system/
│   └── terminal/
├── docs/
├── scripts/
└── .gitignore
```

## 当前已收纳模块

- `configs/network/clash-verge/config.js`：Clash Verge Rev / Mihomo Party 主脚本。
- `configs/network/clash-verge/dns.js`：Clash Verge DNS 防泄露脚本变体。
- `configs/network/mihomo/config.yaml`：完整 Mihomo YAML 配置。
- `configs/network/loon/loon.conf`：Loon 自用配置。

## 迁移与备份约定

1. 配置文件的规范源都放在 `configs/` 下，仓库根目录不再直接堆放业务配置。
2. 文档统一放到 `docs/`，把结构说明、调研结论、迁移步骤和注意事项留在仓库内。
3. 辅助脚本统一放到 `scripts/`，后续新增导出、校验、同步脚本时路径保持不变。
4. 运行时缓存、导出物和临时文件不进入 Git，见 `.gitignore`。
5. 机器私有信息、凭据和订阅密钥不应直接提交到仓库；需要时优先使用本地私有文件或后续引入加密方案。

## 常用操作

```powershell
# 校验仓库骨架是否完整
pwsh ./scripts/Test-RepoLayout.ps1
```

```powershell
# 根据当前 origin 自动输出各配置文件的 raw URL
pwsh ./scripts/Get-ConfigUrls.ps1
```

## 重要说明

- 本次整理后，旧的根目录文件路径已经迁移到 `configs/network/...` 下。
- 如果你之前直接订阅 GitHub Raw 根路径文件，需要改用新路径。
- 关于结构设计、迁移备份原则和 GitHub 改名流程，见 `docs/research-notes.md` 与 `docs/migration-backup.md`。
