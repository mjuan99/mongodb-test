const {findQuestionnaire} = require('../controllers/questionnaires/getQuestionnaireController');

describe('get questionnaire by id', () => {
    test('given an invalid id it should return null', async () => {
        const id = 'invalidId';
        const questionnaireModel = {
            findById: () => null
        };
        expect(await findQuestionnaire(questionnaireModel, id)).toBeNull();
    });

    test('given a valid id it should return the questionnaire with the specified id', async () => {
        const id = "620ba910d39ded59c0bd695a";
        const questionnaireModel = {
            findById: () => ({
                "userID": 2222,
                "date": "2022-02-09",
                "training": {
                    "time": "00:30"
                },
                "organizationTime": {
                    "toolType": {
                    "app": true,
                    "schedule": false,
                    "notes": false,
                    "mobile": true
                    }
                },
                "screenUsage": {
                    "beforeSleep": {
                    "mobile": true,
                    "tv": false,
                    "tablet": false,
                    "computer": true
                    },
                    "socialNetworksVideoGames": true
                },
                "drinks": {
                    "frequency": {
                    "water": 1,
                    "suggaryDrinks": 2,
                    "energyDrinks": 4,
                    "caffeinatedDrinks": 2,
                    "alcohol": 2
                    }
                },
                "sleep": {
                    "quality": {
                    "terrible": false,
                    "bad": false,
                    "neutral": false,
                    "satisfied": true,
                    "excelent": false
                    },
                    "goToBed": "23:30",
                    "wakeUp": "6:30"
                },
                _id: id
            })
        }
        expect(await findQuestionnaire(questionnaireModel, id)).toEqual({
            "userID": 2222,
            "date": "2022-02-09",
            "training": {
                "time": "00:30"
            },
            "organizationTime": {
                "toolType": {
                "app": true,
                "schedule": false,
                "notes": false,
                "mobile": true
                }
            },
            "screenUsage": {
                "beforeSleep": {
                "mobile": true,
                "tv": false,
                "tablet": false,
                "computer": true
                },
                "socialNetworksVideoGames": true
            },
            "drinks": {
                "frequency": {
                "water": 1,
                "suggaryDrinks": 2,
                "energyDrinks": 4,
                "caffeinatedDrinks": 2,
                "alcohol": 2
                }
            },
            "sleep": {
                "quality": {
                "terrible": false,
                "bad": false,
                "neutral": false,
                "satisfied": true,
                "excelent": false
                },
                "goToBed": "23:30",
                "wakeUp": "6:30"
            },
            _id: id
        })
    });
});