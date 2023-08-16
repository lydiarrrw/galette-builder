import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ViewGalette() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const parameterList = [];

  queryParams.forEach((value, key) => {
    parameterList.push({ key, value });
  });

  return (
    <div>
      <h1>Other Page</h1>
      <ul>
        {parameterList.map((param, index) => (
          <li key={index}>
            {param.key}: {param.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
