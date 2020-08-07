const smartsheetId = "6991861635147652";

const serviceDesk = require("./servicedesk");
const smartSheet = require("./smartsheet");

// convert changes from Service Desk to rows for Smartsheet
const formatChanges = (changes) => {
  return changes.map((change) => {
    return {
      toBottom: true,
      cells: [
        {
          // id
          value: change.id,
          columnId: 2712127197734788,
        },
        {
          // Title
          value: change.name,
          columnId: 1586227290892164,
        },
        {
          // Department
          value: change.department ? change.department.name : "",
          columnId: 3838027104577412,
        },
        {
          // State
          value: change.state,
          columnId: 5526876964841348,
        },
        {
          // Assignee Name
          value: change.assignee ? change.assignee.name : "",
          columnId: 2149177244313476,
        },
        {
          // Priority
          value: change.priority,
          columnId: 8904576685369220,
        },
      ],
    };
  });
};

// Main function
const updateSmartsheet = async (smartsheetId) => {
  try {
    // get all row IDs from Smartsheet
    let rowsToDelete = await smartSheet.getRowIds(smartsheetId);

    // Delete all rows from Smartsheet
    let deletionResult = await smartSheet.deleteRowsById(smartsheetId, rowsToDelete);

    // Get a list of all the changes from Service Desk
    const serviceDeskChanges = await serviceDesk.getChanges();

    // Convert the Service Desk changes into Smartsheet rows
    const smartSheetRows = await formatChanges(serviceDeskChanges);

    // Add the new rows to the now empty Smartsheet
    let addResult = await smartSheet.addRows(smartsheetId, smartSheetRows);
    console.log(addResult.message + ": added " + addResult.result.length + " rows");
  } catch (err) {
    console.error(err);
  }
};

updateSmartsheet(smartsheetId);

/* Testing */
// (async () => {
//   try {
//     console.log(await reformatChanges(await serviceDesk.getChanges()));
//   } catch (err) {
//     console.error("Something went wrong!");
//     console.error(err.message);
//   }
// })();
