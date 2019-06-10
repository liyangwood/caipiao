declare var test, expect;

import {math} from '../';

test('math.sum method', ()=>{
  const t = [1,2,3,4];

  const rs = math.sum(t);
  expect(rs).toEqual(10);
});
test('math.average method', ()=>{
  const t = [1,2,3,4];

  const rs = math.average(t);
  expect(rs).toEqual(2);
});
test('math.middle method', ()=>{
  const t = [1,2,3,4];

  const rs = math.middle(t);
  expect(rs).toEqual(2.5);
});
test('math.odd method', ()=>{
  const t = [1,2,3,4];

  const rs = math.odd(t);
  expect(rs).toEqual([1,3]);
});
test('math.even method', ()=>{
  const t = [1,2,3,4];

  const rs = math.even(t);
  expect(rs).toEqual([2,4]);
});

test('math.inRange method', ()=>{
  const t = [1,2,3,4];

  const rs = math.inRange(t, 2, 4);
  expect(rs).toEqual([2,3]);
});

test('math.getPrime method', ()=>{
  const rs = math.getPrime(34);
  expect(rs).toEqual([ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31 ]);
});

test('math.getPrimeFromRange method', ()=>{
  const rs = math.getPrimeFromRange(13, 34);
  expect(rs).toEqual([ 13, 17, 19, 23, 29, 31 ]);

  const rs1 = math.getPrimeFromRange(15);
  expect(rs1).toEqual([ 2,3,5,7,11,13 ]);
});

test('math.checkPrime method', ()=>{
  const t1 = math.checkPrime(313);
  const t2 = math.checkPrime(255);
  const t3 = math.checkPrime(10);
  expect(t1).toBe(true);
  expect(t2).toBe(false);
  expect(t3).toBe(false);

  expect(math.checkPrime(1)).toBe(false);
  expect(math.checkPrime(2)).toBe(true);
  expect(math.checkPrime(2.5)).toBe(false);
});