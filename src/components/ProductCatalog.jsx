import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

import Emma from "../emma-core/emma";

function ProductCatalog() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setProducts(data || []);
  };

  const saveProduct = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    let imageUrl = "";

    if (productImage) {
      const fileExt = productImage.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, productImage);

      if (uploadError) {
        alert(uploadError.message);
        console.log(uploadError);
        return;
      }

      const { data: publicData } =
  supabase.storage
    .from("products")
    .getPublicUrl(fileName);

imageUrl = publicData.publicUrl;

console.log("IMAGE:", imageUrl);
    }

    const { error } = await supabase.from("products").insert({
      user_id: user.id,
      name: productName,
      price: productPrice,
      category: productCategory,
      description: productDescription,
      image_url: imageUrl,
    });

if (error) {
  alert(error.message);
  console.log(error);
  return;
}




alert("Product added!");

await Emma.experience({

  id: crypto.randomUUID(),

  user_id: user.id,

  business_id: user.id,

  type: "PRODUCT_ADDED",

  data: {
    product_name: productName,
    price: productPrice
  },

  entity_type: "product",

  entity_id: null

});

    setProductName("");
    setProductPrice("");
    setProductCategory("");
    setProductDescription("");
    setProductImage(null);

    loadProducts();
  };

  const deleteProduct = async (product) => {
    const ok = window.confirm(
      `Delete "${product.name}"?`
    );

    if (!ok) return;

    if (product.image_url) {
      const fileName = product.image_url
        .split("/")
        .pop();

      await supabase.storage
        .from("products")
        .remove([fileName]);
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      alert(error.message);
      console.log(error);
      return;
    }

    loadProducts();
  };

  return (
    <div className="card">
      <h2>🛍 Product Catalog</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) =>
          setProductName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Price"
        value={productPrice}
        onChange={(e) =>
          setProductPrice(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Category (e.g. Sarees)"
        value={productCategory}
        onChange={(e) =>
          setProductCategory(e.target.value)
        }
      />

      <textarea
        placeholder="Description"
        value={productDescription}
        onChange={(e) =>
          setProductDescription(e.target.value)
        }
      />

     <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setProductImage(e.target.files[0])
  }
/>
<br /><br />
      <button onClick={saveProduct}>
        Add Product
      </button>

    <br /><br />

<h3>My Products</h3>

{products.length === 0 ? (
  <p>No products yet.</p>
) : (
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fill, minmax(180px, 1fr))",
      gap: "15px",
      marginTop: "20px",
    }}
  >
    {products.map((p) => (
      <div
        key={p.id}
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "10px",
          background: "#fff",
        }}
      >
        {p.image_url && (
          <img
            src={p.image_url}
            alt={p.name}
            style={{
              width: "100%",
              height: "120px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
        )}

        <h4
          style={{
            margin: "0 0 5px 0",
            fontSize: "16px",
          }}
        >
          {p.name}
        </h4>

        {p.category && (
          <p
            style={{
              margin: "0",
              fontSize: "13px",
              color: "#666",
            }}
          >
            📂 {p.category}
          </p>
        )}

        <p
          style={{
            margin: "8px 0",
            fontWeight: "bold",
          }}
        >
          ₹{p.price}
        </p>

        <button
          onClick={() => deleteProduct(p)}
         
          >
        
           Delete
        </button>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default ProductCatalog;