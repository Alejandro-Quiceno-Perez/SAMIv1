// Login
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmation = document.getElementById("confirmation");
const btnLogin = document.getElementById("login");

// Register
const emailRegister = document.getElementById("adressEmail");
const passwordRegister = document.getElementById("passwordRegister");
const passwordRegisterConfirmation = document.getElementById(
  "passwordConfirmation"
);
const btnRegister = document.getElementById("register");

const urlDesplegada = "https://sami-i7mr.onrender.com";
const urlLocal = "http://localhost:3000";

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  createUser();
});

console.log(btnRegister);

// Create user
async function createUser() {
  try {
    const userExist = await fetch(
      `${urlDesplegada}/users?email=${emailRegister.value}`
    );

    const data = await userExist.json();

    if (data.length > 0) {
      console.log("usuario YA registrado ");
      return;
    }

    const user = {
      email: emailRegister.value,
      password: passwordRegister.value,
      role: "user",
    };

    if (passwordRegister.value === passwordRegisterConfirmation.value) {
      const createUser = await fetch(`${urlDesplegada}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log(createUser);

      return;
    }
    console.log("Las contraseñas NO coinciden");
  } catch (error) {
    console.log(error.message);
  }
}

// Login

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  validateLogin();
  //   console.log(btnLogin);
});

async function validateLogin() {
  try {
    const login = await fetch(`${urlDesplegada}/users?email=${email.value}`);
    const data = await login.json();
    if (data.length < 1) {
      console.log("user no creado");
      return;
    }

    if (email.value === data[0].email && password.value === data[0].password) {
      if (data[0].email === "samiAdmin@sami.com") {
        window.open("../../admin.html", "_blank");
      }

      if (data[0].email !== "samiAdmin@sami.com") {
        console.log("Entro");
        window.location.href = "../../user-page.html";
      }
      localStorage.setItem("userSami", data[0].email);
    }
    console.log("correo y/o contrasena incorrecta");
  } catch (error) {
    console.log(error.message);
  }
}
