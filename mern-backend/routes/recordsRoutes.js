const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/allRecords', (req, res, next) => {
  authMiddleware.authenticateToken(req, res, async () => {
    try {
      const records = await recordsController.getAllRecords();
      res.status(200).json(records);
    } catch (error) {
      next(error);
    }
  });
});
router.post('/createRecord', (req, res, next) => {
  authMiddleware.authenticateToken(req, res, async () => {
    try {
      const createdRecord = await recordsController.createRecord(
        req.body.title,
        req.body.description,
        req.user.id // The authenticated user's ID will be passed as the createdBy parameter
      );
      res.status(201).json(createdRecord);
    } catch (error) {
      next(error);
    }
  });
});
router.get('/get/:id', (req, res, next) => {
  authMiddleware.authenticateToken(req, res, async () => {
    try {
      const record = await recordsController.getRecordById(req.params.id);
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    } catch (error) {
      next(error);
    }
  });
});

router.put('/update/:id', (req, res, next) => {
  authMiddleware.authenticateToken(req, res, async () => {
    try {
      const updatedRecord = await recordsController.updateRecordById(
        req.params.id,
        req.body.title,
        req.body.description,
        req.user.id // The authenticated user's ID will be passed as the updatedBy parameter
      );
      return res.status(200).json(updatedRecord);
    } catch (error) {
      next(error);
    }
  });
});

router.delete('/delete/:id', (req, res, next) => {
  authMiddleware.authenticateToken(req, res, async () => {
    try {
      const deletedRecord = await recordsController.deleteRecordById(
        req.params.id,
        req.user.id // The authenticated user's ID will be passed as the deletedBy parameter
      );
      return res.status(200).json(deletedRecord);
    } catch (error) {
      next(error);
    }
  });
});

module.exports = router;
