# Quick Address Check API Documentation

## Overview
The Quick Address Check API allows users to get a quick risk score and attribution for wallets.

---

## Endpoint
- **URL:** `https://authapi0.xplorisk.com:8443/v2/address/quick_check`  
- **Method:** `GET`  
- **Content-Type:** `application/json`

---

## Request Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `address` | string | Yes      | Blockchain addresses, comma-separated (up to 50 addresses) |
| `api_key` | string | Yes      | The API key provided to the client |

---

## Example Request

```python
import requests

response = requests.get(
    "https://authapi0.xplorisk.com:8443/v2/address/quick_check?"
    "address=0x05b7013adcc264ad73388563a1e98869aa4301ee,0x332f3d83b771d0611156eb04308e168e50fd9e30&"
    "api_key=x_111111_1111111_11111_11111"
)

print(response.json())
```

---

## Response

The response contains a unique request ID that should be used to check the tracing status.

```json
{
  "time": 1743709221.4099545,
  "status": "ok",
  "error": "",
  "request_type": "quick_check",
  "address": "0x332f3d83b771d0611156eb04308e168e50fd9e30",
  "data": [
    {
      "address": "0x05b7013adcc264ad73388563a1e98869aa4301ee",
      "name": "Independent Reserve",
      "classification": ["cex", "hot wallet"],
      "risk_factors": [],
      "quick_score": "low"
    },
    {
      "address": "0x332f3d83b771d0611156eb04308e168e50fd9e30",
      "name": "Bitpapa",
      "classification": ["cex", "user wallet", "sanctioned", "high risk exchange"],
      "risk_factors": [],
      "quick_score": "critical"
    }
  ]
}
```

---

## Response Fields

| Field                | Type   | Description |
|----------------------|--------|-------------|
| `time`               | epoch  | Time of the request |
| `status`             | string | `ok` if successful, `fail` if not |
| `error`              | string | Error message if the request failed |
| `request_type`       | string | Always `quick_check` |
| `data`               | array  | Array of addresses with associated metadata |

### Address Object Fields

| Field            | Type   | Description |
|------------------|--------|-------------|
| `address`        | string | Blockchain address |
| `name`           | string | Name of the address (if available) |
| `classification` | array  | Classification labels for the address |
| `risk_factors`   | array  | Risk factors associated with the address |
| `quick_score`    | string | Risk level (`low`, `medium`, `high`, `critical`) |

---

## Notes

- For error handling, check the `status` and `error` fields in the response.  
- For support, contact the [Nominis API team](/intro#support)
