/*const {getMonthlySummary,getTrends} = require("./summary.service");

//Monthly Summary
const monthlySummary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;

    const data = await getMonthlySummary(userId,Number(month),Number(year));
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};
//Trends
const trends = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const data = await getTrends(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  monthlySummary,
  trends,
};*/

const service = require("./summary.service");
const { successResponse } = require("../../utils/response");
const STATUS = require("../../utils/statusCodes");
const MSG = require("../../utils/messages");

// Monthly Summary
const monthlySummary = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const data = await service.getMonthlySummary(
      userId,
      req.query
    );

    return successResponse(
      res,
      data,
      MSG.SUCCESS.FETCHED,
      STATUS.OK
    );
  } catch (err) {
    next(err);
  }
};

// Trends
const trends = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const data = await service.getTrends(userId);

    return successResponse(
      res,
      data,
      MSG.SUCCESS.FETCHED,
      STATUS.OK
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  monthlySummary,
  trends,
};