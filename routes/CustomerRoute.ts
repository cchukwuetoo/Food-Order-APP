import express, { Request, Response, NextFunction } from 'express';
import { CustomerLogin, CustomerSignUp, CustomerVerify, EditCustomerProfile, GetCustomerProfile, RequestOtp } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();


//Signup / Create Customer
router.post('/signup', CustomerSignUp)

//Login
router.post('/login', CustomerLogin)


//Authentication
router.use(Authenticate)

//Verify Customer's account
router.patch('/verify', CustomerVerify)


//OTP / Requesting OTP
router.get('/otp', RequestOtp)


//Profile
router.get('/profile', GetCustomerProfile)

router.patch('/profile', EditCustomerProfile)

//cart
//order
//payment




export { router as CustomerRoute };