import {
	renderTaskManager,
	updateUserModalContent,
	updateCategoryModalContent,
	closeModal,
	openModal
} from "./renderer";

export function handleUserAdd(tm) {
	$("#container").on("click","#add-user", function() {
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
	$("#container").on("click","#add-category", function() {
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
