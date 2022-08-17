import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Tab, Tabs,Sonnet } from "react-bootstrap";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userid = JSON.parse(localStorage.getItem("currentUser")).user.uid;
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      console.log(ordersArray);
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div>
      <Layout loading={loading}>
        <div className="p-2">
        
          {orders
            .filter((obj) => obj.userid == userid)
            .map((order) => {
       
              return (
               
                <table className="table mt-3 order">
                
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              );
            })}
        </div>
      </Layout>
    </div>
  );
}
export default OrdersPage;
