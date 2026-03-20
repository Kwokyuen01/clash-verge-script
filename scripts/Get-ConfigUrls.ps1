[CmdletBinding()]
param(
    [string]$Remote = "origin",
    [string]$Branch = "main"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-GitHubRepoInfo {
    param(
        [Parameter(Mandatory)]
        [string]$RemoteUrl
    )

    # Support both SSH and HTTPS GitHub remotes so the script survives future transport changes.
    if ($RemoteUrl -match '^git@github\.com:(?<owner>[^/]+)/(?<repo>[^/]+?)(?:\.git)?$') {
        return @{
            Owner = $Matches.owner
            Repo  = $Matches.repo
        }
    }

    if ($RemoteUrl -match '^https://github\.com/(?<owner>[^/]+)/(?<repo>[^/]+?)(?:\.git)?/?$') {
        return @{
            Owner = $Matches.owner
            Repo  = $Matches.repo
        }
    }

    throw "Only GitHub SSH/HTTPS remotes are supported. Current remote: $RemoteUrl"
}

$remoteUrl = git remote get-url $Remote 2>$null
if (-not $remoteUrl) {
    throw "Remote '$Remote' was not found."
}

$repoInfo = Get-GitHubRepoInfo -RemoteUrl $remoteUrl.Trim()
$rawBase = "https://raw.githubusercontent.com/$($repoInfo.Owner)/$($repoInfo.Repo)/$Branch"

$items = @(
    [pscustomobject]@{ Name = "Clash Verge 主脚本"; Path = "configs/network/clash-verge/config.js" }
    [pscustomobject]@{ Name = "Clash Verge DNS 脚本"; Path = "configs/network/clash-verge/dns.js" }
    [pscustomobject]@{ Name = "Mihomo YAML"; Path = "configs/network/mihomo/config.yaml" }
    [pscustomobject]@{ Name = "Loon 配置"; Path = "configs/network/loon/loon.conf" }
)

Write-Output "Repository: https://github.com/$($repoInfo.Owner)/$($repoInfo.Repo)"
Write-Output "Branch: $Branch"
Write-Output ""

foreach ($item in $items) {
    Write-Output "$($item.Name):"
    Write-Output "$rawBase/$($item.Path)"
    Write-Output ""
}
