import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true},
    // cart: {
    //     items: [
    //         {
    //             productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    //             quantity: { type: Number, required: true }
    //         }
    //     ]
    // }
}, {
    timestamps: true  // timestamps are added by default
});

const User = mongoose.model('User', userSchema);

export default User;

