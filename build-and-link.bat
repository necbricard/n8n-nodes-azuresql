@echo off
echo Building Azure SQL node...
cd /d %~dp0
npx rimraf dist
cd nodes/Azure/Sql
npx tsc -p tsconfig.json
cd ../../..
gulp build:icons

echo Building complete!
echo.
echo To link this package to your local n8n installation:
echo 1. Run: npm link
echo 2. Navigate to your n8n installation directory
echo 3. Run: npm link n8n-nodes-azuresql
echo.
echo To test the node, start n8n with: n8n start
