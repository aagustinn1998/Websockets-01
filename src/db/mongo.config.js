import { connect } from "mongoose";
import { getBaseConfig } from "../config/getBaseConfig.js";

const { DB_HOST, DB_PORT, DB_NAME, DB_CNN } = getBaseConfig();

const configMongo = { 
  url: `${DB_CNN}${DB_NAME}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export const mongoDBConnection = async () => {
  try {
    await connect(configMongo.url, configMongo.options);
    console.log(`=======================CONNECCION MONGO======================`);
    console.log(`======= URL: ${configMongo.url.substring(0, 20)} =======`);
    console.log(`=============================================================`);
  } catch (err) {
    console.log("🚀 ~ file: mongo.config.js:21 ~ mongoDBConnection ~ err:", err);
  }
};
