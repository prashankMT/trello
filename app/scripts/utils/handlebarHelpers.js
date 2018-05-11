import Handlebars from "handlebars";

import { getRandomLabelType } from "./index";

Handlebars.registerHelper("getRandomLabelType", function() {
	return getRandomLabelType();
});

Handlebars.registerHelper("selected", function(user, selectedUsers=[]) {
	let result = result =`<option value=${user.id}>${user.name}</option>`;
		selectedUsers.find((selectedId) => {
		if (user.id == selectedId) {
			result =`<option value=${user.id} selected>${user.name}</option>`
		}
	});
	return new Handlebars.SafeString(result);;
});
