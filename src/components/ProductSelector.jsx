function ProductSelector({ products, onSelect }) {
  return (
    <div
      style={{
        marginTop: "15px",
        display: "grid",
        gap: "12px",
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "15px",
            background: "#1b2438",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "15px",
          }}
        >
          <img
            src={product.image_url}
            alt={product.name}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />

          <div style={{ flex: 1 }}>
            <h4
              style={{
                color: "white",
                marginBottom: "5px",
              }}
            >
              {product.name}
            </h4>

            <p
              style={{
                color: "#9ca3af",
                marginBottom: "6px",
              }}
            >
              ₹ {product.price}
            </p>

            <small
              style={{
                color: "#6ee7b7",
              }}
            >
              {product.category}
            </small>
          </div>

          <button
            onClick={() => onSelect(product)}
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              border: "none",
              background: "#6366f1",
              color: "white",
              cursor: "pointer",
            }}
          >
            🚀 Promote
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductSelector;