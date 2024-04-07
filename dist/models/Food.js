"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const FoodSchema = new mongoose_1.Schema({
    vendorId: { type: String },
    name: { type: String, required: true },
    description: { type: String, required: true },
    foodType: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
    readyTime: { type: Number },
    rating: { type: Number },
    images: { type: [String] }
}, {
    toJSON: {
        transform(docs, ret) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});
const Food = mongoose_1.default.model('food', FoodSchema);
exports.Food = Food;
//# sourceMappingURL=Food.js.map