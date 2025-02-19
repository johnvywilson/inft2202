/* updateProduct.js */
document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const productId = document.getElementById('productId').value;
      if (productId) {
        // In update mode, collect updated data from the form
        const name = document.getElementById('productName').value;
        const description = document.getElementById('productDescription').value;
        const stock = parseInt(document.getElementById('productStock').value);
        const price = parseFloat(document.getElementById('productPrice').value);
        
        const products = getProducts();
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
          products[productIndex] = {
            id: productId,
            name,
            description,
            stock,
            price
          };
          saveProducts(products);
          alert('Product updated successfully!');
          window.location.href = 'list.html';
        } else {
          alert('Product not found!');
        }
      }
    });
  });
  