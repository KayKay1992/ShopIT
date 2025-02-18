import React from "react";
import Pagination from "react-bootstrap/Pagination";

function Paginating({
  pages,
  page,
  isAdmin = false,
  isUserList = false,
  isOrderList = false,
  keyword,
}) {
  if (pages <= 1) return null; // Early return if no pagination is needed

  return (
    <Pagination>
      {[...Array(pages).keys()].map((x) => {
        const pageNumber = x + 1;
       
        let path; // Declare path to store the correct route

        if (!isAdmin && keyword) {
          // If it's admin and a keyword is provided, search path with pagination
          path = `/search/${keyword}/page/${x + 1}`;
        } else if (isAdmin) {
          // If it's admin without a keyword, use admin product list pagination
          path = `/admin/productlist/${pageNumber}`;
        } else if (isUserList) {
          // If it's a user list, use admin user list pagination
          path = `/admin/userlist/${pageNumber}`;
        } else if (isOrderList) {
          // If it's an order list, use admin order list pagination
          path = `/admin/orderlist/${pageNumber}`;
        } else {
          // If none of the conditions are met, just use the regular page pagination
          path = `/page/${pageNumber}`;
        }

        return (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === page}
            aria-current={pageNumber === page ? "page" : undefined}
            as="a"
            href={path} // This directly sets the href
          >
            {pageNumber}
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
}

export default Paginating;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Pagination from 'react-bootstrap/Pagination';

// function Paginating({ pages, page, isAdmin = false, isUserList = false }) {
//   if (pages <= 1) return null; // Early return if no pagination is needed

//   return (
//     <Pagination>
//       {[...Array(pages).keys()].map((x) => {
//         const pageNumber = x + 1;
//         let path = '';

//         if (isAdmin) {
//           path = `/admin/productlist/${pageNumber}`;
//         } else if (is) {
//           path = `/userlist/${pageNumber}`;
//         } else {
//           path = `/page/${pageNumber}`;
//         }

//         return (
//           <Pagination.Item
//             key={pageNumber}
//             active={pageNumber === page}
//             aria-current={pageNumber === page ? 'page' : undefined}
//           >
//             <Link to={path}>
//               {pageNumber}
//             </Link>
//           </Pagination.Item>
//         );
//       })}
//     </Pagination>
//   );
// }

// export default Paginating;
