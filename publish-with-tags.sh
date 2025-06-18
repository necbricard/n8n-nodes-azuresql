#!/bin/bash
echo "Publishing n8n-nodes-azuresql with dist-tags..."

# Get the version from package.json
VERSION=$(grep -m1 '"version"' package.json | cut -d '"' -f 4)

# Extract major, minor, patch versions
MAJOR=$(echo $VERSION | cut -d. -f1)
MINOR=$(echo $VERSION | cut -d. -f2)
PATCH=$(echo $VERSION | cut -d. -f3)

echo "Current version: $VERSION (Major: $MAJOR, Minor: $MINOR, Patch: $PATCH)"

# Build the package
echo "Building package..."
npm run build

# Publish with dist-tags
echo "Publishing package..."
npm publish

# Add dist-tags
echo "Adding dist-tags..."
npm dist-tag add n8n-nodes-azuresql@$VERSION latest
npm dist-tag add n8n-nodes-azuresql@$VERSION v$MAJOR
npm dist-tag add n8n-nodes-azuresql@$VERSION v$MAJOR.$MINOR

echo "Package published successfully with the following tags:"
echo "- latest"
echo "- v$MAJOR"
echo "- v$MAJOR.$MINOR"
