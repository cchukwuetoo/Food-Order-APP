import mongoose, { Schema, Document } from 'mongoose';

export interface FoodDoc extends Document {
    vendorId: string;
    name: string;
    description: string;
    foodType: string;
    category: string;
    price:  number;
    readyTime: number;
    rating: number;
    images: [string];
    
}

const FoodSchema = new Schema ({
    vendorId: {type: String},
    name: { type: String, required: true },
    description: { type: String, required: true },
    foodType: { type: String, required: true },
    category: { type: String },
    price:  { type: Number, required: true },
    readyTime: { type: Number },
    rating: { type: Number },
    images: { type:  [String]}

}, {
    toJSON: {
        transform(docs, ret){
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true  
})

const Food = mongoose.model<FoodDoc>('food', FoodSchema)

export {Food};