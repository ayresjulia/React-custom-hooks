import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const useFlip = () => {
	const [ state, setState ] = useState(true);

	const flipCard = () => {
		setState((isUp) => !isUp);
	};

	return [ state, flipCard ];
};

const useAxios = (url) => {
	const [ responses, setResponses ] = useLocalStorageState([]);
	const addCard = async (endpoint = "") => {
		const response = await axios.get(`${url}${endpoint}`);
		setResponses((cards) => [ ...cards, { ...response.data, id: uuid() } ]);
	};

	const clearAll = () => setResponses([]);

	return [ responses, addCard, clearAll ];
};

const useLocalStorageState = (key, defaultValue = []) => {
	const [ state, setState ] = useState(() => {
		let value;
		try {
			// get value form local storage and parse it
			value = JSON.parse(window.localStorage.getItem(key) || JSON.stringify(defaultValue));
		} catch (e) {
			console.log(e);
			value = defaultValue;
		}
		return value;
	});
	useEffect(
		() => {
			// update item in local storage
			window.localStorage.setItem(key, JSON.stringify(state));
		},
		[ key, state ]
	);

	return [ state, setState ];
};
export { useFlip, useAxios, useLocalStorageState };
