#!/bin/bash

set -e

echo "=== Building Heroic with GTK 4 Window Decorations ==="
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "pnpm not found. Installing via npm..."
    sudo npm install -g pnpm
fi

echo "Installing dependencies..."
pnpm install

echo ""
echo "Downloading helper binaries..."
pnpm download-helper-binaries

echo ""
echo "Building Heroic for Linux..."
pnpm dist:linux pacman

echo ""
echo "=== Build Complete ==="
echo ""
echo "Package created in: dist/"
ls -lh dist/*.pkg.tar.zst 2>/dev/null || ls -lh dist/

echo ""
echo "To install, run:"
echo "  sudo pacman -U dist/heroic-*.pkg.tar.zst"
echo ""
echo "Or to install directly:"
echo "  sudo pacman -U --noconfirm dist/heroic-*.pkg.tar.zst"
