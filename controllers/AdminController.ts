import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility';

export const FindVendor = async (id: string | undefined, email?: string) => {
    if(email){
        return await Vendor.findOne({email:email})
    }else{
        return await Vendor.findById(id)
    }
}


export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    
    const { name, address, pinCode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body;


    const existingVendor = await FindVendor('', email);
    if(existingVendor !== null){
        return res.json({"message": "A vendor exists with this mail"})
    }


    //generate salt
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    //encrypt the password using salt


    const createVendor = await  Vendor.create({
        name: name,
        address: address,
        pinCode: pinCode,
        foodType: foodType,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
        foods: [],
    })


    return res.json(createVendor)
}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
    const vendors = await Vendor.find()

    if(vendors !== null){
        return res.json(vendors)
    }

    return res.json({"message": "vendors data not available!"})
}

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
   const vendorId = req.params.id;
   
   const vendor = await FindVendor(vendorId);

   if(vendor !== null){
    return res.json(vendor)
}

return res.json({"message": "vendor data not available!"})


}