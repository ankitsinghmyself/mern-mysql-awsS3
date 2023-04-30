const db = require('../config/database');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
});

const Record = require('../models/record');

// Get all records
const getAllRecords = async () => {
  try {
    const records = await sequelize.query('CALL sp_get_all_records()');
    return records;
  } catch (error) {
    throw error;
  }
};

// Create a record using the stored procedure
const createRecord = async (title, description, createdBy) => {
  try {
    const result = await Record.sequelize.query(
      'CALL sp_create_record(?, ?, ?)',
      {
        replacements: [title, description, createdBy],
      }
    );
    const createdRecord = result;
    return createdRecord;
  } catch (error) {
    throw error;
  }
};
// get record by id
const getRecordById = async (id) => {
  try {
    const result = await Record.sequelize.query('CALL sp_get_record_by_id(?)', {
      replacements: [id],
    });
    const record = result;
    return record;
  } catch (error) {
    throw error;
  }
};
// Update a record using the stored procedure
const updateRecordById = async (id, title, description, updatedBy) => {
  try {
    const result = await Record.sequelize.query(
      'CALL sp_update_record(?, ?, ?, ?)',
      {
        replacements: [id, title, description, updatedBy],
      }
    );
    const updatedRecord = result;
    return updatedRecord;
  } catch (error) {
    throw error;
  }
};

// Delete a record using the stored procedure
const deleteRecordById = async (id) => {
  try {
    const result = await Record.sequelize.query('CALL sp_delete_record(?)', {
      replacements: [id],
    });
    const deletedRecord = result;
    return deletedRecord;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRecords,
  createRecord,
  getRecordById,
  updateRecordById,
  deleteRecordById,
};
