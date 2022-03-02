const mongoose = require('mongoose');
const Questionnaire = require('../src/schemas/questionnaireSchema.js');

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
  await mongoose.connect(process.env.DB_URL);
  await Questionnaire.updateMany({}, {$set: {new2: 'true'}});
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
  await mongoose.connect(process.env.DB_URL);
  const res = await Questionnaire.updateMany({}, {$unset: {"new2": 1}});
}

module.exports = { up, down };
