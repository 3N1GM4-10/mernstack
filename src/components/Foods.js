import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Foods() {
  const [food, setFood] = useState({
    foodname: "",
    quantity: "",
    foodnameUpdate: "",
    quantityUpdate: "",
    _id: "",
  });

  const [foodCollection, setFoodCollection] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleOnChange = (e) => {
    const { value, name } = e.target;

    setFood({ ...food, [name]: value });
  };

  // Create

  const createfood = async (e) => {
    e.preventDefault();
    setFood({
      foodname: "",
      quantity: "",
    });
    try {
      await axios.post(process.env.REACT_APP_DOMAIN, {
        foodname: food.foodname,
        quantity: food.quantity,
      });
    } catch {
      return false;
    }
    window.location.reload();
  };

  // Read
  useEffect(() => {
    async function fetchfood() {
      try {
        const fetchFooddata = await axios.get(process.env.REACT_APP_DOMAIN);
        setFoodCollection(fetchFooddata.data);
      } catch {
        return false;
      }
    }

    fetchfood();
  }, []);

  // Update

  const updatecollection = async () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    try {
      await axios.put(process.env.REACT_APP_DOMAIN, {
        _id: food._id,
        foodname: food.foodnameUpdate,
        quantity: food.quantityUpdate,
      });
    } catch {}
  };

  // Delete

  const deletecollection = async ({ _id }) => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    try {
      await axios.delete(`${process.env.REACT_APP_DOMAIN}/${_id}`);
    } catch {}
    window.location.reload();
  };

  const onEdit = ({ foodname, quantity, _id }) => {
    setIsUpdate(!isUpdate);
    setFood({
      ...food,
      foodnameUpdate: foodname,
      quantityUpdate: quantity,
      _id,
    });
  };

  return (
    <div className="foods_cotainer">
      <h2>Food Form</h2>
      <form onSubmit={createfood}>
        <div className="form_group">
          <label>Food Name</label>
          <input
            placeholder="food name..."
            onChange={handleOnChange}
            name="foodname"
            value={food.foodname}
          />
        </div>

        <div className="form_group">
          <label>Quantity</label>
          <input
            placeholder="quantity.."
            onChange={handleOnChange}
            name="quantity"
            value={food.quantity}
          />
        </div>

        <button type="submit">Add Food</button>
      </form>
      <h2>Food Collection</h2>

      <div className="food_collection">
        {foodCollection &&
          foodCollection.map(({ foodname, quantity, _id }, i) => {
            return (
              <div className="collection_group" key={i}>
                <div className="content_collection">
                  <h2>{foodname}</h2>
                  <p>{quantity}</p>
                </div>
                <div className="action_collection">
                  <button onClick={() => onEdit({ foodname, quantity, _id })}>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deletecollection({ _id });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        <div className={`update_form  ${isUpdate && "update_form_in"}`}>
          <div className="form_group">
            <input
              type="text"
              onChange={handleOnChange}
              name="foodnameUpdate"
              value={food.foodnameUpdate}
            />
          </div>
          <div className="form_group">
            <input
              type="text"
              onChange={handleOnChange}
              name="quantityUpdate"
              value={food.quantityUpdate}
            />
          </div>
          <div className="action">
            <button onClick={updatecollection}>Update</button>
            <button onClick={() => setIsUpdate(!isUpdate)}>cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
