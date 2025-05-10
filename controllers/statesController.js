const statesData = require('../models/statesData.json');

const getAllStates = (req, res) => {
  res.json(statesData);
};

module.exports = {
  getAllStates,
};
