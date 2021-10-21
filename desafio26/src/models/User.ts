import { Document, Schema, model } from "mongoose";

export interface User extends Document {
    username: string,
    password: string
}

const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default model<User>("UserMongo", UserSchema);
