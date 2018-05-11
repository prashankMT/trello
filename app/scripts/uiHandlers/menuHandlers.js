import {
	renderTaskManager,
	updateUserModalContent,
	updateCategoryModalContent,
	closeModal,
	openModal
} from "./renderer";

export function handleUserAdd(tm) {
	$("#add-user").on("click", function() {
		updateUserModalContent({});
		openModal();
	});

	$("#modal").on("click", "#create-user", function() {
		const userName = $("#new-user-name").val();
		tm.createUser(userName);
		closeModal();
	});
}

export function handleCategoryAdd() {
	$("#add-category").on("click", function() {
		updateCategoryModalContent({});
		openModal();
	});

	$("#modal").on("click", "#create-category" ,function() {
		const categoryName = $("#new-category-name").val();
		const categoryIndex = $("#new-category-index").val();
		tm.createCategory(categoryName, parseInt(categoryIndex));
		closeModal();
		renderTaskManager(tm);
	});
}
