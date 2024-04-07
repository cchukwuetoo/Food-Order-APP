import express, { Request, Response, NextFunction } from 'express';
import { GetFoodAvailability, GetFoodsIn30Min, GetTopResturants, ResturantsById, SearchFoods } from '../controllers';


const router = express.Router();

//food availability
router.get('/:pinCode', GetFoodAvailability)

//top resturant
router.get('/top-resturants/:pinCode', GetTopResturants)

//food avaliable in 30 minutes
router.get('/foods-in-30-min/:pinCode', GetFoodsIn30Min)

//search foods
router.get('/search/:pinCode', SearchFoods)

// find resturants by ID
router.get('/resturant/:id', ResturantsById)

export { router as ShoppingRoute };