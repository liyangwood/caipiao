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

export const getPrime = (maxNumber) => {
  const isPrime = new Array(maxNumber + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  const primes = [];

  for (let number = 2; number <= maxNumber; number += 1) {
    if (isPrime[number] === true) {
      primes.push(number);

      /*
       * Optimisation.
       * Start marking multiples of `p` from `p * p`, and not from `2 * p`.
       * The reason why this works is because, at that point, smaller multiples
       * of `p` will have already been marked `false`.
       *
       * Warning: When working with really big numbers, the following line may cause overflow
       * In that case, it can be changed to:
       * let nextNumber = 2 * number;
       */
      let nextNumber = number * number;

      while (nextNumber <= maxNumber) {
        isPrime[nextNumber] = false;
        nextNumber += number;
      }
    }
  }

  return primes;
}

export const getPrimeFromRange = (min: number, max?:number)=>{
  const minNumber = _.isUndefined(max) ? 2 : min;
  const maxNumber = _.isUndefined(max) ? min : max;
  
  const ori_prime = getPrime(maxNumber);

  let n = 0;
  for(let i=0, len=ori_prime.length; i<len; i++){
    if(ori_prime[i] >= minNumber){
      n = i;
      break;
    }
  }

  return _.slice(ori_prime, n);
}

export const checkPrime = (number: number)=>{
  // Check if number is integer.
  if (number % 1 !== 0) {
    return false;
  }

  if (number <= 1) {
    // If number is less than one then it isn't prime by definition.
    return false;
  }

  if (number <= 3) {
    // All numbers from 2 to 3 are prime.
    return true;
  }

  // If the number is not divided by 2 then we may eliminate all further even dividers.
  if (number % 2 === 0) {
    return false;
  }

  // If there is no dividers up to square root of n then there is no higher dividers as well.
  const dividerLimit = Math.sqrt(number);
  for (let divider = 3; divider <= dividerLimit; divider += 2) {
    if (number % divider === 0) {
      return false;
    }
  }

  return true;
}

export const factorial = (n: number)=>{
  let rs = 1;
  for(let i=1; i<n+1; i++){
    rs *= i;
  }
  return rs;
}