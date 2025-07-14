#!/usr/bin/env bash

# git clone https://github.com/Raruto/leaflet-elevation

set -e

# === CONFIG ===
REPO_URL="https://github.com/Raruto/leaflet-elevation.git"
CLONE_DIR="leaflet-elevation"
TARGET_DIR="src/plugins/leaflet-elevation"

echo "📂  Preparing target directory: $TARGET_DIR"
mkdir -p "$TARGET_DIR"
rm -rf "$TARGET_DIR"/*

echo "[*] Cloning Raruto/leaflet-elevation..."
rm -rf "$CLONE_DIR"
git clone "$REPO_URL" "$CLONE_DIR"

echo "[*] Installing dependencies..."
cd "$CLONE_DIR"
npm install
echo "[*] Building project..."
npm run build

echo "[*] Creating target directory..."
mkdir -p "../$TARGET_DIR"
mkdir -p "../$TARGET_DIR/src"
mkdir -p "../$TARGET_DIR/src/handlers"

echo "[*] Copying dist output..."
cp -r dist/* "../$TARGET_DIR/src"

cd ..

echo "📦  Copying plugin files..."
cp -r "$CLONE_DIR/src/handlers" "$TARGET_DIR/src"
cp -r "$CLONE_DIR/src/components" "$TARGET_DIR/src/components"
cp -r "$CLONE_DIR/libs" "$TARGET_DIR/libs"
cp -r "$CLONE_DIR/images" "$TARGET_DIR/images"

cp "$CLONE_DIR/dist/leaflet-elevation.min.js" "$TARGET_DIR/src/"
cp "$CLONE_DIR/dist/leaflet-elevation.min.js.map" "$TARGET_DIR/src/"
cp "$CLONE_DIR/dist/leaflet-elevation.min.css" "$TARGET_DIR/src/"

mkdir -p ./src/handlers
mkdir -p ./src/components
cp ./src/plugins/leaflet-elevation/src/handlers/*.js ./src/handlers/
cp ./src/plugins/leaflet-elevation/src/components/*.js ./src/components/

echo "🧹  Cleaning up temp files..."
rm -rf "$CLONE_DIR"

echo "✅  Leaflet.Elevation installed to $TARGET_DIR"

echo -e "\n🧠  REMINDER:"
echo "Import with:"
echo "  import './plugins/leaflet-elevation/src/index.js';"
echo "  import './plugins/leaflet-elevation/src/index.css';"
echo -e "\nSet srcFolder when initializing control:"
echo "  srcFolder: new URL('./plugins/leaflet-elevation/src/handlers', import.meta.url).href,"