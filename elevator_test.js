const assert = require('assert');
const {timeUpAndDown, mapBatchesToTripTimes, sum, maxSubSum, balanceBatches, elevator} = require('./elevator.js');

describe('Elevator program', () => {

  describe('timeUpAndDown', () => {
    it('should return total trip time (int) given an array of destination floors (arr of ints)', () => {
      const speedUp = 2;
      const speedDown = 1;
      const destinations = [1,2,3,4];
      const tripTime = 12;
      assert.equal(timeUpAndDown(destinations, speedUp, speedDown), tripTime);
    });
  });

  describe('mapBatchesToTripTimes', () => {
    it('should return arr of objects ({tripTime: int, floors: arr}) given an array of batches (arr of arrs of ints)', () => {
      const batches = [[1,1], [2,3]];
      const expectedResult = [{tripTime: 3, floors: [1,1]}, {tripTime: 9, floors: [2,3]}];
      assert.deepEqual(mapBatchesToTripTimes(batches), expectedResult);
    });
  });

  describe('sum', () => {
    it('should return sum of trip times given array of objects with property tripTime', () => {
      const arr = [{tripTime: 10}, {tripTime: 20}];
      const expectedResult = 30;
      assert.equal(sum(arr), expectedResult);
    });
  });

  describe('maxSubSum', () => {
    it('should return max of subarray trip time sums, given array of arrays of objects with property tripTime', () => {
      const arr = [[{tripTime: 10}, {tripTime: 20}], [{tripTime: 5}, {tripTime: 15}]];
      const expectedResult = 30;
      assert.equal(maxSubSum(arr), expectedResult);
    });
  });

  describe('balanceBatches', () => {
    it('should return array containing array of batch objects for each elevator, given an array of batch objects and number of elevators', () => {
      const arr = [ {tripTime: 3},
                    {tripTime: 6},
                    {tripTime: 14},
                    {tripTime: 19}
                  ];
      const expectedResult = [[ {tripTime: 3},
                                {tripTime: 19}
                              ],[
                                {tripTime: 6},
                                {tripTime: 14}
                              ]];
      assert.deepEqual(balanceBatches(arr, 2), expectedResult);
    });
  });

  describe('elevator', () => {
    it('should throw an error with invalid input', () => {
      const m = 2;
      const n = 5;
      const q = 2;
      const queue = [1,1,100,3,6,2];
      assert.throws(() => elevator(m, n, q, queue), Error, 'Invalid inputs');
    });
    it('should return an object with minimum total time to transport all passengers and elevator trip logs', () => {
      const m = 2;
      const n = 5;
      const q = 2;
      const queue = [3, 1, 2, 4]; //will be batched [1,2] for el #1, and [3,4] for el #2.
      const expectedResult = {
        totalTime: 12,
        elevatorLogs: [
          [{tripTime: 6, floors: [1,2]}], //elevator 1 log, where each object represents one trip
          [{tripTime: 12, floors: [3,4]}]  //elevator 2 log, where each object represents one trip
        ]
      };
      assert.deepEqual(elevator(m, n, q, queue), expectedResult);
    });
  });

});
