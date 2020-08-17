require("dotenv").config();

const client = require("smartsheet");
const smartsheet = client.createClient({ accessToken: process.env.SMARTSHEET_API_KEY });

// Retrieve column info (including ID's) from the specified Smartsheet
module.exports.getColumnIds = async (sheetId) => {
  sheetOptions = {
    id: "" + sheetId,
  };

  try {
    let sheetInfo = await smartsheet.sheets.getSheet(sheetOptions);
    return sheetInfo.columns;
  } catch (err) {
    err.message = "Unable to get Smartsheet column IDs: " + err.message;
    throw err;
  }
};

// Retrieve a comma-separated list of all row ID's from current Smartsheet
module.exports.getRowIds = async (sheetId) => {
  sheetOptions = {
    id: "" + sheetId,
  };

  let rowIds = "";

  try {
    let sheetInfo = await smartsheet.sheets.getSheet(sheetOptions);
    // create a comma-separated list from the array of rows returned
    rowIds = sheetInfo.rows.map((row) => row.id).join(",");
  } catch (err) {
    err.message = "Unable to get Smartsheet row IDs: " + err.message;
    throw err;
  }
  return rowIds;
};

// Delete list of rowIds (comma-separated list) from Smartsheet
module.exports.deleteRowsById = async (sheetId, rowIds) => {
  /* if an empty list was provided, consider it a success */
  if(rowIds === "") {
    return { "message": "SUCCESS", "resultCode": 0, "result": [] };
  }

  const options = {
    sheetId,
    rowId: rowIds,
  };

  try {
    return await smartsheet.sheets.deleteRow(options);
  } catch (err) {
    err.message = "Unable to delete requested rows from Smartsheet: " + err.message;
    throw err;
  }
};

// Add rows to Smartsheet
module.exports.addRows = async (sheetId, rows) => {
  const options = {
    sheetId,
    body: rows,
  };

  try {
    return await smartsheet.sheets.addRows(options);
  } catch (err) {
    err.message = "Unable to add rows to Smartsheet: " + err.message;
    throw err;
  }
};
