let updateBtns = document.getElementsByClassName("update-cart");
for (i = 0; i < updateBtns.length; i++) {
  updateBtns[i].addEventListener("click", function () {
    var productId = this.dataset.product;
    var action = this.dataset.action;
    if (user == "AnonymousUser") {
      addCookieItem(productId, action);
    } else {
      updateUserOrder(productId, action);
    }
  });
}

const addCookieItem = (productId, action) => {
  if (action == "add") {
    if (cart[productId] == undefined) {
      cart[productId] = { quantity: 1 };
    } else {
      cart[productId]["quantity"] += 1;
    }
  }
  if (action == "remove") {
    cart[productId]["quantity"] -= 1;
    if (cart[productId]["quantity"] <= 0) {
      delete cart[productId];
    }
  }
  document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/";
  location.reload();
  console.log(cart);
};

const updateUserOrder = (productId, action) => {
  var url = "/update_item/";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
      productId: productId,
      action: action,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload();
    });
};
