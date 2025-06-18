@echo off
echo Setting up n8n custom directory...

REM Check if n8n is installed
where n8n >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo n8n is not installed. Please install it with: npm install n8n -g
    exit /b 1
)

REM Create custom directory in ~/.n8n if it doesn't exist
set N8N_HOME=%USERPROFILE%\.n8n
if not exist "%N8N_HOME%" (
    echo Creating %N8N_HOME% directory...
    mkdir "%N8N_HOME%"
)

if not exist "%N8N_HOME%\custom" (
    echo Creating %N8N_HOME%\custom directory...
    mkdir "%N8N_HOME%\custom"
)

REM Initialize npm in the custom directory if package.json doesn't exist
if not exist "%N8N_HOME%\custom\package.json" (
    echo Initializing npm in %N8N_HOME%\custom...
    cd /d "%N8N_HOME%\custom"
    npm init -y
)

echo.
echo n8n custom directory setup complete!
echo.
echo To install your node:
echo 1. Run: npm run build
echo 2. Run: npm link
echo 3. Run: cd %N8N_HOME%\custom
echo 4. Run: npm link n8n-nodes-azuresql
echo.
echo Then start n8n with: n8n start
