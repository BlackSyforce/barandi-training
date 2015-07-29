var UserRouter = function(app, Mongoose) {
	var User = Mongoose.models.User;

	/**
	 * Get all users.
	 */
	app.get("/user/:id", function(request, response) {
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
	app.post("/user", function(request, response) {
		console.log(request.body)
		var user = new User({
			firstname: request.body.firstname,
			lastname: request.body.lastname,
			username: request.body.username,
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
				result.firstname = request.body.firstname;
				result.lastname = request.body.lastname;
				result.username = request.body.username;
				result.email = request.body.email;
				result.city = request.body.city;
				result.isAdmin = request.body.isAdmin;
				result.role = request.body.role;
				result.accountId = request.body.accountId;
				result.skills = request.body.skills;
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