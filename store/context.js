import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";
import { URL_PRODUCTS } from "../store/constants ";
const queryClient = new QueryClient();

const AppContext = createContext();
const GET_PRODUCTS = `
      {
        products(first: 40, channel: "default-channel") {
            edges {
                node {
                    id
                    name
                    description
                    thumbnail {
                        url
                    }
                }
            }
        }
    }
`;
const AppContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    //Loading products/cart with products items
    const { data, isLoading, error } = useQuery("products", () => {
        setLoading(true);
        return fetch(URL_PRODUCTS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: GET_PRODUCTS }),
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Error fetching data");
                } else {
                    return response.json();
                }
            })
            .then((response) => {
                setLoading(false);
                setProducts(response.data);
            })
            .catch((err) => console.log(err));
    });
    //Remove product from list
    const removeItem = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };
    return (
        <QueryClientProvider client={queryClient} contextSharing={true}>
            <AppContext.Provider
                value={{
                    products,
                    setProducts,
                    cart,
                    setCart,
                    removeItem,
                    loading,
                }}
            >
                {children}
            </AppContext.Provider>
        </QueryClientProvider>
    );
};

export { AppContext, AppContextProvider };
