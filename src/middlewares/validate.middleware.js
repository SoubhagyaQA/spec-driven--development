
const validate = (schema, type = "body") => {
  return (req, res, next) => {
    const data = req[type];
    const { error } = schema.validate(data);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    next();
  };
};

module.exports = validate;