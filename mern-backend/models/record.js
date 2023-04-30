const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
});

const Record = sequelize.define(
  'Record',
  {
    // Define the model attributes
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Define any additional options for the model
    tableName: 'records', // Set the table name to match your database table
    timestamps: false, // Disable the default timestamps (created_at, updated_at)
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
  }
);

// Define stored procedures for CRUD operations
const getAllRecordsProcedure = `
    CREATE PROCEDURE IF NOT EXISTS sp_get_all_records()
    BEGIN
        SELECT * FROM records;
    END
`;

const createRecordProcedure = `
  CREATE PROCEDURE IF NOT EXISTS sp_create_record(
    IN p_title VARCHAR(255),
    IN p_description VARCHAR(255),
    IN p_createdBy INT
  )
  BEGIN
    INSERT INTO records (title, description, createdDate, createdBy, updatedDate, updatedBy)
    VALUES (p_title, p_description, CURRENT_TIMESTAMP(), p_createdBy, CURRENT_TIMESTAMP(), p_createdBy);
  END
`;
const getRecordByIdProcedure = `
  CREATE PROCEDURE IF NOT EXISTS sp_get_record_by_id(IN p_id INT)
  BEGIN
    SELECT * FROM records WHERE id = p_id;
  END
`;

const updateRecordProcedure = `
  CREATE PROCEDURE IF NOT EXISTS sp_update_record(
    IN p_id INT,
    IN p_title VARCHAR(255),
    IN p_description VARCHAR(255),
    IN p_updatedBy INT
  )
  BEGIN
    UPDATE records
    SET title = p_title, description = p_description, updatedDate = CURRENT_TIMESTAMP(), updatedBy = p_updatedBy
    WHERE id = p_id;
  END
`;

const deleteRecordProcedure = `
  CREATE PROCEDURE IF NOT EXISTS sp_delete_record(IN p_id INT)
  BEGIN
    DELETE FROM records WHERE id = p_id;
  END
`;

// Synchronize the model and execute stored procedure creation scripts
Record.sync({ alter: true })
  .then(() => {
    return sequelize.query(getAllRecordsProcedure);
  })
  .then(() => {
    return sequelize.query(getRecordByIdProcedure);
  })
  .then(() => {
    return sequelize.query(createRecordProcedure);
  })
  .then(() => {
    return sequelize.query(updateRecordProcedure);
  })
  .then(() => {
    return sequelize.query(deleteRecordProcedure);
  })
  .then(() => {
    console.log('Record model synced with the database');
  })
  .catch((error) => {
    console.error('Error syncing Record model with the database:', error);
  });

// Export the Record model
module.exports = Record;
