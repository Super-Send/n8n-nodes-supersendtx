import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';
import { emailGetDescription } from './get';
import { emailGetAllDescription } from './getAll';
import { emailSendDescription } from './send';

async function setIdempotencyKey(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const additionalFields = this.getNodeParameter('additionalFields', {}) as IDataObject;
	const key = additionalFields.idempotencyKey;
	if (typeof key === 'string' && key.trim() !== '') {
		requestOptions.headers = {
			...(requestOptions.headers ?? {}),
			'Idempotency-Key': key.trim(),
		};
	}
	return requestOptions;
}

const showOnlyForEmail = {
	resource: ['email'],
};

export const emailDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForEmail,
		},
		options: [
			{
				name: 'Send',
				value: 'send',
				action: 'Send an email',
				description: 'Send a transactional email',
				routing: {
					request: {
						method: 'POST',
						url: '/emails',
					},
					send: {
						preSend: [setIdempotencyKey],
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an email',
				description: 'Get a sent email by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/emails/{{$parameter.emailId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many emails',
				description: 'List recent sent emails',
				routing: {
					request: {
						method: 'GET',
						url: '/emails',
					},
				},
			},
		],
		default: 'send',
	},
	...emailSendDescription,
	...emailGetDescription,
	...emailGetAllDescription,
];
