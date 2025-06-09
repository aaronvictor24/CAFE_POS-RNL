import { useState } from "react";
import ProductsTable from "../../components/tables/product/ProductsTable";
import MainLayout from "../layout/MainLayout";
import type { Products } from "../../interfaces/Product";
import AddProductModal from "../../components/modals/product/AddProductModal";
import EditProductModal from "../../components/modals/product/EditProductModal";
import DeleteProductModal from "../../components/modals/product/DeleteProductModal";

const Products = () => {
  const [refreshProducts, setRefreshProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);

  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);

  const handleOpenEditProductModal = (product: Products) => {
    setSelectedProduct(product);
    setOpenEditProductModal(true);
  };

  const handleOpenDeleteProductModal = (product: Products) => {
    setSelectedProduct(product);
    setOpenDeleteProductModal(true);
  };

  const handleCloseEditProductModal = () => {
    setSelectedProduct(null);
    setOpenEditProductModal(false);
  };

  const handleCloseDeleteProductModal = () => {
    setSelectedProduct(null);
    setOpenDeleteProductModal(false);
  };

  const content = (
    <>
      <AddProductModal
        showModal={openAddProductModal}
        onRefreshProducts={() => setRefreshProducts(!refreshProducts)}
        onClose={() => setOpenAddProductModal(false)}
      />

      <EditProductModal
        showModal={openEditProductModal}
        product={selectedProduct}
        onRefreshProducts={() => setRefreshProducts(!refreshProducts)}
        onClose={handleCloseEditProductModal}
      />

      <DeleteProductModal
        showModal={openDeleteProductModal}
        product={selectedProduct}
        onRefreshProducts={() => setRefreshProducts(!refreshProducts)}
        onClose={handleCloseDeleteProductModal}
      />

      <div className="nav justify-content-end">
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={() => setOpenAddProductModal(true)}
        >
          Add Product
        </button>
      </div>
      <div className="container">
        <h1 className="text-center">Product</h1>
        <div className="row">
          <div className="col-md-12">
            <ProductsTable
              refreshProducts={refreshProducts}
              onEditProduct={handleOpenEditProductModal}
              onDeleteProduct={handleOpenDeleteProductModal}
            />
          </div>
        </div>
      </div>
    </>
  );

  return <MainLayout content={content} />;
};

export default Products;
