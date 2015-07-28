$(function(){
	var userList = [];
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

		var $template = $("<tr><td class='firstName'></td>" +
							"<td class='lastName'></td>" +
							"<td class='userName'></td>" +
							"<td class='eMail'></td>" +
							"<td class='userRole'></td>" +
							"<td class='action'>X</td></tr>");
		var $body = $("#userTable tbody");

		for (var i = 0; i < userList.length; i++) {
			var $element = $template.clone();

			var $items = $element.find("td");
			$($items[0]).text(userList[i].firstName);
			$($items[1]).text(userList[i].lastName);
			$($items[2]).text(userList[i].userName);
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
			showUserForm();
			editMode = false;
		});
		$("userTable").on("click", ".firstName", function(){
			showUserForm();
			editMode = true;
			editIndex = $(this).parent().index();
			$(".user-form input[name='firstName']").val(userList[editIndex].firstName);
			$(".user-form input[name='lastName']").val(userList[editIndex].lastName);
			$(".user-form input[name='userName']").val(userList[editIndex].userName);
			$(".user-form input[name='eMail']").val(userList[editIndex].email);
			$(".user-form input[name='city']").val(userList[editIndex].city);
			$(".user-form input[name='role']").val(userList[editIndex].role);
			$(".user-form input[name='skill']").val(userList[editIndex].skill);
			$(".user-form input[name='accountId']").val(userList[editIndex].accountId);
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
					firstName: $($items[0]).val(),
					lastName: $($items[1]).val(),
					userName: $($items[2]).val(),
					email: $($items[3]).val(),
					city: $($items[4]).val(),
					role: $($items[5]).val(),
					skill: $($items[6]).val(),
					accountId: $($items[7]).val(),

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
					firstName: $($items[0]).val(),
					lastName: $($items[1]).val(),
					userName: $($items[2]).val(),
					email: $($items[3]).val(),
					city: $($items[4]).val(),
					role: $($items[5]).val(),
					skill: $($items[6]).val(),
					accountId: $($items[7]).val()
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
	addEvents();

});