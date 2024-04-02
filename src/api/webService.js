//user front source 

import axios from 'axios';


export default class WebService {
	static async post(action, params) {
		let response = await axios.post(action, params)
		return response.data
	}
	static async put(action, params) {
		let response = await axios.put(action, params)
		return response.data
	}
	static async get(action) {
		let response = await axios.get(action)
		return response.data
	}
	static async delete(action) {
		let response = await axios.delete(action)
		return response.data
	}
	static async patch(action, params) {
		let response = await axios.patch(action, params)
		return response.data
	}
}
