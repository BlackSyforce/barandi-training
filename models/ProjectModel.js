var Project = function(Mongoose) {
    var schema = Mongoose.Schema({
        name: String,
        description: String,
        author: String,
        users: [Mongoose.Schema.Types.ObjectId]
    });

    var Project = Mongoose.model("Project", schema);
    return Project;
};

module.exports = Project;
