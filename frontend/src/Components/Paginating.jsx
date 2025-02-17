
import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

function Paginating({ pages, page, isAdmin = false, isUserList = false, isOrderList = false}) {
  if (pages <= 1) return null; // Early return if no pagination is needed

  return (
    <Pagination>
      {[...Array(pages).keys()].map((x) => {
        const pageNumber = x + 1;
        let path = '';
        if (isAdmin) {
                    path = `/admin/productlist/${pageNumber}`;
                  } else if (isUserList) {
                    path = `/admin/userlist/${pageNumber}`;
                  }
                  else if (isOrderList) {
                    path = `/admin/orderlist/${pageNumber}`;
                  }
                   else {
                    path = `/page/${pageNumber}`;
                  }
        return (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === page}
            aria-current={pageNumber === page ? 'page' : undefined}
            as="a"
            href={path}  // This directly sets the href
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
