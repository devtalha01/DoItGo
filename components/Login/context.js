import react, { createContext, useState } from "react";
import axios from "axios";
import {
    BASE_URL,
    URL_TOGET10,
    ACCOUNT_REGISTER,
} from "../../store/constants ";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const AuthContext = createContext();
const client = new ApolloClient({
    uri: "https://demo.saleor.io/graphql/",
    cache: new InMemoryCache(),
});
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState("");
    const [userInfos, setUserInfos] = useState([]);

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
    const accountRegister = (email, password) => {
        // executing mutations
        client
            .mutate({
                mutation: ACCOUNT_REGISTER,
                variables: { email: email, password: password },
            })
            .then((response) => {
                var accountErrors = response.data.accountRegister.accountErrors;
                accountErrors?.flatMap((o) =>
                    console.log(`The field ${o.field} is ${o.code}`)
                );
                var users = response.data.accountRegister.user;
                console.log(`Hello ${users.firstName} ${users.lastName}!`);
            })
            .catch((err) => console.log(err));
    };

    return (
        <ApolloProvider client={client}>
            <AuthContext.Provider
                value={{
                    login,
                    userInfo,
                    loading,
                    logout,
                    userInfos,
                    exampleUsers,
                    accountRegister,
                }}
            >
                {children}
            </AuthContext.Provider>
        </ApolloProvider>
    );
};
