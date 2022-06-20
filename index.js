const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const http = require("http");

const app = express();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields: 'title' and 'author'.
    type Product {
        id: String
        name: String
        vendor: String
        price: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        products: [Product]
    }
`;

const products = [
    {
        id: 1,
        name: "The Great Gatsby",
        vendor: "F. Scott Fitzgerald",
    },
    {
        id: 2,
        name: "Wuthering Heights",
        vendor: "Emily Brontë",
    },
];
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        products: () => products,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
//const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
/*server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});*/
/*const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);*/
const LOCAL_SYSTEM_IP_ADDRESS = "192.168.1.104";
const PORT = "4000";
let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();
const httpserver = http.createServer(app);

app.get("/rest", function (req, res) {
    res.json({ data: "api working" });
});
/*
app.listen(4000, function () {
    console.log(`server running on port 4000`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});*/
app.listen("4000", LOCAL_SYSTEM_IP_ADDRESS, () => {
    console.log("server is listening on 4000 port");
});
