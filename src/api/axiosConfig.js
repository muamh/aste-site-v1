import axios from "axios";

export default axios.create({
    baseURL: "https://74c2-2001-b07-a3f-8e3-7949-ad72-e233-132f.ngrok-free.app",
    headers : {'ngrok-skip-browser-warning': 'true', "Authorization": "anonimous"}
});
