import mongoose from "mongoose";

export let connectDatabase = () => {
    let DB_URI = "";

    if (process.env.NODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI;
    if (process.env.NODE_ENV === "PRODUCTION")
        DB_URI = process.env.DB_URI;
    
    mongoose.connect(DB_URI).then((con) => {
        console.log(
          `MongoDb database connected with the HOST ${con.connection.host}`
        );
    });

}
// import mongoose from "mongoose";

// export let connectDatabase = () => {
//   let DB_URI = process.env.DB_URI;

//   mongoose
//     .connect(DB_URI, {
//       useNewUrlParser: true,
     
   
//     })
//     .then((con) => {
//       console.log(
//         `MongoDb database connected with the HOST ${con.connection.host}`
//       );
//     })
//     .catch((err) => {
//       console.error("Error connecting to database:", err.message);
//     });
// };

