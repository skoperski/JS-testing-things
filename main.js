const getCurrenciesDOM = document.querySelector("#getCurrencies");
const ratesDOM = document.querySelector("#rates");

const frankfurterUrl = "https://api.frankfurter.app/latest";

const loaderDOM = document.createElement("div");
const setLoader = () => {
  loaderDOM.id = "loader";
  loaderDOM.classList.add("loader");
  ratesDOM.appendChild(loaderDOM);
};

const getCurrenciesList = () => {
  setLoader();
  fetch(frankfurterUrl)
    .then((response) => response.json())
    .then((data) => {
      loaderDOM.classList.add("hide-loader");
      const ratesList = data.rates;
      console.log(ratesList);
      const select = document.createElement("select");
      select.classList.add("fs36", "ml20", "select");
      Object.keys(ratesList).forEach((key) => {
        const option = document.createElement("option");
        option.setAttribute("value", key);
        option.textContent = key;
        option.classList.add("fs36", "option");
        select.appendChild(option);
        ratesDOM.appendChild(select);
      });
      const keysArray = Object.keys(ratesList);
      const firstKey = keysArray[0];

      const div = document.createElement("div");
      div.classList.add("fs36", "plr20", "rateinfo");
      div.innerText = `1 EUR is ${ratesList[firstKey]} ${[firstKey]}`;
      ratesDOM.appendChild(div);
      select.addEventListener("change", (event) => {
        let pickedRate = event.target.value;
        div.innerText = `1 EUR is ${ratesList[pickedRate]} ${[pickedRate]}`;
      });

      getCurrenciesDOM.removeEventListener("click", getCurrenciesList);
    })
    .catch((err) => {
      console.error(err);
    });
};

getCurrenciesDOM.addEventListener("click", getCurrenciesList);
