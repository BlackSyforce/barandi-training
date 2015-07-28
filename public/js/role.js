$(function() {
	var roleList = [];
	var editIndex;
	var editMode = false;

	function renderTable() {
		var $template = $('<tr><td><td class="action"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
		var $body = $("#roleList tbody");

		for (var i = 0; i < roleList.length; i++) {
			var $element = $template.clone();

			var $items = $element.find("td");
			$($items[0]).text(roleList[i].role);

			$body.append($element);
		}
	}

	function clearTable() {
		$("#roleList tbody tr").remove();
	}

	function showTable() {
		$('#roleList').removeClass('hidden');
	}

	function hideTable() {
		$('#roleList').addClass('hidden');
	}

	function showForm() {
		$('#roleForm').removeClass('hidden');
	}

	function hideForm() {
		$('#roleForm').addClass('hidden');
	}

	function clearForm() {
		$("#roleForm form input[type='text']").val("");
	}

	jQuery.ajax({
		method: "GET",
		url: "http://localhost:4000/roles"
	}) .done(function(data) {
			for (i=0; i<data.length; i++) {
				roleList[i] = data[i];
			}
			clearTable();
			renderTable();
	});

	function addEvents () {
		$('#role').on('click', function() {
			hideForm();
			$('#projectBody div').addClass('hidden');
			$('#projectBody div form div').removeClass('hidden');
			showTable();
		});

		$('#adding').on('click', function() {
			hideTable();
			showForm();
			editMode = false;
		});

		$('#roleList table').on('click', 'tr', function(e) {
			if ( $(e.target).hasClass("action") ) {
				return;
			}
			hideTable();
			showForm();
			var $oldData = $(this).find('td');
			console.log('here');
			editIndex = $(this).index();
			var $newData = $("#roleForm form input[type='text']");
			for (var i = 0; i < $newData.length; i++) {
				$($newData[i]).val($($oldData[i]).text());
			}
			editMode = true;
		});

		$("#roleList table").on("click", ".action", function() {
			hideForm();
			showTable();
			var index = $(this).parent().index();
			var id = roleList[index]._id;
			jQuery.ajax({
				method: "DELETE",
				url: "http://localhost:4000/role/" + id
			}) .done(function(data) {
					roleList.splice(index, 1);
					clearTable();
					renderTable();
			});
			
			clearTable();
			renderTable();
		});

		$("#saveRole").on('click', function() {
			if (editMode){
				var $items = $("#roleForm form input[type='text']");
				var objNew = {
					role: $($items[0]).val()
				};
				console.log(objNew)

				var newIndex = roleList[editIndex]._id;

				jQuery.ajax({
					method: "PUT",
					url: "http://localhost:4000/role/" + newIndex,
					data: objNew
				}) .done(function(data) {
					roleList[editIndex].role = objNew.role;
					clearTable();
					renderTable();
				});
					
				hideForm();
				clearForm();
				showTable();
			} else {
				var $items = $("#roleForm form input[type='text']");
				var obj = {
					role: $($items[0]).val()
				};

				jQuery.ajax({
					method: "POST",
					url: "http://localhost:4000/role",
					data: obj
				}) .done(function(data) {
					roleList.push(data);
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