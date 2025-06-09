import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ProductIngredientTable from "../../components/tables/inventory/ProductIngredientTable";
import AddProductIngredientModal from "../../components/modals/product/AddProductIngredientModal";
import IngredientService from "../../services/IngredientService";
import ProductService from "../../services/ProductService";
import type { ProductIngredient } from "../../interfaces/ProductIngredient";
import DeleteProductIngredientModal from "../../components/modals/product/DeleteProductIngredientModal";
import EditProductIngredientModal from "../../components/modals/product/EditProductIngredientModal";

const ManageProductIngredient = () => {
  const { productId } = useParams();
  const numericProductId = Number(productId);

  const [refreshProductIngredients, setRefreshProductIngredients] =
    useState(false);
  const [selectedProductIngredient, setSelectedProductIngredient] =
    useState<ProductIngredient | null>(null);

  const [openAddProductIngredientModal, setOpenAddIngredientModal] =
    useState(false);
  const [openEditProductIngredientModal, setOpenEditProductIngredientModal] =
    useState(false);
  const [
    openDeleteProductIngredientModal,
    setOpenDeleteProductIngredientModal,
  ] = useState(false);

  const handleOpenEditProductIngredientModal = (
    productingredient: ProductIngredient
  ) => {
    setSelectedProductIngredient(productingredient);
    setOpenEditProductIngredientModal(true);
  };

  const handleCloseEditProductIngredientModal = () => {
    setSelectedProductIngredient(null);
    setOpenEditProductIngredientModal(false);
  };

  const handleOpenDeleteProductIngredientModal = (
    productingredient: ProductIngredient
  ) => {
    setSelectedProductIngredient(productingredient);
    setOpenDeleteProductIngredientModal(true);
  };

  const handleCloseDeleteProductIngredientModal = () => {
    setSelectedProductIngredient(null);
    setOpenDeleteProductIngredientModal(false);
  };

  const [product, setProduct] = useState<any>(null);
  const [allIngredients, setAllIngredients] = useState<any[]>([]);

  // Load product info and ingredients when page loads or refreshes
  useEffect(() => {
    if (!numericProductId) return;
    ProductService.getProduct(numericProductId).then((res) =>
      setProduct(res.data.product)
    );

    IngredientService.loadIngredients().then((res) =>
      setAllIngredients(res.data.ingredients)
    );
  }, [numericProductId, refreshProductIngredients]);

  const content = (
    <>
      <AddProductIngredientModal
        showModal={openAddProductIngredientModal}
        onRefreshProductIngredients={() =>
          setRefreshProductIngredients(!refreshProductIngredients)
        }
        onClose={() => setOpenAddIngredientModal(false)}
        allIngredients={allIngredients}
        productId={numericProductId}
      />

      <EditProductIngredientModal
        showModal={openEditProductIngredientModal}
        productIngredient={selectedProductIngredient}
        allIngredients={allIngredients}
        onRefreshProductIngredients={() =>
          setRefreshProductIngredients(!refreshProductIngredients)
        }
        onClose={handleCloseEditProductIngredientModal}
      />

      <DeleteProductIngredientModal
        showModal={openDeleteProductIngredientModal}
        productIngredient={selectedProductIngredient}
        onRefreshProductIngredients={() =>
          setRefreshProductIngredients(!refreshProductIngredients)
        }
        onClose={handleCloseDeleteProductIngredientModal}
      />

      <div className="nav justify-content-end">
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={() => setOpenAddIngredientModal(true)}
        >
          Add Ingredient
        </button>
      </div>
      <div className="container">
        <h1 className="text-center">
          Manage Ingredients for: {product?.product}
        </h1>
        <div className="row">
          <div className="col-md-12">
            <ProductIngredientTable
              productId={numericProductId}
              refreshProductIngredients={refreshProductIngredients}
              onEditProductIngredient={handleOpenEditProductIngredientModal}
              onDeleteProductIngredient={handleOpenDeleteProductIngredientModal}
            />
          </div>
        </div>
      </div>
    </>
  );

  return <MainLayout content={content} />;
};

export default ManageProductIngredient;
