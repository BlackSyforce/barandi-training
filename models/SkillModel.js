var Skill = function(Mongoose) {
	var schema = Mongoose.Schema({
		name: String
    });

    var Skill = Mongoose.model("Skill", schema);
    return Skill;
};

module.exports = Skill;