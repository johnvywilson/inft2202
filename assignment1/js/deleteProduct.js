/* deleteProduct.js */
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
      let products = getProducts();
      products = products.filter(p => p.id !== id);
      saveProducts(products);
      alert('Product deleted successfully!');
      // Reload the page to update the list
      window.location.reload();
    }
  }
  