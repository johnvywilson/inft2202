/* editProduct.js */
document.addEventListener('DOMContentLoaded', function () {
    const productId = getQueryParam('id');
    if (productId) {
      // Update the form title and button text for edit mode
      document.getElementById('formTitle').innerText = "Edit Product";
      document.getElementById('submitButton').innerText = "Update Product";
      // Set the hidden productId input field
      document.getElementById('productId').value = productId;
      
      const products = getProducts();
      const product = products.find(p => p.id === productId);
      if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productPrice').value = product.price;
      } else {
        alert('Product not found!');
      }
    }
  });
  