$(function() {

	var projectProfile = [];

	var editIndex;
	var editMode = false;

	function renderTable() {
		var $template = $("<tr><td></td><td></td><td></td><td class='action' >X</td></tr>");
		var $body = $("#ProjectProfileTable tbody");

		for (var i = 0; i < projectProfile.length; i++) {
			var $element = $template.clone();

			var $items = $element.find("td");
			$($items[0]).text(projectProfile[i].description);
			$($items[1]).text(projectProfile[i].author);
			$($items[2]).text(projectProfile[i].users);


			$body.append($element);
		}


	}

	function clearTable() {
		$("#ProjectProfileTable tbody tr").remove();
	}

	function showTable() {
		$('#ProjectProfileTable').removeClass('hidden');
	}

	function hideTable() {
		$('#ProjectProfileTable').addClass('hidden');
	}

	function showForm() {
		$('#ProjectProfileTable').removeClass('hidden');
	}

	function hideForm() {
		$('#ProjectProfileTable').addClass('hidden');
	}

	function clearForm() {
		$("#ProjectProfileTable form input[type='text']").val("");
	}

	jQuery.ajax({
		method: "GET",
		url: "http://localhost:4000/project"
	}) .done(function(data) {
			for (i=0; i<data.length; i++) {
				projectProfile[i] = data[i];
			}
			clearTable();
			renderTable();
	});

	function addEvents () {
		$('#ProjectTable tr').on('click', function() {
			hideForm();
			$('#projectBody div').addClass('hidden');
			showTable();
		});

		$('#ProjectProfileTable table').on('click', 'tr', function(e) {
			if ( $(e.target).hasClass("action") ) {
				return;
			}
			hideTable();
			showForm();
			var $oldData = $(this).find('td');
			console.log('here');
			editIndex = $(this).index();
			var $newData = $("#projectEditForm form input[type='text']");
			for (var i = 0; i < $newData.length; i++) {
				$($newData[i]).val($($oldData[i]).text());
			}
			editMode = true;
		});

		$("#ProjectProfileTable table").on("click", ".action", function() {
			hideForm();
			showTable();
			var index = $(this).parent().index();
			var id = projectProfile[index]._id;
			jQuery.ajax({
				method: "DELETE",
				url: "http://localhost:4000/project/" + id
			}) .done(function(data) {
					projectProfile.splice(index, 1);
					clearTable();
					renderTable();
			});
			
			clearTable();
			renderTable();
		});

		$("#editProject").on('click', function() {
			if (editMode){
				var $items = $("#projectEditForm form input[type='text']");
				var objNew = {
					descr: $($items[0]).val(),
					auth: $($items[1]).val(),
					users: $($items[2]).val()
				};
				console.log(objNew)

				var newIndex = projectProfile[editIndex]._id;

				jQuery.ajax({
					method: "PUT",
					url: "http://localhost:4000/project/" + newIndex,
					data: objNew
				}) .done(function(data) {
					projectProfile[editIndex].descr = objNew.descr;
					projectProfile[editIndex].auth = objNew.auth;
					projectProfile[editIndex].users = objNew.users;
					clearTable();
					renderTable();
				});
					
				hideForm();
				clearForm();
				showTable();
			} else {
				var $items = $("#projectEditForm form input[type='text']");
				var obj = {
					descr: $($items[0]).val(),
					auth: $($items[1]).val(),
					users: $($items[2]).val()
				};

				jQuery.ajax({
					method: "POST",
					url: "http://localhost:4000/project",
					data: obj
				}) .done(function(data) {
					projectProfile.push(data);
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