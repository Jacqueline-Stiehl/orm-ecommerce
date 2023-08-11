const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
//const Category = require("../../models/Category");

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //my attempt based off driverRoutes in activity #23
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  //my attempt based off driverRoutes in activity #23
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No tag found with that id." });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/", (req, res) => {
//   // create a new category
//   //my attempt based off of bookRoutes.js activity #5
//   Category.create({
//     category_name: req.body.category_name,
//   })
//     .then((newCategory) => {
//       res.json(newCategory);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

//above post route with async await instead:

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    //   {
    //   category_name: req.body.category_name,
    // }

    res.status(200).json({ newCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.put("/:id", (req, res) => {
//   // update a category by its `id` value
//   //below is based on activity #7 & #8 bookRoutes
//   Category.update(
//     {
//       category_name: req.body.category_name,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((updatedCategory) => {
//       res.json(updatedCategory);
//     })
//     .catch((err) => res.json(err));
// });

//above put route with async await instead:

router.put("/:id", async (req, res) => {
  const categoryData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  return res.json(categoryData);
});

// router.delete("/:id", (req, res) => {
//   // delete a category by its `id` value
//   //below is based on activity #7 bookRoutes

//   Category.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((deletedCategory) => {
//       res.json(deletedCategory);
//     })
//     .catch((err) => res.json(err));
// });

//above delete route with async await instead:

router.delete("/:id", async (req, res) => {
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.json(deletedCategory);
});

module.exports = router;
