import React from "react";

export function SavedQueries(params) {

  function onSavedQueryClick(savedQuery){
    params.onQuerySelect(savedQuery);
  }

  function onResetClick() {
    const confirmed = window.confirm("Are you sure you want to erase the list?");
    if (!confirmed) return;
    
    const resetList = [];

    params.setSavedQueries(resetList);
    params.saveQueryList(resetList);
  }

  function getQueries() {
    return params.savedQueries.map((item, idx) => {
      const trimTitle = item.queryName.substring(0, 30);
      return (
        <li 
          key={idx} 
          onClick={() => onSavedQueryClick(item)} 
          className={(item.queryName === params.selectedQueryName) ? "selected" : ""}
        >
          {trimTitle + ": \"" + item.q + "\""}
        </li>
      );
    });
  }

  return (
    <div>
      <ul>
        {(params.savedQueries && params.savedQueries.length > 0)
          ? getQueries()
          : <li>No Saved Queries to display</li>
        }
      </ul>
      {params.user && (
        <div style={{ textAlign: 'center' }}>
          <button onClick={onResetClick}>Reset Saved Queries</button>
          </div>
        )}
    </div>
  );
}
