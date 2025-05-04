import mongoose from "mongoose";

const connectDb = async() =>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.NEXT_PUBLIC_DB_USER}:${process.env.NEXT_PUBLIC_DB_PASS}@cluster0.nuqw3.mongodb.net/bsisTeam1223`);
        console.log("Monggoose connected successfully");
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;