var Role = function(Mongoose) {
    var schema = Mongoose.Schema({
        role: String,
        users: [{
            user: { type: Mongoose.Schema.ObjectId }
        }]
    });

    var Role = Mongoose.model("Role", schema);
    return Role;
};

module.exports = Role;