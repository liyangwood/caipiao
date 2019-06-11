declare var test, expect;

import {poissonRandom} from '../';

test('poissonRandom', ()=>{
  const n = 101;
  const r = 0.2;

  const rs = poissonRandom(n, r);
  expect(rs).toBe(true);
});
