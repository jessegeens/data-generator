const fs = require('fs');
const faker = require('faker');
var convert = require('xml-js');

const header = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\
<TrainingCenterDatabase xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation\
="http://www.garmin.com/xmlschemas/ActivityExtension/v2 http://www.garmin.com/xmlschemas/ActivityExtensionv2.xsd http://www.garmin.com/xmlschemas/TrainingCenterDat\
abase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd">\
'

const footer = '\n</TrainingCenterDatabase>'

const noOfFields = process.argv[2];
const outputPath = process.argv[3];

if(noOfFields == undefined || outputPath == undefined) {
    console.log("Please specify how many fields to generate and an output file path");
}

let avgHeartRate = faker.datatype.number({min: 140, max: 180});
let maxHeartRate = faker.datatype.number({min: avgHeartRate, max: avgHeartRate + 20})
let distance =  faker.datatype.number({min: 5000, max: noOfFields * 25 + 5000});

let data = {
    Activities: {
        Activity: {
            Id: new Date(faker.date.past(3).getTime()).toISOString(),
            Lap: {
                _attributes: {
                    StartTime: faker.date.past(3).getTime(),
                },
                TotalTimeSeconds: faker.datatype.number({min: distance * 3, max: distance * 8}),
                DistanceMeters: distance,
                MaximumSpeed: faker.datatype.number({min: 5, max: 20}),
                Calories: faker.datatype.number(1000),
                AverageHeartRateBpm: {
                    _attributes: {
                        "xsi:type": "HeartRateInBeatsPerMinute_t"
                    },
                    Value: avgHeartRate
                },
                MaximumHeartRateBpm: {
                    _attributes: {
                        "xsi:type": "HeartRateInBeatsPerMinute_t"
                    },
                    Value: maxHeartRate
                },
                Intensity: "Active",
                Cadence: faker.datatype.number({min: 50, max: 120}),
                TriggerMethod: "Location",
                Track: {
                    TrackPoint: []
                }
            }
        }
    }
};

let initialTime = faker.date.past(3).getTime();

for (let i = 0; i < noOfFields; i++) {
    let field = {
            Time: new Date(initialTime + i * 5000).toISOString(), // Save every 5s
            Position: {
                LatitudeDegrees: 40.7780135,
                LongitudeDegrees: -73.9665795 + i / 10000
            },
            DistanceMeters: (distance / noOfFields) * i,
            HeartRateBpm: {
                _attributes: {
                    "xsi:type": "HeartRateInBeatsPerMinute_t"
                },
                Value: faker.datatype.number({min: avgHeartRate - 30, max: maxHeartRate}),
            },
            SensorState: "Absent"
        };
    
    data.Activities.Activity.Lap.Track.TrackPoint.push(field);
    if (i % 100 == 0) console.log(`Generated ${i} / ${noOfFields}`)
}

writeToFile(data, outputPath)


function writeToFile(obj, path) {
    let json = JSON.stringify(obj);
    let options = {compact: true, ignoreComment: true, spaces: 4};
    let result = header + convert.json2xml(json, options) + footer;
    try {
        fs.writeFileSync(path, result);
        console.log("Finished succesfully!");
      } catch (err) {
        console.error(err);
      }     
}
