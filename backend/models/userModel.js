import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

// Hashing password before saving it to the database
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// Hashing password before saving it to the database when creating a new user

userSchema.pre('save', async function (next) {
    // only hash the password if it has been modified (i.e., not from a pre-save hook)
    if (!this.isModified('password')){
        next();
    }
    // generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;

