import React from "react";
import { useHistory } from 'react-router-dom'
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userDataActionTypes, userDataSelectors } from "../store/userData";
import "../styles/main.css";
import JSON_STOCK from "../constants/customData.json";
import { ROUTER_URL_CONSTANT } from "../constants/routerUrlConstant";
import NoStock from "../components/noStock";

export default function StockUpdate() {
  const dispatch = useDispatch();
  const history = useHistory()

  const userStockData = useSelector(userDataSelectors.getUserStock);
  const [stockData, setStockData] = React.useState([] as any);
  const [previewStock, setPreviewStock] = React.useState([] as any);
  const [value, setValue] = React.useState('1');


  React.useEffect(() => {
    setStockData(JSON_STOCK);
  }, []);

  const handleChange = (event: any) => {
    setValue(event.target.value);
    const index = event.target.value - 1;
    setPreviewStock((previewStock: any) => [...previewStock, stockData[index]]);
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

  const deleteStock = (selectedStock: any, i: number) => {
    const filteredStock = previewStock.filter((item: any) => item.id !== selectedStock.id);
    setPreviewStock(filteredStock);

  };
  const gotoInventory = () => {
    history.push(ROUTER_URL_CONSTANT.INVENTORY_INFO_PAGE)
  }

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
          <Button className="stock-btn" onClick={() => gotoInventory()}>Stock Update</Button>
        </div>
      </div>
      <div className="noData"></div>
      <h1 className="stock-heading">Stock Details</h1>
      <div className="noproducts">
        <table className="tableContainer">
          <tr>
            <th className="table">SellerName</th>
            <th className="table">Product Quantity</th>
            <th className="table">ProductName</th>
            <th className="table">Price</th>
            <th className="table">Save Item</th>
            <th className="table">Cancel Item</th>
          </tr>

          {previewStock?.map((item: any, i: number) => {
            return (
              <>
                <tr>
                  <td className="table">{item.sellerName}</td>
                  <td className="table">{item.quantity}</td>
                  <td className="table">{item.productName}</td>
                  <td className="table">{item.price}</td>
                  <td className="table">
                    <div className="btns">
                      <Button onClick={() => addStock(item)} variant="primary" className="cancel-btn">
                        Add Item
                      </Button>
                    </div>
                  </td>
                  <td className="table">
                    <div className="btns">
                      <Button onClick={() => deleteStock(item, i)} variant="primary" className="cancel-btn">
                        Cancel Item
                      </Button>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
      {previewStock?.length === 0 && (
        <NoStock />
      )}
    </div>
  );
}
