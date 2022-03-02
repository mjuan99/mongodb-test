const mongoose = require('mongoose');
const Questionnaire = require('../src/schemas/questionnaireSchema.js');
const User = require('../src/schemas/userSchema.js');

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
  await mongoose.connect(process.env.DB_URL); 
  const users = await Questionnaire.distinct('userID');
  for(let i = 0; i < users.length; i++){
    const user = users[i];
    const userQuestionnaires = await Questionnaire.find({userID: user});
    const questionnaires = [];
    userQuestionnaires.forEach(questionnaire => {
      questionnaires.push({date: questionnaire.date, training: questionnaire.training, organizationTime: questionnaire.organizationTime, screenUsage: questionnaire.screenUsage, drinks: questionnaire.drinks, sleep: questionnaire.sleep});
    });
    const newUser = {
      userID: user,
      questionnaires: questionnaires
    };
    User.create(newUser);
    console.log(`User ${newUser.userID} created`);
  }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
  await mongoose.connect(process.env.DB_URL); 
  console.log("Start");
  await User.deleteMany({});
  console.log("End");
}

module.exports = { up, down };
