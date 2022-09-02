"use strict";

const billEl = document.getElementById("bill-no");
const customEl = document.getElementById("custom-no");
const peopleEl = document.getElementById("people-no");
const tipValueEl = document.getElementById("tip-value");
const totalValueEl = document.getElementById("total-value");
const resetButton = document.getElementById("reset-btn");
const tipSelectBtn = document.querySelectorAll(".select-tip");

resetButton.addEventListener("click", (event) => {
  billEl.value = "";
  customEl.value = "";
  peopleEl.value = "1";
  tipValueEl.innerHTML = "$0.00";
  totalValueEl.innerHTML = "$0.00";

  tipSelectBtn.forEach((tipBtn) => {
    tipBtn.classList.remove("active");
  });

  tipSelectBtn[2].classList.add("active");
});

tipSelectBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    tipSelectBtn.forEach((tipBtn) => {
      tipBtn.classList.remove("active");
    });

    if (event.target.classList.contains("tip-custom")) {
      event.target.parentElement.classList.add("active");
    } else {
      event.target.classList.add("active");
    }
    tipCalculator();
  });
});

const tipCalculator = () => {
  const billValue = parseFloat(billEl.value);
  const peopleValue = parseFloat(peopleEl.value);

  const customTipActive = document.querySelector(".tip-select-custom.active");
  let tipPercentage = parseInt(document.querySelector(".select-tip.active").dataset.percentage);

  if (customTipActive) {
    tipPercentage = parseFloat(document.querySelector(".tip-custom").value);
  }

  const totalAmount = parseFloat((tipPercentage / 100) * billValue).toFixed(2);
  const tipAmount = parseFloat(totalAmount / peopleValue).toFixed(2);
  const actualTotalAmount = parseFloat((billValue + parseFloat(totalAmount)) / peopleValue).toFixed(2);

  tipValueEl.innerHTML = `$${tipAmount}`;
  totalValueEl.innerHTML = `$${actualTotalAmount}`;
};

const isNumber = (value) => {
  if (value === "Backspace" || value === "ArrowLeft" || value === "ArrowRight" || value === ".") {
    return true;
  }

  const regex = /^[0-9]+$/;

  return regex.test(value);
};

billEl.addEventListener("keyup", (event) => {
  tipCalculator();
});

customEl.addEventListener("keyup", (event) => {
  tipCalculator();
});

peopleEl.addEventListener("keyup", (event) => {
  tipCalculator();
});

billEl.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});

customEl.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});

peopleEl.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});
