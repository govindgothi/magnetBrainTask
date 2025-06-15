import dotenv from "dotenv";
import  app  from "./index.js";
import mongoose from "mongoose";
const PORT = process.env.PORT || 3000 
dotenv.config({
  path: "./.env",
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/MagnetData");
  console.log("mongodb is connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main()
  .then(() => {
     app.listen(PORT, function () {
      console.log(`server is running on port ${this.address().port}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
