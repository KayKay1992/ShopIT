import { Card } from "react-bootstrap";

function ProductCard({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="p">
          {product.description.substring(0, 100)}...
        </Card.Text>
        <Card.Text as='h3'>#{product.price}</Card.Text>

      </Card.Body>
    </Card>
  );
}

export default ProductCard;
