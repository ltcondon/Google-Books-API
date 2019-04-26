import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import  Card  from "../components/Card";

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
        console.log(res);
        this.setState({books: res.data});
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then( res => {
        console.log(res);
        alert("Book deleted from library.")
        this.loadBooks();
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
          </Col>
          <Col size="sm-12">
            {this.state.books.length ? (
              <Card
                books={this.state.books}
                buttonAction={() => this.deleteBook(this.id)}
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
