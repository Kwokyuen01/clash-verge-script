[CmdletBinding()]
param(
    [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$expectedDirectories = @(
    "configs",
    "configs/network",
    "configs/network/clash-verge",
    "configs/network/loon",
    "configs/network/mihomo",
    "configs/shell",
    "configs/editor",
    "configs/terminal",
    "configs/system",
    "docs",
    "scripts"
)

$expectedFiles = @(
    "README.md",
    ".gitignore",
    "configs/network/README.md",
    "configs/network/clash-verge/config.js",
    "configs/network/clash-verge/dns.js",
    "configs/network/mihomo/config.yaml",
    "configs/network/loon/loon.conf",
    "docs/research-notes.md",
    "docs/migration-backup.md",
    "scripts/Get-ConfigUrls.ps1",
    "scripts/Test-RepoLayout.ps1"
)

$missing = New-Object System.Collections.Generic.List[string]

foreach ($path in $expectedDirectories) {
    $fullPath = Join-Path $RepoRoot $path
    if (-not (Test-Path -Path $fullPath -PathType Container)) {
        $missing.Add("Missing directory: $path")
    }
}

foreach ($path in $expectedFiles) {
    $fullPath = Join-Path $RepoRoot $path
    if (-not (Test-Path -Path $fullPath -PathType Leaf)) {
        $missing.Add("Missing file: $path")
    }
}

if ($missing.Count -gt 0) {
    $missing | ForEach-Object { Write-Error $_ }
    throw "Repository layout validation failed."
}

Write-Output "Repository layout validation passed."
Write-Output "Checked root: $RepoRoot"
