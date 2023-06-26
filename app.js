let num1 = false;
let num2 = false;
let operator = "";
let test = "(4 + (3 - 2 * 5))";
let test2 = ["3", "", "+", "", "4"];

// for (let i = 0; i < 5; i++) {
//     console.log(test2);
// }

// let test3 = test2.filter((element) => element !== "");
// console.log(test3);

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
    if (+num2 === 0) {
        screen.innerText = "You can't divide on 0!";
        num2 = -1;
        answer = "";
    }

    if (num1 % num2 === 0) {
        return num1 / num2;
    } else {
        return (num1 / num2).toFixed(4);
    }
}

function power(num1, num2) {
    return Math.pow(num1, num2);
}

function modular(num1, num2) {
    return num1 % num2;
}

function operate(num1, operator, num2) {
    switch (true) {
        case operator === "+":
            return add(num1, num2);

        case operator === "-":
            return substract(num1, num2);

        case operator === "×":
            return multiply(num1, num2);

        case operator === "÷":
            return divide(num1, num2);

        case operator === "^":
            return power(num1, num2);

        case operator === "%":
            return modular(num1, num2);
    }
}

function operationOrderWithoutParenthesis() {
    for (let i = 0; i < 100; i++) {
        if (answer.indexOf("^") === -1) {
            break;
        }

        if (answer.indexOf("^") !== -1) {
            operator = "^";
        }

        num1 = answer[answer.indexOf(operator) - 1];
        num2 = answer[answer.indexOf(operator) + 1];
        answer.splice(
            answer.indexOf(operator) - 1,
            3,
            operate(+num1, operator, +num2)
        );
    }

    for (let i = 0; i < 100; i++) {
        if (
            answer.indexOf("×") === -1 &&
            answer.indexOf("÷") === -1 &&
            answer.indexOf("%") === -1
        ) {
            break;
        } else {
            switch (true) {
                case answer.indexOf("÷") !== -1 &&
                    answer.indexOf("×") !== -1 &&
                    answer.indexOf("%") !== -1:
                    operator = "×";
                    break;

                case answer.indexOf("×") === -1 &&
                    answer.indexOf("÷") !== -1 &&
                    answer.indexOf("%") !== -1:
                    operator = "÷";
                    break;

                case answer.indexOf("÷") === -1 &&
                    answer.indexOf("×") !== -1 &&
                    answer.indexOf("%") !== -1:
                    operator = "%";
                    break;

                case answer.indexOf("÷") !== -1 &&
                    answer.indexOf("×") !== -1 &&
                    answer.indexOf("%") === -1:
                    operator = "×";
                    break;

                case answer.indexOf("÷") === -1 &&
                    answer.indexOf("×") === -1 &&
                    answer.indexOf("%") !== -1:
                    operator = "%";
                    break;

                case answer.indexOf("÷") !== -1 &&
                    answer.indexOf("×") === -1 &&
                    answer.indexOf("%") === -1:
                    operator = "÷";
                    break;

                case answer.indexOf("÷") === -1 &&
                    answer.indexOf("×") !== -1 &&
                    answer.indexOf("%") === -1:
                    operator = "×";
                    break;

                case answer.indexOf("×") === -1 &&
                    answer.indexOf("÷") === -1 &&
                    answer.indexOf("%") === -1:
                    break;
            }

            num1 = answer[answer.indexOf(operator) - 1];
            num2 = answer[answer.indexOf(operator) + 1];
            answer.splice(
                answer.indexOf(operator) - 1,
                3,
                operate(+num1, operator, +num2)
            );
        }
    }

    for (let i = 0; i < 100; i++) {
        console.log(`Test ${answer}`);
        if (answer.indexOf("+") === -1 && answer.indexOf("-") === -1) {
            break;
        }

        if (answer.indexOf("+") === -1 && answer.indexOf("-") !== -1) {
            operator = "-";
        } else if (answer.indexOf("-") === -1 && answer.indexOf("+") !== -1) {
            operator = "+";
        } else if (answer.indexOf("-") !== -1 && answer.indexOf("+") !== -1) {
            operator = "+";
        }

        num1 = answer[answer.indexOf(operator) - 1];
        num2 = answer[answer.indexOf(operator) + 1];

        answer.splice(
            answer.indexOf(operator) - 1,
            3,
            operate(+num1, operator, +num2)
        );
    }
}

const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".calc-upper-side p");
let answer = "(2 + 2) + (2 + 3)";
let lastOperator = answer.split(" ").slice(-2);
let textBeforeEqual = "";

