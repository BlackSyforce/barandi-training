var RoleRouter = function(app, Mongoose) {
	var Role = Mongoose.models.Role;
	var User = Mongoose.models.User;

	/**
	 * Get all roles.
	 */
	app.get("/roles", function(request, response) {
		Role.find(function(error, result) {
			response.status(200).json(result);
		});
	});

	/**
	 * Save a new role
	 */
	app.post("/role", function(request, response) {
		User.find({_id: request.body.users}, function(error, result) {
			if (!error) {
				console.log(result);
				var role = new Role({
					role: request.body.role,
					users: result
				});

				role.save(function(error, result) {
					response.status(200).json(result);
				});
			}
		});
	});


	/**
	 * Update a role
	 */
	app.put("/role/:id", function(request, response) {
		Role.findOne({_id: request.params.id}, function(error, result) {
			if (error || !result) {
				response.status(200).json(result);
			} else {
				result.role = request.body.role;
				result.users = request.body.users;

				result.save(function(error, result) {
					response.status(200).json(result);
				});
			}
		});
	});

	/**
	 * Delete a role
	 */
	app.delete("/role/:id", function(request, response) {
		Role.remove({_id: request.params.id}, function(error, result) {
			response.status(200).json(result);
		});
	});

	return this;
};

module.exports = RoleRouter;