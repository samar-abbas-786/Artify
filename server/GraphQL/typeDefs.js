import { gql } from "apollo-server";

export const typeDefs = gql`
  type Painting {
    id: ID!
    title: String!
    views: Int!
    body: String!
  }
  type TitleViews {
    title: String!
    views: Int!
  }

  type Query {
    getPaintings: [Painting]
    getTitleView: [TitleViews]
    getSpecificPainting(id: ID!): Painting
  }
`;
