import express, { Request, Response, NextFunction } from 'express';
import { GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorLogin } from '../controllers';

const router = express.Router();

router.post('/login', VendorLogin);

router.get('/profile', GetVendorProfile)
router.patch('/profile', UpdateVendorProfile)
router.patch('/service', UpdateVendorService)

router.get('/', (req: Request, res: Response, next: NextFunction) => {


    return res.json({message: "Hello from Admin"})

    
})

export { router as VendorRoute };