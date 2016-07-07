/**
 * Created by user on 26.05.2016.
 */


//var Application = {};

(function(Application){
    var _document,
        _$container,
        id = 0;

    Application.init = function(document){
        _document = document;
        _$container = $("#container");
        this.addTaskContainer(_$container);
        _$container.
            on("click", "[data-action='addTask']", this.proxy(this.onAddTask, this)).
            on("click", "[data-action='deleteTask']", this.proxy(this.onTaskDelete, this));
        //_$container.click(this.proxy(this.containerEventListener, this));
       // _container.addEventListener("click", this.proxy(this.containerEventListener, this));

    };
    Application.containerEventListener = function(e){

        /*switch (e.target.getAttribute("data-action")){
            case "addTask": this.onAddTask(e);
                break;
            case "deleteTask": this.onTaskDelete(e);
                break;
        }*/
    };
    Application.addTaskContainer = function(baseNode, subTasks){
        var $containerElement = $(_document.createElement("ul")),
            $addTaskButton = $(_document.createElement("button")),
            id = this.nextId();
        $containerElement.attr("id", id);
        $addTaskButton.attr("data-task-container-id", id).
            attr("data-action", "addTask").append(subTasks ? "Add Sub Task" : "Add Task");
        $(baseNode).append($containerElement,$addTaskButton);
        /*containerElement.setAttribute("id", id);

        addTaskButton.appendChild(_document.createTextNode(subTasks ? "Add Sub Task" : "Add Task"));
        addTaskButton.setAttribute("data-task-container-id", id);
        addTaskButton.setAttribute("data-action", "addTask");
        //addTaskButton.addEventListener("click", this.proxy(this.onAddTask, this));

        baseNode.appendChild(containerElement);
        baseNode.appendChild(addTaskButton);*/
    };

    Application.nextId = function(){
        return id++;
    };

    Application.onAddTask = function(event){
        var $taskContainer = $("#"+event.target.getAttribute("data-task-container-id")),
            newTaskId = this.nextId(),
            $newTask = $(_document.createElement("li")),
            $newTaskInput = $(_document.createElement("input")),
            $newTaskDelete = $(_document.createElement("button"));


        $newTask.append($newTaskInput).append($newTaskDelete).attr("id", newTaskId);
        //newTask.setAttribute("id", newTaskId);
        //newTask.appendChild(newTaskInput);
        //newTask.appendChild(newTaskDelete);
        $newTaskInput.attr("name", "task" + newTaskId);
        //newTaskInput.setAttribute("name", "task" + newTaskId);
        $newTaskDelete.attr("data-task-id", newTaskId).attr("data-action","deleteTask").append("Delete");
        //newTaskDelete.appendChild(_document.createTextNode("Delete"));
        //newTaskDelete.setAttribute("data-task-id", newTaskId);
        //newTaskDelete.setAttribute("data-action", "deleteTask");
        //newTaskDelete.addEventListener("click", this.proxy(this.onTaskDelete, this));
        /*$(newTask).mouseenter(function(){
            $(newTask).css("background-color", "#FF0000");
        });
        $(newTask).mouseleave(function(){
            $(newTask).css("background-color", "#FFFFFF");
        });*/
        $taskContainer.append($newTask);
        //taskContainer.appendChild($newTask);
        this.addTaskContainer($newTask, true);
    };

    Application.proxy = function(handler, owner){
        return handler.bind(owner);
    };

    Application.onTaskDelete = function(event){
        $("#"+$(event.target).attr("data-task-id")).remove();
        //var taskContainer = $("#"+event.target.getAttribute("data-task-id"));
        //taskContainer.remove();
        //taskContainer.parentNode.removeChild(taskContainer);
    };
})(Application);

