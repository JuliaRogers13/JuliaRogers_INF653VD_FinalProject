const statesData = require('../models/statesData.json');
const State = require('../models/State');

// GET all states from static JSON
const getAllStates = (req, res) => {
  const contigParam = req.query.contig;

  if (contigParam === 'true') {
    const filtered = statesData.filter(state => state.code !== 'AK' && state.code !== 'HI');
    return res.json(filtered);
  }

  if (contigParam === 'false') {
    const filtered = statesData.filter(state => state.code === 'AK' || state.code === 'HI');
    return res.json(filtered);
  }

  // Default: return all
  res.json(statesData);
};

// GET random fun fact from MongoDB
const getRandomFunFact = async (req, res) => {
  const stateCode = req.params.state.toUpperCase();

  try {
    const state = await State.findOne({ stateCode });

    if (!state || !state.funfacts || state.funfacts.length === 0) {
      return res.status(404).json({ message: `No Fun Facts found for ${stateCode}` });
    }

    const randomIndex = Math.floor(Math.random() * state.funfacts.length);
    const randomFact = state.funfacts[randomIndex];

    res.json({ funfact: randomFact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST new fun facts to MongoDB
const createFunFact = async (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const { funfacts } = req.body;

  if (!funfacts || !Array.isArray(funfacts)) {
    return res.status(400).json({ message: 'Fun facts must be sent as an array.' });
  }

  try {
    let state = await State.findOne({ stateCode });

    if (state) {
      state.funfacts.push(...funfacts);
      await state.save();
    } else {
      state = await State.create({ stateCode, funfacts });
    }

    res.status(201).json(state);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH a fun fact at a specific index
const updateFunFact = async (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const { index, funfact } = req.body;

  if (typeof index !== 'number' || !funfact) {
    return res.status(400).json({ message: 'Both index (number) and funfact (string) are required.' });
  }

  try {
    const state = await State.findOne({ stateCode });

    if (!state || !state.funfacts || index < 1 || index > state.funfacts.length) {
      return res.status(404).json({ message: `No Fun Fact found at that index for ${stateCode}` });
    }

    state.funfacts[index - 1] = funfact;
    await state.save();
    res.json(state);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE a fun fact at a specific index
const deleteFunFact = async (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const { index } = req.body;

  if (typeof index !== 'number') {
    return res.status(400).json({ message: 'Index (number) is required.' });
  }

  try {
    const state = await State.findOne({ stateCode });

    if (!state || !state.funfacts || index < 1 || index > state.funfacts.length) {
      return res.status(404).json({ message: `No Fun Fact found at that index for ${stateCode}` });
    }

    state.funfacts.splice(index - 1, 1);
    await state.save();
    res.json(state);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStateCapital = (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const state = statesData.find(st => st.code === stateCode);

  if (!state) {
    return res.status(404).json({ message: `Invalid state abbreviation parameter` });
  }

  res.json({ state: state.state, capital: state.capital_city });
};

const getStateNickname = (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const state = statesData.find(st => st.code === stateCode);

  if (!state) {
    return res.status(404).json({ message: `Invalid state abbreviation parameter` });
  }

  res.json({ state: state.state, nickname: state.nickname });
};

const getStatePopulation = (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const state = statesData.find(st => st.code === stateCode);

  if (!state) {
    return res.status(404).json({ message: `Invalid state abbreviation parameter` });
  }

  res.json({ state: state.state, population: state.population.toLocaleString() });
};

const getStateAdmission = (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const state = statesData.find(st => st.code === stateCode);

  if (!state) {
    return res.status(404).json({ message: `Invalid state abbreviation parameter` });
  }

  res.json({ state: state.state, admitted: state.admission_date });
};

const getState = async (req, res) => {
  const stateCode = req.params.state.toUpperCase();

  // Find static data from JSON
  const state = statesData.find(st => st.code === stateCode);
  if (!state) {
    return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
  }

  // Clone static data to a new object
  const stateWithFunFacts = { ...state };

  try {
    // Check for fun facts in MongoDB
    const mongoState = await State.findOne({ stateCode });
    if (mongoState && mongoState.funfacts && mongoState.funfacts.length > 0) {
      stateWithFunFacts.funfacts = mongoState.funfacts;
    }

    res.json(stateWithFunFacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getAllStates,
  getRandomFunFact,
  createFunFact,
  updateFunFact,
  deleteFunFact,
  getStateCapital,
  getStateNickname,
  getStatePopulation,
  getStateAdmission,
  getState
};
