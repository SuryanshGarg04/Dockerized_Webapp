const express = require('express');
const path = require('path');
// ⛔ moved DB connect below so tests don't connect
// require('./db/conn');
const User = require("./models/usermessage");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));

app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

app.get("/", (req, res) => {
  res.render("index");
});

// ✅ health endpoint for CI smoke tests
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post("/contact", async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

// ✅ Start server only if run directly
if (require.main === module) {
  // ✅ connect DB only when actually starting the server
  require('./db/conn');
  app.listen(port, () => {
    console.log(`running at port number ${port}`);
  });
}

// ✅ Export app for testing
module.exports = app;
