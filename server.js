const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

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

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents the Author of a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    genre: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "List of all books",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of all Authors",
      resolve: () => authors,
    },
  }),
});

// Define the schema
const schema = new GraphQLSchema({
  query: RootQueryType,
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
