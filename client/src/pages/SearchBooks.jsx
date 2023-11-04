import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";
import { Card, Button } from "react-bootstrap";
import Auth from "../utils/auth";

const SearchBooks = ({ books }) => {

  const [saveBook] = useMutation(SAVE_BOOK);
  const [savedBooks, setSavedBooks] = useState([]);

  const handleSaveBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await saveBook({
        variables: { bookId },
      });
      setSavedBooks([...savedBooks, bookId]);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <h1>Search for Books</h1>
      {books.map((book) => {
        return (
          <Card key={book.bookId}>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>{book.description}</Card.Text>
              <Button
                variant='primary'
                onClick={() => handleSaveBook(book.bookId)}
              >
                Save this Book!
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}

export default SearchBooks;
