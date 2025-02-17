import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function SearchBox() {
  // Destructure keyword from URL parameters
  const { keyword: urlKeyword } = useParams();
  // Initialize navigate and keyword state
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    
    // Redirect based on keyword presence
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);  // Redirect to home page if no keyword
    }

    // Reset search field after submission
    setKeyword('');
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      {/* Input field for search keyword */}
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      />
      
      {/* Submit button */}
      <Button variant="outline-light" type="submit" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
