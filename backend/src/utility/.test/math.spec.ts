declare var test, expect;

import {math} from '../';

test('math.sum method', ()=>{
  const t = [1,2,3,4];

  const rs = math.sum(t);
  expect(rs).toEqual(10);
});

test('math.getPrime method', ()=>{
  const rs = math.getPrime(34);
  expect(rs).toEqual([ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31 ]);
});

test('math.getPrimeFromRange method', ()=>{
  const rs = math.getPrimeFromRange(13, 34);
  expect(rs).toEqual([ 13, 17, 19, 23, 29, 31 ]);
});

test('math.checkPrime method', ()=>{
  const t1 = math.checkPrime(313);
  const t2 = math.checkPrime(255);
  expect(t1).toBe(true);
  expect(t2).toBe(false);
});