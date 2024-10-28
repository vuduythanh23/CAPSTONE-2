let allShoes = [];

// Function to render the carousel with a responsive number of shoe images per slide
function renderShoeCarousel(shoes) {
  const carouselInner = document.getElementById("carousel-images");
  carouselInner.innerHTML = ""; // Clear any existing content

  const chunkSize = 4; // 4 shoes per carousel item
  for (let i = 0; i < shoes.length; i += chunkSize) {
    const shoeChunk = shoes.slice(i, i + chunkSize);

    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (i === 0) carouselItem.classList.add("active"); // Set first item as active

    const row = document.createElement("div");
    row.classList.add("row");

    shoeChunk.forEach((shoe) => {
      const col = document.createElement("div");
      col.classList.add("col-12", "col-md-6", "col-lg-3"); // Responsive columns
      col.innerHTML = `<img src="${shoe.image}" class="d-block w-100" alt="${shoe.name}">`;
      row.appendChild(col);
    });

    carouselItem.appendChild(row); // Append row with shoe images to carousel item
    carouselInner.appendChild(carouselItem); // Append item to carousel inner
  }
}

// Fetch shoes and display in the carousel
function getShoeListForCarousel() {
  axios.get("https://shop.cyberlearn.vn/api/Product")
    .then(result => {
      const shoes = result.data.content;
      renderShoeCarousel(shoes); // Render shoes in carousel
    })
    .catch(error => console.log(error));
}

getShoeListForCarousel(); // Load the carousel when the webpage loads

// Helper function to convert string to Title Case
function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

// Render Bootstrap cards for each shoe
function renderShoeCards(shoes) {
  const shoeList = document.getElementById("shoe-list");
  shoeList.innerHTML = ""; // Clear existing content

  shoes.forEach((shoe, index) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4"); // 3 cards per row
    card.innerHTML = `
      <div class="card mb-4">
        <img src="${shoe.image}" class="card-img-top" alt="${shoe.name}">
        <div class="card-body">
          <h5 class="card-title">${toTitleCase(shoe.name)}</h5>
          <p class="card-text"><strong>Price:</strong> $${shoe.price}</p>
          <a href="#" class="btn btn-primary" id="add-to-cart-${index}"><i class="fa-solid fa-cart-plus"></i> Add To Cart</a>
          <a href="#" class="btn btn-success" data-index="${index}" data-bs-toggle="modal" data-bs-target="#shoeInfoModal"><i class="fa-regular fa-circle-question"></i> More Information</a>
        </div>
      </div>
    `;
    shoeList.appendChild(card);

    // Attach event listeners for each shoe card
    document.getElementById(`add-to-cart-${index}`).addEventListener("click", () => addToCart(shoe));
  });

  // Attach event listeners for the "More Information" buttons
  document.querySelectorAll(".btn-success").forEach(button => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      const shoe = shoes[index]; // Get the corresponding shoe data
      populateModal(shoe);
    });
  });
}

// Function to populate the modal with shoe info
function populateModal(shoe) {
  document.getElementById("modal-shoe-image").src = shoe.image;
  document.getElementById("modal-shoe-name").innerText = toTitleCase(shoe.name);
  document.getElementById("modal-shoe-price").innerText = `$${shoe.price}`;
  document.getElementById("modal-shoe-description").innerText = `Description: ${shoe.description.replace("about this shoe:", "").trim()}`;
}

// Filter shoes by brand and render the filtered list
function filterByBrand(brand) {
  const filteredShoes = brand === "all" 
    ? allShoes 
    : allShoes.filter(shoe => shoe.name.toLowerCase().includes(brand.toLowerCase()));

  renderShoeCards(filteredShoes);
}

// Fetch shoes from the API and render cards
function getShoeList() {
  axios.get("https://shop.cyberlearn.vn/api/Product")
    .then(result => {
      allShoes = result.data.content.map(shoe => ({
        name: shoe.name,
        price: shoe.price,
        image: shoe.image,
        description: shoe.description,
      }));

      renderShoeCards(allShoes); // Initially render all shoes
    })
    .catch(error => console.log(error));
}

getShoeList(); // Load shoes when the webpage loads

// Add shoes to the cart and save in localStorage
function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cartItems.find(item => item.name === product.name);
  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity if item exists
  } else {
    cartItems.push({ ...product, quantity: 1 }); // Add new item with quantity 1
  }

  localStorage.setItem('cart', JSON.stringify(cartItems)); // Save updated cart
  
  // Update cart count instantly after adding to cart
  updateCartCount();

  // Use SweetAlert2 to display a confirmation message
  Swal.fire({
    title: 'Added to Cart!',
    text: `"${toTitleCase(product.name)}" has been added to your shopping cart.`,
    icon: 'success',
    showCancelButton: true, // Show the second button
    confirmButtonText: 'Go to Cart', // Button for redirecting to the cart page
    cancelButtonText: 'Continue Shopping' // Button for closing the popup
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirect to the shopping cart page if "Go to Cart" is clicked
      window.location.href = '/pages/cart.html'; // Replace '/cart' with the actual URL of your cart page
    }
  });
}

// Function to update cart count displayed on the cart icon
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Sum all quantities
  document.getElementById('cart-count').textContent = cartCount;
}

// Call this function on page load to update the cart count immediately
window.onload = function() {
  updateCartCount();
};

// Similarly, when deleting an item:
function deleteItem(index) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.splice(index, 1); // Remove the item from the array
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartCount(); // Update the count after deleting the item
}
