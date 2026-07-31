import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSend = {
	operation: ['send'],
	resource: ['email'],
};

export const emailSendDescription: INodeProperties[] = [
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'noreply@yourdomain.com',
		description: 'Verified sender address (plain email or display name with email)',
		displayOptions: { show: showOnlyForSend },
		routing: {
			send: {
				type: 'body',
				property: 'from',
			},
		},
	},
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'user@example.com',
		description: 'Recipient email. Comma-separate for multiple recipients.',
		displayOptions: { show: showOnlyForSend },
		routing: {
			send: {
				type: 'body',
				property: 'to',
				value:
					'={{ (() => { const v = $value; if (!v) return v; const parts = String(v).split(",").map(s => s.trim()).filter(Boolean); return parts.length <= 1 ? parts[0] : parts; })() }}',
			},
		},
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		default: '',
		description: 'Email subject. Required unless Template ID is set under Additional Fields.',
		displayOptions: { show: showOnlyForSend },
		routing: {
			send: {
				type: 'body',
				property: 'subject',
			},
		},
	},
	{
		displayName: 'HTML',
		name: 'html',
		type: 'string',
		typeOptions: { rows: 5 },
		default: '',
		description: 'HTML body',
		displayOptions: { show: showOnlyForSend },
		routing: {
			send: {
				type: 'body',
				property: 'html',
			},
		},
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: { rows: 4 },
		default: '',
		description: 'Plain-text body',
		displayOptions: { show: showOnlyForSend },
		routing: {
			send: {
				type: 'body',
				property: 'text',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForSend },
		options: [
			{
				displayName: 'BCC',
				name: 'bcc',
				type: 'string',
				default: '',
				description: 'BCC recipients. Comma-separate for multiple.',
				routing: {
					send: {
						type: 'body',
						property: 'bcc',
						value:
							'={{ (() => { const v = $value; if (!v) return undefined; const parts = String(v).split(",").map(s => s.trim()).filter(Boolean); return parts.length <= 1 ? parts[0] : parts; })() }}',
					},
				},
			},
			{
				displayName: 'CC',
				name: 'cc',
				type: 'string',
				default: '',
				description: 'CC recipients. Comma-separate for multiple.',
				routing: {
					send: {
						type: 'body',
						property: 'cc',
						value:
							'={{ (() => { const v = $value; if (!v) return undefined; const parts = String(v).split(",").map(s => s.trim()).filter(Boolean); return parts.length <= 1 ? parts[0] : parts; })() }}',
					},
				},
			},
			{
				displayName: 'Idempotency Key',
				name: 'idempotencyKey',
				type: 'string',
				default: '',
				description: 'Optional key for safe retries (max 256 chars). Sent as Idempotency-Key header.',
			},
			{
				displayName: 'Reply To',
				name: 'replyTo',
				type: 'string',
				default: '',
				description: 'Reply-To address. Comma-separate for multiple.',
				routing: {
					send: {
						type: 'body',
						property: 'reply_to',
						value:
							'={{ (() => { const v = $value; if (!v) return undefined; const parts = String(v).split(",").map(s => s.trim()).filter(Boolean); return parts.length <= 1 ? parts[0] : parts; })() }}',
					},
				},
			},
			{
				displayName: 'Scheduled At',
				name: 'scheduledAt',
				type: 'dateTime',
				default: '',
				description: 'Schedule delivery for a future time (ISO 8601)',
				routing: {
					send: {
						type: 'body',
						property: 'scheduled_at',
					},
				},
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'Optional delivery tag override',
				routing: {
					send: {
						type: 'body',
						property: 'tag',
					},
				},
			},
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				default: '',
				description:
					'Published template UUID or alias. When set, omit HTML/text (subject may still override).',
				routing: {
					send: {
						type: 'body',
						property: 'template',
						value: '={{ $value ? { id: $value } : undefined }}',
					},
				},
			},
			{
				displayName: 'Unsubscribe',
				name: 'unsubscribe',
				type: 'boolean',
				default: false,
				description: 'Whether to opt in to managed List-Unsubscribe for this send',
				routing: {
					send: {
						type: 'body',
						property: 'unsubscribe',
					},
				},
			},
		],
	},
];
