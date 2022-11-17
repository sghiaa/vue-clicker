const formatNumber = (n: number): String => {
  const magnitude = n.toString().length - 1;
  if(magnitude < 3) {
    return "" + n;
  }
  const base = parseFloat((n / Math.pow(10, magnitude)).toFixed(Math.min(magnitude, 2)));
  return base + "e" + magnitude;
}

export {
  formatNumber,
}