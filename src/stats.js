function average(numbers) {
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

function max(numbers) {
  return numbers.reduce((best, n) => (n > best ? n : best), -Infinity);
}

module.exports = { average, max };
