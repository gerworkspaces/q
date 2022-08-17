import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaStarHalf } from "react-icons/fa";

function ProductInfo() {
  const [product, setProduct] = useState([]);
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
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );
      //productTemp.data() hien thi san pham view
      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("addressInfo", JSON.stringify(addressInfo));
  }, [addressInfo]);
  return (
    <Layout loading={loading}>
      <div className="container productinfo">
        <div className="row card_products justify-content-center">
          <div className="col-4 ">
            {product && (
              <div className="card_products_img body_cart">
                <img src={product.imageURL} className="product-info-img" />
              </div>
            )}
          </div>
          <div className="card_products_name body_cart col-8">
            <p>
              <b className="textProducts">{product.name}</b>
            </p>
            <div className="Productinfo_price">
              <p>{product.price} đ</p>
            </div>

            <span className="iStar">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </span>
            <span className="card__rate">4.6</span>
            <span className="card__total">(11.597 Đánh giá)</span>
            <p>
              {" "}
              <button
                className="button--red"
                onClick={() => addToCart(product)}
              >
                ADD TO CART
              </button>
            </p>
          </div>
        </div>
        <div>
          <hr />
          <div className="productinfo_thongtin body_cart">
            <div className="container">
              <h3 className="textLMD  " >Thông tin chi tiết</h3>
              <table className="table-fill">
                <tbody className="table-hover">
                  <tr>
                    <td className="text-left">Công ty phát hành </td>
                    <td className="text-left">{product.company}</td>
                  </tr>
                  <tr>
                    <td className="text-left">Ngày xuất bản</td>
                    <td className="text-left">{product.day}</td>
                  </tr>
                  <tr>
                    <td className="text-left">Phiên bản</td>
                    <td className="text-left">{product.version}</td>
                  </tr>
                  <tr>
                    <td className="text-left">Loại bìa </td>
                    <td className="text-left">{product.paper}</td>
                  </tr>
                  <tr>
                    <td className="text-left">Số trang</td>
                    <td className="text-left">{product.numberPages}</td>
                  </tr>
                  <tr>
                    <td className="text-left">Nhà xuất bản </td>
                    <td className="text-left">{product.publishing}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="body_cart">
          <p className="textLMD  ">Mô tả sản phẩm</p>
          <p className="textDT">{product.description}</p>
          <div className="d-flex justify-content-end my-3"></div>
          </div>
         
        </div>
      </div>
    </Layout>
  );
}
export default ProductInfo;
