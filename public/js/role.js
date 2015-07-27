$(function() {
	var roleList = [{
		role: "Junior Developer"
	},
	{
		role: "Tester"
	}];

	function renderTable() {
		var $template = $('<tr><td><td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
		var $body = $("#roleList tbody");

		for (var i = 0; i < roleList.length; i++) {
			var $element = $template.clone();

			var $items = $element.find("td");
			$($items[0]).text(roleList[i].role);

			$body.append($element);
		}
		$("#roleList").append('<button type="button" class="btn btn-primary">Add Role</button>')
	}

	function clearTable() {
		$("#roleList tbody tr").remove();
	}

	renderTable();
});