const router = require('express').Router();
const {
  getEntries,
  addEntry,
  updateEntry,
  deleteEntry
} = require('../controllers/entry-controller');

router
  .route('/')
  .get(getEntries)
  .post(addEntry);

router
  .route('/:id')
  .put(updateEntry)
  .delete(deleteEntry);

module.exports = router;
