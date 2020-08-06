require("dotenv").config();

const client = require("smartsheet");

const smartsheet = client.createClient({ accessToken: process.env.SMARTSHEET_API_KEY });
const smartsheetId = "6991861635147652";

const serviceDesk = require("./servicedesk");

// Retrieve a comma-separated list of row ID's from current Smartsheet
const retrieveSmartsheetRows = async (sheetId) => {
  sheetOptions = {
    id: "" + sheetId,
  };

  let rowIds = "";

  try {
    let sheetInfo = await smartsheet.sheets.getSheet(sheetOptions);
    rowIds = sheetInfo.rows.map((row) => row.id).join(",");
  } catch (error) {
    console.error(error);
  }
  return rowIds;
};

// Delete list of row ID's from Smartsheet
const deleteSmartsheetRows = async (sheetId, rowIds) => {
  const options = {
    sheetId,
    rowId: rowIds,
  };

  try {
    let results = await smartsheet.sheets.deleteRow(options);
    console.log(results);
  } catch (error) {
    console.error(error);
  }
};

// Add rows to Smartsheet
const addRowsToSmartsheet = async (sheetId, rows) => {
  // const rows = [
  //   {
  //     cells: [
  //       {
  //         // id
  //         columnId: 2712127197734788,
  //         value: 1,
  //       },
  //       {
  //         // Title
  //         columnId: 1586227290892164,
  //         value: "First row inserted from API!",
  //       },
  //       {
  //         // Department
  //         columnId: 3838027104577412,
  //         value: "Information Systems",
  //       },
  //       {
  //         // State
  //         columnId: 5526876964841348,
  //         value: "Open",
  //       },
  //       {
  //         // Assignee Name
  //         columnId: 2149177244313476,
  //         value: "Peter Parker",
  //       },
  //       {
  //         // Priority
  //         columnId: 8904576685369220,
  //         value: "Low",
  //       },
  //     ],
  //   },
  // ];

  const options = {
    sheetId,
    body: rows,
  };

  try {
    const result = await smartsheet.sheets.addRows(options);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

// Main function
const updateSmartsheet = async (smartsheetId) => {
  let rowsToDelete = await retrieveSmartsheetRows(smartsheetId);
  await deleteSmartsheetRows(smartsheetId, rowsToDelete);
  const changes = await serviceDesk.getChanges();
  console.log(`Found ${changes.length} total`);
  await addRowsToSmartsheet(smartsheetId, changes);
};

// addRowsToSmartsheet(smartsheetId);
// updateSmartsheet(smartsheetId);

(async () => {
  console.log(await serviceDesk.getChanges());
})();
