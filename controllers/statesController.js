const statesData = require('../models/statesData.json');
const State = require('../models/State');

// GET all states from static JSON
const getAllStates = (req, res) => {
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

module.exports = {
  getAllStates,
  getRandomFunFact,
  createFunFact
};
