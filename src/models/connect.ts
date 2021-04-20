import * as mongoose from 'mongoose';
import * as config from "config";
const { host, port, dbName }  = config.get('mongo');
const mongoUrl = `mongodb://${host}:${port}/${dbName}`;

const db = () => {
  mongoose.set('useCreateIndex', true);
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  mongoose.connection.on('connected', () => console.log('connected to the db'));
  mongoose.connection.on('open', () =>
    console.log('mongodb connection opened:', mongoUrl),
  );
  mongoose.connection.on('disconnected', () =>
    console.log('disconnected to the db'),
  );
  mongoose.connection.on('close', () => console.info('close the db'));
  mongoose.connection.on('reconnected', () =>
    console.log('reconnected to the db'),
  );
  mongoose.connection.on('error', err =>
    console.error(
      'Module "mongoose" connection is broken! Auto-Reconnection:\n',
      err,
    ),
  );
};

console.log('db', db)
export { db };
