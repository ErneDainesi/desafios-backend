import mongoose, { mongo } from 'mongoose';
import { MONGO_URL } from '../constants';
import UserSchema, { User } from '../models/User';

export class MongoDatabase {
    public static async connect() {
        try {
            await mongoose.connect(MONGO_URL, {});
            console.log("Connection to mongo database was established");
        } catch(err) {
            console.error(err);
            throw new Error("Connection to mongodb failed");
        }
    }

    public async insertUser(user: User) {
        const newUser = new UserSchema(user);
        try {
            await newUser.save();
        } catch(err) {
            console.error(err);
            throw new Error("Failed to save user");
        }
    }
}