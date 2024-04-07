import { VendorPayLoad } from './vendor.dto';
import { CustomerPayload } from './Customer.dto';

export type AuthPayLoad = VendorPayLoad | CustomerPayload;