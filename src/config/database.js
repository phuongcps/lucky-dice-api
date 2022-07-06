const mongoose = require('mongoose');

// async function connect() {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/lucky_dice_casino', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Connect success');
//     } catch (error) {
//         console.log(error)
//         process.exit(1)
//     }
// }

// const URL = 'mongodb+srv://mongo-user:<password>@cluster-mongo-test.ieqay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const URL = "mongodb+srv://phuongcellphones:Phuong93@cluster0.yq190va.mongodb.net/my-mongo-db-phuong?retryWrites=true&w=majority";

async function connect () {
  try {
    await mongoose.connect(
      URL,
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )

    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = { connect };
