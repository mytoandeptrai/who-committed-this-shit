import Decimal from 'decimal.js';

const sum = (a: number, b: number) => {
  const result = new Decimal(a).add(b);
  return result;
};

const subtract = (a: number, b: number) => {
  const result = new Decimal(a).sub(b);
  return result;
};

const multiply = (a: number, b: number) => {
  const result = new Decimal(a).mul(b);
  return result;
};

const divide = (a: number, b: number) => {
  const result = new Decimal(a).div(b);
  return result;
};

export { divide, multiply, subtract, sum };
