---
id: intro
title: Introduction
sidebar_label: Introduction
description: Overview, quick start, and core endpoints for the Nominis wallet & transaction screening APIs.
---

Nominis provides compliance-first crypto APIs to screen wallets and transactions for sanctions, risky exposure, and behavioral signals across 70+ blockchains. This documentation covers a fast **Quick Address Check**, a deep **Wallet Screening**, and **KYT** (Know Your Transaction) screening.

## Base URL

```
https://authapi0.xplorisk.com:8443/v2
```

- Examples:
  - `GET /address/quick_check` — Quick Address Check
  - `POST /address/check` and `GET /address/check/{request_id}` — Wallet Screening (start + poll)
  - `POST /transaction/check` and `GET /transaction/check/{request_id}` — KYT (start + poll)

## Authentication

Include your API key as `api_key` with each request:
- **GET** endpoints: as a **query** parameter, e.g. `?api_key=YOUR_API_KEY`
- **POST** endpoints: in the **JSON body**, e.g. `"api_key": "YOUR_API_KEY"`

> All endpoints require a valid API key.

## Products at a glance

- **Quick Address Check**  
  Lightweight attribution and a risk score for one or many addresses (up to **50**, comma-separated).  
  **Endpoint:** `GET /address/quick_check`

- **Wallet Screening (Deep)**  
  Full wallet assessment: balances, direct/indirect exposures, asset distribution, off-chain intel, activity patterns, GeoInt, and risk categories.  
  **Endpoints:** `POST /address/check` → returns a request ID; then **poll** `GET /address/check/{request_id}` until results are ready.  
  **Parameters:** `chain`, `address`, optional `depth` (default 3), optional `mode` (`quick` | `lite` | `full`, default `full`)

- **KYT (Know Your Transaction)**  
  Transaction-level risk analysis for a specific `tx_hash`, with configurable depth; includes exposure details and behavioral indicators.  
  **Endpoints:** `POST /transaction/check` → returns a request ID; then **poll** `GET /transaction/check/{request_id}` until results are ready.  
  **Parameters:** `chain`, `tx_hash`, optional `depth` (default 3)

## Quick start (1-minute test)

Run a fast check on an address:

```bash
curl -X GET "https://authapi0.xplorisk.com:8443/v2/address/quick_check?address=0x332f3d83b771d0611156eb04308e168e50fd9e30&api_key=YOUR_API_KEY"
```

You’ll receive JSON with fields like `status`, `error`, `request_type`, and a `data` array containing attribution, classifications, and a `quick_score` per address.

## Long-running checks (Wallet Screening & KYT)

For **Wallet Screening** and **KYT**, the initial `POST` returns a unique **request ID**. Use it to poll the corresponding `GET .../{request_id}` endpoint **every ~10 seconds** until the job’s status is **`done`**.

**Flow example — Wallet Screening**
1. **Start** — `POST /address/check` with `chain`, `address`, optional `depth`, and `api_key`. The response’s `data` contains the request ID.
2. **Poll** — `GET /address/check/{request_id}` until `status: done`.

**Flow example — KYT**
1. **Start** — `POST /transaction/check` with `chain`, `tx_hash`, optional `depth`, and `api_key`. The response’s `data` contains the request ID.
2. **Poll** — `GET /transaction/check/{request_id}` until `status: done`.

## Responses & common fields

Most responses include:
- `time` (epoch), `status` (e.g., `"ok"`), `error` (string)
- A request type identifier (e.g., `request_type`) and either a **request ID** (`data` or `req_id`) or the **final data** payload when complete

Endpoint-specific structures may include:
- **Wallet Screening:** `address_data`, `balance[]`, `exposure[]`, `asset_distribution_in/out[]`, `source_of_funds[]`, `destination_of_funds[]`, `intel[]`, `activity[]`, `geoint[]`, `risk_categories[]`, `risk_score`
- **KYT:** `exposure[]`, `usd_value`, `risk_categories[]`, `behavioral_indicators[]`, `risk_score`

## Error handling

Always check `status` and `error`:
- Proceed only when `status` indicates success.
- For polling flows, continue until the job returns `status: done`.
- On failure, inspect `error` for details and retry if appropriate.


## Support

If you have any questions, need help integrating the API, or want to report an issue, please reach out to our team:  

📧 **contact@nominis.io**

---

### Next steps

- **Authentication** — how to include `api_key` for GET/POST calls  
- **Quick Address Check** — fast, batchable checks (`GET /address/quick_check`)  
- **Wallet Screening** — deep risk & exposure analysis with polling  
- **KYT** — transaction screening with polling and behavioral insights


