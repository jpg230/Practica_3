import OrderController from '../controllers/OrderController.js'
import ProductController from '../controllers/ProductController.js'
import RestaurantController from '../controllers/RestaurantController.js'
import * as RestaurantValidation from '../controllers/validation/RestaurantValidation.js'
import * as AuthMiddleware from '../middlewares/AuthMiddleware.js'
import { handleFilesUpload } from '../middlewares/FileHandlerMiddleware.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import * as RestaurantMiddleware from '../middlewares/RestaurantMiddleware.js'
import { checkEntityExists } from '../middlewares/EntityMiddleware.js'
import { Restaurant } from '../models/models.js'
const loadFileRoutes = function (app) {
  app.route('/restaurants')
    .get(
      RestaurantController.index)
    .post(
    // TODO: Add needed middlewares
      AuthMiddleware.isLoggedIn,
      AuthMiddleware.hasRole('owner'),
      handleFilesUpload(['logo', 'heroImage'], process.env.RESTAURANTS_FOLDER),
      RestaurantValidation.create,
      handleValidation,
      RestaurantController.create)

  app.route('/restaurants/:restaurantId')
    .get(
    // TODO: Add needed middlewares
      checkEntityExists(Restaurant, 'restaurantId'),

      RestaurantController.show)
    .put(
      AuthMiddleware.isLoggedIn,
      AuthMiddleware.hasRole('owner'),
      handleFilesUpload(['logo', 'heroImage'], process.env.RESTAURANTS_FOLDER),
      RestaurantMiddleware.checkRestaurantOwnership,
      RestaurantValidation.update,
      handleValidation,
      RestaurantController.update)
    .delete(
      AuthMiddleware.isLoggedIn,
      AuthMiddleware.hasRole('owner'),
      checkEntityExists(Restaurant, 'restaurantId'),
      RestaurantMiddleware.checkRestaurantOwnership,
      RestaurantMiddleware.restaurantHasNoOrders, // ¡Aquí usamos tu middleware! No se puede borrar si hay pedidos
      RestaurantController.destroy)

  app.route('/restaurants/:restaurantId/orders')
    .get(
    // TODO: Add needed middlewares
      AuthMiddleware.isLoggedIn,
      AuthMiddleware.hasRole('owner'),
      RestaurantMiddleware.checkRestaurantOwnership, // Solo el dueño puede ver los pedidos
      OrderController.indexRestaurant)

  app.route('/restaurants/:restaurantId/products')
    .get(
    // TODO: Add needed middlewares
      ProductController.indexRestaurant)

  app.route('/restaurants/:restaurantId/analytics')
    .get(
    // TODO: Add needed middlewares
      AuthMiddleware.isLoggedIn,
      AuthMiddleware.hasRole('owner'),
      RestaurantMiddleware.checkRestaurantOwnership, // Solo el dueño puede ver las analíticas
      OrderController.analytics)
}
export default loadFileRoutes
