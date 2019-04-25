import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import  Card  from "../components/Card";

const formatBookResults = googleApiResults => {
  const bookArray = [];

  googleApiResults.map(book => {

    // Formatted book object for passing down props to the stateless book card component
    const formattedBook = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      googleBookId: book.id,
      thumbnail: book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/170px-No_image_available.svg.png',
      link: book.volumeInfo.canonicalVolumeLink,
      subtitle: book.volumeInfo.subtitle,
      publishedDate: book.volumeInfo.publishedDate
    };

    bookArray.push(formattedBook);
    return bookArray
  });
  return bookArray;
};

class Saved extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getSaved()
      .then(res => {
        const formattedArray = formatBookResults(res);
        this.setState({books: formattedArray});
      })
      .catch(err => console.log(err));
  };

  deleteBook = book => {
    API.deleteBook(book)
      .then(alert("Book deleted from library."))
      .catch(err => console.log(err));
    };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
         <Row>
         <Col size="sm-12">
            <Jumbotron>
              <h1>Google Books Librarian, at Your Service</h1>
              <h5>Enter a title below to begin searching...</h5>
            </Jumbotron>
          </Col>
          <Col size="sm-12">
            {this.state.books.length ? (
              <Card
                books={this.state.books}
                buttonAction={this.deleteBook}
                buttonType="btn btn-success mt-2"
                buttonText="Delete Book"
              />
            ) : (
              <div className="mx-auto">
                <h3 className="mx-auto">No Saved Books to display!</h3>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    )}
}

export default Saved;
