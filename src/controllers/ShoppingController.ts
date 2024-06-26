import express, { Request, Response, NextFunction } from 'express';
import { Vendor, FoodDoc } from '../models'


export const GetFoodAvailability = async (req: Request, res: Response, next: NextFunction) =>{


    const pinCode = req.params.pinCode;

    const result = await Vendor.find({pinCode: pinCode, serviceAvailable: false})
    .sort([['rating', 'descending']])
    .populate("foods")

    if(result.length > 0){
        return res.status(200).json(result)
    }

    return res.status(400).json({ message: "Data Not Found!" })
}


export const GetTopResturants = async (req: Request, res: Response, next: NextFunction) =>{
    

    const pinCode = req.params.pinCode;

    const result = await Vendor.find({pinCode: pinCode, serviceAvailable: false})
    .sort([['rating', 'descending']])
    .limit(1)

    if(result.length > 0){
        return res.status(200).json(result)
    }

    return res.status(400).json({ message: "Data Not Found!" })
}

export const GetFoodsIn30Min = async (req: Request, res: Response, next: NextFunction) =>{
    const pinCode = req.params.pinCode;

    const result = await Vendor.find({pinCode: pinCode, serviceAvailable: false})
    .populate("foods")

    if(result.length > 0){

        let foodResult: FoodDoc [] = [];

        result.map(vendor => {
            const foods = vendor.foods as [FoodDoc];

            foodResult.push(...foods.filter(food => food.readyTime <= 30));
        })

        return res.status(200).json(foodResult)
    }

    return res.status(400).json({ message: "Data Not Found!" })
}

export const SearchFoods = async (req: Request, res: Response, next: NextFunction) =>{
    const pinCode = req.params.pinCode;

    const result = await Vendor.find({pinCode: pinCode, serviceAvailable: false})
    .populate("foods")

    if(result.length > 0){

        let foodResult: FoodDoc [] = [];

        result.map(vendor => {
            const foods = vendor.foods as [FoodDoc];

            result.map(item => foodResult.push(...item.foods))
        })

        return res.status(200).json(foodResult)
    }

    return res.status(400).json({ message: "Data Not Found!" })
}

export const ResturantsById = async (req: Request, res: Response, next: NextFunction) =>{
    const id = req.params.id;

    const result = await Vendor.findById(id).populate("foods")

    if(result){
        return res.status(200).json(result)
    }

    return res.status(400).json({ message: "Data Not Found!" })
}