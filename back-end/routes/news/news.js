import express from "express";
const router = express.Router();
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.log(
    "Please set the API_KEY environment variable with a valid newsapi.org apiKey and restart the server!"
  );
  process.exit(0);
}

const baseUrl = "https://newsapi.org/v2/top-headlines";

function addApiKey(queryObject) {
  const { queryName, ...apiParams } = queryObject;
  return { ...apiParams, apiKey: apiKey };
}

export function createUrlFromQueryObject(queryObjectWithApiKey) {
  const queryString = new URLSearchParams(queryObjectWithApiKey).toString();
  const url = baseUrl + "?" + queryString;
  return url;
}

export async function fetchData(url) {
  let data = null;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

router.get("/", async (req, res) => {
  let fixedQueryObject = {
    country: "us",
    q: "news",
  };
  let queryObject = addApiKey(fixedQueryObject);
  let url = createUrlFromQueryObject(queryObject);
  console.log("GET API URL", url);
  let newsArticles = await fetchData(url);
  console.log("GET API RESPONSE STATUS:", newsArticles?.status);
  console.log("GET API RESPONSE COUNT:", newsArticles?.totalResults);
  if (newsArticles) {
    res.json(newsArticles);
  } else {
    res.status(500).json({ error: "Failed to fetch news data" });
  }
});

router.post("/", async (req, res) => {
  let query = req.body;
  let queryObjectWithApiKey = addApiKey(query);
  let url = createUrlFromQueryObject(queryObjectWithApiKey);
  console.log("🔍 POST API URL:", url);
  console.log("🔍 POST Query object:", query);
  let newsArticles = await fetchData(url);
  console.log("🔍 POST API Response status:", newsArticles?.status);
  console.log("🔍 POST API Response count:", newsArticles?.totalResults);
  res.json(newsArticles);
});

export default router;
