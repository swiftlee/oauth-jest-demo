import * as mongoose from 'mongoose';

const User = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

// our condition is our attribute that we wish to filter by (passed in JSON object format)
// pulled from: https://stackoverflow.com/questions/40102372/find-one-or-create-with-mongoose
User.statics.findOneOrCreate = (condition, callback) => {
  const self = this;
  self.findOne(condition, (err, result) => {
     return result ? callback(err, result) : self.create(condition, (err, result) => {
         return callback(err, result);
     });
  });
};

export default mongoose.model('users', User);
