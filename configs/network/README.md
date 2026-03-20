# Network Configs

这个目录收纳当前仓库里已经落地的网络代理配置，并把原来散落在仓库根目录的文件重新归位。

## 文件分布

- `clash-verge/config.js`：Clash Verge Rev / Mihomo Party 主脚本。
- `clash-verge/dns.js`：DNS 防泄露脚本变体，偏向脚本式注入场景。
- `mihomo/config.yaml`：完整 YAML 配置，适合直接作为 Mihomo 配置源使用。
- `loon/loon.conf`：Loon 自用配置。

## 旧路径到新路径

- `config.js` -> `configs/network/clash-verge/config.js`
- `DNS.js` -> `configs/network/clash-verge/dns.js`
- `config.yaml` -> `configs/network/mihomo/config.yaml`
- `loon.conf` -> `configs/network/loon/loon.conf`

## 维护约定

- 以后同类配置继续放在 `configs/network/<tool>/` 下，不再回退到仓库根目录。
- 如果某个工具同时维护多个版本，优先在对应子目录下继续细分，例如 `stable/`、`experimental/`、`archive/`。
- 任何依赖运行时生成的缓存或规则集文件都不应入库，只提交手工维护的源配置。
