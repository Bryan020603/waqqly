import mongoose from 'mongoose';
import createError from 'http-errors';

export class MongodbDataSource {
  constructor() {
    mongoose.connection.on('disconnect', this.connect);
    this.connection = { isConnected: false };
  }
  async connect() {
    if (this.connection.isConnected) {
      return;
    }
    try {
      const db = await mongoose.connect(`${process.env.MONGODB_URI}`);
      this.connection.isConnected = db.connections[0].readyState === 1;
      console.log(
        `Successfully connected to the host ${mongoose.connection.host}`
      );
    } catch (error) {
      console.error(error);
      throw new createError.InternalServerError('Connection failed!');
    }
  }
}

export const dataSource = new MongodbDataSource();
