import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userDataActionTypes, userDataSelectors } from "../store/userData";
import "../styles/main.css";
import JSON_STOCK from "../constants/customData.json";

export default function StockComponent() {
  const dispatch = useDispatch();
  const userStockData = useSelector(userDataSelectors.getUserStock);
  const [stockData, setStockData] = React.useState([] as any);
  const [value, setValue] = React.useState('1');

  React.useEffect(() => {
    setStockData(JSON_STOCK);
  }, []);

  const handleChange = (event: any) => {
    setValue(event.target.value);

  };

  const addStock = (selectedStock: any) => {
    const user_stock_Data = userStockData.data
    const findId = (obj: any) => obj.id === selectedStock?.id;
    const objIndex = user_stock_Data.findIndex(findId);
    if (objIndex === -1) {
      dispatch({
        type: userDataActionTypes.ADD_STOCK,
        payload: {
          data: selectedStock,
          loader: false,
          error: false,
        },
      });
    } else {
      user_stock_Data[objIndex].quantity =
        user_stock_Data[objIndex].quantity + 1;
      dispatch({
        type: userDataActionTypes.UPDATE_STOCK,
        payload: {
          data: user_stock_Data,
          loader: false,
          error: false,
        },
      });
    }
  };

  const deleteStock = (selectedStock: any) => {
    selectedStock.quantity = 1;
    dispatch({
      type: userDataActionTypes.DELETE_STOCK,
      payload: {
        data: selectedStock,
        loader: false,
        error: false,
      },
    });
  };

  return (
    <div className="tableBlock">
      <div className="noData"></div>
      <div className="top-section">
        <div>
          <label className="label">
            Select your product here
            <select value={value} onChange={handleChange} className="select">
              {stockData.map((product: any) => (
                <option value={product.id} onClick={() => addStock(product)}>{product.productName}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <Button className="stock-btn">Stock Request</Button>
        </div>
      </div>

      <h1 className="stock-heading">Stock Available </h1>
      <div className="row" >
        {stockData.map((item: any, i: number) => {
          return (
            <div className="col md-4 stockContainer">
              <>
                <div>
                  <br />
                  <h1 className="product-name">{item.productName}</h1>
                  <p>SellerName:{item.sellerName}</p>
                  <p>Rs {item.price}/-</p>
                </div>
                <div className="add-item">
                  <Button onClick={() => addStock(item)} variant="primary" className="add-btn">
                    Add Item
                  </Button>

                </div>
              </>
            </div>
          );
        })}
      </div>
      <div className="noData"></div>
      <h1 className="stock-heading">Stock Details</h1>
      <div className="noproducts">
        <table className="tableContainer">
          <tr>
            <th className="table">SellerName</th>
            <th className="table">ProductId</th>
            <th className="table">ProductName</th>
            <th className="table">Price</th>
            <th className="table">Quanitity</th>
            <th className="table">Total Amount</th>
            <th className="table">Cancel Item</th>
          </tr>

          {userStockData.data?.map((item: any, i: number) => {
            const total = item.quantity * item.price
            return (
              <>
                <tr>

                  <td className="table">{item.sellerName}</td>
                  <td className="table">{item.id}</td>
                  <td className="table">{item.productName}</td>
                  <td className="table">{item.price}</td>
                  <td className="table">{item.quantity}</td>
                  <td className="table">{total}</td>
                  <td className="table"><div style={{ marginTop: 5 }}>
                    <div className="btns">
                      <Button onClick={() => deleteStock(item)} variant="primary" className="cancel-btn">
                        Cancel Item
                      </Button>

                    </div>
                  </div>
                  </td>

                </tr>

              </>

            );

          })}


        </table>
      </div>
      {userStockData?.data?.length === 0 && (
        <div className="noData">
          <div >
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png" className="noproducts-img" alt="products" />
            <h1 className="products">No Products Added</h1>
          </div>

        </div>
      )}







    </div>
  );
}
