/* createProduct.js */
document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');
    // Only attach if we are in "create" mode (no ?id= in URL)
    if (!getQueryParam('id')) {
      productForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Gather form values
        const name = document.getElementById('productName').value;
        const description = document.getElementById('productDescription').value;
        const stock = parseInt(document.getElementById('productStock').value);
        const price = parseFloat(document.getElementById('productPrice').value);
        
        const newProduct = {
          id: generateId(),
          name,
          description,
          stock,
          price
        };
        
        const products = getProducts();
        products.push(newProduct);
        saveProducts(products);
        
        alert('Product created successfully!');
        window.location.href = 'list.html';
      });
    }
  });
  