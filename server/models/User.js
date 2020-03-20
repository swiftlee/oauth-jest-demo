import mongoose from 'mongoose';

const User = new mongoose.Schema({
    oauthID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    created: Date,
});
//
// our condition is our attribute that we wish to filter by (passed in JSON object format)
// pulled from: https://stackoverflow.com/questions/40102372/find-one-or-create-with-mongoose
User.statics.findOneOrCreate = function (condition, callback) {
    this.findOne(condition, (err, result) => {
        return result ? callback(err, result) : this.create({...condition, created: Date.now()}, (err, result) => {
            return callback(err, result);
        });
    });
};

export default mongoose.model('users', User);
