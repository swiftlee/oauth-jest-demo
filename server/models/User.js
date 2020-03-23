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
    picture: {
        type: String,
    },
    created: Date,
});
//
// our condition is our attribute that we wish to filter by (passed in JSON object format)
// pulled from: https://stackoverflow.com/questions/40102372/find-one-or-create-with-mongoose
User.statics.findOneOrCreate = function (data, callback) {
    this.findOne({oauthID: data.id, name: data.displayName}, (err, result) => {
        return result ? callback(err, result) : this.create({oauthID: data.id, name: data.displayName, created: Date.now(), picture: data.picture}, (err, result) => {
            return callback(err, result);
        });
    });
};

export default mongoose.model('users', User);
