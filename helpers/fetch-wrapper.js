import getConfig from "next/config";

import { userService } from "../services/user.service";

import { validateToken } from "../services/user.service";
import { customHelpers } from "../helpers/custom-helpers";

var checkAuth = customHelpers.checkAuth;
var fixAuth = customHelpers.fixAuth;

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
	get,
	post,
	put,
	delete: _delete,
	authHeader,
};

function get(url, headers) {
	const requestOptions = {
		method: "GET",
		headers: { ...authHeader(url), ...headers },
	};
	return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json", ...authHeader(url) },
		credentials: "include",
		body: JSON.stringify(body),
	};
	return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
	const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json", ...authHeader(url) },
		body: JSON.stringify(body),
	};
	return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
	const requestOptions = {
		method: "DELETE",
		headers: authHeader(url),
	};
	return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
	// return authorization header with jwt token
	var [isAuthenticated, cookie] = checkAuth("token", null, null, true);

	if (isAuthenticated) {
		return { Authorization: `Token ${cookie}` };
	} else {
		return {};
	}
}

function handleResponse(response) {
	return response.text().then((text) => {
		//const data = text && JSON.parse(text);

		const data = JSON.parse(text);

		if (!response.ok) {
			if ([401, 403].includes(response.status) && userService.userValue) {
				// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
				userService.logout();
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
