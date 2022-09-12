window.addEventListener("load", () => {
  // Left Column

  const list = document.querySelector(".user-menu__information-list");
  list.classList.add("user-menu__information-list-toggle");

  const userContact = document.querySelector(".user-menu__contact");
  userContact.classList.toggle("user-menu__contact-toggle");
});
