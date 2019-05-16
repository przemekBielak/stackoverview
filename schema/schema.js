// read sample json object
const data = require("../data.json");

const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const InfoType = new GraphQLObjectType({
  name: "Info",
  fields: () => ({
    id: { type: GraphQLString },
    index: { type: GraphQLInt },
    age: { type: GraphQLInt },
    eyeColor: { type: GraphQLString },
    name: {type: GraphQLString},
    gender: { type: GraphQLString },
    company: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    about: { type: GraphQLString },
    registered: { type: GraphQLString },
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    info: {
      type: InfoType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return data.filter(x => {
          return x.id == args.id;
        })[0];
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
