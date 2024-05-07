const factorialOf = (number) => {
  let output = 0;
  for (let i = 1; i <= number; i++) {
    output += i;
  }
  return output;
};

const bernsteinpolynome = (canvas, n, i, t) => {
  canvas.print(binomialkoeffizient(n, i) * t ** i * (1 - t) ** (n - i));
};
