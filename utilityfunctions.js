const factorialOf = (number) => {
  let output = 0;
  for (let i = 1; i <= number; i++) {
    output += i;
  }
  return output;
};
