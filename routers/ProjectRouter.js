var ProjectRouter = function(app, Mongoose) {
	var Project = Mongoose.models.Project;
	var User = Mongoose.models.User;

	/**
	 * Get all projects.
	 */
	app.get("/projects", function(request, response) {
		Project.find(function(error, result) {
			response.status(200).json(result);
		});
	});

	/**
	 * Save a new project
	 */
	app.post("/project", function(request, response) {
				var project = new Project({
					name: request.body.name,
					description: request.body.description,
					author: request.body.author,
					users: request.body.users
				});

				project.save(function(error, result) {
					response.status(200).json(result);
				});
	});
	/**
	* Edit a project
	*/
	app.put("/project/:id", function(request, response) {
		Project.findOne({_id: request.params.id}, function(error, result) {
			if (error || !result) {
				response.status(200).json(result);
			} else {
				result.name = request.body.name;
				result.description = request.body.description;
				result.author = request.body.author;
				result.users = request.body.users;

				result.save(function(error, result) {
					response.status(200).json(result);
				});
			}
		});
	});

	app.delete("/project/:id", function(request, response) {
		Project.remove({_id: request.params.id}, function(error, result) {
			response.status(200).json(result);
		});
	});

	return this;
};

module.exports = ProjectRouter;
