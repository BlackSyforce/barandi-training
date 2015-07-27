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
		User.find({_id: request.body.users}, function(error, result) {
			if (!error) {
				console.log(result);
				var project = new Project({
					name: request.body.name,
					description: request.body.description,
					author: request.body.author,
					users: result
				});

				project.save(function(error, result) {
					response.status(200).json(result);
				});
			}
		});
	});
	/**
	* Edit a project
	*/
	app.put("/project", function(request, response) {
		User.find({_id: request.body.users}),function (error, result){
			if (!error) {
				console.log(result);
				var project = new Project({
					name: request.body.name,
					description: request.body.description,
					author: request.body.author,
					users: result

				})
				project.save(function(error, result){
					response.status(200).json(result);
				})

			}
		}

	});

	app.delete("/project", function (request, response){
		User.remove({_id: request.body.users}),function(error, result){
			response.status(200).json(result);	
		}
	})

	return this;
};

module.exports = ProjectRouter;
