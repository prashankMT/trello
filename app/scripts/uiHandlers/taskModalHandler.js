import {
	renderTaskManager,
	updateTaskModalContent,
	closeModal
} from "./renderer";
import { isEmpty } from "../utils";

const getAssignees = () => {
	const users = [];
	const selectedUsers = $("#modal .dropdown-chose");
	$(selectedUsers).each((index, selected) => {
		users.push(parseInt($(selected).data("value")));
	});
	return users;
};

const getTitle = () => {
	return $("#modal #task-title").val();
};

const getDescription = () => {
	return $("#task-description").val();
};

const getTaskRef = () => {
	const taskId = $("#modal #task-title").data("id");
	const taskDetails = tm.getTaskDetailsById(taskId);
	return taskDetails;
};

const handleTaskContent = function() {
	const taskDetails = getTaskRef();
	if (taskDetails) {
		const updatedTask = {};
		updatedTask.assignees = getAssignees();
		updatedTask.title = getTitle();
		updatedTask.description = getDescription();
		taskDetails.update(updatedTask);

	}
};

function handleTaskUpdation(instance) {
	const contextualHandler = handleTaskContent.bind(this, instance);
	$("#modal").on("hide.bs.modal", () => {
		contextualHandler();
		renderTaskManager(instance);
	});
	$("#modal").on("hidden.bs.modal", () => {
		$("#modal-content").html("");
	});
	$("#modal").on("shown.bs.modal", () => {
		if (!$(".dropdown-display-label").length) {
			$("#modal-content #user-options").dropdown({
				multipleMode: "label",
				searchable: false
			});
		}
	});
}

function handleAddLabel(tm) {
	$("#modal").on("click", "#add-label", function() {
		$("#add-label-input").removeClass("hide");
	});
	$("#modal").on("keypress", "#add-label-input", function(event) {
		if (event.keyCode == 13) {
			const newLabelName = $("#add-label-input").val();
			$("#add-label-input").addClass("hide");

			let taskDetails = getTaskRef();
			taskDetails = taskDetails.update({ labels: [...taskDetails.labels, newLabelName] });
			updateTaskModalContent({ ...taskDetails, users: tm.users });
		}
	});
}

function handleDeleteTask(tm) {
	$("#modal").on("click", "#delete-task", function() {
		const taskId = $(this).data("id");
		tm.deleteTask(taskId);
		closeModal();
		renderTaskManager(tm);
	});
}

function handleTaskView(tm) {
	handleAddLabel(tm);
	handleDeleteTask(tm);
	handleTaskUpdation(tm);
}

export default handleTaskView;
