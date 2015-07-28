$(function() {

	var projectList = [];

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
			$($items[3]).text(projectList[i].users);

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
				var objNew = {
					name: $($items[0]).val(),
					description: $($items[1]).val(),
					author: $($items[2]).val(),
					users: $($items[3]).val()
				};
				console.log(objNew)

				var newIndex = projectList[editIndex]._id;

				jQuery.ajax({
					method: "PUT",
					url: "http://localhost:4000/project/" + newIndex,
					data: objNew
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
				var obj = {
					name: $($items[0]).val(),
					description: $($items[1]).val(),
					author: $($items[2]).val(),
					users: $($items[3]).val()
				};

				jQuery.ajax({
					method: "POST",
					url: "http://localhost:4000/project",
					data: obj
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