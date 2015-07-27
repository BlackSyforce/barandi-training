var Project = function(Mongoose) {
    var schema = Mongoose.Schema({
        name: String,
        description: String,
        author: String,
        users: [{
            user: { type: Mongoose.Schema.ObjectId }
        }]
    });

    var Project = Mongoose.model("Project", schema);
    return Project;
};

module.exports = Project;