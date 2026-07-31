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
