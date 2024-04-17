const mongoose = require("mongoose")
const Data = require("../model/model")
const fs = require("fs")
const path = require("path")
const readAndSaveDataFromFile = async () => {
    try {
    
      const rawData = fs.readFileSync(path.join(__dirname, 'sample-data.json'), 'utf8');
 
      const jsonData = JSON.parse(rawData);

      const existingData = await Data.find();
      if (existingData.length > 0) {
        console.log('Data already exists in the database. Skipping insertion.');
        return;
      }
     
      await Data.insertMany(jsonData);
      console.log('Data saved to MongoDB');
    } catch (error) {
      console.error('Error reading or saving data:', error);
    }
  };
  


mongoose.connect('mongodb+srv://ubornare7:Xh0wHYStWbGRN8wd@cluster0.vbjy1l0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    await readAndSaveDataFromFile();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));