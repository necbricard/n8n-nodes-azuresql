import type { IResult } from 'mssql';
import * as mssql from 'mssql';
import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

// Simple utility functions that don't depend on external modules
export function chunk<T>(arr: T[], size: number): T[][] {
	return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
		arr.slice(i * size, i * size + size),
	);
}

export function flatten<T>(arr: T[][]): T[] {
	return ([] as T[]).concat(...arr);
}

export async function executeSqlQuery(
	this: IExecuteFunctions,
	pool: mssql.ConnectionPool,
	query: string,
	itemIndex: number,
): Promise<IResult<any>> {
	return await pool.request().query(query);
}

export async function executeSqlQueryAndPrepareResults(
	this: IExecuteFunctions,
	pool: mssql.ConnectionPool,
	query: string,
	itemIndex: number,
): Promise<INodeExecutionData[]> {
	const result = await executeSqlQuery.call(this, pool, query, itemIndex);

	if (result.recordset) {
		return this.helpers.returnJsonArray(result.recordset);
	}

	if (result.rowsAffected) {
		return this.helpers.returnJsonArray([{ rowsAffected: result.rowsAffected[0] }]);
	}

	return this.helpers.returnJsonArray([{ message: 'Query executed successfully' }]);
}
