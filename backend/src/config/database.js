import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL, {});

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`DB Connection Error: ${error.message}`);
        process.exit(1);
    }
}

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB Disconnected');
    } catch (error) {
        console.error(`DB Disconnection Error: ${error.message}`);
    }
}

mongoose.connection.on('connected', ()=> {
    console.log('Mongoose connected to DB');    
})

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB');
})