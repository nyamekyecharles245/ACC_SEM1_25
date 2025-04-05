const cart = [];

    document.addEventListener("DOMContentLoaded", () => {
      const productCards = document.querySelectorAll(".product-card");
      productCards.forEach((card, index) => {
        const button = card.querySelector("button");
        button.addEventListener("click", () => addToCart(index, card));
      });
    });

    function addToCart(index, card) {
      const name = card.querySelector("h4").textContent;
      const price = parseFloat(card.querySelector("h5").textContent.replace("$", ""));
      const image = card.querySelector("img").src;

      const found = cart.find(item => item.name === name);
      if (found) {
        found.quantity++;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      updateCartUI();
    }

    function updateCartUI() {
      const cartContainer = document.querySelector(".cart-card");
      const cartTitle = cartContainer.querySelector("h3");
      cartTitle.textContent = `Your Cart(${cart.reduce((sum, item) => sum + item.quantity, 0)})`;

      const itemsHTML = cart.map((item, index) => `
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem">
          <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;border-radius:8px;object-fit:cover;">
          <div style="flex-grow:1; margin-left:10px">
            <p style="margin:0;font-weight:600">${item.name}</p>
            <p style="margin:0;color:gray">$${item.price.toFixed(2)} x ${item.quantity}</p>
          </div>
          <div style="display:flex;gap:4px">
            <button onclick="changeQuantity(${index}, -1)" style="background: hsl(14, 86%, 42%); padding: 5px 10px; border: none; color: #fff; cursor: pointer;">-</button>
            <button onclick="changeQuantity(${index}, 1)" style=" background-color: hsl(14, 86%, 42%); padding: 5px 10px; border: none; color: #fff; cursor: pointer;">+</button>
          </div>
        </div>
      `).join("");

      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

      cartContainer.innerHTML = `
        <h3>Your Cart(${cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
        <div>${itemsHTML}</div>
        <hr>
        <h4>Total: $${total}</h4>
        <button style="margin-top:1rem;padding:10px 16px;border:none;background-color:var(--Red);color:#fff;border-radius:8px;cursor:pointer">Confirm Order</button>
      `;
    }
    function changeQuantity(index, delta) {
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) cart.splice(index, 1);
      updateCartUI();
    }