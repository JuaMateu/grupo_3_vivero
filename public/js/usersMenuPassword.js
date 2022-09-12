window.addEventListener("load", () => {
  // Left Column

  const list = document.querySelector(".user-menu__information-list");
  list.classList.add("user-menu__information-list-toggle");

  const userContact = document.querySelector(".user-menu__contact");
  userContact.classList.toggle("user-menu__contact-toggle");

  // Form

  const form = document.querySelector("#users-form");

  const actualPassword = document.querySelector("#actual-password");
  const newPassword = document.querySelector("#new-password");
  const newPasswordCheck = document.querySelector("#new-password-check");

  let errorCounter = 0;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Actual Password

    if (!document.getElementById("actual-password-error")) {
      if (!actualPassword.value || actualPassword.value.length < 8) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "actual-password-error");
        paragraph.classList.add("text-danger");
        paragraph.innerText =
          "La contraseña actual debe contener al menos 8 caracteres.";
        actualPassword.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (
      document.getElementById("actual-password-error") &&
      actualPassword.value.length >= 8
    ) {
      const paragraph = document.getElementById("actual-password-error");
      paragraph.remove();
      errorCounter -= 1;
    }

    // New Password

    if (!document.getElementById("new-password-error")) {
      if (!newPassword.value || newPassword.value.length < 8) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "new-password-error");
        paragraph.classList.add("text-danger");
        paragraph.innerText =
          "La nueva contraseña debe contener al menos 8 caracteres.";
        newPassword.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (
      document.getElementById("new-password-error") &&
      newPassword.value.length >= 8
    ) {
      const paragraph = document.getElementById("new-password-error");
      paragraph.remove();
      errorCounter -= 1;
    }

    // New Password Check

    if (!document.getElementById("new-password-check-error")) {
      if (
        !newPasswordCheck.value ||
        newPasswordCheck.value.length < 8 ||
        newPassword.value !== newPasswordCheck.value
      ) {
        const paragraph = document.createElement("p");
        paragraph.setAttribute("id", "new-password-check-error");
        paragraph.classList.add("text-danger");
        paragraph.innerText = "La contraseña no coincide.";
        newPasswordCheck.insertAdjacentElement("afterend", paragraph);
        errorCounter += 1;
      }
    } else if (
      document.getElementById("new-password-check-error") &&
      newPasswordCheck.value.length >= 8 &&
      newPassword.value === newPasswordCheck.value
    ) {
      const paragraph = document.getElementById("new-password-check-error");
      paragraph.remove();
      errorCounter -= 1;
    }

    if (errorCounter === 0) {
      form.submit();
    }
  });
});
