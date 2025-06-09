import { useEffect, useState } from "react";
import type { Category } from "../../../interfaces/Category";
import CategoryService from "../../../services/CategoryService";
import ErrorHandler from "../../../handler/ErrorHandler";
import { Spinner } from "react-bootstrap";

interface CategoriesTableProps {
  refreshCategories: boolean;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (category: Category) => void;
}

const CategoriesTable = ({
  refreshCategories,
  onEditCategory,
  onDeleteCategory,
}: CategoriesTableProps) => {
  const [state, setState] = useState({
    loadingCategories: true,
    categories: [] as Category[],
  });

  const handleLoadCategories = async () => {
    CategoryService.loadCategories()
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            categories: res.data.categories,
          }));
        } else {
          console.error(
            "Unexpected status error during loading categories:",
            res.status
          );
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingCategories: false,
        }));
      });
  };

  useEffect(() => {
    handleLoadCategories();
  }, [refreshCategories]);

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Category</th>
            <th>Others</th>
          </tr>
        </thead>
        <tbody>
          {state.loadingCategories ? (
            <tr className="align-middle">
              <td colSpan={3} className="text-center">
                <Spinner />
              </td>
            </tr>
          ) : state.categories.length > 0 ? (
            state.categories.map((category, index) => (
              <tr className="table-row" key={index}>
                <td>{index + 1}</td>
                <td>{category.category}</td>
                <td>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => onEditCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onDeleteCategory(category)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="align-middle">
              <td colSpan={3} className="text-center">
                No Categories Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default CategoriesTable;
