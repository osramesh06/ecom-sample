import React, { useEffect } from "react";
import FilterBar from "../../containers/FilterBar/FilterBar";
import ProductList from "../../containers/ProductList/ProductList";
import { connect, useDispatch } from "react-redux";
import { setProduct, SET_PRODUCT } from "../../actions";
import { phones } from "../../data/phones";
import axios from "axios";

const Home = (props) => {
  useEffect(() => {
    const product = phones;
    getProduct();
  }, []);

  const getProduct = () => {
    const config = {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVOdW1iZXIiOjcwMTA5OTc5NjQsInVzZXJJZCI6MSwiaWF0IjoxNjMxNzc2NTMyLCJleHAiOjE2MzE3ODAxMzJ9.TFADq1fWGO0Gm4AAItU_WEunr73ivtzBGX7qmhGXHLk",
      },
    };
    axios.get("http://localhost:4000/products/product", config).then((res) => {
      let products = [...(res.data.productList || [])];
      let updatedProducts = products.map((list, i) => {
        return {
          title: list.name,
          category: "phone",
          images: [
            "https://productimages.hepsiburada.net/s/18/280-413/9801258663986.jpg?v1",
            "https://productimages.hepsiburada.net/s/18/280-413/9801258696754.jpg?v1",
            "https://productimages.hepsiburada.net/s/18/280-413/9801258729522.jpg?v1",
            "https://productimages.hepsiburada.net/s/18/280-413/9801258762290.jpg?v1",
          ],
          brand: list.category.toLowerCase(),
          price: list.price,
          cpu: "1.3GHz Apple A6",
          camera: "8mp (3264x2448)",
          size: list.size,
          weight: "132 grams (4.7 ounces) with battery",
          display: "4.0 326 pixel density",
          battery: "1480 mAh",
          memory: "16GB, 32GB and RAM 1 GB",
          id: i,
          description: list.description,
          productId: list.id,
        };
      });
      props.addProduct(updatedProducts);
    });
  };

  return (
    <React.Fragment>
      <div className="container" style={{ paddingTop: "6rem" }}>
        <div className="row">
          <FilterBar />
          <ProductList />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  addProduct: setProduct,
};

export default connect(null, mapDispatchToProps)(Home);
