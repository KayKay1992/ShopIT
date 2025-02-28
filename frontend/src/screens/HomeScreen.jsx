import {Row, Col} from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Paginating from '../Components/Paginating';
import ProductCarousel from '../Components/ProductCarousel';
import Meta from '../Components/Meta';






function HomeScreen() {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({keyword, pageNumber});
  return (
    <>
    {!keyword ? (<ProductCarousel/>) :
    (<Link to='/' className='btn btn-light mb-4'>
    Go Back 
    </Link>)}
    {isLoading ? (
      <Loader/>
    ) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
      <>
        <Meta title='ShopIt Now'/>
      <h1>Latest Products </h1>
      <Row>
          {data.products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
              <ProductCard product={product} />
            </Col>
          ))}
      </Row>
      <Paginating
       pages = {data.pages}
       page={data.page}
      keyword ={ keyword ? keyword : ''}
      />
      </>
    )}
   
    </>
  )
}

export default HomeScreen