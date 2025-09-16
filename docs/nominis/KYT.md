# KYT API Documentation

## Overview
The KYT API allows users to get a complete risk assessment for a specific transaction hash.  
Users can assess any transaction in over 70 different blockchains, with an optional **depth** parameter to adjust the level of depth.

---

## Endpoint
- **URL:** `https://authapi0.xplorisk.com:8443/v2/transaction/check`  
- **Method:** `POST`  
- **Content-Type:** `application/json`

---

## Request Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `chain`   | string | Yes      | Blockchain network of the tx hash (e.g., `eth`) |
| `tx_hash` | string | Yes      | The transaction hash to assess |
| `depth`   | int    | No       | Screening depth (default: 3) |
| `api_key` | string | Yes      | The API key provided to the client |

---

## Example Request

```python
import requests

data = {
    "chain": "eth",
    "tx_hash": "0x5d7648d1392923a2882bbc660ec16c43ad37bec3533bccb0c164d6f622f4542e",
    "depth": 3,
    "api_key": "x_11111111-1111111-1111-1111"
}

response = requests.post(
    "https://authapi0.xplorisk.com:8443/v2/transaction/check",
    json=data
)

print(response.json())
```

---

## Response

### Initial Response
The initial response contains a unique request ID to check screening status.

```json
{
  "time": 1743667966.522422,
  "status": "ok",
  "error": "",
  "request_type": "check_transaction",
  "chain": "eth",
  "tx_hash": "0x5d7648d1392923a2882bbc660ec16c43ad37bec3533bccb0c164d6f622f4542e",
  "data": "59879f81-0926-4ee3-aacb-28c42df30a12"
}
```

---

## Response Fields

| Field          | Type   | Description |
|----------------|--------|-------------|
| `time`         | epoch  | Request time |
| `status`       | string | `ok` if successful, `fail` otherwise |
| `error`        | string | Error message if failed |
| `request_type` | string | Always `check_transaction` |
| `chain`        | string | Blockchain network |
| `tx_hash`      | string | Transaction hash |
| `data`         | uuid   | Unique request ID |

---

## Fetching Screening Results

After receiving the request ID, query every 10 seconds until status is `done`.

- **Endpoint:** `https://authapi0.xplorisk.com:8443/v2/transaction/check/{request_id}`  
- **Method:** `GET`  
- **Content-Type:** `application/json`

---

## Example Response (Complete Screening)

```json
{
  "time": 1744270838.6367636,
  "status": "ok",
  "error": "",
  "request_type": "check_transaction",
  "req_id": "a56ce472-2252-4764-9004-bfcbcf0865d1",
  "data": {
    "status": "done",
    "data": {
      "depth": 3,
      "created_at": 1742852195,
      "chain": "eth",
      "tx_hash": "0x5d7648d1392923a2882bbc660ec16c43ad37bec3533bccb0c164d6f622f4542e",
      "exposure": [],
      "usd_value": 91.32198869486471,
      "risk_categories": [],
      "behavioral_indicators": [],
      "risk_score": "critical"
    }
  }
}
```

---

## Top-Level Fields

| Field          | Type   | Description |
|----------------|--------|-------------|
| `time`         | epoch  | Unix timestamp |
| `status`       | string | Request status |
| `error`        | string | Error message |
| `request_type` | string | Type of request |
| `req_id`       | uuid   | Request ID |

---

## Request-Specific Fields

| Field                  | Type   | Description |
|------------------------|--------|-------------|
| `depth`                | int    | Screening depth |
| `created_at`           | int    | Creation time of the transaction |
| `chain`                | string | Chain of the transaction |
| `tx_hash`              | string | Transaction hash |
| `usd_value`            | float  | USD value of the transaction |
| `behavioral_indicators`| list   | Detected behavioral indicators |
| `risk_score`           | string | Risk score of the transaction |

---

## Exposure Object

| Field                    | Type   | Description |
|-------------------------|--------|-------------|
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
| `first_tx`               | int    | Timestamp of first transaction |
| `last_tx`                | int    | Timestamp of last transaction |
| `total_tx`               | int    | Number of transactions |
| `amount`                 | float  | Amount transferred |
| `usd_value`              | float  | Value in USD |

---

## Risk Categories

| Field            | Type   | Description |
|------------------|--------|-------------|
| `classification` | int    | Classification type |
| `proximity`      | list   | Proximity details |

---

## Notes

- The **depth** parameter controls how deep screening should go.  
- API users should check the results endpoint every **10 seconds** until status is `done`.  
- For error handling, check `status` and `error` fields in the response.  
- For support, contact the [Nominis API team](/intro#support)
