var Skill = function(Mongoose) {
	var schema = Mongoose.Schema({
		name: String,
		users: [{
            user: { type: Mongoose.Schema.ObjectId }
        }]
    });

    var Skill = Mongoose.model("Skill", schema);
    return Skill;
};

module.exports = Skill;