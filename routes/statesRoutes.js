const express = require('express');
const router = express.Router();
const statesController = require('../controllers/statesController');

// GET all states
router.get('/', statesController.getAllStates);
router.get('/:state', statesController.getState);

// GET a random fun fact
router.get('/:state/funfact', statesController.getRandomFunFact);

// POST fun facts to a state
router.post('/:state/funfact', statesController.createFunFact);

// PATCH a fun fact at index
router.patch('/:state/funfact', statesController.updateFunFact);

// DELETE a fun fact at index
router.delete('/:state/funfact', statesController.deleteFunFact);
router.get('/:state/capital', statesController.getStateCapital);
router.get('/:state/nickname', statesController.getStateNickname);
router.get('/:state/population', statesController.getStatePopulation);
router.get('/:state/admission', statesController.getStateAdmission);

module.exports = router;
