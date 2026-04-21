const repo = require("./summary.repository");

// Monthly Summary
const getMonthlySummary = async (userId, query) => {
  const { month, year } = query;

  const result = await repo.getMonthlySummary(
    userId,
    Number(month),
    Number(year)
  );

  return result[0] || { totalSpend: 0, categories: [] };
};

// Trends
const getTrends = async (userId) => {
  return repo.getTrends(userId);
};

module.exports = {
  getMonthlySummary,
  getTrends,
};