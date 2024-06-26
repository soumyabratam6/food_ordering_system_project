document.addEventListener("DOMContentLoaded", () => {
  const sideBar = document.querySelector(".side-bar");
  const openBtn = document.querySelector(".open");
  const closeBtn = document.querySelector(".close");

  openBtn.addEventListener("click", () => {
    sideBar.style.left = "0";
  });

  closeBtn.addEventListener("click", () => {
    sideBar.style.left = "-100%";
  });
  // Function to fetch the menu data and display it on the screen
  function getMenu() {
    fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const cardSection = document.querySelector(".card-section");
        console.log(cardSection);
        data.forEach((item) => {
          const card = document.createElement("div");
          console.log(item.imgSrc);
          card.classList.add("card");
          card.innerHTML = `
                        <img src="${item.imgSrc}" alt="" class="card-main-img"/>
                        <div class="card-content">
                            <div class="card-start-content">
                                <p class="food-name">${item.name}</p>
                                <p class="cost">$ ${item.price}/-</p>
                            </div>
                            <div class="card-end-content">
                                <img src="asset/Group 3.svg"/>
                            </div>
                        </div>
                    `;
          cardSection.appendChild(card);
        });
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }

  // Function to simulate taking an order
  function takeOrder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = {
          items: [
            { name: "Cheese Burger", price: 5.99 },
            { name: "Veggie Burger", price: 6.49 },
            { name: "Fish Burger", price: 7.29 },
          ],
        };
        resolve(order);
      }, 2500);
    });
  }

  // Function to simulate order preparation
  function orderPrep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderStatus = {
          order_status: true,
          paid: false,
        };
        resolve(orderStatus);
      }, 1500);
    });
  }

  // Function to simulate paying for the order
  function payOrder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const paymentStatus = {
          order_status: true,
          paid: true,
        };
        resolve(paymentStatus);
      }, 1000);
    });
  }

  // Function to display a thank you message
  function thankyouFnc() {
    const modal = document.getElementById("thankYouModal");
    const closeModal = document.getElementById("closeModal");

    modal.style.display = "block";

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }

  // Load the menu when the page loads
  getMenu();

  // Simulate the complete order process
  takeOrder()
    .then((order) => {
      console.log("Order placed:", order);
      return orderPrep();
    })
    .then((orderStatus) => {
      console.log("Order status:", orderStatus);
      return payOrder();
    })
    .then((paymentStatus) => {
      console.log("Payment status:", paymentStatus);
      thankyouFnc();
    })
    .catch((error) => console.error("Error in order process:", error));
});
