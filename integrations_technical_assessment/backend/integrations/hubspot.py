from fastapi import Request
from urllib.parse import urlencode
import httpx

HUBSPOT_CLIENT_ID = "your_client_id"
HUBSPOT_CLIENT_SECRET = "your_client_secret"
HUBSPOT_REDIRECT_URI = "https://yourapp.com/oauth2callback/hubspot"
HUBSPOT_SCOPE = "contacts"

async def authorize_hubspot(user_id, org_id):
    query_params = urlencode({
        "client_id": HUBSPOT_CLIENT_ID,
        "redirect_uri": HUBSPOT_REDIRECT_URI,
        "scope": HUBSPOT_SCOPE,
        "state": f"{user_id}:{org_id}",
        "response_type": "code"
    })
    return f"https://app.hubspot.com/oauth/authorize?{query_params}"

async def oauth2callback_hubspot(request: Request):
    params = dict(request.query_params)
    code = params.get("code")
    state = params.get("state")
    user_id, org_id = state.split(":")

    token_url = "https://api.hubapi.com/oauth/v1/token"
    data = {
        "grant_type": "authorization_code",
        "client_id": HUBSPOT_CLIENT_ID,
        "client_secret": HUBSPOT_CLIENT_SECRET,
        "redirect_uri": HUBSPOT_REDIRECT_URI,
        "code": code
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, data=data, headers={"Content-Type": "application/x-www-form-urlencoded"})
        token_data = response.json()

    return token_data

async def get_hubspot_credentials(user_id, org_id):
    return {
        "access_token": "xyz",
        "refresh_token": "abc"
    }

async def create_integration_item_metadata_object(response_json):
    return {
        "id": response_json.get("id"),
        "name": response_json.get("properties", {}).get("firstname", "Unknown"),
        "email": response_json.get("properties", {}).get("email"),
        "source": "hubspot"
    }

async def get_items_hubspot(credentials):
    headers = {
        "Authorization": f"Bearer {credentials['access_token']}"
    }
    url = "https://api.hubapi.com/crm/v3/objects/contacts"

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        items = response.json().get("results", [])

    metadata_items = []
    for item in items:
        metadata = await create_integration_item_metadata_object(item)
        metadata_items.append(metadata)

    return metadata_items
