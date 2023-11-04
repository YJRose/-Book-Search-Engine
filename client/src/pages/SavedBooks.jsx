import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { RemoveBook } from '../utils/mutations';
import { Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(RemoveBook);

  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await removeBook({
        variables: { bookId },
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1>My Books</h1>
      {userData.savedBooks?.length ? (
        userData.savedBooks.map((book) => {
          return (
            <Card key={book.bookId}>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.description}</Card.Text>
                <Button
                  variant='primary'
                  onClick={() => handleDeleteBook(book.bookId)}
                >
                  Delete this Book!
                </Button>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <h3>You haven't added any books yet!</h3>
      )}
    </>
  );
};

export default SavedBooks;
