import {Row, Col} from 'react-bootstrap'
import products from '../products'
import ProductCard from '../Components/ProductCard'

function HomeScreen() {
  return (
    <>
    <h1>Latest Products </h1>
    <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
            {/* You can pass the product detials directly here just like i did and you can also create a productCard component and import it anywheere you want to use it like i imported it here
            <div className="card">
              <img src={product.image} alt={product.name} />
              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-text">{product.description}</p>
                <h6>${product.price}</h6>
              </div>
            </div> */}
            <ProductCard product={product} />
          </Col>
        ))}
    </Row>
    </>
  )
}

export default HomeScreen