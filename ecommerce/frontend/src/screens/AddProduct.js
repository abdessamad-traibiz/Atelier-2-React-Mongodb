import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddProduct() {
  const intialProduct = {
    id: null,
    name: "",
    price: 0,
    brand: "",
    image: null,
    countInStock: 0,
    category: "",
    description: "",
  };
  const [product, setProduct] = useState(intialProduct);
  function handleProductChange(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }
  function handleImageChange(e) {
    setProduct({ ...product, image: e.target.files[0] });
  }
  function submitProduct() {
    let form_data = new FormData();
    form_data.append("name", product.name);
    form_data.append("price", product.price);
    form_data.append("countInStock", product.countInStock);
    form_data.append("category", product.category);
    form_data.append("brand", product.brand);
    form_data.append("description", product.description);
    form_data.append("image", product.image, product.image.name);
    axios.post("/api/products/", form_data).then((response) => {
      setProduct({
        id: response.data.id,
        name: response.data.name,
        price: response.data.price,
        category: response.data.category,
        description: response.data.description,
        brand: response.data.brand,
        countInStock: response.data.countInStock,
        image: response.data.image,
      });
      console.log(product);
    });
    setProduct(product);
  }
  return (
    <Form onSubmit={submitProduct}>
      <Form.Group controlId="name">
        <Form.Label>Nom Produit</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Entrer le nom"
          onChange={handleProductChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Prix Produit</Form.Label>
        <Form.Control
          type="number"
          name="price"
          placeholder="Entrer le prix"
          onChange={handleProductChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="brand">
        <Form.Label>Marque Produit</Form.Label>
        <Form.Control
          type="text"
          name="brand"
          placeholder="Entrer la marque"
          onChange={handleProductChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description Produit</Form.Label>
        <Form.Control
          type="text"
          name="description"
          placeholder="Entrer la description"
          onChange={handleProductChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="category">
        <Form.Label>Catégorie Produit</Form.Label>
        <Form.Control
          type="text"
          name="category"
          placeholder="Entrer la catégorie"
          onChange={handleProductChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="countInStock">
        <Form.Label>Quantité Produit</Form.Label>
        <Form.Control
          type="number"
          name="countInStock"
          placeholder="Entrer la quantité"
          onChange={handleProductChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.File
          name="image"
          label="choisir une image"
          onChange={handleImageChange}
          custom
        ></Form.File>
      </Form.Group>
      <Button type="submit" variant="primary">
        Enregistrer
      </Button>
    </Form>
  );
}

export default AddProduct;
