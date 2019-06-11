import * as _ from 'lodash';

import {factorial} from './math';

// TODO 概率公式不对，有待研究
export default (n: number, rate: number)=>{
  let rs = (Math.E ** -(rate * (n-1))) * (((n-1)*rate) ** n) / factorial(n);

  return rs;
}