import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import  data  from './data';
import config from './config';
import userRouter from './routers/userRoute'

mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log("Connected to mongodb")
})
.catch((error) => {
  console.log(error.reason)
})
const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use('/api/users', userRouter)
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x.id === Number(req.params.id));
  if ( product ){
    res.send(product)
  } else{
    res.status(404).send({ message: 'Product Not Found! '})
  }
})

app.listen(5000, () => {
  console.log('serve at http://localhost:5000');
});
