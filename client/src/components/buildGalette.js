import React, { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

export default function BuildGalette() {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    ingredients.forEach((ingredient, index) => {
      newParams.set(`ingredient${index}`, ingredient.name);
      newParams.set(`x${index}`, ingredient.x.toString());
      newParams.set(`y${index}`, ingredient.y.toString());
    });

    history.push({
      pathname: "/build",
      search: newParams.toString(),
    });
  }, [ingredients]);

  const handleButtonClick = () => {
    const queryString = queryParams.toString();
    history.push(`/view?${queryString}`);
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    setOffsetX(event.nativeEvent.offsetX);
    setOffsetY(event.nativeEvent.offsetY);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const draggedElementId = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(draggedElementId);

    const dropX = event.clientX - event.target.getBoundingClientRect().left;
    const dropY = event.clientY - event.target.getBoundingClientRect().top;

    const newIngredient = {
      name: draggedElement.textContent,
      x: dropX - offsetX,
      y: dropY - offsetY,
    };

    const existingIngredient = ingredients.find(
      (ingredient) => ingredient.name === draggedElement.textContent
    );

    if (existingIngredient) {
      setIngredients((prevIngredients) =>
        prevIngredients.map((ingredient) =>
          ingredient.name === existingIngredient.name
            ? { ...ingredient, x: dropX - offsetX, y: dropY - offsetY }
            : ingredient
        )
      );
    } else {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        {
          name: draggedElement.textContent,
          x: dropX - offsetX,
          y: dropY - offsetY,
        },
      ]);
    }

    draggedElement.style.left = dropX - offsetX + "px";
    draggedElement.style.top = dropY - offsetY + "px";

    event.target.appendChild(draggedElement);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>send your galette</button>
      <div className="table-container">
        <div
          id="galette-plate"
          className="galette-plate drop-target"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        ></div>
        <div className="galette-menu">
          <h2>Le Menu</h2>
          <div
            id="cheese"
            className="cheese draggable"
            draggable="true"
            onDragStart={handleDragStart}
          >
            Fromage
          </div>
          <div
            id="ham"
            className="ham draggable"
            draggable="true"
            onDragStart={handleDragStart}
          >
            Jambon
          </div>
          <div
            id="tomato"
            className="tomato draggable"
            draggable="true"
            onDragStart={handleDragStart}
          >
            Tomate
          </div>
        </div>
      </div>
    </div>
  );
}
