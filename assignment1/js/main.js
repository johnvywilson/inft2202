/* main.js */
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  }
  
  function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }
  
  function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  }
  