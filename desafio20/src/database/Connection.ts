import mongoose, {MongooseOptions} from 'mongoose';

//const options: MongooseOptions = {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
//}

export const ConnectionToDatabase = async () => {
    try {
        const URL = 'mongodb://localhost:27017/ecommerce';
        await mongoose.connect(URL, {});
        console.log("Connected to Database");
    } catch {
        throw new Error();
    }
}