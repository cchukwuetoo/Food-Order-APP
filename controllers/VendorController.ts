import { Request, Response, NextFunction } from 'express';
import { EditVendorInput, VendorLoginInputs } from '../dto';
import { FindVendor } from './AdminController';
import { GenerateSignature, ValidatePassword } from '../utility';
import { CreateFoodInputs } from '../dto/Food.dto';
import { Food } from '../models';

export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = <VendorLoginInputs>req.body;
    const existingVendor = await FindVendor('', email);

    if(existingVendor !== null){
        const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt);
        if (validation) {
            const signature = GenerateSignature({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodTypes: existingVendor.foodType,
                name: existingVendor.name,
            })
            return res.json(signature);
        } else {
            return res.json({"message": "password not vaild"})
        }
    }

    return res.json({"message": "Login credential not vaild"})
}

export const GetVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVendor = await FindVendor(user._id)
        return res.json(existingVendor)
    }
    return res.json({"message": "Vendor information not found"})
}


export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, phone, foodTypes } = <EditVendorInput>req.body;
    const user = req.user;
    if (user) {
        const existingVendor = await FindVendor(user._id)
        if (existingVendor !== null) {
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodTypes;

            const savedResult = await existingVendor.save()
            return res.json(savedResult)
        }
        return res.json(existingVendor)
    }
    return res.json({"message": "Vendor information not found"})
}

export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVendor = await FindVendor(user._id)
        if (existingVendor !== null) {
           
             existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
             const savedResult = await existingVendor.save()
             return res.json(savedResult)
        }
        return res.json(existingVendor)
    }
    return res.json({"message": "Vendor information not found"})
}


export const AddFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const { name, description, foodType, readyTime, price, catergory} = <CreateFoodInputs>req.body;
        const vendor = await FindVendor(user._id)
        if (vendor !== null) {
            const files = req.files as [Express.Multer.File]

            const images = files.map((file: Express.Multer.File) => file.filename);
            const createdFood = await Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                catergory: catergory,
                foodType: foodType,
                images: images,
                readyTime: readyTime,
                price: price,
                rating: 0
            })

            vendor.foods.push(createdFood);
            const result = await vendor.save()
            return res.json(result);
        }
    }
    return res.json({"message": "Something went wrong with add food"})
}



export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const foods = await Food.find({vendorId: user._id})

        if (foods !== null) {
            return res.json(foods)
        }
    }
    return res.json({"message": "Food information not found"})
}

