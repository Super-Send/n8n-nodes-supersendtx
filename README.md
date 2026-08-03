# n8n-nodes-supersendtx

Community node for [n8n](https://n8n.io) that sends **transactional** email through [SuperSend TX](https://supersendtx.com).

This is **SuperSend TX** (product mail / API keys `stx_…` / `api.supersendtx.com`). It is **not** the SuperSend cold-email / outbound product.

**No runtime npm dependencies** — calls the SuperSend TX HTTP API directly (ready for [verified community node](https://docs.n8n.io/integrations/community-nodes/installation/) submission).

## Install in n8n

1. Settings → Community Nodes → Install
2. Enter `n8n-nodes-supersendtx`
3. Add credentials: SuperSend TX API key (`stx_…`)

Or from npm on self-hosted n8n:

```bash
npm install n8n-nodes-supersendtx
```

## Operations

| Resource | Operation | API |
|----------|-----------|-----|
| Email | Send | `POST /emails` |
| Email | Get | `GET /emails/{id}` |
| Email | Get Many | `GET /emails` |

## Example: Send a welcome email

This walkthrough sends a welcome email when a new user signs up (e.g. after a Webhook or form trigger).

### 1. Credentials

Create **SuperSend TX API** credentials in n8n:

| Field | Value |
|-------|--------|
| API Key | `stx_live_abc123…` (from the SuperSend TX dashboard) |
| API Base URL | `https://api.supersendtx.com` |

### 2. Workflow

1. Add a trigger (e.g. **Webhook** or **Form Trigger**).
2. Add a **SuperSend TX** node and connect it to the trigger.
3. Select your credentials.
4. Configure the node:

| Field | Value |
|-------|--------|
| Resource | Email |
| Operation | Send |
| From | `welcome@yourdomain.com` |
| To | `={{ $json.email }}` |
| Subject | `Welcome to our app, {{ $json.name }}!` |
| HTML | `<h1>Welcome, {{ $json.name }}!</h1><p>Thanks for signing up. We're glad you're here.</p>` |
| Text | `Welcome, {{ $json.name }}! Thanks for signing up.` |

Optional under **Additional Fields**:

| Field | Value |
|-------|--------|
| Reply To | `support@yourdomain.com` |
| Tag | `welcome` |

`From` must use a domain you have verified in SuperSend TX.

### 3. Example input (from trigger)

```json
{
  "email": "jane@example.com",
  "name": "Jane"
}
```

### 4. Example output (from SuperSend TX node)

On success, the node returns the API response:

```json
{
  "id": "msg_01h2x3y4z5a6b7c8d9e0f1g2h3",
  "status": "sent"
}
```

Use **Email → Get** with that `id` to check delivery status later, or **Email → Get Many** to list recent sends.

## Credentials

| Field | Notes |
|-------|--------|
| API Key | From the SuperSend TX dashboard |
| API Base URL | Default `https://api.supersendtx.com` |

## Docs

https://docs.supersendtx.com/guides/n8n

## Development

Developed in the SuperSend TX monorepo (`packages/n8n-nodes-supersendtx`) and mirrored to this public repo for npm / Creator Portal.

```bash
cd packages/n8n-nodes-supersendtx
npm install
npm run build
npm run lint
npm run dev   # loads the node in a local n8n
```

## Publish / verification

Publish via GitHub Actions with npm provenance (see `.github/workflows/publish.yml`). Then submit at the [n8n Creator Portal](https://creators.n8n.io/nodes).

## License

MIT
