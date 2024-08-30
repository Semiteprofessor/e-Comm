
const { registerUserValidation } = require("../validations/user.vdn");

const register = async (req, res) => {
  try {
    const { error } = registerUserValidation(req.body);
    if (error !== undefined)
      return res.status(401).json({
        status: true,
        message: error.details[0].message || "Bad request",
      });

      const alreadyExist= UserModel
  } catch (error) {}
};
