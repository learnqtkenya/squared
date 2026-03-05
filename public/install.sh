#!/bin/sh
# Squared CLI installer — https://squared.co.ke
# Usage: curl -fsSL https://squared.co.ke/install.sh | sh
set -e

REPO="learnqtkenya/SquaredApp"
BINARY="squared"
INSTALL_DIR="${SQUARED_INSTALL_DIR:-$HOME/.local/bin}"

# Detect OS
case "$(uname -s)" in
    Linux*)  OS="linux" ;;
    Darwin*) OS="darwin" ;;
    *)       echo "Error: unsupported OS $(uname -s)"; exit 1 ;;
esac

# Detect arch
case "$(uname -m)" in
    x86_64|amd64)  ARCH="amd64" ;;
    aarch64|arm64)  ARCH="arm64" ;;
    *)              echo "Error: unsupported architecture $(uname -m)"; exit 1 ;;
esac

# Get latest release tag (v*)
LATEST=$(curl -fsSL "https://api.github.com/repos/${REPO}/releases" \
    | grep -o '"tag_name": *"v[^"]*"' \
    | head -1 \
    | grep -o 'v[^"]*')

if [ -z "$LATEST" ]; then
    echo "Error: could not find a release"
    exit 1
fi

VERSION="${LATEST}"

ARCHIVE="squared_${VERSION#v}_${OS}_${ARCH}.tar.gz"
URL="https://github.com/${REPO}/releases/download/${LATEST}/${ARCHIVE}"

echo "Installing ${BINARY} ${VERSION} (${OS}/${ARCH})..."

TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

curl -fsSL "$URL" -o "${TMPDIR}/${ARCHIVE}"
tar -xzf "${TMPDIR}/${ARCHIVE}" -C "$TMPDIR"

mkdir -p "$INSTALL_DIR"
mv "${TMPDIR}/${BINARY}" "${INSTALL_DIR}/${BINARY}"
chmod +x "${INSTALL_DIR}/${BINARY}"

echo "Installed ${BINARY} to ${INSTALL_DIR}/${BINARY}"

# Check if install dir is in PATH
case ":$PATH:" in
    *":${INSTALL_DIR}:"*) ;;
    *)
        echo ""
        echo "Add this to your shell profile to use '${BINARY}' from anywhere:"
        echo "  export PATH=\"${INSTALL_DIR}:\$PATH\""
        ;;
esac
