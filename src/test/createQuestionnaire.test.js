const {createQuestionnaire} = require('../controllers/questionnaires/postQuestionnaireController');

describe('create questionnaire', () => {
    test('given an invalid input it should return null', async () => {
        const data = {
            userId: 1,
            field1: 123,
            field2: 'abc'
        };
        const InvalidQuestionnaire = class{
            validateSync(){
                return "Error";
            }
        };
        expect(await createQuestionnaire(InvalidQuestionnaire, data)).toBeNull();
    });
    
    test('given a valid input it should return the new quiestionnaire', async () => {
        const data = {
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
            }
        };
        const ValidQuestionnaire = class{
            constructor(data){
                this.data = {...data};
                this.data._id = "620ba910d39ded59c0bd695a";
            }
            validateSync(){
                return undefined;
            }
            save(){
                return this.data;
            }
        };
        const result = await createQuestionnaire(ValidQuestionnaire, data);
        data._id = "620ba910d39ded59c0bd695a";
        expect(result).toEqual(data);
    });
});