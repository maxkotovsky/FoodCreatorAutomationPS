#target photoshop
app.bringToFront();

function structureSettings() {
    var dialog = new Window("dialog", "Create Food Template");
    dialog.alignChildren = "fill";

    var nameGroup = dialog.add("panel", undefined, "Document Name");
    nameGroup.margins = [10, 15, 10, 10];
    nameGroup.alignChildren = ["fill", "center"];

    var docName = nameGroup.add("edittext", undefined, "Setting And Dish Name");
    docName.characters = 20;

    var gradeGroup = dialog.add("panel", undefined, "Grade");
    gradeGroup.alignChildren = ["fill", "center"];
    var gradeName = gradeGroup.add("edittext", undefined, "_g0");
    docName.characters = 5;

    var sizePanel = dialog.add("panel", undefined, "Document Size");
    sizePanel.margins = [10, 15, 10, 10];
    sizePanel.orientation = "row";
    sizePanel.alignChildren = ["fill", "top"];

    var widthGroup = sizePanel.add("group");
    widthGroup.alignChildren = ["center", "center"];
    widthGroup.add("statictext", undefined, "Width:");
    var docWidth = widthGroup.add("edittext", undefined, "1024");
    docWidth.characters = 5;

    var heightGroup = sizePanel.add("group");
    heightGroup.alignChildren = ["center", "center"];
    heightGroup.add("statictext", undefined, "Height:");
    var docHeight = heightGroup.add("edittext", undefined, "1024");
    docHeight.characters = 5;

    var elementsPanel = dialog.add("panel", undefined, "Elements");
    elementsPanel.margins = [10, 15, 10, 10];
    elementsPanel.alignChildren = ["left", "center"];

    var elementsGroup = elementsPanel.add("group");
    elementsGroup.alignChildren = ["center", "center"];
    elementsGroup.add("statictext", undefined, "List of Dish Elements:");
    var numElementsInput = elementsGroup.add("edittext", undefined, "5");
    numElementsInput.characters = 1;
    var updateButton = elementsGroup.add("button", undefined, "Update");

    var elementsContainer = dialog.add("group", undefined);
    elementsContainer.orientation = "column";
    elementsContainer.alignChildren = ["fill", "center"];

    function updateElements() {
        while (elementsContainer.children.length > 0) {
            elementsContainer.remove(elementsContainer.children[0]);
        }

        var numElements = parseInt(numElementsInput.text, 10);
        if (isNaN(numElements) || numElements <= 0 || numElements > 10) {
            alert("Invalid number of elements. Please enter a positive number up to 10");
            return;
        }

        for (var i = 1; i <= numElements; i++) {
            var elementField = elementsContainer.add("edittext", undefined, "Element " + i);
            elementField.characters = 12;
        }

        dialog.layout.layout(true);
    }

    updateButton.onClick = updateElements;

    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = ["fill", ""];
    buttonGroup.alignChildren = ["fill", ""];
    var runButton = buttonGroup.add("button", undefined, "OK");
    var cancelButton = buttonGroup.add("button", undefined, "Cancel");

    runButton.onClick = function () {
        var width = parseInt(docWidth.text);
        var height = parseInt(docHeight.text);
        var groupsCount = parseInt(numElementsInput.text);
        var name = docName.text;

        if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0) {
            alert("Invalid document dimensions. Please enter positive numbers.");
            return;
        }

        var doc = app.documents.add(width, height, 72, name, NewDocumentMode.RGB);

        var layerNames = ["shape", "color", "shadow", "light"];

        for (var i = 0; i < groupsCount; i++) {
            var gradeGroupName = elementsContainer.children[i].text;
            var gradeGroup = doc.layerSets.add();
            gradeGroup.name = gradeGroupName + gradeName.text;

            var elementGroupName = elementsContainer.children[i].text;
            var elementGroup = gradeGroup.layerSets.add();
            elementGroup.name = elementGroupName;

            for (var j = 0; j < layerNames.length; j++) {
                var layer = elementGroup.artLayers.add();
                layer.name = layerNames[j];

                if (j > 0) {
                    layer.grouped = true;
                }
            }
        }
  
        dialog.close();
    }

    cancelButton.onClick = function () {
		dialog.close();
	};

    dialog.show();
}

structureSettings();