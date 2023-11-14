app.get("/api/products", (req, res) => {
  Product.find({})
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({}));
});

app.get("/api/products/filter", async (req, res) => {
  const { filter } = req.query;
  Product.find({ type: filter.toLowerCase() })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({}));
});

app.get("/api/products/search", async (req, res) => {
  const { term } = req.query;
  try {
    const first = await Product.find({ type: term.toLowerCase() });
    const second = await Product.find({ title: term.toLowerCase() });
    const third = await Product.find({
      color: { $regex: new RegExp(term.toLowerCase(), "i") },
    });
    res.status(200).json(first.concat(second, third));
  } catch (error) {
    console.log(error);
    res.status(404).json({});
  }
});

app.get("/api/products/color", async (req, res) => {
  const { color } = req.query;
  try {
    Product.find({ color: { $regex: new RegExp(color.toLowerCase(), "i") } })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(200).json({}));
  } catch (err) {
    console.log(err);
    res.status(404).json({});
  }
});

app.get("/api/products/singleProduct", (req, res) => {
  const { id } = req.query;
  Product.find({ _id: new ObjectId(id) })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.json({});
    });
});
