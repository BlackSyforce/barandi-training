$(function(){
	var userList = [];
	var userRoles = [];
	var editIndex;
	var editMode = false;

	function showUserForm() {
		$('#userForm').removeClass('hidden');
		$('#userForm div').removeClass('hidden');
	}

	function hideUserForm() {
		$('#userForm').addClass('hidden');
	}

	function clearUserForm() {
		$("#userForm form input[type='text']").val("");
	}
	function clearTable() {
		$("#userTable tbody tr").remove();
	}


	function renderTable(){

		var $template = $("<tr><td class='firstname'></td>" +
							"<td class='lastname'></td>" +
							"<td class='username'></td>" +
							"<td class='eMail'></td>" +
							"<td class='userRole'></td>" +
							"<td class='action'>X</td></tr>");
		var $body = $("#userTable tbody");

		for (var i = 0; i < userList.length; i++) {
			var $element = $template.clone();

			var $items = $element.find("td");
			$($items[0]).text(userList[i].firstname);
			$($items[1]).text(userList[i].lastname);
			$($items[2]).text(userList[i].username);
			$($items[3]).text(userList[i].email);
			$($items[4]).text(userList[i].role);

			$body.append($element);
		}

	}

	function clearTable() {
		$("#userTable tbody tr").remove();
	}
	function addEvents() {
		$("#userTable").on("click", ".action", function(){
			var index = $(this).parent().index();
			$.ajax({
				method:"DELETE",
				url:"http://localhost:4000/user/" + userList[index]._id,
			}).done(function(){
				userList.splice(index, 1);
				clearTable();
				renderTable();
			});
		});
		$("#users").on("click", function(){
			$("#projectBody div").addClass("hidden");
			$("#userTableDiv").removeClass("hidden");
		});
		$("#addUser").on("click", function(){
			$("#userTableDiv").addClass("hidden");
			console.log($("#roleSelect"));
			for (i=0;i<userRoles.length;i++){
				$options = $("<option></option>");
				$options.text(userRoles[i].role);
				$("#roleSelect").append($options)
			}
			showUserForm();
			editMode = false;
		});
		console.log($("#userTable"));
		$("#userTable tbody").on("click", "td:not(:last-child)", function(){
			showUserForm();
			editMode = true;
			editIndex = $(this).parent().index();
			console.log($("#roleSelect"));
			for (i=0;i<userRoles.length;i++){
				$options = $("<option></option>");
				$options.text(userRoles[i].role);
				$("#roleSelect").append($options)
			}
			$(".form-group input[name='firstname']").val(userList[editIndex].firstname);
			$(".form-group input[name='lastname']").val(userList[editIndex].lastname);
			$(".form-group input[name='username']").val(userList[editIndex].username);
			$(".form-group input[name='eMail']").val(userList[editIndex].email);
			$(".form-group input[name='city']").val(userList[editIndex].city);
			$(".form-group input[name='skill']").val(userList[editIndex].skill);
			if (userList[editIndex].isAdmin){
				$("#isAdmin").prop("checked",true);
			} else {
				$("#isAdmin").prop("checked",false);
			}

		})
		$("#saveUser").on("click", function(){
			if (editMode){
				var $items = $("#userForm form input[type='text']");
				var objNew = {
					firstname: $($items[0]).val(),
					lastname: $($items[1]).val(),
					username: $($items[2]).val(),
					email: $($items[3]).val(),
					city: $($items[4]).val(),
					role: $($items[5]).val(),
					skill: $($items[6]).val()

				};
				if ($("#isAdmin").attr("checked")){
					objNew.isAdmin = true;
				} else {
					objNew.isAdmin = false;
				}

				var newIndex = userList[editIndex]._id;

				jQuery.ajax({
					method: "PUT",
					url: "http://localhost:4000/user/" + newIndex,
					data: objNew
				}) .done(function(data) {
					userList[editIndex] = objNew;
					clearTable();
					renderTable();
				});
					
				hideUserForm();
				clearUserForm();
			}else {
				var $items = $("#userForm form input[type='text']");
				var obj = {
					firstname: $($items[0]).val(),
					lastname: $($items[1]).val(),
					username: $($items[2]).val(),
					email: $($items[3]).val(),
					city: $($items[4]).val(),
					role: $($items[5]).val(),
					skill: $($items[6]).val()
				};
				if ($("#isAdmin").attr("checked")){
					obj.isAdmin = true;
				} else {
					obj.isAdmin = false;
				}

				jQuery.ajax({
					method: "POST",
					url: "http://localhost:4000/user",
					data: obj
				}) .done(function(data) {
					userList.push(data);
					clearTable();
					renderTable();
				});

				hideUserForm();
				clearUserForm();
				$("#userTableDiv").removeClass("hidden");
			};

		});
	}
	$.ajax({
		method: 'GET',
		url: 'http://localhost:4000/users'
	}).done(function(users){
		console.log(users);
		userList = users;
		clearTable();
		renderTable();
	});
	$.ajax({
		method: 'GET',
		url: 'http://localhost:4000/roles'
	}).done(function(roles){
		console.log(roles);
		userRoles = roles;
	});
	addEvents();

});