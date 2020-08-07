# Service Desk Changes to Smartsheet

API integration to copy change requests from SolarWinds Service Desk to a Smartsheet

This script will copy the following columns from Service Desk changes into Smartsheet:

- id
- Title
- Department
- State
- Assignee Name
- Priority
- Created

## Setup

Run `npm install`

[Generate an API key in Service Desk](https://help-desk-migration.com/help/setup-token-authentication-samanage/) for the user you want to have the updates be made by (must be an Admin).

[Generate a raw Smartsheet token](https://smartsheet-platform.github.io/api-docs/#authentication-and-access-tokens) for the Smartsheet user to use for the updates to Smartsheet.

Create a `.env` file in the parent directory containing your API keys for Smartsheet and Service Desk

```
# "Node 1" token for helpdesk@lcgh.net user
SMARTSHEET_API_KEY={SMARTSHEET TOKEN}

# Help Desk User
SOLARWINDS_API_KEY={SOLARWINDS API KEY}
```

Update the `smartsheetId` in `index.js`. You can retrieve this from your target Smartsheet by going to File > Properties.

Update the `columnId` for each column in `formatChanges()` inside `index.js`. You can get these by calling `getColumnInfo()` from `smartsheet.js`

## How to run it

```
$ node index.js
```
