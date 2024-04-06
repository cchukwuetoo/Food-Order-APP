import { VendorPayLoad } from './vendor.dto';
import { CustomerPayLoad } from './Customer.dto'

export type AuthPayLoad = VendorPayLoad | CustomerPayLoad;