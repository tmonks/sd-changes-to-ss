const axios = require("axios");

// Retrieve current changes from ServiceDesk
module.exports.getChanges = async () => {
  const BASE_URL = "https://api.samanage.com";
  const HEADERS = {
    "X-Samanage-Authorization": "Bearer " + process.env.SOLARWINDS_API_KEY,
    Accept: "application/vnd.samanage.v2.1+json",
    "Content-Type": "application/json",
  };

  const requestOptions = {
    headers: HEADERS,
    params: {
      layout: "short",
    },
  };

  let currentPage = 1;
  let totalPages = 1;
  let changes = [];

  while (currentPage <= totalPages) {
    requestOptions.params.page = currentPage;

    try {
      const results = await axios.get(BASE_URL + "/changes.json", requestOptions);
      console.log(`found ${results.data.length} changes`);

      totalPages = results.headers["x-total-pages"] || 1;
      console.log("Page " + currentPage + ": Found " + results.data.length + " incidents");
      currentPage++;

      changes = changes.concat(
        results.data.map((change) => {
          return {
            toBottom: true,
            cells: [
              {
                // column: "id",
                value: change.id,
                columnId: 2712127197734788,
              },
              {
                // column: "Title",
                value: change.name,
                columnId: 1586227290892164,
              },
              {
                // column: "Department",
                value: change.department ? change.department.name : "",
                columnId: 3838027104577412,
              },
              {
                // column: "State",
                value: change.state,
                columnId: 5526876964841348,
              },
              {
                // column: "Assignee Name",
                value: change.assignee ? change.assignee.name : "",
                columnId: 2149177244313476,
              },
              {
                // column: "Priority",
                value: change.priority,
                columnId: 8904576685369220,
              },
            ],
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  }
  return changes;
};
