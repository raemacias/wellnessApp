var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //ul #incomplete-tasks
var completedTaskHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item
var creatNewTaskElement = function(taskString) {
	//Creat List Item
	var listItem = document.createElement("li");

	//input (checkbox)
	var checkBox = document.createElement("input"); //checkbox

  	//label
  	var label = document.createElement("label");

  	//input (text)
  	var editInput = document.createElement("input"); //text

  	//button.edit
  	var editButton = document.createElement("button");

  	//button.delete
  	var deleteButton = document.createElement("button");

  	//Each element needs modifying
  	checkBox.type = "checkbox";
  	editInput.type = "text";

  	editButton.innerText = "Edit";
  	editButton.className = "edit";
  	deleteButton.innerText = "Delete";
  	deleteButton.className = "delete";

  	label.innerText = taskString;

  	//Each element needs appending

  	listItem.appendChild(checkBox);
  	listItem.appendChild(label);
  	listItem.appendChild(editInput);
  	listItem.appendChild(editButton);
  	listItem.appendChild(deleteButton);
  	
  	return listItem;
}
//Add a new task
var addTask = function () {
	console.log("Add task...");  
  //Create a new list item with the text from #new-task:
  var listItem = creatNewTaskElement(taskInput.value);

  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";

 }

 	//Edit an existing task
var editTask = function() {
	console.log("Edit task...");
  
  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var editBtn = listItem.getElementsByTagName('button')[0];

    //if the class of the parent is .editMode
   var containsClass = listItem.classList.contains("editMode");

   if(containsClass) {
      //Switch from .editMode
      //label text become the input's value
      label.innerText = editInput.value;
    //else
	} else {
      //Switch to .editMode
      //input value becomes the label's text
      editInput.value = label.innerText;
      editBtn.innerText = "Save";
  }

    //Toggle .editMode on the list item
    listItem.classList.toggle("editMode");

}


//Delete existing task
var deleteTask = function() {
	console.log("Delete task...");
  
  	var listItem = this.parentNode;
  	var ul = listItem.parentNode;

  	//Remove the parent list item from the ul
  	ul.removeChild(listItem);

}

//Mark a task as complete
var taskCompleted = function() {
	console.log("Task complee...");
     //Append the task list itme to the #completed-tasks
     var listItem = this.parentNode;
     completedTaskHolder.appendChild(listItem);
     bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function() {
	console.log("Task incomplete...");
 
 	//Append the task list itme to the #incomplete-tasks
 	var listItem = this.parentNode;
 	incompleteTasksHolder.appendChild(listItem);
 	bindTaskEvents(listItem, taskCompleted);

}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events");
	//select taskListItem's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");

    //bind the editTask to edit button
    editButton.addEventListener('click', editTask);

    //bind the deleteTask to the delete button
    deleteButton.addEventListener('click', deleteTask);

    //bind checkBoxEventHandler to the checkbox
    checkBox.addEventListener('change', checkBoxEventHandler);

}

var ajaxRequest = function () {
	console.log("AJAX request");
}

//Set the click handler to the addTast function
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
	//bind events to list item's children (taxkCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
 
//cycle over cmpleteTasksHolder ul list items
  for(var i = 0; i < completedTaskHolder.children.length; i++) {
  //bind events to list item's children (taxkIncomplete)
  bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
}
    














