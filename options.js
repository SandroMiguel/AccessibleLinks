var defaultColor = "blue";

function loadOptions() {
	//alert("loadOptions");
	var favColor = localStorage["favColor"];

	// valid colors are red, blue, green and yellow
	if (favColor == undefined || (favColor != "red" && favColor != "blue" && favColor != "green" && favColor != "yellow")) {
		favColor = defaultColor;
	}

	var select = document.getElementById("color");
	for (var i = 0; i < select.children.length; i++) {
		var child = select.children[i];
			if (child.value == favColor) {
			child.selected = "true";
			break;
		}
	}
}

function saveOptions() {
	//alert("saveOptions");
	var select = document.getElementById("color");
	var color = select.children[select.selectedIndex].value;
	localStorage["favColor"] = color;
	
	chrome.runtime.sendMessage({favColor: "hello"}, function(response) {
	  console.log(response.farewell);
	});

}

function eraseOptions() {
	//alert("eraseOptions");
	localStorage.removeItem("favColor");
	location.reload();
}   

$(document).ready(function(e) {
	loadOptions();
	$('#buttonSaveOptions').click(function(e) {
        saveOptions();
    });	
	$('#buttonSaveOptions').click(function(e) {
        eraseOptions();
    });
});

