$(function() {

	var projectProfile = [{
		description: "tablemaker",
		author: "bia",
		users: 2
	},
	{
		description: "lala",
		author: "iuiu",
		users: 1

	}];

	function renderTable() {
		var $template = $("<tr><td></td><td></td><td></td></tr>");
		var $body = $("#ProjectTable tbody");

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

	renderTable();

});