"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.ShoppingRoute = router;
//food availability
router.get('/:pinCode', controllers_1.GetFoodAvailability);
//top resturant
router.get('/top-resturants/:pinCode', controllers_1.GetTopResturants);
//food avaliable in 30 minutes
router.get('/foods-in-30-min/:pinCode', controllers_1.GetFoodsIn30Min);
//search foods
router.get('/search/:pinCode', controllers_1.SearchFoods);
// find resturants by ID
router.get('/resturant/:id', controllers_1.ResturantsById);
//# sourceMappingURL=ShoppingRoute.js.map