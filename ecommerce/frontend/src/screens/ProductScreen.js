import React, { useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import axios from "axios";

function ProductScreen({ match }) {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    }
    fetchProduct();
  }, []);
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Retour
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} étoile`}
                color={"#f8e825"}
              />
            </ListGroup.Item>
            <ListGroup.Item>Prix:{product.price} dh</ListGroup.Item>
            <ListGroup.Item>Description:{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Prix:</Col>
                  <Col>
                    <strong>{product.price} dh</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Statut:</Col>
                  <Col>
                    {product.countInStock > 0
                      ? "Disponible en stock"
                      : "Rupture de stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  disabled={product.countInStock === 0}
                  type="button"
                >
                  Ajouter
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
