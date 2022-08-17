import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaStarHalf } from "react-icons/fa";
function Bookinfo() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { addressInfo } = useSelector((state) => state.cartReducer);
  // useParams dung de lay thong tin
  const params = useParams();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoading(true);
      const bookTemp = await getDoc(doc(fireDB, "books", params.bookid));
      //productTemp.data() hien thi san pham view
      setBook(bookTemp.data());
      console.log(bookTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("addressInfo", JSON.stringify(addressInfo));
  }, [addressInfo]);
  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row card_products justify-content-center">
          <div className="col-4 ">
            {book && (
              <div className="card_products_img">
                <img src={book.imageURL} className="product-info-img" />
              </div>
            )}
          </div>
          <div className="card_products_name col-8">
            <p>
              <b className="textProducts">{book.name}</b>
            </p>
            <div className="Productinfo_price"></div>

            <span className="iStar">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </span>
            <span className="card__rate">4.6</span>
            <span className="card__total">(11.597 Đánh giá)</span>
            <p> </p>
          </div>
        </div>
        <div>
          <hr />

          <div className="d-flex justify-content-end my-3"></div>
          <div className="container bookPDF">
            <iframe
              src={book.pdfURL}
              width="740"
              height="800"
              allow="autoplay"
            ></iframe>
          </div>
          
          <div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Bookinfo;
