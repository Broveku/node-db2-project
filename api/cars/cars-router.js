const express = require('express')
const Car = require('./cars-model')

const router = express.Router()

const {
    checkCarId,
    checkVinNummberUnique,
    checkCarPayload,
    checkVinNumberValid
} = require('./cars-middleware')


router.get('/', async (req, res, next)=>{
    try{
        const all = await Car.getAll()
        res.json(all)
    }catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, (req, res, next)=>{
    res.json(req.car)
})

router.post('/', async (req, res, next)=>{
    try{
        const newCar = await Car.create({
            vin: req.body.vin,
            make: req.body.make.trim(),
            model: req.body.model.trim(),
            mileage: req.body.mileage,
            title: req.body.title.trim(),
            transmission: req.body.transmission.trim()

        })
        res.status(201).json(newCar)
    } catch (err){
        next(err)
    }
})

module.exports = router