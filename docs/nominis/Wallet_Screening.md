# Wallet Screening API Documentation

## Overview
The Wallet Screening API allows users to get a complete risk assessment for a wallet address.  
Users can assess any wallet address in over 70 different blockchains, with an optional **depth** parameter to adjust the level of depth.

---

## Endpoint
- **URL:** `https://authapi0.xplorisk.com:8443/v2/address/check`  
- **Method:** `POST`  
- **Content-Type:** `application/json`

---

## Request Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `chain`   | string | Yes      | Blockchain network of the address (e.g., `eth`) |
| `address` | string | Yes      | Wallet address to assess |
| `depth`   | int    | No       | Screening depth (default: 3) |
| `mode`    | string | No       | Screening mode: `quick`, `lite`, `full` (default: `full`) |
| `api_key` | string | Yes      | The API key provided to the client |

---

## Example Request

```python
import requests

data = {
    "chain": "eth",
    "address": "0xcf93fc754f874fafb3Fc0992ED92310790B1A4bc",
    "depth": 5,
    "api_key": "x_11111111-1111111-1111-1111"
}

response = requests.post(
    "https://authapi0.xplorisk.com:8443/v2/address/check",
    json=data
)

print(response.json())
```

---

## Response

### Initial Response
The initial response contains a unique request ID that should be used to check the screening status.

```json
{
  "time": 1743667966.522422,
  "status": "ok",
  "error": "",
  "request_type": "check_address",
  "chain": "eth",
  "address": "0xcf93fc754f874fafb3Fc0992ED92310790B1A4bc",
  "data": "59879f81-0926-4ee3-aacb-28c42df30a12"
}
```

---

## Response Fields

| Field          | Type   | Description |
|----------------|--------|-------------|
| `time`         | epoch  | Time of the request |
| `status`       | string | `ok` if successful, `fail` if failed |
| `error`        | string | Error message if failed |
| `request_type` | string | Always `check_address` |
| `chain`        | string | Blockchain network |
| `address`      | string | The wallet address |
| `data`         | uuid   | Unique request ID |

---

## Fetching Screening Results

After receiving the request ID, query the following endpoint every 10 seconds until status is `done`.

- **Endpoint:** `https://authapi0.xplorisk.com:8443/v2/address/check/{request_id}`  
- **Method:** `GET`  
- **Content-Type:** `application/json`

---

## Example Response (Complete Screening)

```json
{
  "time": 1744270838.6367636,
  "status": "ok",
  "error": "",
  "request_type": "check_exposure",
  "req_id": "a56ce472-2252-4764-9004-bfcbcf0865d1",
  "data": {
    "status": "pending",
    "data": {
      "depth": 3,
      "address_data": {},
      "balance": [],
      "exposure": [],
      "asset_distribution_in": [],
      "asset_distribution_out": [],
      "source_of_funds": [],
      "destination_of_funds": [],
      "intel": [],
      "activity": [],
      "geoint": [],
      "risk_categories": [],
      "risk_score": "pending"
    }
  }
}
```

---

## Top-Level Fields

| Field          | Type   | Description |
|----------------|--------|-------------|
| `time`         | epoch  | Unix timestamp |
| `status`       | string | Status of the request (e.g., `ok`) |
| `error`        | string | Error message if applicable |
| `request_type` | string | Type of request (e.g., `check_exposure`) |
| `req_id`       | uuid   | Request ID |

---

## Request-Specific Fields

### `address_data`

| Field            | Type   | Description |
|------------------|--------|-------------|
| `chain`          | string | Blockchain name |
| `address`        | string | Wallet address |
| `name`           | string | Detected name or label (if known) |
| `classification` | list   | Categories (e.g., exchange, scam) |
| `risk_factors`   | list   | Risk indicators |
| `first_funded_by`| dict   | First funding address details |
| `first_tx`       | int    | Timestamp of first transaction |
| `last_tx`        | int    | Timestamp of last transaction |
| `total_in`       | float  | Total assets received |
| `total_out`      | float  | Total assets sent |

---

### `balance`

| Field       | Type   | Description |
|-------------|--------|-------------|
| `coin`      | string | Token symbol |
| `amount`    | float  | Current balance |
| `usd_value` | float  | USD value of the balance |

---

### `exposure`

| Field                   | Type   | Description |
|--------------------------|--------|-------------|
| `proximity`              | int    | Number of hops |
| `sender`                 | string | Originating address |
| `sender_name`            | string | Label of sender |
| `sender_classification`  | list   | Sender tags |
| `sender_risk_factors`    | list   | Sender risk attributes |
| `sender_quick_score`     | string | Sender risk level |
| `receiver`               | string | Target address |
| `receiver_name`          | string | Label of receiver |
| `receiver_classification`| list   | Receiver tags |
| `receiver_risk_factors`  | list   | Receiver risk attributes |
| `receiver_quick_score`   | string | Receiver risk level |
| `coin`                   | string | Token symbol |
| `coin_name`              | string | Token name |
| `first_tx`               | int    | First related transaction |
| `last_tx`                | int    | Last related transaction |
| `total_tx`               | int    | Number of transactions |
| `amount`                 | float  | Amount transferred |
| `usd_value`              | float  | Value in USD |

---

### `asset_distribution_in` & `asset_distribution_out`

| Field       | Type   | Description |
|-------------|--------|-------------|
| `coin_name` | string | Coin/token name |
| `amount`    | float  | Amount |
| `usd_value` | float  | Value in USD |
| `share`     | float  | Share of total |

---

### `destination_of_funds` & `source_of_funds`

| Field        | Type   | Description |
|--------------|--------|-------------|
| `proximity`  | string | "direct", "indirect", etc. |
| `address_name`| string | Counterparty label |
| `classification`| list | Entity type (e.g., exchange, mixer) |
| `risk_factors` | list | Risk tags |
| `quick_score`  | string | Risk rating |
| `usd_value`    | float | USD value transferred |
| `exposure_share`| float| Exposure proportion |

---

### `intel`

| Field       | Type   | Description |
|-------------|--------|-------------|
| `platform`  | string | Source (e.g., Twitter, Reddit) |
| `created_at`| string | Publish date/time |
| `url`       | string | Link to original |
| `title`     | string | Title/headline |
| `description`| string| Summary/body |

---

### `activity`

| Field           | Type   | Description |
|-----------------|--------|-------------|
| `weekday`       | string | Day of the week |
| `hour`          | int    | Hour of day (0–23) |
| `activity_count`| int    | Number of transactions |

---

### `geoint`

| Field    | Type   | Description |
|----------|--------|-------------|
| `country`| string | Country code (alpha-2) |
| `share`  | float  | Geographic distribution |

---

### `risk_categories`

| Field           | Type   | Description |
|-----------------|--------|-------------|
| `classification`| int    | Classification type |
| `proximity`     | list   | Proximity to the wallet |

---

## Notes

- **Depth parameter** controls how deep the screening goes.  
- **Quick mode**: Fast check, attribution, linked risks.  
- **Lite mode**: Quick mode + behavioral analysis + risky wallet exposure + balance.  
- **Full mode**: Lite mode + adjustable depth + real-time off-chain intelligence.  
- API users should query the results endpoint every **10 seconds** until status is `done`.  
- Always check `status` and `error` fields for error handling.  
- For support, contact the [Nominis API team](/intro#support)