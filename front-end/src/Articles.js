import { useState } from "react";
import "./Articles.css";

export function Articles(params) {
  const [showDetails, setShowDetails] = useState(false);

  let articles = params.data.articles ? params.data.articles : [];
  let queryName = params.query.queryName ? params.query.queryName : "na";
  let articleCount = params.data.totalResults ? params.data.totalResults : 0;

  function formatQueryDetails(query) {
    return (
      <div className="query-details">
        <h4>Query Details:</h4>
        <ul>
          <li>Name: {query.queryName || "N/A"}</li>
          <li>Search Term: {query.q || "N/A"}</li>
          <li>Language:{query.language || "N/A"}</li>
          <li>Page Size:{query.pageSize || "N/A"}</li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <div>Query: {queryName}</div>
      <div className="checkbox-container">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showDetails}
            onChange={(e) => setShowDetails(e.target.checked)}
            className="checkbox-input"
          />
          Show Query Details
        </label>
      </div>
      {showDetails && formatQueryDetails(params.query)}
      <br />
      Count: {articleCount}
      <div className="articles-list">
        <ol>
          {articles.map((item, idx) => {
            if (item) {
              if (item.title) {
                if (item.title === "[Removed]") {
                  return <li key={idx}>Was Removed</li>;
                }
                let trimTitle = item.title.substring(0, 30);
                return (
                  <li key={idx}>
                    {trimTitle}
                    <a href={item.url} target="_blank" rel="noreferrer">
                      &nbsp;Link
                    </a>
                  </li>
                );
              } else {
                return <li key={idx}>No Title</li>;
              }
            } else {
              return <li key={idx}>No Item</li>;
            }
          })}
        </ol>
      </div>
    </div>
  );
}
