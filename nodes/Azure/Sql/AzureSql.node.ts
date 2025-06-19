import type { IExecuteFunctions, INodeType, INodeTypeDescription } from 'n8n-workflow';
import * as mssql from 'mssql';

export class AzureSql implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Azure SQL',
		name: 'azureSql',
		icon: 'file:azuresql.svg',
		group: ['input'],
		version: 1,
		description: 'Get, add and update data in Azure SQL',
		defaults: {
			name: 'Azure SQL',
		},
		// @ts-ignore
		inputs: ['main'],
		// @ts-ignore
		outputs: ['main'],
		credentials: [
			{
				name: 'azureSqlApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Execute Query',
						value: 'executeQuery',
						description: 'Execute an SQL query',
						action: 'Execute a SQL query',
					},
					{
						name: 'Insert',
						value: 'insert',
						description: 'Insert rows in database',
						action: 'Insert rows in database',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update rows in database',
						action: 'Update rows in database',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete rows in database',
						action: 'Delete rows in database',
					},
				],
				default: 'executeQuery',
			},
			{
				displayName: 'Database Name',
				name: 'database',
				type: 'string',
				default: '',
				description: 'Name of the database to use. If not specified, the default database from credentials will be used.',
				placeholder: 'Leave blank to use default from credentials',
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['executeQuery'],
					},
				},
				default: '',
				placeholder: 'SELECT id, name FROM product WHERE id < 40',
				required: true,
				description: 'The SQL query to execute',
			},
		],
	};

	async execute(this: IExecuteFunctions) {
		const credentials = await this.getCredentials('azureSql');
		// Get input data (not used in this simplified version)
		this.getInputData();
		const operation = this.getNodeParameter('operation', 0) as string;
		const databaseOverride = this.getNodeParameter('database', 0, '') as string;

		// Configure connection with optional database override
		const config = {
			server: credentials.server as string,
			port: credentials.port as number,
			database: databaseOverride || (credentials.database as string),
			user: credentials.user as string,
			password: credentials.password as string,
			domain: credentials.domain ? (credentials.domain as string) : undefined,
			connectionTimeout: credentials.connectTimeout as number,
			requestTimeout: credentials.requestTimeout as number,
			options: {
				encrypt: credentials.tls as boolean,
				enableArithAbort: false,
				tdsVersion: credentials.tdsVersion as string,
				trustServerCertificate: credentials.allowUnauthorizedCerts as boolean,
			},
		};

		const pool = new mssql.ConnectionPool(config);
		let returnItems = [];

		try {
			await pool.connect();

			if (operation === 'executeQuery') {
				const query = this.getNodeParameter('query', 0) as string;
				const result = await pool.request().query(query);
				
				if (result.recordset) {
					returnItems = this.helpers.returnJsonArray(result.recordset);
				} else {
					returnItems = this.helpers.returnJsonArray([{ message: 'Query executed successfully' }]);
				}
			} else {
				// For other operations, we'll just return a success message for now
				// In a real implementation, you would handle insert, update, delete operations
				returnItems = this.helpers.returnJsonArray([
					{ message: `${operation} operation would be executed here with database: ${config.database}` },
				]);
			}
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnItems = this.helpers.returnJsonArray({ error: error.message });
			} else {
				throw error;
			}
		} finally {
			await pool.close();
		}

		return [returnItems];
	}
}
