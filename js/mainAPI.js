let allShoes = [];


// Function to render the carousel with a responsive number of shoe images per slide
function renderShoeCarousel(shoes) {
  const carouselInner = document.getElementById('carousel-images');
  carouselInner.innerHTML = ''; // Clear any existing content

  // Group shoes into chunks of 4 for each carousel item
  const chunkSize = 4;
  for (let i = 0; i < shoes.length; i += chunkSize) {
    const shoeChunk = shoes.slice(i, i + chunkSize);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');

    // Set the first item as active
    if (i === 0) {
      carouselItem.classList.add('active');
    }

    // Create a separate div for the background image
    const backgroundDiv = document.createElement('div');
    backgroundDiv.classList.add('carousel-background');
    backgroundDiv.style.backgroundImage = "url('../img/carousel_background.jpg')"; // Replace with your actual background image URL
    backgroundDiv.style.backgroundSize = 'cover';
    backgroundDiv.style.backgroundPosition = 'center';
    backgroundDiv.style.position = 'absolute';
    backgroundDiv.style.top = '0';
    backgroundDiv.style.left = '0';
    backgroundDiv.style.width = '100%';
    backgroundDiv.style.height = '100%';
    backgroundDiv.style.zIndex = '1'; // Lower z-index for background
    backgroundDiv.style.filter = 'grayscale(100%)'; // Apply grayscale filter only to the background

    // Create a container for the row and other content
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('carousel-content');
    contentDiv.style.position = 'relative';
    contentDiv.style.zIndex = '2'; // Higher z-index for content

    // Create a row to hold shoe images, responsive to screen size
    const row = document.createElement('div');
    row.classList.add('row');
    row.style.position = 'relative'; // To ensure that it doesn't affect the background

    shoeChunk.forEach((shoe) => {
      // Create a responsive column for each shoe
      const col = document.createElement('div');
      col.classList.add('col-12', 'col-md-6', 'col-lg-3'); // Responsive columns

      // Add the shoe image inside the column
      col.innerHTML = `
        <img src="${shoe.image}" class="d-block w-100" alt="${shoe.name}">
      `;
      row.appendChild(col);
    });

    // Add the row with shoe images to the content div
    contentDiv.appendChild(row);

    // Append the background div and content div to the carousel item
    carouselItem.appendChild(backgroundDiv); // Background comes first
    carouselItem.appendChild(contentDiv); // Content comes on top of background

    // Append the carousel item to the carousel-inner container
    carouselInner.appendChild(carouselItem);
  }
}





// Function to fetch shoes from the API and display in the carousel
function getShoeListForCarousel() {
  let axiosObj = axios({
      method: "get",
      url: "https://shop.cyberlearn.vn/api/Product"
  });

  // Axios chain
  axiosObj
      .then(function (result) {
          // Response Success - Result
          console.log(result.data.content)

          // Get the shoes array and pass it to the render function
          const shoes = result.data.content
          renderShoeCarousel(shoes)
      })
      .catch(function (error) {
          // Reject - Fail
          console.log(error)
      });
}

// Load the shoe list for the carousel when the webpage loads
getShoeListForCarousel()
// Uppercase function for Shoe Name
function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

// Function to render Bootstrap cards for each shoe
function renderShoeCards(shoes) {
    const shoeList = document.getElementById('shoe-list')
    shoeList.innerHTML = '' // Clear any existing content

    shoes.forEach(shoe => {
        const card = document.createElement('div')
        card.classList.add('col-md-4') // 3 cards per row (adjust classes as needed)
        card.innerHTML = `
            <div class="card mb-4">
                <img src="${shoe.image}" class="card-img-top" alt="${shoe.name}">
                <div class="card-body">
                    <h5 class="card-title">${toTitleCase(shoe.name)}</h5>
                    <p class="card-text"><strong>Price:</strong> $${shoe.price}</p>
                    <a href="#" class="btn btn-primary"><i class="fa-solid fa-cart-plus"></i> Buy Now</a>
                </div>
            </div>
        `
        shoeList.appendChild(card)
    })
}


// Function to filter shoes by brand based on the 'name' attribute
function filterByBrand(brand) {
  let filteredShoes;

  if (brand === "all") {
    // If 'all' is selected, show all shoes
    filteredShoes = allShoes;
  } else {
    // Filter shoes by checking if the brand name is part of the shoe's name
    filteredShoes = allShoes.filter((shoe) =>
      shoe.name.toLowerCase().includes(brand.toLowerCase())
    );
  }

  // Re-render the filtered shoe list
  renderShoeCards(filteredShoes);
}

// Function to fetch shoes from the API and store in allShoes
function getShoeList() {
  let axiosObj = axios({
    method: "get",
    url: "https://shop.cyberlearn.vn/api/Product",
  });

  // Axios chain
  axiosObj
    .then(function (result) {
      // Response Success - Result
      console.log(result.data.content);

      // Store shoes in allShoes
      allShoes = result.data.content.map((shoe) => ({
        name: shoe.name,
        price: shoe.price,
        image: shoe.image,
        description: shoe.description,
      }));

      // Initially render all shoes
      renderShoeCards(allShoes);
    })
    .catch(function (error) {
      // Reject - Fail
      console.log(error);
    });
}

// Load the shoe list when the webpage loads
getShoeList();
