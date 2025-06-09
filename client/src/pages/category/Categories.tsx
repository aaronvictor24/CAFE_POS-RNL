import { useState } from "react";
import AddCategoryForm from "../../components/forms/category/AddCategoryForm";
import CategoriesTable from "../../components/tables/category/CategoriesTable";
import MainLayout from "../layout/MainLayout";
import AlertMessage from "../../components/AlertMessage";
import type { Category } from "../../interfaces/Category";
import EditCategoryModal from "../../components/modals/category/EditCategoryModal";
import DeleteCategoryModal from "../../components/modals/category/DeleteCategoryModal";

const Categories = () => {
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [openDeleteCategoryModal, setOpenDeleteCategoryModal] = useState(false);

  const handleOpenEditCategoryModal = (category: Category) => {
    setSelectedCategory(category);
    setOpenEditCategoryModal(true);
  };

  const handleOpenDeleteCategoryModal = (category: Category) => {
    setSelectedCategory(category);
    setOpenDeleteCategoryModal(true);
  };

  const handleCloseDeleteCategoryModal = () => {
    setSelectedCategory(null);
    setOpenDeleteCategoryModal(false);
  };

  const handleCloseEditCategoryModal = () => {
    setSelectedCategory(null);
    setOpenEditCategoryModal(false);
  };

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleShowAlertMessage = (
    message: string,
    isSuccess: boolean,
    isVisible: boolean
  ) => {
    setMessage(message);
    setIsSuccess(isSuccess);
    setIsVisible(isVisible);
  };

  const handleCloseAlertMessage = () => {
    setMessage("");
    setIsSuccess(false);
    setIsVisible(false);
  };

  const content = (
    <>
      <AlertMessage
        message={message}
        isSuccess={isSuccess}
        isVisible={isVisible}
        onClose={handleCloseAlertMessage}
      />

      <EditCategoryModal
        showModal={openEditCategoryModal}
        category={selectedCategory}
        onRefreshCategories={() => setRefreshCategories(!refreshCategories)}
        onClose={handleCloseEditCategoryModal}
      />

      <DeleteCategoryModal
        showModal={openDeleteCategoryModal}
        category={selectedCategory}
        onRefreshCategories={() => setRefreshCategories(!refreshCategories)}
        onClose={handleCloseDeleteCategoryModal}
      />

      <div className="container">
        <h1 className="text-center">Categories</h1>
        <div className="row">
          <div className="col-md-3">
            <AddCategoryForm
              onCategoryAdded={(message) => {
                handleShowAlertMessage(message, true, true);
                setRefreshCategories(!refreshCategories);
              }}
            />
          </div>
          <div className="col-md-9">
            <CategoriesTable
              refreshCategories={refreshCategories}
              onEditCategory={handleOpenEditCategoryModal}
              onDeleteCategory={handleOpenDeleteCategoryModal}
            />
          </div>
        </div>
      </div>
    </>
  );

  return <MainLayout content={content} />;
};

export default Categories;
