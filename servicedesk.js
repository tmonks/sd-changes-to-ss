const axios = require("axios");
require("dotenv").config();

const BASE_URL = "https://api.samanage.com";
const HEADERS = {
  "X-Samanage-Authorization": "Bearer " + process.env.SOLARWINDS_API_KEY,
  Accept: "application/vnd.samanage.v2.1+json",
  "Content-Type": "application/json",
};

// Get all current changes from ServiceDesk
module.exports.getChanges = async () => {
  const requestOptions = {
    headers: HEADERS,
    params: {
      page: 1,
      per_page: 100,
    },
  };

  let currentPage = 1;
  let totalPages = 1;
  let changes = [];

  // loop through the paginated results and add the changes to one array
  while (currentPage <= totalPages) {
    requestOptions.params.page = currentPage;

    try {
      const results = await axios.get(BASE_URL + "/changes.json", requestOptions);

      // get the totalPages in case more than one page was returned
      totalPages = results.headers["x-total-pages"] || 1;
      currentPage++;

      changes = changes.concat(results.data);
    } catch (err) {
      err.message = "Unable to get changes from Service Desk: " + err.message;
      throw err;
    }
  }

  return changes;
};
