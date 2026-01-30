import React, { useState, useEffect } from "react";
import "./Admindashboard.css";
import { API } from "../../api";
import Navbar from "../Navbar/Navbar";

const Admindashboard = () => {
  const initialState = {
    category: "",
    name: "",
    description: "",
    rating: "",
    reviews: "",
    price: "",
    originalPrice: "",
    discount: "",
    stock: "",
    image: "",
  };

  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState(initialState);
  const [error, setError] = useState("");
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/products");
        setCards(data);
      } catch (e) {
        setError("Failed to load products");
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numeric = ["rating", "reviews", "price", "originalPrice", "discount", "stock"];
    setNewCard((prev) => ({
      ...prev,
      [name]: numeric.includes(name) ? Number(value) : value
    }));
  };

  const handleAddCard = async () => {
    try {
      const { data } = await API.post("/products", newCard);
      setCards((prev) => [data, ...prev]);
      setNewCard(initialState);
      setError("");
    } catch (e) {
      if (e?.response?.status === 403) setError("Forbidden: admin only");
      else setError(e?.response?.data?.msg || "Failed to add product");
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      setCards((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      setError("Delete failed");
    }
  };

  const handleEditCard = (card) => {
    setEditingCard({ ...card });
  };

  const saveEditCard = async () => {
    try {
      const { data } = await API.put(`/products/${editingCard._id}`, editingCard);
      setCards((prev) =>
        prev.map((c) => (c._id === editingCard._id ? data : c))
      );
      setEditingCard(null);
    } catch (e) {
      setError("Update failed");
    }
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      <h1>Admin Dashboard</h1>
      {error && <div className="error">{error}</div>}

      {/* Add product form */}
      <div className="add-card-form">
        <input type="text" placeholder="Category" name="category" value={newCard.category} onChange={handleChange} />
        <input type="text" placeholder="Name" name="name" value={newCard.name} onChange={handleChange} />
        <input type="text" placeholder="Description" name="description" value={newCard.description} onChange={handleChange} />
        <input type="number" placeholder="Rating" name="rating" value={newCard.rating} onChange={handleChange} />
        <input type="number" placeholder="Reviews" name="reviews" value={newCard.reviews} onChange={handleChange} />
        <input type="number" placeholder="Price" name="price" value={newCard.price} onChange={handleChange} />
        <input type="number" placeholder="Original Price" name="originalPrice" value={newCard.originalPrice} onChange={handleChange} />
        <input type="number" placeholder="Discount (%)" name="discount" value={newCard.discount} onChange={handleChange} />
        <input type="number" placeholder="Stock" name="stock" value={newCard.stock} onChange={handleChange} />
        <input type="text" placeholder="Image URL" name="image" value={newCard.image} onChange={handleChange} />
        <button onClick={handleAddCard}>Add Product</button>
      </div>

      {/* Product list */}
      <div className="card-container">
        {cards.map((card) => (
          <div className="card" key={card._id}>
            {card.discount > 0 && <div className="discount">{card.discount}% OFF</div>}
            <img src={card.image} alt={card.name} />
            <span className="category">{card.category}</span>
            <h3>{card.name}</h3>
            <p>{card.description}</p>
            <div className="rating">⭐ {card.rating} ({card.reviews} reviews)</div>
            <div className="price">
              {card.originalPrice > card.price && <span className="old-price">${card.originalPrice}</span>}
              <span className="new-price">${card.price}</span>
            </div>
            <div className="actions">
              <button onClick={() => handleEditCard(card)}>Edit</button>
              <button onClick={() => handleDeleteCard(card._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit form (same style as add form) */}
      {editingCard && (
        <div className="add-card-form">
          <input type="text" placeholder="Category" name="category" value={editingCard.category}
            onChange={(e) => setEditingCard({ ...editingCard, category: e.target.value })} />
          <input type="text" placeholder="Name" name="name" value={editingCard.name}
            onChange={(e) => setEditingCard({ ...editingCard, name: e.target.value })} />
          <input type="text" placeholder="Description" name="description" value={editingCard.description}
            onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })} />
          <input type="number" placeholder="Rating" name="rating" value={editingCard.rating}
            onChange={(e) => setEditingCard({ ...editingCard, rating: Number(e.target.value) })} />
          <input type="number" placeholder="Reviews" name="reviews" value={editingCard.reviews}
            onChange={(e) => setEditingCard({ ...editingCard, reviews: Number(e.target.value) })} />
          <input type="number" placeholder="Price" name="price" value={editingCard.price}
            onChange={(e) => setEditingCard({ ...editingCard, price: Number(e.target.value) })} />
          <input type="number" placeholder="Original Price" name="originalPrice" value={editingCard.originalPrice}
            onChange={(e) => setEditingCard({ ...editingCard, originalPrice: Number(e.target.value) })} />
          <input type="number" placeholder="Discount (%)" name="discount" value={editingCard.discount}
            onChange={(e) => setEditingCard({ ...editingCard, discount: Number(e.target.value) })} />
          <input type="number" placeholder="Stock" name="stock" value={editingCard.stock}
            onChange={(e) => setEditingCard({ ...editingCard, stock: Number(e.target.value) })} />
          <input type="text" placeholder="Image URL" name="image" value={editingCard.image}
            onChange={(e) => setEditingCard({ ...editingCard, image: e.target.value })} />

          <button onClick={saveEditCard}>Save</button>
          <button onClick={() => setEditingCard(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Admindashboard;
