import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { emailDescription } from './resources/email';

export class SuperSendTx implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SuperSend TX',
		name: 'superSendTx',
		icon: { light: 'file:../../icons/supersendtx.light.svg', dark: 'file:../../icons/supersendtx.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send transactional email with SuperSend TX (not SuperSend cold email)',
		defaults: {
			name: 'SuperSend TX',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'superSendTxApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Email',
						value: 'email',
					},
				],
				default: 'email',
			},
			...emailDescription,
		],
	};
}
