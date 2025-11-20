const products = [
  {name: "Handmade Candle", price: "$12", image: "https://via.placeholder.com/220x150?text=Candle", category: "Decor"},
  {name: "Ceramic Mug", price: "$18", image: "https://via.placeholder.com/220x150?text=Mug", category: "Tea"},
  {name: "Wool Blanket", price: "$45", image: "https://via.placeholder.com/220x150?text=Blanket", category: "Decor"},
  {name: "Herbal Tea Set", price: "$20", image: "https://via.placeholder.com/220x150?text=Tea+Set", category: "Tea"},
  {name: "Wooden Spoon Set", price: "$15", image: "https://via.placeholder.com/220x150?text=Spoons", category: "Kitchen"},
  {name: "Flower Wreath", price: "$25", image: "https://via.placeholder.com/220x150?text=Wreath", category: "Decor"}
];

const productGrid = document.getElementById('productGrid');

// Create filter dropdown
const filterContainer = document.createElement('div');
filterContainer.style.marginBottom = "1.5rem";
filterContainer.innerHTML = `
  <label for="categoryFilter">Filter by Category: </label>
  <select id="categoryFilter">
    <option value="All">All</option>
    <option value="Tea">Tea</option>
    <option value="Decor">Decor</option>
    <option value="Kitchen">Kitchen</option>
  </select>
`;
document.querySelector('.overlay').insertBefore(filterContainer, productGrid);

const categoryFilter = document.getElementById('categoryFilter');

// Initial render
function renderProducts(list) {
  productGrid.innerHTML = '';
  list.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card', 'animate'); // add animate class
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button>Buy</button>
    `;
    productGrid.appendChild(card);
  });
}


renderProducts(products);

// Filter event
categoryFilter.addEventListener('change', () => {
  const selected = categoryFilter.value;
  if(selected === "All") {
    renderProducts(products);
  } else {
    renderProducts(products.filter(p => p.category === selected));
  }
});
