import { gql } from '@apollo/client';

export const getMe = gql`
    query me {
        me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
        }
    }
    `;

export const createUser = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password){
        token
        user {
            _id
            username
        }
        }
    }
    `;


export const loginUser = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
        token
        user {
            _id
            username
        }
        }
    }
    `;

export const saveBook = gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData){
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
        }
    }
    `;

export const deleteBook = gql`
    mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $bookId){
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
        }
    }
    `;

export const searchGoogleBooks = gql`
    query searchGoogleBooks($searchTerm: String!) {
        searchGoogleBooks(searchTerm: $searchTerm) {
        bookId
        authors
        description
        image
        link
        title
        }
    }
    `;