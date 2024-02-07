const { check, validationResult } = require('express-validator');
const { notify } = require('../routes');
const httpStatus = require('http-status');


const addProductValidator = [
    check('images')
    .trim().not().isEmpty().withMessage('Anda perlu memasukan gambar produk').bail(),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: errors.array()
            })
        }
        next();
    }
];


module.exports = {
    addProductValidator
}