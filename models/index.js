// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "CategoryID",
  onDelete: `CASCADE`,
})
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "CategoryID"
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "Product ID"
},

  as:"tag_product",
)

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey : "Tag ID"

},

  as:"product_product",
)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
