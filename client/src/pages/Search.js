import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import { Input, FormBtn } from "../components/Form";

// Book results from the google API need to be formatted so that they can be transmuted to the state of the search page
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

class Search extends Component {
  
  state = {
    books: [],
    title: "",
    // author: "",
  };
    
  saveBook = event => {

    const chosenBook = this.state.books.find(book => book.googleBookId === event.target.id);

    console.log(chosenBook);
    // const newSave = {
    //   title: chosenBook.title,
    //   authors: chosenBook.authors,
    //   description: chosenBook.description,
    //   googleBookId: chosenBook.googleBookId,
    //   thumbnail: chosenBook.thumbnail,
    //   link: chosenBook.link,
    //   pageCount: chosenBook.pageCount,
    //   subtitle: chosenBook.subtitle,
    //   publishedDate: chosenBook.publishedDate
    // };

    API.saveBook(chosenBook)
      .then(res => {
        console.log(res.status, res.statusText);
        alert('Book Saved!', {type: 'success'})
      })
      .catch(err => {
        console.log(err);
        alert('Sorry, There was an issue with something back here...', {
          type: 'error',
          timeout: 5000
        })
      })
  };
    
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
    
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("handle form");
      API.getGoogleBooks(this.state.title)
        .then(res => {
          const formattedArray = formatBookResults(res.data.items);
          this.setState({books: formattedArray});
        })
        .catch(err => console.log(err));
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
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="e.g. The Lord of the Flies"
              />
              <FormBtn
                // disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            {this.state.books.length ? (
              <Card
                books={this.state.books}
                buttonAction={this.saveBook}
                buttonType="btn btn-success mt-2"
                buttonText="Save Book"
              />
            ) : (
              <div className="mx-auto">
                <h3 className="mx-auto">No results to display! Enter a title above</h3>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;