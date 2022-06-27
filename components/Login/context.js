import react, { createContext, useState } from "react";
import axios from "axios";
import { BASE_URL, URL_TOGET10 } from "../../store/constants ";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState("");
    const [userInfos, setUserInfos] = useState([]);
    const [message, setMessage] = useState("");
    const login = (email, password) => {
        setLoading(true);
        email = "atuny0@sohu.com";
        password = "9uQFF1Lh";
        axios
            .get(`${BASE_URL}`, {
                email,
                password,
            })
            .then((res) => {
                let userInfo = res.data.users;
                setUserInfo(
                    userInfo.find(
                        (data) =>
                            data.email === email && data.password == password
                    ) ?? []
                );
                setLoading(false);
            })
            .catch((e) => {
                console.log(`login erreur ${e}`);
                setLoading(false);
            });
    };
    const logout = () => {
        setUserInfo([0]);
    };
    const exampleUsers = () => {
        setLoading(true);
        axios
            .get(`${URL_TOGET10}`)
            .then((res) => {
                let userInfos = res.data.users;
                setUserInfos(userInfos);
                setLoading(false);
            })
            .catch((e) => {
                console.log(`login erreur ${e}`);
                setLoading(false);
            });
    };
    return (
        <AuthContext.Provider
            value={{
                login,
                userInfo,
                loading,
                logout,
                userInfos,
                exampleUsers,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
