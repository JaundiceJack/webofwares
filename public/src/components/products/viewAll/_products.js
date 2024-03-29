// Import basics
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import dispatch actions
import { getProducts } from "../../../actions/productActions.js";
// Import components
import Item from "../../item/_item.js";
import Spinner from "../../multipurpose/spinner.js";
import Message from "../../multipurpose/message.js";
import OptionsBar from "./optionsBar.js";
import { Pagination } from "@mantine/core";

const Products = ({ history, match }) => {
  // Grab params and global states
  const keyword = match.params.keyword;
  const { products, loading, error, numPages, page, categories } = useSelector(
    (state) => state.productList
  );

  // Get products on page load
  const dispatch = useDispatch();
  useState(() => {
    dispatch(getProducts(keyword, page, categories));
  }, [dispatch]);

  // Change the page and get the next products
  const setPage = (e) => {
    keyword
      ? history.push(`/merch/search/${keyword}/page/${e}`)
      : history.push(`/merch/page/${e}`);
    dispatch(getProducts(keyword, e, categories));
  };

  return (
    <div className={`flex items-center justify-center w-full h-full`}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message error={error} />
      ) : (
        <div
          className={`self-start flex flex-col px-4 sm:px-12 py-7 h-full mx-auto`}
        >
          <OptionsBar queryString={keyword} />
          <div
            className={`w-full h-full grid grid-cols-1 gap-8 justify-items-center 
            sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3`}
          >
            {products.map((product) => {
              return (
                <Item
                  key={product._id}
                  product={product}
                  extraClasses="w-84 h-84 rounded-xl "
                />
              );
            })}
          </div>
          <Pagination
            className="mx-auto mt-12 "
            page={page}
            onChange={setPage}
            total={numPages}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
