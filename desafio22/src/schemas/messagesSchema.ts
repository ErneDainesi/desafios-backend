import { Schema, model, Document } from "mongoose";

interface IMessages extends Document {
    email: string;
    message: string;
}

const messagesSchema = new Schema<IMessages>({
    email: {
        type: String,
        required: true
    },
    message: String
});

export default model<IMessages>('Message', messagesSchema);