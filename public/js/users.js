$(function(){
	var userList = [];
	var userRoles = [];
	var userSkills = [];
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
	function renderSkills () {
		var $body = $("#skills");

		for (var i = 0; i < userSkills.length; i++) {

			var $label = $('<label></label><br />');
			var $check = $('<input type="checkbox">');
			$($label).text(userSkills[i].name);
			$($check).val(userSkills[i]._id);
			console.log('aaa',userSkills)
			$body.append($check);
			$body.append($label);
		}
	}
	function removeSkills(){
		$("#skills").empty();
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
			clearUserForm();
			$("#userTableDiv").addClass("hidden");
			console.log($("#roleSelect"));
			$("#roleSelect option").remove();
			for (i=0;i<userRoles.length;i++){
				$options = $("<option></option>");
				$options.text(userRoles[i].role);
				$("#roleSelect").append($options)
			}
			showUserForm();
			editMode = false;
			removeSkills();
			renderSkills();
		});
		console.log($("#userTable"));
		$("#userTable tbody").on("click", "td:not(:last-child)", function(){
			showUserForm();
			$("#userTableDiv").addClass("hidden");
			editMode = true;
			editIndex = $(this).parent().index();
			console.log($("#roleSelect"));
			$("#roleSelect option").remove();
			for (i=0;i<userRoles.length;i++){
				$options = $("<option></option>");
				$options.text(userRoles[i].role);
				$("#roleSelect").append($options)
			}
			removeSkills();
			renderSkills();
			
			$(".form-group input[name='firstname']").val(userList[editIndex].firstname);
			$(".form-group input[name='lastname']").val(userList[editIndex].lastname);
			$(".form-group input[name='username']").val(userList[editIndex].username);
			$(".form-group input[name='eMail']").val(userList[editIndex].email);
			$(".form-group input[name='city']").val(userList[editIndex].city);
			if (userList[editIndex].isAdmin){
				$("#isAdmin").prop("checked",true);
			} else {
				$("#isAdmin").prop("checked",false);
			}

		})
		$("#saveUser").on("click", function(){
			if (editMode){
				var $checksAll = $("#skills input[type='checkbox']");
				var checksCount = 0;
				var $items = $("#userForm form input[type='text']");
				var objNew = {
					firstname: $($items[0]).val(),
					lastname: $($items[1]).val(),
					username: $($items[2]).val(),
					email: $($items[3]).val(),
					city: $($items[4]).val(),
					skills: []
					role: $('#roleSelect :selected').text()

				};
				if ($("#isAdmin").prop('checked')== true){
					objNew.isAdmin = true;
				} else {
					objNew.isAdmin = false;
				}
				
				
				for ( var x=0; x<$checksAll.length; x++ ) {
					console.log($($checksAll[x]))
					if ( $checksAll[x].checked ) {
						checksCount++;
						objNew.skills.push($($checksAll[x]).val());
					}
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
				var $checksAll = $("#skills input[type='checkbox']");
				var checksCount = 0;
				var $items = $("#userForm form input[type='text']");
				var obj = {
					firstname: $($items[0]).val(),
					lastname: $($items[1]).val(),
					username: $($items[2]).val(),
					email: $($items[3]).val(),
					city: $($items[4]).val(),
					role: $('#roleSelect :selected').text(),
				};
				if ($("#isAdmin").attr("checked")){
					obj.isAdmin = true;
				} else {
					obj.isAdmin = false;
				}
				for ( var x=0; x<$checksAll.length; x++ ) {
					console.log($($checksAll[x]))
					if ( $checksAll[x].checked ) {
						checksCount++;
						obj.skills.push($($checksAll[x]).val());
					}
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
		url: 'http://localhost:4000/skills'
	}).done(function(skills){
		console.log(skills);
		userSkills = skills;
	});
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