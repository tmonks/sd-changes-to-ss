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
    let rowsToDelete = await smartSheet.getRowIds(smartsheetId);
    let deletionResult = await smartSheet.deleteRowsById(smartsheetId, rowsToDelete);
    // console.log(deletionResult.message + ": deleted " + deletionResult.result.length + " rows");
    const serviceDeskChanges = await serviceDesk.getChanges();
    const smartSheetRows = await formatChanges(serviceDeskChanges);
    // console.log(`Inserting ${smartSheetRows.length} changes...`);
    let addResult = await smartSheet.addRows(smartsheetId, smartSheetRows);
    // console.log(addResult.message + ": added " + addResult.result.length + " rows");
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
