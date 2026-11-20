let a = 0;
let x = 0;
let y = 0;
let operator = "";
let decimal = 0;

let contentText = [];
let start = 0;
let saved = 0;

const content = document.getElementById("content0");

const calculate = () => {
  if (operator === "+") {
    y = y + x;
  } else if (operator === "-") {
    y = y - x;
  } else if (operator === "x") {
    y = y * x;
  } else if (operator === "/") {
    y = y / x;
  }
};

const print = () => {
  content.textContent = "";
  for (let i = 0; i < contentText.length; i++) {
    content.textContent = content.textContent + contentText[i];
  }
  if (contentText.length === 0) {
    content.textContent = "0";
  }
};

const operatorCheck = () => {
  if (operator === "/" && x === 0 && a === 1) {
    x = 0;
    y = 0;
    a = 0;
    operator = "";
    decimal = 0;
    contentText = [];
    content.textContent = "Error";
    return true;
  }
  return false;
};

const clickButton = (number) => {
  if (contentText[contentText.length - 1] === "%") {
    return;
  }
  if (a === 0) {
    x = 0;
    if (operator === "") {
      contentText = [];
    }
    start = contentText.length;
  }
  if (decimal === 0) {
    if (contentText[start] === "-") {
      x = x * 10 - number;
    } else {
      x = x * 10 + number;
    }
  } else {
    if (contentText[start] === "-") {
      x = x - number / (decimal * 10);
    } else {
      x = x + number / (decimal * 10);
    }
    decimal = decimal * 10;
  }
  a = 1;
  contentText.push(number);
  print();
};

const del = () => {
  if (a === 1 && operator !== "") {
    contentText.splice(start, contentText.length - start);
  } else {
    y = 0;
    operator = "";
    contentText = [];
  }
  x = 0;
  a = 0;
  decimal = 0;
  print();
};

const back = () => {
  if (a === 1) {
    if (contentText[contentText.length - 1] === "%") {
      x = saved;
    } else if (decimal > 1) {
      x = x * decimal;
      x = (x - (x % 10)) / 10;
      decimal = decimal / 10;
      x = x / decimal;
    } else if (decimal === 1) {
      decimal = 0;
    } else {
      x = (x - (x % 10)) / 10;
    }
    let k = contentText.length - 1;
    contentText.splice(k, 1);
    if (contentText.length === start) {
      x = 0;
      a = 0;
      decimal = 0;
    }
    print();
  }
};

const Operator = (sign) => {
  if (operatorCheck()) {
    return;
  }
  if (a === 1) {
    if (operator === "") {
      y = x;
    } else {
      calculate();
    }
    x = 0;
    a = 0;
  } else if (operator === "") {
    y = x;
    if (contentText.length === 0) {
      contentText.push(0);
    }
  } else {
    contentText.splice(contentText.length - 1, 1);
  }
  decimal = 0;
  operator = sign;
  contentText.push(sign);
  print();
};

const end = () => {
  if (operatorCheck()) {
    return;
  }
  if (operator !== "") {
    if (a === 1) {
      calculate();
    }
    x = y;
    y = 0;
    operator = "";
  }
  if (x < 10000000 && x > -10000000) {
    x = Math.round(x * 100000000) / 100000000;
  }
  a = 0;
  decimal = 0;
  contentText = [];
  contentText.push(x);
  print();
};

const persent = () => {
  if (a === 1 && contentText[contentText.length - 1] !== "%") {
    saved = x;
    if (operator === "+" || operator === "-") {
      x = (y * x) / 100;
    } else {
      x = x / 100;
    }
    contentText.push("%");
    print();
  }
};

const dot = () => {
  if (contentText[contentText.length - 1] === "%") {
    return;
  }
  if (decimal === 0) {
    if (a === 0) {
      x = 0;
      a = 1;
      if (operator === "") {
        contentText = [];
      }
      start = contentText.length;
      contentText.push(0);
    }
    contentText.push(".");
    decimal = 1;
  }
  print();
};

const swapSign = () => {
  if (a === 1) {
    if (contentText[contentText.length - 1] !== "%") {
      x = x * -1;
      if (contentText[start] === "-") {
        contentText.splice(start, 1);
      } else {
        contentText.splice(start, 0, "-");
      }
    }
  } else if (operator === "") {
    x = x * -1;
    contentText = [];
    contentText.push(x);
  } else {
    x = 0;
    a = 1;
    start = contentText.length;
    contentText.push("-");
  }
  print();
};

document.addEventListener("keydown", (e) => {
  if (e.key === "0") clickButton(0);
  if (e.key === "1") clickButton(1);
  if (e.key === "2") clickButton(2);
  if (e.key === "3") clickButton(3);
  if (e.key === "4") clickButton(4);
  if (e.key === "5") clickButton(5);
  if (e.key === "6") clickButton(6);
  if (e.key === "7") clickButton(7);
  if (e.key === "8") clickButton(8);
  if (e.key === "9") clickButton(9);
  if (e.key === ".") dot();
  if (e.key === "+") Operator("+");
  if (e.key === "-") Operator("-");
  if (e.key === "*") Operator("x");
  if (e.key === "/") Operator("/");
  if (e.key === "%") persent();
  if (e.key === "=") end();
  if (e.key === "Backspace") back();
  if (e.key === "Escape") del();
  if (e.key === "Enter") {
    e.preventDefault();
    end();
  }
});
