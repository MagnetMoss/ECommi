const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const categoryData = Category.findAll(req.params.id, {
      
      include: [{ model: Tag, through: ProductTag, as: 'tag_product' }, {model: Product, through: ProductTag, as:"product_product"}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // be sure to include its associated Products


  router.get('/:id', async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        
        // include: [{ model: Tag, through: ProductTag, as: 'tag_producttag' }]
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'Was not found' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json.err
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update (
    {
      category_name: req.body.category_name,
    },
    {
     where: {
       id: req.params.id,
     }, 
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err))
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(200).json({message: 'Category non-existent'});
      return
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
