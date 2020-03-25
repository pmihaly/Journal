const Entry = require('../models/Entry');

// @desc Összes bejegyzések lekérése
// @route GET /api/v1/entries/
// @access Public
exports.getEntries = async (req, res) => {
  try {
    const entrys = await Entry.find();

    return res.status(200).json({
      success: true,
      count: entrys.length,
      data: entrys
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

// @desc Új bejegyzés hozzáadaása
// @route POST /api/v1/entries/
// @access Public
exports.addEntry = async (req, res) => {
  try {
    const entry = await Entry.create(req.body);

    return res.status(201).json({ success: true, data: entry });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    return res.status(500).json({ success: false, error });
  }
};

// @desc Megadott bejegyzés szerkesztése
// @route PUT /api/v1/entries/:id
// @access Public
exports.updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body);

    if (!entry) {
      return res.status(404).json({
        success: false,
        error: 'No entry found'
      });
    }
    return res.status(200).json({
      success: true,
      data: { entry: await Entry.findById(req.params.id) }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    return res.status(500).json({ success: false, error });
  }
};

// @desc Bejegyzés törlése
// @route DELETE /api/v1/entries/:id
// @access Public
exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        error: 'No entry found'
      });
    }
    return res.status(200).json({
      success: true,
      data: { entry }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
