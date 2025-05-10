const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql'); 
const app = express();


app.use(express.json());
app.use('/graphql', expressGraphQL({
  schema: buildSchema(`
    type Query {
      hello: String
    }
  `),
  rootValue: {
    hello: () => 'Hello world!'
  },
  graphiql: true
}));
app.listen(5000, () => {
  console.log('Server is running on port 5000 ');
});