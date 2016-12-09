const elevator = require('./elevator').elevator;

//read file passed as argument to program, encode as string and split on newline
const fs = require('fs');
const buffer = fs.readFileSync(process.argv[2], {encoding: 'UTF-8'});
const split = buffer.split('\n');

//total elevators in building (m)
const elevators = parseFloat(split[0]);

//total floors in building (n)
const floors = parseFloat(split[1]);

//max people/elevator (q)
const elevatorCapacity = parseFloat(split[2]);

//array of destination floors:
const queue = split[3].split(',').map(n => parseFloat(n));

//call elevator function with parsed inputs:
const output = elevator(elevators, floors, elevatorCapacity, queue);

//writes JSON-stringified output to output.txt;
fs.writeFile('output.txt', JSON.stringify(output), function (err) {
  if (err) console.log(err);
  else console.log('Succesfully wrote to output.txt');
});
