#!/bin/bash
echo "Setting up n8n custom directory..."

# Check if n8n is installed
if ! command -v n8n &> /dev/null; then
    echo "n8n is not installed. Please install it with: npm install n8n -g"
    exit 1
fi

# Create custom directory in ~/.n8n if it doesn't exist
N8N_HOME=~/.n8n
if [ ! -d "$N8N_HOME" ]; then
    echo "Creating $N8N_HOME directory..."
    mkdir -p "$N8N_HOME"
fi

if [ ! -d "$N8N_HOME/custom" ]; then
    echo "Creating $N8N_HOME/custom directory..."
    mkdir -p "$N8N_HOME/custom"
fi

# Initialize npm in the custom directory if package.json doesn't exist
if [ ! -f "$N8N_HOME/custom/package.json" ]; then
    echo "Initializing npm in $N8N_HOME/custom..."
    cd "$N8N_HOME/custom"
    npm init -y
fi

echo ""
echo "n8n custom directory setup complete!"
echo ""
echo "To install your node:"
echo "1. Run: npm run build"
echo "2. Run: npm link"
echo "3. Run: cd $N8N_HOME/custom"
echo "4. Run: npm link n8n-nodes-azuresql"
echo ""
echo "Then start n8n with: n8n start"
