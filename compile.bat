@echo off
echo Compiling TypeScript files to JavaScript...

cd /d %~dp0

echo Compiling AzureSql.credentials.ts...
npx tsc credentials/AzureSqlAPI.credentials.ts --outDir dist/credentials --esModuleInterop --skipLibCheck --target es2019 --module commonjs

echo Compiling AzureSql.node.ts...
npx tsc nodes/Azure/Sql/AzureSql.node.ts --outDir dist/nodes/Azure/Sql --esModuleInterop --skipLibCheck --target es2019 --module commonjs

echo Compiling GenericFunctions.ts...
npx tsc nodes/Azure/Sql/GenericFunctions.ts --outDir dist/nodes/Azure/Sql --esModuleInterop --skipLibCheck --target es2019 --module commonjs

echo Compiling interfaces.ts...
npx tsc nodes/Azure/Sql/interfaces.ts --outDir dist/nodes/Azure/Sql --esModuleInterop --skipLibCheck --target es2019 --module commonjs

echo Copying JSON and SVG files...
copy nodes\Azure\Sql\AzureSql.node.json dist\nodes\Azure\Sql\
copy nodes\Azure\Sql\azuresql.svg dist\nodes\Azure\Sql\

echo Compilation complete!
