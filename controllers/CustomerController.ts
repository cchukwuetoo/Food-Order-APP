import { ValidationError, validate } from 'class-validator';
import express, { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { CreatecustomerInputs } from '../dto/Customer.dto';
import { Customer } from '../models/Customer';
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOTP } from '../utility';




export const CustomerSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const customerInputs = plainToClass(CreatecustomerInputs, req.body)

    const inputErrors = await validate(customerInputs, { validationError: { target: true } });

    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }

    const { email, phone, password } = customerInputs;

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt )

    const { otp, expiry } = GenerateOtp();
    
    
    const result = await Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        otp: otp,
        otp_expiry: expiry,
        firstName: '',
        lastName: '',
        address:'',
        verified: false,
        lat: 0,
        lng: 0
    })

    if (result) {
        //send the otp to customer
        await onRequestOTP(otp, phone)

        //generate the signature
        const signature = GenerateSignature({
            _id: result._id,
            email: result.email,
            verified: result.verified
        })

        //send the result to client
        return res.status(201).json({
            signature: signature,
            verified: result.verified,
            email: result.email
        });

    }
    return res.status(400).json({message: 'Error with Signup'})
}

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {
    
}


export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    
}