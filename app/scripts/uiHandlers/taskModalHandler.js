import {
	renderTaskManager,
	updateTaskModalContent,
	closeModal
} from "./renderer";

function handleTaskView(tm) {
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
	$("#modal").on("click", "#delete-task", function() {
		const taskId = $(this).data("id");
		tm.deleteTask(taskId);
		closeModal();
		renderTaskManager(tm);
	});
	$("#modal").on("blur", "#task-title", function() {
		const title = $(this).val();
		const taskId = $(this).data("id");
		const taskDetails = tm.getTaskDetailsById(taskId);
		taskDetails.update({ title });
		renderTaskManager(tm);
	});
}

export default handleTaskView;
