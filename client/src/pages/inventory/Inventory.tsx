import { useState } from "react";
import IngredientsTable from "../../components/tables/inventory/IngredientsTable";
import MainLayout from "../layout/MainLayout";
import type { Ingredients } from "../../interfaces/Ingredients";
import EditIngredientModal from "../../components/modals/ingredient/EditIngredientModal";
import DeleteIngredientModal from "../../components/modals/ingredient/DeleteIngredientsModal";
import AddIngredientModal from "../../components/modals/ingredient/AddIngredientModal";

const Inventory = () => {
  const [refreshIngredients, setRefreshIngredients] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredients | null>(null);

  const [openAddIngredientModal, setOpenAddIngredientModal] = useState(false);
  const [openEditIngredientModal, setOpenEditIngredientModal] = useState(false);
  const [openDeleteIngredientModal, setOpenDeleteIngredientModal] =
    useState(false);

  const handleOpenEditIngredientModal = (ingredient: Ingredients) => {
    setSelectedIngredient(ingredient);
    setOpenEditIngredientModal(true);
  };

  const handleOpenDeleteIngredientModal = (ingredient: Ingredients) => {
    setSelectedIngredient(ingredient);
    setOpenDeleteIngredientModal(true);
  };

  const handleCloseEditIngredientModal = () => {
    setSelectedIngredient(null);
    setOpenEditIngredientModal(false);
  };

  const handleCloseDeleteIngredientModal = () => {
    setSelectedIngredient(null);
    setOpenDeleteIngredientModal(false);
  };

  const content = (
    <>
      <AddIngredientModal
        showModal={openAddIngredientModal}
        onRefreshIngredients={() => setRefreshIngredients(!refreshIngredients)}
        onClose={() => setOpenAddIngredientModal(false)}
      />

      <EditIngredientModal
        showModal={openEditIngredientModal}
        ingredient={selectedIngredient}
        onRefreshIngredients={() => setRefreshIngredients(!refreshIngredients)}
        onClose={handleCloseEditIngredientModal}
      />

      <DeleteIngredientModal
        showModal={openDeleteIngredientModal}
        ingredient={selectedIngredient}
        onRefreshIngredients={() => setRefreshIngredients(!refreshIngredients)}
        onClose={handleCloseDeleteIngredientModal}
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
        <h1 className="text-center">Inventory</h1>
        <div className="row">
          <div className="col-md-12">
            <IngredientsTable
              refreshIngredients={refreshIngredients}
              onEditIngredient={handleOpenEditIngredientModal}
              onDeleteIngredient={handleOpenDeleteIngredientModal}
            />
          </div>
        </div>
      </div>
    </>
  );
  return <MainLayout content={content} />;
};

export default Inventory;
