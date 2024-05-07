const factorialOf = (number) => {
  let output = 1;
  for (let i = 2; i <= number; i++) {
    output = output * i;
  }
  return output;
};

const binomialkoeffizient = (n, i) => {
  let output;
  if (i <= n) {
    output = factorialOf(n) / (factorialOf(i) * factorialOf(n - i));
  }
  return output;
};

const bernsteinpolynome = (grad, i, t) => {
  return binomialkoeffizient(grad, i) * t ** i * (1 - t) ** (grad - i);
};
