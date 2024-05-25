const db = require('../config');


const addProductHandler = async (req, res) => {
  try {
    const { category_id, company_id, brand_id, nama, porsi, kalori, lemak, protein, karbohidrat, gula, garam, kalium } = req.body;
    const result = await db.query(
      'INSERT INTO product (category_id, company_id, brand_id, nama, porsi, kalori, lemak, protein, karbohidrat, gula, garam, kalium) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [category_id, company_id, brand_id, nama, porsi, kalori, lemak, protein, karbohidrat, gula, garam, kalium]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Internal Server Error');
  }
};

const editProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, company_id, brand_id, nama, porsi, kalori, lemak, protein, karbohidrat, gula, garam, kalium } = req.body;
    const result = await db.query(
      'UPDATE product SET category_id = $1, company_id = $2, brand_id = $3, nama = $4, porsi = $5, kalori = $6, lemak = $7, protein = $8, karbohidrat = $9, gula = $10, garam = $11, kalium = $12 WHERE id = $13 RETURNING *',
      [category_id, company_id, brand_id, nama, porsi, kalori, lemak, protein, karbohidrat, gula, garam, kalium, id]
    );
    res.send(result.rows[0]);
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getAllProductsHandler = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM product');
    res.send(result.rows);
  } catch (error) {
    console.error('Error getting all products:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM product WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).send('Product not found');
    } else {
      res.send(result.rows[0]);
    }
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM product WHERE id = $1', [id]);
    res.send('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { addProductHandler, editProductHandler, getAllProductsHandler, getProductByIdHandler, deleteProductHandler};
