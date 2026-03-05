# Squared CLI installer for Windows — https://squared.co.ke
# Usage: irm https://squared.co.ke/install.ps1 | iex
$ErrorActionPreference = "Stop"

$Repo = "learnqtkenya/SquaredApp"
$Binary = "squared.exe"
$InstallDir = if ($env:SQUARED_INSTALL_DIR) { $env:SQUARED_INSTALL_DIR } else { "$env:LOCALAPPDATA\Squared\bin" }

# Detect arch
$Arch = switch ([System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture) {
    "X64"   { "amd64" }
    "Arm64" { "arm64" }
    default { Write-Error "Unsupported architecture: $_"; exit 1 }
}

# Get latest CLI release tag
$Releases = Invoke-RestMethod "https://api.github.com/repos/$Repo/releases"
$Latest = ($Releases | Where-Object { $_.tag_name -like "cli-v*" } | Select-Object -First 1).tag_name

if (-not $Latest) {
    Write-Error "Could not find a CLI release"
    exit 1
}

$Version = $Latest -replace "^cli-", ""
$Archive = "squared_${Version}_windows_${Arch}.zip"
$Url = "https://github.com/$Repo/releases/download/$Latest/$Archive"

Write-Host "Installing squared $Version (windows/$Arch)..."

$TmpDir = New-Item -ItemType Directory -Path ([System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), [System.IO.Path]::GetRandomFileName()))
$ZipPath = Join-Path $TmpDir $Archive

try {
    Invoke-WebRequest -Uri $Url -OutFile $ZipPath
    Expand-Archive -Path $ZipPath -DestinationPath $TmpDir -Force

    New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
    Copy-Item (Join-Path $TmpDir $Binary) (Join-Path $InstallDir $Binary) -Force

    Write-Host "Installed squared to $InstallDir\$Binary"

    # Check if install dir is in PATH
    $UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($UserPath -notlike "*$InstallDir*") {
        [Environment]::SetEnvironmentVariable("Path", "$UserPath;$InstallDir", "User")
        Write-Host "Added $InstallDir to your PATH. Restart your terminal to use 'squared'."
    }
} finally {
    Remove-Item -Recurse -Force $TmpDir
}
