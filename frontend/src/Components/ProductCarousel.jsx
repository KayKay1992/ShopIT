import { Link } from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"
import Message from "./Message"
import { useGetTopProductsQuery } from "../slices/productsApiSlice"

// function ProductCarousel() {
//     const { data: products, isLoading, error } = useGetTopProductsQuery()
//   return (
//    isLoading ? <Loader/>  : error ? <Message variant='danger'>{error}</Message> : (
//     <Carousel pause='hover' className="bg-primary mb-4">
//         {products.map((product) => (
//             <Carousel.Item key={product.id}>
//                 <Link to={`/products/${product.id}`}>
//                     <Image src={product.image} alt={product.name} fluid />
//                 </Link>
//                 <Carousel.Caption className="carousel-caption">
//                     <h3>{product.name}</h3>
//                     <p>{product.description.slice(0, 100)}...</p>
//                 </Carousel.Caption>
//             </Carousel.Item>
//         ))}
//     </Carousel>
//    )
//   )
// }

// export default ProductCarousel


function ProductCarousel() {
  // Fetch the top products using a query
  const { data: products, error } = useGetTopProductsQuery();

  // Handle loading and error states
 
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <Carousel pause="hover" className="bg-primary mb-4">
      {/* Map through the products and render each carousel item */}
      {products?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
         
          <Carousel.Caption className="carousel-caption">
            <h3>{product.name}</h3>
            <p>{product.description.slice(0, 100)}...</p>
          </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
