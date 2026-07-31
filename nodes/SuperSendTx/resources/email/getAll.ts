import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGetAll = {
	operation: ['getAll'],
	resource: ['email'],
};

export const emailGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
		displayOptions: { show: showOnlyForGetAll },
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
	},
	{
		displayName: 'Cursor',
		name: 'cursor',
		type: 'string',
		default: '',
		description: 'Opaque cursor for the next page',
		displayOptions: { show: showOnlyForGetAll },
		routing: {
			send: {
				type: 'query',
				property: 'cursor',
			},
		},
	},
];
