function average(numbers) {
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

function max(numbers) {
  return numbers.reduce((best, n) => (n > best ? n : best), -Infinity);
}

function min(numbers) {
  // BUG: comparison is reversed, so this returns the max, not the min.
  return numbers.reduce((best, n) => (n > best ? n : best), -Infinity);
}

module.exports = { average, max, min };
