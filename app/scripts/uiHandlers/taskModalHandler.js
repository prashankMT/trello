import { renderTaskManager, updateModalContent } from "./renderer";

function handleTaskView(tm) {
	$("#modal").on("click", "#add-label", function() {
		$("#add-label-input").removeClass("hide");
	});
	$("#modal").on("keypress", "#add-label-input", function(event) {
		if (event.keyCode == 13) {
			const newLabelName = $("#add-label-input").val();
			const taskId = $("[data-type='task']").data("id");
			const taskDetails = tm.getTaskDetailsById(taskId);

			$("#add-label-input").addClass("hide");

			taskDetails.update({ labels: [...taskDetails.labels, newLabelName] });
			renderTaskManager(tm);
			updateModalContent(tm.getTaskDetailsById(taskId));
		}
	});
	$("#modal").on("keypress", "#task-description", function(event) {
		if (event.keyCode == 13) {
			const description = $("#task-description").val();
			const taskId = $("[data-type='task']").data("id");

			$("#add-label-input").addClass("hide");

			taskDetails.update({ description });
			updateModalContent(tm.getTaskDetailsById(taskId));
		}
	});
}

export default handleTaskView;
