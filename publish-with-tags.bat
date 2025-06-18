@echo off
echo Publishing n8n-nodes-azuresql with dist-tags...

REM Get the version from package.json
for /f "tokens=2 delims=:," %%a in ('findstr /C:"\"version\"" package.json') do (
    set VERSION=%%a
    set VERSION=!VERSION:"=!
    set VERSION=!VERSION: =!
)

REM Extract major, minor, patch versions
for /f "tokens=1,2,3 delims=." %%a in ("%VERSION%") do (
    set MAJOR=%%a
    set MINOR=%%b
    set PATCH=%%c
)

echo Current version: %VERSION% (Major: %MAJOR%, Minor: %MINOR%, Patch: %PATCH%)

REM Build the package
echo Building package...
call npm run build

REM Publish with dist-tags
echo Publishing package...
call npm publish

REM Add dist-tags
echo Adding dist-tags...
call npm dist-tag add n8n-nodes-azuresql@%VERSION% latest
call npm dist-tag add n8n-nodes-azuresql@%VERSION% v%MAJOR%
call npm dist-tag add n8n-nodes-azuresql@%VERSION% v%MAJOR%.%MINOR%

echo Package published successfully with the following tags:
echo - latest
echo - v%MAJOR%
echo - v%MAJOR%.%MINOR%
