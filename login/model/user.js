const mongoose = require("mongoose");
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};
var MONGO_ADDRESS=process.env.MONGO || "localhost";
var MONGO_PORT=process.env.MONGO_PORT || 27017;
var DB_NAME=process.env.DB_NAME || "db5";
var MONGO_USERNAME=process.env.MONGO_USERNAME|| "admin";
var MONGO_PASSWORD=  process.env.MONGO_PASSWORD ||"pass";
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_ADDRESS}:${MONGO_PORT}/${DB_NAME}?authSource=admin`;

//var url = `mongodb://${MONGO_ADDRESS}:${MONGO_PORT}/${DB_NAME}`;
mongoose.connect(url),options,(err)=>{
console.log(err);
};
console.log (url);
const userSchema = new mongoose.Schema({
   email: { type: String, unique: true },
  password: { type: String }
});


module.exports = mongoose.model("users", userSchema);