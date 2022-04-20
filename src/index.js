const fs = require('fs');
const faker = require('faker');

const noOfFields = process.argv[2];
const outputPath = process.argv[3];

if(noOfFields == undefined || outputPath == undefined) {
    console.log("Please specify how many fields to generate and an output file path");
}

let data = {};


data.accountOwner = faker.name.findName()
data.IBAN = faker.finance.iban();
data.saldo = faker.datatype.number(100000);
data.currency = "EUR";
data.history = [];

for (let i = 0; i < noOfFields; i++) {
    let field = {};
    if (faker.datatype.boolean()) {
        field.from = faker.finance.iban()
        field.from_name = faker.name.findName()
        field.to = data.IBAN;
        field.to_name = data.accountOwner;
    } else {
        field.to = faker.finance.iban()
        field.to_name = faker.name.findName()
        field.from = data.IBAN;
        field.from_name = data.accountOwner;
    }
    field.amount = faker.datatype.number(1000);
    field.timestamp = faker.date.past(3).getTime();
    field.description = faker.random.words(faker.datatype.number(8))
    data.history.push(field);
    if (i % 100 == 0) console.log(`Generated ${i} / ${noOfFields}`)
}

writeToFile(data, outputPath)


function writeToFile(obj, path) {
    let json = JSON.stringify(obj);
    try {
        fs.writeFileSync(path, json);
        console.log("Finished succesfully!");
      } catch (err) {
        console.error(err);
      }     
}
