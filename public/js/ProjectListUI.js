$(function() {

	var projectList = [];

	var userProj = [];

	var editIndex;
	var editMode = false;


	function renderTable() {
		var $template = $("<tr><td></td><td></td><td></td><td></td><td class='action'>X</td></tr>");
		var $body = $("#ProjectTable tbody");

		for (var i = 0; i < projectList.length; i++) {
			var $element = $template.clone();

			var $items = $element.find("td");
			$($items[0]).text(projectList[i].name);
			$($items[1]).text(projectList[i].description);
			$($items[2]).text(projectList[i].author);
			$($items[3]).text(projectList[i].users.join('/ '));

			$body.append($element);
		}

	}

	function clearTable() {
		$("#ProjectTable tbody tr").remove();
	}


	function showTable() {
		$('#ProjectTable').removeClass('hidden');
	}

	function hideTable() {
		$('#ProjectTable').addClass('hidden');
	}

	function showForm() {
		$('#projectForm').removeClass('hidden');
		clearUsers();
		renderUsers();
	}

	function hideForm() {
		$('#projectForm').addClass('hidden');
	}

	function clearForm() {
		$("#projectForm form input[type='text']").val("");
	}

	jQuery.ajax({
		method: "GET",
		url: "http://localhost:4000/projects"
	}) .done(function(data) {
			for (i=0; i<data.length; i++) {
				projectList[i] = data[i];
			}
			clearTable();
			renderTable();
	});

	jQuery.ajax({
		method: "GET",
		url: "http://localhost:4000/users"
	}) .done(function(data) {
			for (j=0; j<data.length; j++) {
				userProj[j] = data[j];
			}
	});

	function renderUsers () {
		var $body = $("#usersP");

		for (var i = 0; i < userProj.length; i++) {

			var $label = $('<label></label><br />');
			var $check = $('<input type="checkbox">');
			$($label).text(userProj[i].firstname + " " +userProj[i].lastname);
			$($check).val(userProj[i]._id);
			$body.append($check);
			$body.append($label);
		}
	}

	function clearUsers () {
		$('#usersP').empty();
	}

	function addEvents () {
		$('#projects').on('click', function() {
			hideForm();
			$('#projectBody div').addClass('hidden');
			$('#projectBody div form div').removeClass('hidden');
			showTable();
		});

		$('#addingProj').on('click', function() {
			hideTable();
			showForm();
			editMode = false;
		});

		$('#ProjectTable table').on('click', 'tr', function(e) {
			if ( $(e.target).hasClass("action") ) {
				return;
			}
			hideTable();
			showForm();
			var $oldData = $(this).find('td');
			console.log('here');
			editIndex = $(this).index();
			var $newData = $("#projectForm form input[type='text']");
			for (var i = 0; i < $newData.length; i++) {
				$($newData[i]).val($($oldData[i]).text());
			}
			editMode = true;
		});

		$("#ProjectTable table").on("click", ".action", function() {
			hideForm();
			showTable();
			var index = $(this).parent().index();
			var id = projectList[index]._id;
			jQuery.ajax({
				method: "DELETE",
				url: "http://localhost:4000/project/" + id
			}) .done(function(data) {
					projectList.splice(index, 1);
					clearTable();
					renderTable();
			});
			
			clearTable();
			renderTable();
		});

		$("#saveProject").on('click', function() {
			if (editMode){
				var $items = $("#projectForm form input[type='text']");
				var $checksAll = $("#projectForm form input[type='checkbox']");
				var checksCount = 0;
				var objNew = {
					name: $($items[0]).val(),
					description: $($items[1]).val(),
					author: $($items[2]).val()
				};
				console.log(objNew)
				objNew.users = [];

				var newIndex = projectList[editIndex]._id;
				for ( var x=0; x<$checksAll.length; x++ ) {
					console.log($($checksAll[x]))
					if ( $checksAll[x].checked ) {
						checksCount++;
						objNew.users.push($($checksAll[x]).val());
					}
				}

				jQuery.ajax({
					method: "PUT",
					dataType: "json",
					contentType: "application/json",
					url: "http://localhost:4000/project/" + newIndex,
					data: JSON.stringify(objNew)
				}) .done(function(data) {
					projectList[editIndex].name = objNew.name;
					projectList[editIndex].description = objNew.description;
					projectList[editIndex].author = objNew.author;
					projectList[editIndex].users = objNew.users;
					clearTable();
					renderTable();
				});
					
				hideForm();
				clearForm();
				showTable();
			} else {
				var $items = $("#projectForm form input[type='text']");
				var $checksAll = $("#projectForm form input[type='checkbox']");
				var checksCount = 0;

				var obj = {
					name: $($items[0]).val(),
					description: $($items[1]).val(),
					author: $($items[2]).val()
				};

				obj.users = [];

				for ( var x=0; x<$checksAll.length; x++ ) {
					console.log($($checksAll[x]))
					if ( $checksAll[x].checked ) {
						checksCount++;
						obj.users.push($($checksAll[x]).val());
					}
				}
				console.log(checksCount)
				jQuery.ajax({
					method: "POST",
					dataType: 'json',
					contentType: "application/json",
					url: "http://localhost:4000/project",
					data: JSON.stringify(obj)
				}) .done(function(data) {
					projectList.push(data);
					clearTable();
					renderTable();

				});

				hideForm();
				clearForm();
				showTable();
			}
		});
	}


	addEvents();

});