import * as _ from 'lodash';


export const sum = (num: number[])=>{
  return _.sum(num);
};

export const average = (num: number[])=>{
  const x = sum(num);
  return _.floor(x/num.length);
}

export const middle = (num: number[])=>{
  const min = _.min(num);
  const max = _.max(num);

  return (min+max) / 2;
}

export const odd = (num: number[])=>{
  return _.filter(num, x=>x%2===1);
}

export const even = (num: number[])=>{
  return _.filter(num, x=>x%2===0);
}

export const inRange = (num: number[], min: number, max:number)=>{
  return _.filter(num, x=>_.inRange(x, min, max));
}