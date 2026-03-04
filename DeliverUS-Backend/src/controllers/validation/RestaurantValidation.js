import { check } from 'express-validator'
import { checkFileIsImage, checkFileMaxSize } from './FileValidationHelper.js'
const maxFileSize = 2000000 // around 2Mb

const create = [
  check('name').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('description').optional({ nullable: true, checkFalsy: true }).isString().trim(),
  check('shippingCosts').exists().isFloat({ min: 0 }).toFloat(),
  check('heroImage').custom((value, { req }) => {
    return checkFileIsImage(req, 'heroImage')
  }).withMessage('Please upload an image with format (jpeg, png).'),
  check('heroImage').custom((value, { req }) => {
    return checkFileMaxSize(req, 'heroImage', maxFileSize)
  }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB'),
  check('logo').custom((value, { req }) => {
    return checkFileIsImage(req, 'logo')
  }).withMessage('Please upload an image with format (jpeg, png).'),
  check('logo').custom((value, { req }) => {
    return checkFileMaxSize(req, 'logo', maxFileSize)
  }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB'),
  // 1. Email (Opcional, pero si se pone, debe ser un email válido)
  check('email').optional({ nullable: true, checkFalsy: true }).isString().isEmail().trim(),
  // 2. Teléfono (Opcional, máximo 255 caracteres)
  check('phone').optional({ nullable: true, checkFalsy: true }).isString().isLength({ min: 1, max: 255 }).trim(),

  // 3. Dirección (Obligatoria)
  check('address').exists().isString().isLength({ min: 1, max: 255 }).trim(),

  // 4. Código Postal (Obligatorio)
  check('postalCode').exists().isString().isLength({ min: 1, max: 255 }).trim(),

  // 5. URL (Opcional, pero si se pone, debe tener formato de URL)
  check('url').optional({ nullable: true, checkFalsy: true }).isString().isURL().trim(),

  // 6. Categoría del Restaurante (Obligatorio, debe ser un número entero mayor que 0)
  check('restaurantCategoryId').exists().isInt({ min: 1 }).toInt(),
  check('userId').not().exists() // El userId no se puede enviar, se asignará automáticamente según el usuario autenticado
  // TODO: Complete validations
]
const update = [
  check('name').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('description').optional({ nullable: true, checkFalsy: true }).isString().trim(),
  check('shippingCosts').exists().isFloat({ min: 0 }).toFloat(),
  check('heroImage').custom((value, { req }) => {
    return checkFileIsImage(req, 'heroImage')
  }).withMessage('Please upload an image with format (jpeg, png).'),
  check('heroImage').custom((value, { req }) => {
    return checkFileMaxSize(req, 'heroImage', maxFileSize)
  }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB'),
  check('logo').custom((value, { req }) => {
    return checkFileIsImage(req, 'logo')
  }).withMessage('Please upload an image with format (jpeg, png).'),
  check('logo').custom((value, { req }) => {
    return checkFileMaxSize(req, 'logo', maxFileSize)
  }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB'),
  // TODO: Complete validations
  // 1. Email (Opcional, pero si se pone, debe ser un email válido)
  check('email').optional({ nullable: true, checkFalsy: true }).isString().isEmail().trim(),

  // 2. Teléfono (Opcional, máximo 255 caracteres)
  check('phone').optional({ nullable: true, checkFalsy: true }).isString().isLength({ min: 1, max: 255 }).trim(),

  // 3. Dirección (Obligatoria)
  check('address').exists().isString().isLength({ min: 1, max: 255 }).trim(),

  // 4. Código Postal (Obligatorio)
  check('postalCode').exists().isString().isLength({ min: 1, max: 255 }).trim(),

  // 5. URL (Opcional, pero si se pone, debe tener formato de URL)
  check('url').optional({ nullable: true, checkFalsy: true }).isString().isURL().trim(),

  // 6. Categoría del Restaurante (Obligatorio, debe ser un número entero mayor que 0)
  check('restaurantCategoryId').exists().isInt({ min: 1 }).toInt(),
  check('userId').not().exists() // El userId no se puede enviar, se asignará automáticamente según el usuario autenticado
]

export { create, update }
