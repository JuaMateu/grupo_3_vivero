window.addEventListener("load", () => {
  // User Information
  const userInformation = document.querySelector(".user-menu__information");
  const userInformationList = document.querySelector(
    ".user-menu__information-list"
  );
  const userContact = document.querySelector(".user-menu__contact");

  userInformation.addEventListener("click", (event) => {
    event.preventDefault();
    userInformationList.classList.toggle("user-menu__information-list-toggle");
    userContact.classList.toggle("user-menu__contact-toggle");
  });

  // Avatar
  const userAvatar = document.querySelector(".information-item--avatar");
  userAvatar.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "/users/menu/avatar";
  });

  // Basic Information
  const userBasicInformation = document.querySelector(
    ".information-item--user"
  );
  userBasicInformation.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "/users/menu/name";
  });

  // Contact
  const userAddress = document.querySelector(".information-item--address");
  userAddress.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "/users/menu/contact";
  });

  // Password
  const userPassword = document.querySelector(".information-item--password");
  userPassword.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "/users/menu/password";
  });
});
