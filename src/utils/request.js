const Axios = require("axios");
// const axios = require('axios')
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
 *
 */

export const config = {
	//serverHost: 'https://backend.carnivalist.tk/api',
	//serverHost: "http://3.15.154.217:30900/api",
	serverHost: 'http://localhost:9000/api',
};

export const eWalletCongig = {
	// serverHost: 'http://54.189.84.90:8000/'
	serverHost: "http://3.15.154.217:30800/",
};

export const imageconfig = {
	// serverHost: 'http://54.189.84.90:5001/api/v0/'
	serverHost: "http://3.15.154.217:30501/api/v0/",
};

export const getImageconfig = {
	serverHost: "http://3.15.154.217:30880/",
};

// export function getEwalletRequest(url) {
//   return Axios({
//     method: 'GET',
//     url: eWalletCongig.serverHost + url,

//   }).then(response => response.data);

// }

var hashImageUrl = "http://3.15.154.217:30880/ipfs/";

export function imageUrl() {
	return hashImageUrl;

	// serverHost: "nishal"
}

export function postEwalletRequest(url, data) {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		CrossDomain: true,
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Max-Age": 86400,
	};
	return Axios({
		method: "POST",
		url: eWalletCongig.serverHost + url,
		headers,
		data: JSON.stringify(data),
	}).then((response) => response.data);
}

export function getEwalletRequest(url) {
	// const tokenString = localStorage.token;
	// console.log(tokenString, 'kalshhhhhhhhhhhhhhhhhhhhhh')

	const headers = {
		// Authorization: tokenString ? `Bearer ${tokenString}` : undefined,
		Accept: "application/json",
		"Content-Type": "application/json",
	};
	// tokenString ? (headers.Authorization = `Bearer ${tokenString}`) : null;

	return Axios({
		method: "GET",
		url: eWalletCongig.serverHost + url,
		headers,
	}).then((response) => response.data);
}

export function postRequestImage(url, file) {
	var formData = new FormData();
	formData.append("file", file);
	// formData.append('upload_preset','abcde');

	Axios({
		url: imageconfig.serverHost + url,
		method: "POST",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		data: formData,
	})
		.then(function (response) {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
	// const formData = new FormData();
	// formData.append('file', file);
	// const headers = {

	//   Accept: 'multipart/form-data',
	//   'Content-Type': 'multipart/form-data',
	//   // contentType: 'multipart/form-data',
	//   CrossDomain: true,
	//   'Access-Control-Allow-Origin': '*',
	//   'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	//   'Access-Control-Allow-Headers': 'Content-Type',
	//   'Access-Control-Max-Age': 86400,
	// };
	// return Axios({
	//   method: 'POST',
	//   url: imageconfig.serverHost + url,
	//   headers,
	//   data: formData,

	// }).then(response => response.data);

	// const formData = new FormData();
	// formData.append('file', file);
	// console.log(file)

	// const config = {
	//   headers: { 'content-type': 'multipart/form-data' }
	// }

	// Axios.post(imageconfig.serverHost + url, formData, config)
	//   .then(res => {
	//     console.log(res.data + 'this is data after api call');
	//   })
	//   .catch(err => console.log(err));

	// const headers = {

	//   processData: false,
	//   contentType: 'multipart/form-data',
	//   cache: false,
	//   CrossDomain: true,
	//   'Access-Control-Allow-Origin': '*',
	//   'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	//   'Access-Control-Allow-Headers': 'Content-Type',
	//   'Access-Control-Max-Age': 86400,
	// };

	// tokenString ? (headers.Authorization = `Bearer ${tokenString}`) : null;

	// return Axios({
	//   method: 'POST',
	//   url: imageconfig.serverHost + url,
	//   headers,
	//   data: formData,
	// }).then(response => response.data);
}

export function getRequest(url) {
	const tokenString = localStorage.token;
	// console.log(tokenString, 'kalshhhhhhhhhhhhhhhhhhhhhh')

	const headers = {
		Authorization: tokenString ? `Bearer ${tokenString}` : undefined,
		Accept: "application/json",
		"Content-Type": "application/json",
	};
	// tokenString ? (headers.Authorization = `Bearer ${tokenString}`) : null;

	return Axios({
		method: "GET",
		url: config.serverHost + url,
		headers,
	}).then((response) => response.data);
}

export function postRequest(url, data) {
	const tokenString = localStorage.token;
	const headers = {
		Authorization: tokenString ? `Bearer ${tokenString}` : undefined,
		Accept: "application/json",
		"Content-Type": "application/json",
		CrossDomain: true,
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Max-Age": 86400,
	};
	// tokenString ? (headers.Authorization = `Bearer ${tokenString}`) : null;
	return Axios({
		method: "POST",
		url: config.serverHost + url,
		headers,
		data: JSON.stringify(data),
	}).then((response) => response.data);
}

export function postRequestMultipart(url, file) {
	// const tokenString = localStorage.token;
	console.log(file);

	const formData = new FormData();
	formData.append("file", file);

	const headers = {
		// Authorization: tokenString ? `Bearer ${tokenString}` : undefined,
		processData: false,
		contentType: "multipart/form-data",
		cache: false,
		CrossDomain: true,
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Max-Age": 86400,
	};

	// tokenString ? (headers.Authorization = `Bearer ${tokenString}`) : null;

	return Axios({
		method: "POST",
		url: imageconfig.serverHost + url,
		// headers,
		data: formData,
	}).then((response) => response.data);
}

export function getRequestImage(url) {
	// const tokenString = localStorage.token;
	// console.log(tokenString, 'kalshhhhhhhhhhhhhhhhhhhhhh')

	const headers = {
		// Authorization: tokenString ? `Bearer ${tokenString}` : undefined,
		Accept: "application/json",
		"Content-Type": "application/json",
	};
	// tokenString ? (headers.Authorization = `Bearer ${tokenString}`) : null;

	return Axios({
		method: "GET",
		// url: imageconfig.serverHost + url,
		url: getImageconfig.serverHost + url,
		// data: JSON.stringify(image),
		headers,
	}).then((response) => response.data);
}
