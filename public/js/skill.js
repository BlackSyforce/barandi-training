$(function() {
	var skillList = [];
	var editIndex;
	var editMode = false;

	function renderTable() {
		var $template = $('<tr><td><td class="action"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
		var $body = $("#skillList tbody");

		for (var i = 0; i < skillList.length; i++) {
			var $element = $template.clone();

			var $items = $element.find("td");
			$($items[0]).text(skillList[i].name);

			$body.append($element);
		}
	}

	function clearTable() {
		$("#skillList tbody tr").remove();
	}

	function showTable() {
		$('#skillList').removeClass('hidden');
	}

	function hideTable() {
		$('#skillList').addClass('hidden');
	}

	function showForm() {
		$('#skillForm').removeClass('hidden');
	}

	function hideForm() {
		$('#skillForm').addClass('hidden');
	}

	function clearForm() {
		$("#skillForm form input[type='text']").val("");
	}

	jQuery.ajax({
		method: "GET",
		url: "http://localhost:4000/skills"
	}) .done(function(data) {
			for (i=0; i<data.length; i++) {
				skillList[i] = data[i];
			}
			clearTable();
			renderTable();
	});

	function addEvents () {
		$('#skill').on('click', function() {
			hideForm();
			$('#projectBody div').addClass('hidden');
			showTable();
		});

		$('#addingS').on('click', function() {
			hideTable();
			showForm();
			editMode = false;
		});

		$('#skillList table').on('click', 'tr', function(e) {
			if ( $(e.target).hasClass("action") ) {
				return;
			}
			hideTable();
			showForm();
			var $oldData = $(this).find('td');
			console.log('here');
			editIndex = $(this).index();
			var $newData = $("#skillForm form input[type='text']");
			for (var i = 0; i < $newData.length; i++) {
				$($newData[i]).val($($oldData[i]).text());
			}
			editMode = true;
		});

		$("#skillList table").on("click", ".action", function() {
			hideForm();
			showTable();
			var index = $(this).parent().index();
			var id = skillList[index]._id;
			jQuery.ajax({
				method: "DELETE",
				url: "http://localhost:4000/skill/" + id
			}) .done(function(data) {
					skillList.splice(index, 1);
					clearTable();
					renderTable();
			});
			
			clearTable();
			renderTable();
		});

		$("#saveSkill").on('click', function() {
			if (editMode){
				var $items = $("#skillForm form input[type='text']");
				var objNew = {
					name: $($items[0]).val()
				};
				console.log(objNew)

				var newIndex = skillList[editIndex]._id;

				jQuery.ajax({
					method: "PUT",
					url: "http://localhost:4000/skill/" + newIndex,
					data: objNew
				}) .done(function(data) {
					skillList[editIndex].name = objNew.name;
					clearTable();
					renderTable();
				});
					
				hideForm();
				clearForm();
				showTable();
			} else {
				var $items = $("#skillForm form input[type='text']");
				var obj = {
					name: $($items[0]).val()
				};

				jQuery.ajax({
					method: "POST",
					url: "http://localhost:4000/skill",
					data: obj
				}) .done(function(data) {
					skillList.push(data);
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