import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SuperSendTxApi implements ICredentialType {
	name = 'superSendTxApi';

	displayName = 'SuperSend TX API';

	icon: Icon = { light: 'file:../icons/supersendtx.light.svg', dark: 'file:../icons/supersendtx.dark.svg' };

	documentationUrl = 'https://docs.supersendtx.com/authentication';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'SuperSend TX API key (starts with stx_)',
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.supersendtx.com',
			description: 'Override only for custom deployments. Default is the production API.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/emails',
			method: 'GET',
			qs: {
				limit: 1,
			},
		},
	};
}