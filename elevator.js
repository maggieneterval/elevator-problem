//constants: seconds/floor
const speedUp = 2;
const speedDown = 1;

//input: number of elevators (m), number of floors (n), people/elevator (q), queue of people's destination floors (read from input file)
//output: minimum total time to service all passengers, and array of elevator logs (written to output.txt)
function elevator (m, n, q, queue) {

  //check for valid inputs:
  if (isNaN(n) || isNaN(m) || isNaN(q)) throw new Error('Invalid inputs');

  //sort queue from least floor to greatest floor
  const sortedQueue = queue.sort((a, b) => a - b);

  //check if highest floor exceeds n
  if (sortedQueue[sortedQueue.length - 1] > n) throw new Error ('Invalid inputs');

  //break into q-size chunks
  const arrOfChunks = [];
  while (sortedQueue.length) {
    arrOfChunks.push(sortedQueue.splice(0, q));
  }

  //calculate trip time for each chunk
  const tripData = mapBatchesToTripTimes(arrOfChunks);

  //balance trips among elevators
  const batches = balanceBatches(tripData, m);

  //calculate max of total elevator trip times
  const max = maxSubSum(batches);

  //return object containing time to service all passengers and log of trips for each elevator:
  return {
    totalTime: max,
    elevatorLogs: batches
  };
}

//given an array of destination floors, calculates total time (in seconds) up and down
function timeUpAndDown (arrOfFloors, speedUp, speedDown) {
  let seconds = 0;
  let currFloor = 0;
  for (let i = 0; i < arrOfFloors.length; i++){
    seconds += speedUp * (arrOfFloors[i] - currFloor);
    currFloor = arrOfFloors[i];
  }
  seconds += speedDown * (currFloor - 0);
  return seconds;
}

//given an array of arrays of destination floors, returns an array of arrays of objects with trip time and floors visited
function mapBatchesToTripTimes (arrOfBatches) {
  return arrOfBatches.map(batch => ({tripTime: timeUpAndDown(batch, speedUp, speedDown), floors: batch }));
}

//given array, returns sum of trip times:
function sum (arr) {
  return arr.reduce(((acc, curr) => acc + curr.tripTime), 0);
}

//given array of arrays, returns max of subarray sums:
function maxSubSum (arr) {
  return arr.reduce((acc, curr) => Math.max(acc, sum(curr)), sum(arr[0]));
}

//given an array of objects (tripTime, floors) and m elevators, return an array of arrays where each subarray contains objects for the trips assigned that elevator,
//such that the sums of each elevators' trips' are close to equal (this assumes, often incorrectly, a close-to-normal distribution of trip times)
function balanceBatches (tripData, m) {
  const elevatorAssignments = [];
  while (tripData.length){
    for (let i = 0; i < m; i++){
      elevatorAssignments[i] = elevatorAssignments[i] || [];
      tripData[0] && elevatorAssignments[i].push(tripData.shift());
    }
    for (let j = 0; j < m; j++){
      tripData[tripData.length - 1] && elevatorAssignments[j].push(tripData.pop());
    }
  }
  return elevatorAssignments;
}

module.exports = {
  balanceBatches,
  elevator,
  mapBatchesToTripTimes,
  maxSubSum,
  sum,
  timeUpAndDown
};
