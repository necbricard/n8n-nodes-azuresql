![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-azuresql

This package contains nodes to integrate with Azure SQL databases in [n8n](https://n8n.io).

## Included Nodes

### Azure SQL

This node allows you to interact with Azure SQL databases. It is based on the Microsoft SQL node but adds the ability to dynamically change the database name within the node itself, allowing you to switch databases based on workflow data instead of having the database hardcoded in the credentials.

#### Key Features

- **Dynamic Database Selection**: Change the database within the node based on workflow data
- **Execute SQL Queries**: Run custom SQL queries against your Azure SQL database
- **CRUD Operations**: Insert, update, and delete data with ease
- **Flexible Connection Options**: Configure connection settings including TLS, timeouts, and more

#### Operations

- **Execute Query**: Run custom SQL queries
- **Insert**: Add new rows to a table
- **Update**: Modify existing rows in a table
- **Delete**: Remove rows from a table

## Prerequisites

You need the following installed on your development machine:

* [git](https://git-scm.com/downloads)
* Node.js and npm. Minimum version Node 20. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
* Install n8n with:
  ```
  npm install n8n -g
  ```

## Installation

### For Production Use

Follow these steps to install this node package in your n8n instance:

```
npm install n8n-nodes-azuresql
```

For more information on installing community nodes, see the [n8n documentation](https://docs.n8n.io/integrations/community-nodes/installation/).

### For Development

To test this node during development:

#### Setup n8n Custom Directory

First, make sure you have the n8n custom directory set up:

**Windows:**
```
.\setup-n8n-custom.bat
```

**Linux/Mac:**
```
chmod +x setup-n8n-custom.sh
./setup-n8n-custom.sh
```

#### Build and Link

Then build and link the node:

```
npm run build
npm link
cd ~/.n8n/custom
npm link n8n-nodes-azuresql
```

Start n8n:

```
n8n start
```

You should now see the Azure SQL node when you search for it in the nodes panel.

## Usage

1. Create an Azure SQL credential in n8n
2. Add the Azure SQL node to your workflow
3. Configure the node with your desired operation
4. Optionally specify a database name to override the one in the credentials

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Azure SQL Database documentation](https://docs.microsoft.com/en-us/azure/azure-sql/database/)

## License

[MIT](LICENSE.md)

## Publishing to npm

This package is ready to be published to the npm registry. Follow these steps to publish:

### Prerequisites

1. Create an npm account if you don't have one: [npm signup](https://www.npmjs.com/signup)
2. Login to npm from your terminal: `npm login`

### Publishing

#### Using the provided scripts (recommended)

These scripts will build the package, publish it, and add appropriate dist-tags:

**Windows:**
```
.\publish-with-tags.bat
```

**Linux/Mac:**
```
chmod +x publish-with-tags.sh
./publish-with-tags.sh
```

#### Manual publishing

1. Build the package: `npm run build`
2. Publish the package: `npm publish`
3. Add dist-tags (optional):
   ```
   npm dist-tag add n8n-nodes-azuresql@0.1.0 latest
   npm dist-tag add n8n-nodes-azuresql@0.1.0 v0
   npm dist-tag add n8n-nodes-azuresql@0.1.0 v0.1
   ```

### Versioning

This package follows [Semantic Versioning](https://semver.org/):

- **Major version (x.0.0)**: Incompatible API changes
- **Minor version (0.x.0)**: Add functionality in a backward-compatible manner
- **Patch version (0.0.x)**: Backward-compatible bug fixes

To update the version before publishing:
1. Edit the version in package.json
2. Run `npm version [major|minor|patch]` to update the version
