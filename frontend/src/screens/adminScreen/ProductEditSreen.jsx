import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import FormContainer from "../../Components/FormContainer";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

function ProductEditSreen() {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUploadImage }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImage(product.image);
      setDescription(product.description);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setCategory(product.category);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      image,
      description,
      price,
      countInStock,
      brand,
      category,
    };
    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated successfully");
      navigate("/admin/productList");
    }
  };

  //   const uploadFileHandler = async (e) => {
  //     const file = e.target.files[0];
  //     const formData = new FormData();
  //     formData.append("image", file);
  //     try {
  //       const res = await uploadProductImage(formData).unwrap();
  //       toast.success(res.message);
  //       setImage(res.image);
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // Append file to FormData

    try {
      // Assuming uploadProductImage handles the file upload and returns a response
      const res = await uploadProductImage(formData).unwrap();

      // Check if the response has the expected data
      if (res?.image) {
        toast.success("Image uploaded successfully!");
        setImage(res.image); // Set the image URL or data to the state
      } else {
        toast.error("Image upload failed: no image returned in response.");
      }
    } catch (err) {
      // Handle errors if any API call fails
      toast.error(
        err?.data?.message ||
          err?.error ||
          "Something went wrong during the upload"
      );
    }
  };

  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-0">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>

              {/* Text input for image URL */}
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image || ""}
                onChange={(e) => setImage(e.target.value)} // Correctly set image state
              />

              {/* Label for file input */}
              <Form.Label>Choose file</Form.Label>
              <Form.Control
                type="file"
                onChange={uploadFileHandler} // Handling file upload
              />
          
            </Form.Group>
            {loadingUploadImage && <Loader/>}

            {/* File input for uploading image
              <Form.Control
                type="file"
                label="Choose file"
                onChange={uploadFileHandler}
              />
            </Form.Group> */}

            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter category"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">
              Update Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default ProductEditSreen;
