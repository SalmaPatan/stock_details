import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import NoStock from "../components/noStock";
import { userDataSelectors } from "../store/userData";
import "../styles/main.css";

export default function InventoryInfo() {
    const history = useHistory()

    const userStockData = useSelector(userDataSelectors.getUserStock);

    const goBack = () => {
        history.goBack()
    }
    return (
        <div className="tableBlock">
            <div>
                <Button className="stock-btn" onClick={() => goBack()}>Back</Button>
            </div>
            <div className="noData"></div>
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
                    </tr>

                    {userStockData.data?.map((item: any, i: number) => {
                        const total = item.quantity * item.price
                        return (
                            <>
                                <tr>
                                    <td className="table">{item.sellerName}</td>
                                    <td className="table">{item.id}</td>
                                    <td className="table">{item.productName}</td>
                                    <td className="table">Rs {item.price}/-</td>
                                    <td className="table">{item.quantity}</td>
                                    <td className="table">{total}</td>
                                </tr>
                            </>
                        );
                    })}
                </table>
            </div>
            {userStockData?.data?.length === 0 && (
                <NoStock />
            )}
        </div>
    );
}
