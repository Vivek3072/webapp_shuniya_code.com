import React, { useState } from "react";
import "./filtersPanel.css";
// import "../node_modules/font-awesome/css/font-awesome.min.css";
// import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FiltersPanel = () => {
  const [toggleFilters, setToggleFilters] = useState(false);
  return (
    <div className="filters_wrapper">
      <div className="title">Filters</div>
      <hr />
      <div
        className="all_filters"
        style={
          toggleFilters
            ? { flexWrap: "wrap", width: "100%" }
            : { flexWrap: "nowrap", width: "90%" }
        }
      >
        <div className="filter">Array</div>
        <div className="filter">String</div>
        <div className="filter">Linked List </div>
        <div className="filter">Recursion</div>
        <div className="filter">Tree</div>
        <div className="filter">Graph</div>
        <div className="filter">DP</div>
        <div className="filter">DFS</div>
        <div className="filter">BFS</div>
        <div className="filter">Array</div>
        <div className="filter">Array</div>
      </div>
      <div
        className="expender"
        onClick={() => setToggleFilters(!toggleFilters)}
      >
        <i className="fas fa-solid fa-chevrons-down"></i>{" "}
        {toggleFilters ? "Collapse" : "Expand"}
        <FontAwesomeIcon icon="fa-solid fa-chevrons-down" />
      </div>
    </div>
  );
};

export default FiltersPanel;
