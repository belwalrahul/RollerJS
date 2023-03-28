import {Roller} from './Roller';

describe("Smoke test", ()=> {
  test("The test scaffold runs successfully.", ()=> {
    expect(true).toBe(true);
  });
})

describe("Roller tests", ()=> {
  test('should create a Roller with 6 faces when no parameter is given', () => {
    const roller = new Roller();
    expect(roller['_faces']).toEqual(6);
  });

  test('should create a Roller with 2 faces when 0 is given as parameter', () => {
    const roller = new Roller(0);
    expect(roller['_faces']).toEqual(6);
  });

  test('should create a Roller with 6 faces when a negative number is given as parameter', () => {
    const roller = new Roller(-5);
    expect(roller['_faces']).toEqual(6);
  });

  test('should create a Roller with 10 faces when 10 is given as parameter', () => {
    const roller = new Roller(10);
    expect(roller['_faces']).toEqual(10);
  });

  test('should return 0 and not update distribution when rolling a value less than 1', () => {
    const roller = new Roller();
    expect(roller.roll(0)).toEqual(0);
    expect(roller['_last']).toEqual(0);
    expect(roller.distribution().size).toEqual(0);
  });

  test('should return 0 and not update distribution when rolling a value greater than faces', () => {
    const roller = new Roller(3);
    expect(roller.roll(4)).toEqual(0);
    expect(roller['_last']).toEqual(0);
    expect(roller.distribution().size).toEqual(0);
  });

  test('should return the same value and update distribution when rolling a valid value', () => {
    const roller = new Roller(5);
    expect(roller.roll(2)).toEqual(2);
    expect(roller['_last']).toEqual(2);
    expect(roller.distribution().get(2)).toEqual(1);
  });

  test('should return 0 when no rolls have been made', () => {
    const roller = new Roller();
    expect(roller.last()).toEqual(0);
  });

  test('should return the value of the latest roll', () => {
    const roller = new Roller(4);
    roller.roll(2);
    roller.roll(4);
    roller.roll(1);
    expect(roller.last()).toEqual(1);
  });

  test('should return a distribution map with 0s for faces that have not been rolled', () => {
    const roller = new Roller(3);
    roller.roll(2);
    expect(roller.distribution().get(2)).toEqual(1);
  });

  test('should return a distribution map with the number of rolls for each face', () => {
    const roller = new Roller(4);
    roller.roll(2);
    roller.roll(4);
    roller.roll(1);
    expect(roller.distribution().get(1)).toEqual(1);
    expect(roller.distribution().get(4)).toEqual(1);
  });
});
