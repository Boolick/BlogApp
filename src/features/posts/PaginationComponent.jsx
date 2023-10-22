import { Pagination } from "react-bootstrap";
import { PropTypes } from "prop-types";

PaginationComponent.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

function PaginationComponent({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let index = 1; index <= Math.ceil(totalPosts / postsPerPage); index++) {
    pageNumbers.push(index);
  }
  const leftSide = currentPage - 2;
  const rightSide = currentPage + 2;
  return (
    <div>
      <Pagination size="lg">
        {pageNumbers
          .filter((number) => number > leftSide && number < rightSide)
          .map((number) => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => paginate(number)}
            >
              {number}
            </Pagination.Item>
          ))}
        <Pagination.Ellipsis />
      </Pagination>
    </div>
  );
}

export default PaginationComponent;
