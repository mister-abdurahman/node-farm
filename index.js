const fs = require("fs");
// const http = require("http");
// const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
const express = require("express");

// SERVER
// NB: we must set headers before sending the response
const app = express();

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const templatePageNotFound = fs.readFileSync(
  `${__dirname}/templates/template-page-not-found.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// const server = http.createServer((req, res) => {
//   // console.log(req.url); //the url in request. favicon is requested by default (not important)

//   // we need to parse our url to get access to the req data in a nice object format
//   const { query, pathname } = url.parse(req.url, true);

//   // Overview page
//   if (pathname === "/" || pathname === "/overview") {
//     res.writeHead(200, { "Content-type": "text/html" });
//     const cardsHtml = dataObj
//       .map((el) => replaceTemplate(templateCard, el))
//       .join("");
//     const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

//     res.end(output);
//   }

//   // Product page
//   else if (pathname === "/product") {
//     res.writeHead(200, { "Content-type": "text/html" });
//     const product = dataObj[query.id];
//     const output = replaceTemplate(templateProduct, product);
//     res.end(output);
//   }

//   // API page
//   else if (pathname === "/api") {
//     // dirname is where the current file is located. (req fn is an exception)
//     res.writeHead(200, { "Content-type": "application/json" });
//     res.end(data);
//   }
//   // Not Found page
//   else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "a-custom-header": "hello-world",
//     });
//     res.end("<h1>Page not found</h1>");
//   }
// });

//////////////////////////

app.get("/", async (req, res, next) => {
  // res.writeHead(200, { "Content-type": "text/html" });
  try {
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.status(201).end(output);
  } catch (error) {
    next();
  }
});

app.get("/overview", async (req, res, next) => {
  // res.writeHead(200, { "Content-type": "text/html" });
  try {
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.status(201).end(output);
  } catch (error) {
    next();
  }
});

app.get("/product", async (req, res, next) => {
  // res.writeHead(200, { "Content-type": "text/html" });
  try {
    const id = req.query.id;
    const product = dataObj[id];
    const output = replaceTemplate(templateProduct, product);
    res.status(201).end(output);
  } catch (error) {
    next();
  }
});

app.get("*", (req, res) => {
  return res.status(404).end(templatePageNotFound);
});
// Error Handling
app.use((err, req, res, next) => {
  const message = err.message || "<h1>Page not found</h1>";
  // return res.status(404).json({ message });
  return res.status(404).end(message);
});

const port = process.env.PORT || 8000;

app.listen(port, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
