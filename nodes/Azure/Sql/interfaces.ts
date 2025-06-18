import type { IDataObject } from 'n8n-workflow';

export interface IQueryWithValues {
	query: string;
	values: IDataObject;
}

export interface IRequestOptions {
	includeNativeTables?: boolean;
}
