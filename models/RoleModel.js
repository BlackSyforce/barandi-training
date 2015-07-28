var Role = function(Mongoose) {
    var schema = Mongoose.Schema({
        role: String,
    });

    var Role = Mongoose.model("Role", schema);
    return Role;
};

module.exports = Role;