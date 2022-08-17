import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
import { Tab, Tabs } from "react-bootstrap";
import "../stylesheet/admin.css";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
  });
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({
    name: "",
    imageURL: "",
    pdfURL: "",
    category: "",
  });

  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [addBookPdf, setAddBookPdf] = useState(false);
  // console.log(add)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseBook = () => setShowBook(false);
  const handleShowBook = () => setShowBook(true);
  const [orders, setOrders] = useState([]);

  //product
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
  //book
  useEffect(() => {
    getBookData();
  }, []);

  async function getBookData() {
    try {
      setLoading(true);
      const bookFree = await getDocs(collection(fireDB, "books"));
      const booksArray = [];
      bookFree.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        booksArray.push(obj);
        setLoading(false);
      });
      setBooks(booksArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //Order
  useEffect(() => {
    getOrdersData();
  }, []);

  async function getOrdersData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });

      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //product
  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };
  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);
      handleClose();
      toast.success("product updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error("product updated failed");
      setLoading(false);
    }
  };
  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);
      handleClose();
      toast.success("product add successfully");
      window.location.reload();
    } catch (error) {
      toast.error("product add failed");
      setLoading(false);
    }
  };
  const addHandler = () => {
    setAdd(true);
    handleShow();
  };
  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("product deteted successfully");
      getData();
    } catch (error) {
      toast.failed("product delete failed");
      setLoading(false);
    }
  };
  //book
  const editHandlerBook = (item) => {
    setBook(item);
    setShowBook(true);
  };
  const updateBook = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "books", book.id), book);
      handleCloseBook();
      toast.success("book updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error("book updated failed");
      setLoading(false);
    }
  };
  const addBook = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "books"), book);
      handleCloseBook();
      toast.success("books add successfully");
      window.location.reload();
    } catch (error) {
      toast.error("books add failed");
      setLoading(false);
    }
  };
  const addHandlerBook = () => {
    setAddBookPdf(true);
    handleShowBook();
  };
  const deleteBook = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "books", item.id));
      toast.success("books deteted successfully");
      getData();
    } catch (error) {
      toast.failed("books delete failed");
      setLoading(false);
    }
  };

  return (
    <div loading={loading}>
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="products" title="Sản phẩm">
          <div className="d-flex justify-content-between">
            <h3>Products List</h3>
            <button onClick={addHandler}> ADD PRODUCT</button>
          </div>
          <table className="table mt-3  ">
            <thead className="textAdmin">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                return (
                  <tr>
                    <td>
                      <img src={item.imageURL} height="80" width="80" />{" "}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                      <FaTrash
                        color="red"
                        size={20}
                        onClick={() => deleteProduct(item)}
                      />
                      <FaEdit
                        onClick={() => editHandler(item)}
                        color="blue"
                        size={20}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add === true ? "Add a product" : "Edit product"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <input
                  type="text"
                  value={product.name}
                  className="form-control"
                  placeholder="name"
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.imageURL}
                  className="form-control"
                  placeholder="img URL"
                  onChange={(e) =>
                    setProduct({ ...product, imageURL: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={product.price}
                  className="form-control"
                  placeholder="price"
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.category}
                  className="form-control"
                  placeholder="category"
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                />

                <div className="col-md-12">
                  <label for="comments" className="form-label"></label>
                  <textarea
                    id="comments"
                    className="form-control"
                    rows={5}
                    type="text"
                    value={product.description}
                    placeholder="description"
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                  ></textarea>
                </div>
                <input
                  type="text"
                  value={product.company}
                  className="form-control"
                  placeholder="Công ty phát hành"
                  onChange={(e) =>
                    setProduct({ ...product, company: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.day}
                  className="form-control"
                  placeholder="Ngày xuất bản"
                  onChange={(e) =>
                    setProduct({ ...product, day: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.version}
                  className="form-control"
                  placeholder="Phiên bản"
                  onChange={(e) =>
                    setProduct({ ...product, version: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.paper}
                  className="form-control"
                  placeholder="Loại bìa"
                  onChange={(e) =>
                    setProduct({ ...product, paper: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.numberPages}
                  className="form-control"
                  placeholder="Số trang"
                  onChange={(e) =>
                    setProduct({ ...product, numberPages: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.publishing}
                  className="form-control"
                  placeholder="Nhà xuất bản"
                  onChange={(e) =>
                    setProduct({ ...product, publishing: e.target.value })
                  }
                />

                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button>Close</button>
              {add ? (
                <button onClick={addProduct}>SAVE</button>
              ) : (
                <button onClick={updateProduct}>SAVE</button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="books" title="Sách">
          <div className="d-flex justify-content-between">
            <h3>BOOK LIST</h3>
            <button onClick={addHandlerBook}> ADD book</button>
          </div>
          <table className="table mt-3">
            <thead className="textAdmin">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((item) => {
                return (
                  <tr>
                    <td>
                      <img src={item.imageURL} height="80" width="80" />{" "}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>
                      <FaTrash
                        color="red"
                        size={20}
                        onClick={() => deleteBook(item)}
                      />
                      <FaEdit
                        onClick={() => editHandlerBook(item)}
                        color="blue"
                        size={20}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal showBook={showBook} onHide={handleCloseBook}>
            <Modal.Header closeButton>
              <Modal.Title>
                {addBookPdf === true ? "Add a Book" : "Edit Book"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <input
                  type="text"
                  value={book.name}
                  className="form-control"
                  placeholder="name"
                  onChange={(e) => setBook({ ...book, name: e.target.value })}
                />
                <input
                  type="text"
                  value={book.imageURL}
                  className="form-control"
                  placeholder="img URL"
                  onChange={(e) =>
                    setBook({ ...book, imageURL: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={book.pdfURL}
                  className="form-control"
                  placeholder="pdfURL"
                  onChange={(e) => setBook({ ...book, pdfURL: e.target.value })}
                />
                <input
                  type="text"
                  value={book.category}
                  className="form-control"
                  placeholder="category"
                  onChange={(e) =>
                    setBook({ ...book, category: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={book.description}
                  className="form-control"
                  placeholder="description"
                  onChange={(e) =>
                    setBook({ ...book, description: e.target.value })
                  }
                />
                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button>Close</button>
              {addBookPdf ? (
                <button onClick={addBook}>SAVE</button>
              ) : (
                <button onClick={updateBook}>SAVE</button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="orders" title="Đặt hàng ">
          {orders.map((order) => {
            {
              /* var objectArray = Object.entries(order.addressInfo);
            console.log(objectArray); */
            }

            {
              /* console.log(orders)  */
            }
            {
              /* console.log(order.cartItems) */
            }
            return (
              <table className="table mt-3 order">
                <thead className="textAdmin">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>

                    <th></th>
                    <th>Thông tin người mua</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img src={item.imageURL} height="80" width="80" />{" "}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.address}</td>
                        {Object.keys(order.addressInfo).map((key) => {
                          return (
                            <tr>

                              
                              <td>{order.addressInfo[key]}</td>
                              </tr>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
        </Tab>
        <Tab eventKey="contact" title="Người dùng" disabled></Tab>
        <Tab eventKey="topbook" title="Sản phẩm bán chạy" disabled></Tab>
        <Tab eventKey="cmt" title="Đánh giá người dùng " disabled></Tab>
        <Tab eventKey="mg" title="quan li nguoi dung" disabled>
          {/* {orders.map((order) => {
            console.log(order)
            return (
              <table className="table mt-3 order">
              
                <thead>
                  <tr>
      
                    <th>Name</th>
                    <th>Địa chỉ</th>
                  </tr>
                </thead>
                <tbody>
                
                   {order.map((item) => {
                    console.log(order)
                    return (
                      <tr>
                        <td>{item.name}</td>

                        <td>{item.address}</td>
                        
                      </tr>
                    );
                  })} 
                    
               
                 
                  
                </tbody>
               
              </table>
            );
          })} */}
        </Tab>
      </Tabs>
    </div>
  );
}
export default AdminPage;
