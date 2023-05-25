export const ADD_CONCERT = gql`
  mutation addConcert($concertText: String!) {
    addConcert(concertText: $concertText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;