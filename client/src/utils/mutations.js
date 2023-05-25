export const CREATE_POST = gql`
  mutation createPost($content: String!) {
    createPost(content: $content) {
      _id
      content
      createdAt
      event
      userLocation
      user{
        _id
        username
      }
    }
  }
`;

