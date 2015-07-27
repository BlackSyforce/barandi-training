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

	renderTable();

});