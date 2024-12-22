const express = require("express");
const app = express();
const database = require("./controller/conn");
const path = require("path");

const port = 3000;

// Middleware untuk file statis (folder "public" dan "assets")
app.use(express.static(path.join(__dirname, "../public")));
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Set view engine dan direktori views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Rute halaman utama dengan query database
app.get("/", (req, res) => {
  const query = "SELECT name, price, image_url FROM products";

  database.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Database error");
    }

    // Log hasil query (opsional untuk debugging)
    console.log("Hasil database ->", result);

    // Render halaman utama dengan data dari database
    res.render("index", {
      users: result,
    });
  });
});

// Rute untuk halaman pembayaran
app.get("/Pembayaran", (req, res) => {
  res.render("Pembayaran/Pembayaran", {
    title: "Halaman Pembayaran",
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
