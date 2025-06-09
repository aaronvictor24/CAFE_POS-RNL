interface ProductListProps {
  products: any[];
  onAddToCart: (product: any) => void;
}

function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <div>
      <h4>Products</h4>
      <ul className="list-group">
        {products.map((product) => (
          <li
            key={product.product_id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {product.product} - ₱{product.price}
            </span>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => onAddToCart(product)}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
