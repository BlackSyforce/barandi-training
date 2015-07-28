var UserRouter = function(app, Mongoose) {
	var User = Mongoose.models.User;

	/**
	 * Get all users.
	 */
	app.get("/users/:id", function(request, response) {
		User.find({accountId: request.params.id}, function(error, result) {
			response.status(200).json(result);
		})
	});

	app.get("/users", function(request, response) {
		User.find(function(error, result) {
			response.status(200).json(result);
		});
	});

	/**
	 * Get an user.
	 */
	app.get("/user/:id", function(request, response) {
		User.findOne({_id: request.params.id}, function(error, result) {
			response.status(200).json(result);
		});
	});

	/**
	 * Create a new user.
	 */
	app.post("/user/:id", function(request, response) {
		var user = new User({
			firstName: request.body.firstName,
			lastName: request.body.lastName,
			userName: request.body.userName,
			email: request.body.email,
			city: request.body.city,
			isAdmin: request.body.isAdmin,
			role: request.body.role,
			accountId: request.body.accountId
		});

		user.save(function(error, result) {
			response.status(200).json(result);
		});
	});

	/**
	 * Update an user.
	 */
	app.put("/user/:id", function(request, response) {
		User.findOne({_id: request.params.id}, function(error, result) {
			if (error || !result) {
				response.status(200).json(result);
			} else {
				result.firstName = request.body.firstName;
				result.lastName = request.body.lastName;
				result.userName = request.body.userName;
				result.email = request.body.email;
				result.city = request.body.city;
				result.isAdmin = request.body.isAdmin;
				result.role = request.body.role;
				result.accountId = request.body.accountId;

				result.save(function(error, result) {
					response.status(200).json(result);
				});
			}
		});
	});

	app.delete("/user/:id", function(request, response) {
		User.remove({_id: request.params.id}, function(error, result) {
			response.status(200).json(result);
		});
	});
};

module.exports = UserRouter;