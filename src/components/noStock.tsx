import { IMAGE_URL_CONSTANT } from "../constants/imageConstants";

export default function NoStock() {

    return (
        <div className="noData">
            <div >
                <img src={IMAGE_URL_CONSTANT.NO_STOCK} className="noproducts-img" alt="products" />
                <h1 className="products">No Products Added</h1>
            </div>
        </div>
    );
}