// answer = "(3 + 4)"; //Delete this afterwords

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (screen.innerText !== "0123456789.+-×÷^%=") {
            screen.style.color = "black";
        }

        if (answer.length > 1) {
            lastOperator = answer.split(" ").slice(-2);
        }

        if (
            screen.innerText.includes(" = ") ||
            screen.innerText === "You can't divide on 0!"
        ) {
            answer = "";
            textBeforeEqual = "";
        }

        button.classList.add("animation");

        setTimeout(() => {
            button.classList.remove("animation");
        }, 100);

        switch (true) {
            case answer.length === 1 && button.value === " = ":
                break;

            case screen.innerText ===
                "Sorry you wrote too much symbols, try again!":
                screen.innerText = "";
                break;

            case screen.innerText.length === 161:
                screen.innerText =
                    "Sorry you wrote too much symbols, try again!";
                answer = "";
                textBeforeEqual = "";
                break;

            case button.value === "delete":
                operator = answer.split("").slice(-2)[0];

                switch (true) {
                    case answer.length === 1:
                        answer = answer.slice(0, -1);
                        screen.innerText = "0123456789.+-×÷^%=";
                        textBeforeEqual = "0123456789.+-×÷^%=";
                        screen.style.color = "rgba(0, 0, 0, 0.695)";
                        break;

                    case operator === "+" ||
                        operator === "-" ||
                        operator === "×" ||
                        operator === "÷" ||
                        operator === "^" ||
                        operator === "%":
                        answer = answer.slice(0, -3);
                        textBeforeEqual = answer;
                        screen.innerText = answer;
                        break;

                    case answer.length !== 0:
                        answer = answer.slice(0, -1);
                        textBeforeEqual = answer;
                        screen.innerText = answer;
                        break;
                }

                lastOperator[0] = "";
                break;

            case button.value === " = " &&
                answer !== "" &&
                answer.split(" ").slice(-1)[0] !== "":
                if (answer.indexOf("(") !== -1 && answer.indexOf(")") !== -1) {
                    answer = answer.split("");
                }

                let temp = answer;

                for (let i = 0; i < 100; i++) {
                    if (answer.indexOf("(") === -1) {
                        break;
                    }

                    if (answer.indexOf(")") === -1) {
                        break;
                    }

                    if (
                        answer.indexOf("(") !== -1 &&
                        answer.indexOf(")") !== -1
                    ) {
                        let closeParenthesis = answer.indexOf(")");
                        answer = answer.slice(0, closeParenthesis + 1);
                        let openParenthesis = answer.lastIndexOf("(");
                        answer = answer.slice(
                            openParenthesis + 1,
                            closeParenthesis
                        );
                        answer = answer.filter((element) => element !== " ");
                        operationOrderWithoutParenthesis();
                        temp[openParenthesis] = `${answer[0]}`;
                        temp.splice(
                            openParenthesis + 1,

                            closeParenthesis
                        );
                        answer = temp;
                    }
                }

                if (answer.includes("") === false) {
                    answer = answer.join("").split(" ");
                } else {
                    answer = answer.split(" ");
                }

                operationOrderWithoutParenthesis();

                if (+num2 !== false && operator !== "÷") {
                    answer = answer.join(" ");
                    screen.innerText = textBeforeEqual + " = " + answer;
                }
                break;

            case button.value === "clear":
                screen.innerText = "0123456789.+-×÷^%=";
                screen.style.color = "rgba(0, 0, 0, 0.695)";
                answer = "";
                textBeforeEqual = "";
                break;
        }

        switch (true) {
            case answer.length === 1 && button.value === " = ":
                break;

            case answer === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "." ||
                    button.value === " = "):
                break;

            case answer.length > 1 &&
                answer.split("").slice(-3).includes(".") &&
                answer.split(" ")[0].slice(-1) === "." &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            case (answer.length > 1 &&
                answer.split("").slice(-3).includes(".") &&
                button.value === ".") ||
                (answer.length > 1 &&
                    answer.split("").slice(-4).slice(-1)[0] === "." &&
                    (button.value === " + " ||
                        button.value === " - " ||
                        button.value === " × " ||
                        button.value === " ÷ " ||
                        button.value === " ^ " ||
                        button.value === " % " ||
                        button.value === ".")):
                break;

            case lastOperator[0] === "+" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            case lastOperator[0] === "-" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            case lastOperator[0] === "×" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            case lastOperator[0] === "÷" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            case lastOperator[0] === "^" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            case lastOperator[0] === "%" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            case answer.length > 1 &&
                answer.split(" ").slice(-1)[0][0] === "0" &&
                answer.split(" ").slice(-1)[0][1] !== "." &&
                button.value === "0":
                break;

            case button.value !== " = " &&
                button.value !== "clear" &&
                button.value !== "delete" &&
                screen.innerText !==
                    "Sorry you wrote too much symbols, try again!":
                textBeforeEqual = answer;
                answer += button.value;
                textBeforeEqual += button.value;
                screen.innerText = answer;
                break;
        }
    });

    window.addEventListener("keydown", (e) => {
        switch (true) {
            case e.code === "Digit0" && button.value === "0":
                button.click();
                break;

            case e.code === "Digit1" && button.value === "1":
                button.click();
                break;

            case e.code === "Digit2" && button.value === "2":
                button.click();
                break;

            case e.code === "Digit3" && button.value === "3":
                button.click();
                break;

            case e.code === "Digit4" && button.value === "4":
                button.click();
                break;

            case e.code === "Digit5" &&
                button.value === "5" &&
                e.shiftKey === false:
                button.click();
                break;

            case e.code === "Digit6" &&
                button.value === "6" &&
                e.shiftKey === false:
                button.click();
                break;

            case e.code === "Digit7" && button.value === "7":
                button.click();
                break;

            case e.code === "Digit8" &&
                button.value === "8" &&
                e.shiftKey === false:
                button.click();
                break;

            case e.code === "Digit9" && button.value === "9":
                button.click();
                break;

            case e.code === "Period" && button.value === ".":
                button.click();
                break;

            case e.code === "Enter" && button.value === " = ":
                button.click();
                break;

            case e.ctrlKey === true &&
                e.code === "Backspace" &&
                button.value === "clear":
                button.click();
                break;

            case e.code === "Backspace" && button.value === "delete":
                button.click();
                break;

            case e.code === "Equal" && button.value === " + ":
                button.click();
                break;

            case e.code === "Minus" && button.value === " - ":
                button.click();
                break;

            case e.shiftKey === true &&
                e.code === "Digit8" &&
                button.value === " × ":
                button.click();
                break;

            case e.code === "Slash" && button.value === " ÷ ":
                button.click();
                break;

            case e.shiftKey === true &&
                e.code === "Digit6" &&
                button.value === " ^ ":
                button.click();
                break;

            case e.shiftKey === true &&
                e.code === "Digit5" &&
                button.value === " % ":
                button.click();
                break;
        }
    });
});
