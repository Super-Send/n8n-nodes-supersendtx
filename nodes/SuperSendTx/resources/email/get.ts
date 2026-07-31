import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGet = {
	operation: ['get'],
	resource: ['email'],
};

export const emailGetDescription: INodeProperties[] = [
	{
		displayName: 'Email ID',
		name: 'emailId',
		type: 'string',
		default: '',
		required: true,
		description: 'The SuperSend TX email ID returned from Send',
		displayOptions: { show: showOnlyForGet },
	},
];
