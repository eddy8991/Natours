const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE

mongoose.connect(DB,{
  useNewUrlParser:'true',
  useCreateIndex:'true',
  useFindAndModify:'false'
}).then(con => console.log('DB connection successful'))

const tourSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"A trour must have a name"],
    unique:true
  },
  rating:{
    type:Number,
    default:4.5
  },
  price:{
    type:Number,
    required:[true,'A tour must indicate a price']
  }
})

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name:'The forest Hiker',
  rating:4.7,
  price:497
});

testTour.save().then(doc => {
  console.log(doc)
}).catch(err => {
  console.log('error',err)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
