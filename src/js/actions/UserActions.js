import axios from "axios";

export function login(username, password) {
    return {
        type: "LOGIN",
        payload: axios.post(
            "http://dev.inowas.hydro.tu-dresden.de/api/user/credentials.json", {
                username: username,
                password: password
            }
        )
    }
}
