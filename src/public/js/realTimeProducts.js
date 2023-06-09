const socket = io();

socket.on("newProductsList", (products) => {
  const listProducts = document.getElementById("listProducts");
  listProducts.innerHTML = "";
  for (const product of products) {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${product.title}</td>
          <td class="truncate">${product.description}</td>
          <td>$${product.price}</td>
          <td><img class="thumbnail-img" src="${product.thumbnail}" alt="Thumbnail"></td>
          <td>${product.code}</td>
          <td>${product.stock}</td>
          <td>${product.id}</td>
        `;
        listProducts.appendChild(row);
  }
});

socket.on("newProductMessage", (data) => {
  console.log(data);
});
