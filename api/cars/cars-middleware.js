const db = require("../../data/db-config");
const Car = require("../cars/cars-model");
const vinValidator = require('vin-validator');



const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id);
    if (!car) {
      res.status(404).json({ message: `car with id ${req.params.id} is not found` });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (
    vin === undefined ||
    make === undefined ||
    model === undefined ||
    mileage === undefined
  ) {
    next({ status: 400, message: `"${req.body} is missing"` });
  }
  next();
};

const checkVinNumberValid = async(req, res, next) => {
  const isValidVin = await vinValidator.validate(req.body.vin)
  if (isValidVin === false){
    next({status: 400, message: `vin ${rew.body.vin} is invalid`})
  }
  next()
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const exists = await db("cars").where("vin", req.body.vin.trim()).first();

    if (exists) {
      next({ status: 400, message: `"vin $ already exists"` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
