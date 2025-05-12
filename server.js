const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const app = express();
app.use(express.json());

const HelloType = new GraphQLObjectType({
  name: "HelloWorld",
  fields: {
    message: { type: GraphQLString },
  },
});

const authors = [
  { id: "1", name: "George Orwell", age: 46 },
  { id: "2", name: "Harper Lee", age: 34 },
  { id: "3", name: "J.K. Rowling", age: 55 },
];

const books = [
  { id: "1", title: "1984", genre: "Dystopian", authorId: "1" },
  { id: "2", title: "Animal Farm", genre: "Political Satire", authorId: "1" },
  { id: "3", title: "To Kill a Mockingbird", genre: "Fiction", authorId: "2" },
  { id: "4", title: "Go Set a Watchman", genre: "Fiction", authorId: "2" },
  {
    id: "5",
    title: "HP and the Philosopher's Stone",
    genre: "Fantasy",
    authorId: "3",
  },
  {
    id: "6",
    title: "HP and the Chamber of Secrets",
    genre: "Fantasy",
    authorId: "3",
  },
  {
    id: "7",
    title: "HP and the Prisoner of Azkaban",
    genre: "Fantasy",
    authorId: "3",
  },
  {
    id: "8",
    title: "HP and the Goblet of Fire",
    genre: "Fantasy",
    authorId: "3",
  },
];

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: () => ({
    hello: {
      type: HelloType,
      resolve: () => {
        return { message: "Hello World" };
      },
    },
  }),
});

// Define the schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: HelloType,
        resolve: () => {
          return { message: "Hello World" };
        },
      },
    },
  }),
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
