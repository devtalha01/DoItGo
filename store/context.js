import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";
import { URL_PRODUCTS, GET_PRODUCTS } from "../store/constants ";
const queryClient = new QueryClient();

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const array = [];
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
                setProducts(response.data.products.edges);
            })
            .catch((err) => console.log(err));
    });

    //Remove product from list
    const removeItem = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };
    //Total amount of products
    const totalAmount = () => {
        if (cart.length > 0)
            return (
                cart.reduce((a, b) => (a += b.price * b.quantity), 0) +
                ` ${cart[0].currency}`
            );
        else return 0;
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
                    totalAmount,
                    loading,
                }}
            >
                {children}
            </AppContext.Provider>
        </QueryClientProvider>
    );
};

export { AppContext, AppContextProvider };
