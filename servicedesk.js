const axios = require("axios");
require("dotenv").config();

// Get all current changes from ServiceDesk
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
      page: 1,
      per_page: 100,
    },
  };

  let currentPage = 1;
  let totalPages = 1;
  let changes = [];

  while (currentPage <= totalPages) {
    requestOptions.params.page = currentPage;

    try {
      const results = await axios.get(BASE_URL + "/changes.json", requestOptions);

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
