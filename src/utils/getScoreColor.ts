const getScoreColor = (score: string) => {
  const numScore = parseInt(score, 10);
  if (numScore >= 75) return '#66cc33';
  if (numScore >= 50) return '#ffcc33';
  return '#ff0000';
};

export default getScoreColor;