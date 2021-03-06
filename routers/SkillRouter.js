var SkillRouter = function(app, Mongoose) {
	var Skill = Mongoose.models.Skill;

	/**
	 * Get all skills.
	 */
	app.get("/skills/:id", function(request, response) {
		Skill.find({accountId: request.params.id}, function(error, result) {
			response.status(200).json(result);
		})
	});

	app.get("/skills", function(request, response) {
		Skill.find(function(error, result) {
			response.status(200).json(result);
		});
	});

	/**
	 * Get a skill.
	 */
	app.get("/skill/:id", function(request, response) {
		Skill.findOne({_id: request.params.id}, function(error, result) {
			response.status(200).json(result);
		});
	});

	/**
	 * Create a new skill.
	 */
	app.post("/skill", function(request, response) {
		var skill = new Skill({
			name: request.body.name
		});

		skill.save(function(error, result) {
			response.status(200).json(result);
		});
	});

	/**
	 * Update a skill.
	 */
	app.put("/skill/:id", function(request, response) {
		Skill.findOne({_id: request.params.id}, function(error, result) {
			if (error || !result) {
				response.status(200).json(result);
			} else {
				result.name = request.body.name;

				result.save(function(error, result) {
					response.status(200).json(result);
				});
			}
		});
	});

	app.delete("/skill/:id", function(request, response) {
		Skill.remove({_id: request.params.id}, function(error, result) {
			response.status(200).json(result);
		});
	});

};

module.exports = SkillRouter;