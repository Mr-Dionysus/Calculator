let firstNum = 0;
let secondNum = 0;
let operation = "";

function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}
function operate(firstNum, operation, secondNum) {
    switch (true) {
        case operation === "add":
            return add(firstNum, secondNum);
        case operation === "substract":
            return substract(firstNum, secondNum);
        case operation === "multiply":
            return multiply(firstNum, secondNum);
        case operation === "divide":
            return divide(firstNum, secondNum);
    }
}

const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".calc-upper-side p");
let displayValue = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        screen.style.color = "black";

        switch (true) {
            case button.value === " + ":
                operation = "add";
                break;

            case button.value === " - ":
                operation = "substract";
                break;

            case button.value === " * ":
                operation = "multiply";
                break;

            case button.value === " / ":
                operation = "divide";
                break;

            case button.value === " = ":
                displayValue = displayValue.split(" ");
                console.log(displayValue);
                displayValue.push("=");
                displayValue.push(
                    operate(+displayValue[0], operation, +displayValue[2])
                );
                displayValue = displayValue.join(" ");
                screen.innerText = displayValue;
        }

        if (button.value !== " = ") {
            displayValue += button.value;
            screen.innerText = displayValue;
        }

        console.log(displayValue);
    });
});

const equal = document.querySelector(`button[value=" = "]`);
console.log(displayValue);
// equal.addEventListener("click", () => {});
