$(function() {

	var projectList = [{
		projname: "tablemaker"
	},
	{
		projname: "lala"

	},
	{
		projname: "barandi"
	}];

	function renderTable() {
		var $template = $("<tr><td></td><td class='action'>X</td></tr>");
		var $body = $("#ProjectTable tbody");

		for (var i = 0; i < projectList.length; i++) {
			var $element = $template.clone();

			var $items = $element.find("td");
			$($items[0]).text(projectList[i].projname);

			$body.append($element);
		}

		$("#ProjectTable").append('<button type="button" class="projbutton">Add Role</button>')

	}

	function clearTable() {
		$("#ProjectTable tbody tr").remove();
	}

<<<<<<< HEAD
=======
	function showTable() {
		$('#ProjectTable').removeClass('hidden');
	}

	function hideTable() {
		$('#ProjectTable').addClass('hidden');
	}

	function showForm() {
		$('#ProjectTable').removeClass('hidden');
	}

	function hideForm() {
		$('#ProjectTable').addClass('hidden');
	}

	function clearForm() {
		$("#ProjectTable form input[type='text']").val("");
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
		$('#ProjectTable').on('click', function() {
			hideForm();
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
			var $newData = $("#ProjectTable form input[type='text']");
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
					project: $($items[0]).val()
				};
				console.log(objNew)

				var newIndex = projectList[editIndex]._id;

				jQuery.ajax({
					method: "PUT",
					url: "http://localhost:4000/role/" + newIndex,
					data: objNew
				}) .done(function(data) {
					projectList[editIndex].project = objNew.project;
					clearTable();
					renderTable();
				});
					
				hideForm();
				clearForm();
				showTable();
			} else {
				var $items = $("#projectForm form input[type='text']");
				var obj = {
					project: $($items[0]).val()
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

>>>>>>> 1161ef714ea2b04705844cf226b33a41fc706dcc
	renderTable();

});