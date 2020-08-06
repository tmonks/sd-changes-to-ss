const smartsheetId = "6991861635147652";

const serviceDesk = require("./servicedesk");
const smartSheet = require("./smartsheet");

// Main function
const updateSmartsheet = async (smartsheetId) => {
  try {
    let rowsToDelete = await smartSheet.getRowIds(smartsheetId);
    let deletionResult = await smartSheet.deleteRowsById(smartsheetId, rowsToDelete);
    console.log(deletionResult.message + ": deleted " + deletionResult.result.length + " rows");
    const changes = await serviceDesk.getChanges();
    console.log(`Inserting ${changes.length} changes...`);
    let addResult = await smartSheet.addRows(smartsheetId, changes);
    console.log(addResult.message + ": added " + addResult.result.length + " rows");
  } catch (err) {
    console.error(err);
  }
};

// addRowsToSmartsheet(smartsheetId);
updateSmartsheet(smartsheetId);

/* Testing */
// (async () => {
//   try {
//     console.log(await smartSheet.addRows(1234, {}));
//   } catch (err) {
//     console.error("Something went wrong!");
//     console.error(err.message);
//   }
// })();
