import {
	renderTaskManager,
	updateTaskModalContent,
	closeModal
} from "./renderer";
import {isEmpty} from "../utils"

let updateAssignees = function(tm) {
	const users = [];
	const taskId = $("#modal #task-title").data("id");
	const taskDetails = tm.getTaskDetailsById(taskId);
	if (!isEmpty(taskDetails)) {
		const selectedUsers = $("#modal .dropdown-chose");
		$(selectedUsers).each((index, selected) => {
			users.push(parseInt($(selected).data("value")));
		});

		taskDetails.update({ assignees: users });
	}
};

function handleTaskAssignees(instance) {
	const contextualHandler = updateAssignees.bind(this, instance);
	$("#modal").on("hide.bs.modal", () => {
		$(document).off("click.dropdown", contextualHandler);
		$("#modal-content").html("");
		renderTaskManager(instance);
	});
	$("#modal").on("show.bs.modal", () => {
		$("#modal-content #user-options").dropdown({
			multipleMode: "label",
			searchable: false
		});
		$(document).on("click.dropdown", contextualHandler);
	});
}

function handleAddLabel(tm) {
	$("#modal").on("click", "#add-label", function() {
		$("#add-label-input").removeClass("hide");
	});
	$("#modal").on("keypress", "#add-label-input", function(event) {
		if (event.keyCode == 13) {
			const newLabelName = $("#add-label-input").val();
			const taskId = $("#add-label-input").data("id");
			let taskDetails = tm.getTaskDetailsById(taskId);

			$("#add-label-input").addClass("hide");

			taskDetails.update({ labels: [...taskDetails.labels, newLabelName] });
			renderTaskManager(tm);
			taskDetails = tm.getTaskDetailsById(taskId);
			updateTaskModalContent({ ...taskDetails, users: tm.users });
		}
	});
}

function handleDescription(tm) {
	$("#modal").on("keypress", "#task-description", function(event) {
		if (event.keyCode == 13) {
			const description = $("#task-description").val();
			const taskId = $("#add-label-input").data("id");
			let taskDetails = tm.getTaskDetailsById(taskId);

			$("#add-label-input").addClass("hide");

			taskDetails.update({ description });
			taskDetails = tm.getTaskDetailsById(taskId);
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

function handleTaskTitle(tm) {
	$("#modal").on("blur", "#task-title", function() {
		const title = $(this).val();
		const taskId = $(this).data("id");
		const taskDetails = tm.getTaskDetailsById(taskId);
		taskDetails.update({ title });
		renderTaskManager(tm);
	});
}

function handleTaskView(tm) {
	handleAddLabel(tm);
	handleDescription(tm);
	handleDeleteTask(tm);
	handleTaskTitle(tm);
	handleTaskAssignees(tm);
}

export default handleTaskView;
