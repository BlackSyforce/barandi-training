var RoleRouter = function(app, Mongoose) {
	var Role = Mongoose.models.Role;

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
				var role = new Role({
					role: request.body.role
				});

				role.save(function(error, result) {
					response.status(200).json(result);
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