import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { fireproducts } from "../myebook-products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import applebtn from "../img/apple_btn.png";
import googlebtn from "../img/google_btn.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar, FaStarHalf } from "react-icons/fa";
import imgs1 from "../img/s1.jpg";
import imgs2 from "../img/s2.jpg";
import imgs3 from "../img/s3.jpg";
import imgs4 from "../img/s4.jpg";
import imgs5 from "../img/s5.jpg";
import imgs6 from "../img/s6.jpg";
function Homepage() {
  const [products, setProducts] = useState([]);
  //useSelector : selector co the dung nhiu noi, nhiu component khac nhau
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { addressInfo } = useSelector((state) => state.cartReducer);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  // dispath di duoc action len redux-store
  const dispatch = useDispatch();
  //  dung` useNavigate dieu huong trang
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
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
  //them vao gio hang
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout loading={loading}>
      {/* COVER */}
      <div className="cover">
        <div className="cover__content">
          <h1>Đọc sách Online</h1>
          <h5>
            Mua sách thật chính là bạn đã ủng hộ cho tác giả và nhà xuất bản{" "}
          </h5>
        </div>
      </div>
      <div className="intro">
        <div className="intro__content">
          <div className="row">
            <div className="col-4">
              <div className="intro__items">
                <div className="intro__icon">
                  <i className="fa fa-bullseye"></i>
                </div>
                <div className="intro__details">
                  <p>1.000 cuốn sách</p>
                  <p>Khám phá nhiều chủ đề mới</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="intro__items">
                <div className="intro__icon">
                  <i className="fa fa-spinner"></i>
                </div>
                <div className="intro__details">
                  <p>Cuốn sách phù hợp</p>
                  <p>Mọi chủ đề đều dành cho bạn</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="intro__items">
                <div className="intro__icon">
                  <i className="fa fa-sync-alt"></i>
                </div>
                <div className="intro__details">
                  <p> Sách miễn phí</p>
                  <p>Đọc mọi lúc mọi nơi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* view ra ngoai */}
      <div className="container">
        {/* Sap xep */}
        <div className="d-flex w-50 align-items-center my-3 justify-content-center">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            className="form-control mx-2"
            placeholder="search items"
          />
          <select
            className="form-control mt-3"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value=""> ALL</option>
            <option value="mentality">Tâm Lý - Kỹ năng sống</option>
            <option value="economy">Kinh tế - Quản lý</option>
            <option value="literary">Văn học Việt Nam</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div className="row">
          {/* Sap xep */}
          {products
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .map((product) => {
              return (
                <div className="cart col-md-3 body_cart">
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <div className="text-center">
                        <img
                          src={product.imageURL}
                          alt=""
                          className="product-img"
                        />
                      </div>
                      <p className="productNameBook">{product.name}</p>
                      <div className="card__stars">
                        <span className="iStar">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStarHalf />
                        </span>
                        <span className="card__rate">4.6</span>
                        <span className="card__total">(11.597)</span>
                      </div>
                      <h4 id="product-actions-gia">{product.price} đ</h4>
                    </div>
                    <div className="product-actions">
                      <h2>{product.price} đ</h2>
                      <div className="d-flex">
                        <button
                          className="button--red mx-2"
                          onClick={() => addToCart(product)}
                        >
                          ADD TO CART
                        </button>
                        <button
                          className="button--red"
                          onClick={() => {
                            // chuyen toi trong Productinfo
                            navigate(`/productinfo/${product.id}`);
                          }}
                        >
                          VIEW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="banner">
        <div className="container">
          <h2>Đọc mọi lúc mọi nơi</h2>
          <p>Tham gia các ứng dụng trên bất kỳ thiết bị nào của bạn</p>
          <p>Hãy thử thách bản thân mình , vượt qua mọi giới hạn</p>
          <button className="button--red">Sign Up For Free</button>
          <div className="row">
            <div className="col-6 text-right">
              <img src={googlebtn} alt="google btn" />
            </div>
            <div className="col-6 text-left">
              <img src={applebtn} alt="apple btn" />
            </div>
          </div>
        </div>
      </div>
      <OwlCarousel className="owl-theme" margin={10} items="3" autoplay>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs1} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                I had a couple of months of experience trading without
                consistent results. After taking this course I'm pretty
                confident that I'll be a better trader and know better when to
                enter a trade, how to put my stop loss and take profit, how many
                lots to trade and much more.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs2} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                I had a couple of months of experience trading without
                consistent results. After taking this course I'm pretty
                confident that I'll be a better trader and know better when to
                enter a trade, how to put my stop loss and take profit, how many
                lots to trade and much more.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs3} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                I had a couple of months of experience trading without
                consistent results. After taking this course I'm pretty
                confident that I'll be a better trader and know better when to
                enter a trade, how to put my stop loss and take profit, how many
                lots to trade and much more.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs4} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                I had a couple of months of experience trading without
                consistent results. After taking this course I'm pretty
                confident that I'll be a better trader and know better when to
                enter a trade, how to put my stop loss and take profit, how many
                lots to trade and much more.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs5} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                I had a couple of months of experience trading without
                consistent results. After taking this course I'm pretty
                confident that I'll be a better trader and know better when to
                enter a trade, how to put my stop loss and take profit, how many
                lots to trade and much more.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs6} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                I had a couple of months of experience trading without
                consistent results. After taking this course I'm pretty
                confident that I'll be a better trader and know better when to
                enter a trade, how to put my stop loss and take profit, how many
                lots to trade and much more.
              </p>
            </div>
          </div>
        </div>
      </OwlCarousel>
      ;
    </Layout>
  );
}
export default Homepage;
