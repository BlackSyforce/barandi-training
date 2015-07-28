var User = function(Mongoose) {
    var schema = Mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        email: String,
        city: String,
        isAdmin: Boolean,
        role: String,
        accountId: Number,
        skill: String
    });

    var User = Mongoose.model("User", schema);
    return User;
};

module.exports = User;