import React, {useState, useEffect} from "react";
import api from '../api';


export default (userImagePath, username, password) => {
	if (!userImagePath) {
		return null
	}
	let [imageData, setImageData] = useState('');
	useEffect(() => {
		if (userImagePath.length > 0) {
			api.getUserPhoto(userImagePath, username, password)
				.then((blob) => {
					let reader = new FileReader()
					reader.onload =  function(e) {
						setImageData(e.target.result);
					};

					return reader.readAsDataURL(blob)
				})
			;
		}
	}, [imageData]);

	return [imageData];
}
