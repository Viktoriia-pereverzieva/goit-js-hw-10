import iziToast from "izitoast";

const refs = {
  form: document.querySelector(".form"),
  inputDelay: document.querySelector(".input-delay"),
  radioFulfilled: document.querySelector(".js-fulfilled"),
  radioRejected: document.querySelector(".js-rejected"),
};

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const delay = Number(refs.inputDelay.value);
  const isFulfilled = refs.radioFulfilled.checked;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((delay) => {
      iziToast.success({
        title: "Success",
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: "Error",
        message: `❌Rejected promise in ${delay}ms`,
        position: "topRight",
      });
    });
});