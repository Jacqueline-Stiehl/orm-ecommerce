const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
//const Tag = require("../../models/Tag");

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  //my attempt based off driverRoutes in activity #23
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "tag_products" }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id` value
  // be sure to include its associated Product data
  //my attempt based off driverRoutes in activity #23
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "tag_products" }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id." });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/", (req, res) => {
//   // create a new tag
//   //my attempt based off of bookRoutes.js activity #5
//   Tag.create({
//     tag_name: req.body.tag_name,
//   })
//     .then((newTag) => {
//       res.json(newTag);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

//above post route with async await instead:

router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json({ newTag });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.put("/:id", (req, res) => {
//   // update a tag's name by its `id` value
//   //below is based on activity #7 & #8 bookRoutes
//   Tag.update(
//     {
//       tag_name: req.body.tag_name,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((updatedTag) => {
//       res.json(updatedTag);
//     })
//     .catch((err) => res.json(err));
// });

//above put route with async await instead:

router.put("/:id", async (req, res) => {
  const updatedTag = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  return res.json(updatedTag);
});

// router.delete("/:id", (req, res) => {
//   // delete on tag by its `id` value
//   //below is based on activity #7 bookRoutes
//   Tag.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((deletedTag) => {
//       res.json(deletedTag);
//     })
//     .catch((err) => res.json(err));
// });

//above delete route with async await instead:

router.delete("/:id", async (req, res) => {
  const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.json(deletedTag);
});

module.exports = router;
