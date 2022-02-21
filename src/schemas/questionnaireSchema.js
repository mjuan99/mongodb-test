const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionnaireSchema = new Schema({
    userID: {
        type: Number,
        min: 1,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    training: {
        time: {
            type: String,
            match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        }
    },
    organizationTime: {
        toolType: {
            app: Boolean,
            schedule: Boolean,
            notes: Boolean,
            mobile: Boolean
        }
    },
    screenUsage: {
        beforeSleep: {
            mobile: Boolean,
            tv: Boolean,
            tablet: Boolean,
            computer: Boolean
        },
        socialNetworksVideoGames: Boolean
    },
    drinks: {
        frequency: {
            water: {
                type: Number,
                min: 0
            },
            suggaryDrinks: {
                type: Number,
                min: 0
            },
            energyDrinks: {
                type: Number,
                min: 0
            },
            caffeinatedDrinks: {
                type: Number,
                min: 0
            },
            alcohol: {
                type: Number,
                min: 0
            }
        }
    },
    sleep: {
        quality: {
            terrible: Boolean,
            bad: Boolean,
            neutral: Boolean,
            satisfied: Boolean,
            excelent: Boolean
        },
        goToBed: {
            type: String,
            match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        },
        wakeUp: {
            type: String,
            match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        }
    }
}, {versionKey: false});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);