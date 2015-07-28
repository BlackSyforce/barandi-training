var User = function(Mongoose) {
    var schema = Mongoose.Schema({
        firstname: String,
        lastname: String,
        username: String,
        email: String,
        city: String,
        isAdmin: Boolean,
        role: String,
        skill: String
    });

    var User = Mongoose.model("User", schema);
    return User;
};

module.exports = User;