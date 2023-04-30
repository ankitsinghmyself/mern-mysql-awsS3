'use strict';

module.exports = {
  up: async (queryInterface) => {
    const createProcedureQuery = `
      DELIMITER //

      CREATE PROCEDURE sp_select_data()
      BEGIN
        -- Add your SELECT query logic here
        SELECT * FROM records;
      END //

      DELIMITER ;
    `;

    await queryInterface.sequelize.query(createProcedureQuery);
  },

  down: async (queryInterface) => {
    const dropProcedureQuery = `
      DROP PROCEDURE IF EXISTS sp_select_data;
    `;

    await queryInterface.sequelize.query(dropProcedureQuery);
  },
};
