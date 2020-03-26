const router = require('express').Router();
const {
  getEntries,
  addEntry,
  updateEntry,
  deleteEntry
} = require('../controllers/entry-controller');
const auth = require('../middlewares/auth');

router
  .route('/')
  .all(auth)
  .get(getEntries)
  .post(addEntry);

router
  .route('/:id')
  .all(auth)
  .put(updateEntry)
  .delete(deleteEntry);

module.exports = router;
