const mongoose = require('mongoose');
const Questionnaire = require('../src/schemas/questionnairev2Schema.js');

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
  await mongoose.connect(process.env.DB_URL);
  const res = await Questionnaire.distinct('training.time');
  console.log('V2:', res);
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
