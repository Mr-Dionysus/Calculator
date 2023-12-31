let num1 = false;
let num2 = false;
let operator = "";

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
//Check operator and use correct function
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
//Do operations with math order without parenthesises
function operationOrderWithoutParenthesis() {
    for (let i = 0; i < answer.length; i++) {
        if (answer.indexOf("^") === -1) {
            break;
        }

        if (answer.indexOf("^") !== -1) {
            operator = "^";
        }
        //Change nums with operator to answer
        num1 = answer[answer.indexOf(operator) - 1];
        num2 = answer[answer.indexOf(operator) + 1];
        answer.splice(
            answer.indexOf(operator) - 1,
            3,
            operate(+num1, operator, +num2)
        );
    }

    for (let i = 0; i < answer.length; i++) {
        if (
            answer.indexOf("×") === -1 &&
            answer.indexOf("÷") === -1 &&
            answer.indexOf("%") === -1
        ) {
            break;
        } else {
            //Find operator in equation
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
            //Change nums with operator to answer
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
        if (answer.indexOf("+") === -1 && answer.indexOf("-") === -1) {
            break;
        }
        //Find operator in equation
        switch (true) {
            case answer.indexOf("+") === -1 && answer.indexOf("-") !== -1:
                operator = "-";
                break;

            case answer.indexOf("-") === -1 && answer.indexOf("+") !== -1:
                operator = "+";
                break;

            case answer.indexOf("-") !== -1 && answer.indexOf("+") !== -1:
                operator = "-";
                break;
        }
        //Change nums with operator to answer
        num1 = answer[answer.indexOf(operator) - 1];
        num2 = answer[answer.indexOf(operator) + 1];
        if (num1 !== undefined) {
            answer.splice(
                answer.indexOf(operator) - 1,
                3,
                operate(+num1, operator, +num2)
            );
        } else {
            num1 = answer.join("");
        }
    }
}

const buttons = document.querySelectorAll("button");
const ans = document.querySelector("button[value = 'ans']");
const screen = document.querySelector(".calc-upper-side p");
let answer = ""; //Num after =
let previousAnswer = "ans";
let lastOperator = answer.split(" ").slice(-2); //Find last operator
let textBeforeEqual = "";
let openParenthesisCounter = 0;
let closeParenthesisCounter = 0;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (answer.length > 1) {
            lastOperator = answer.split(" ").slice(-2);
        }
        //Clear screen after use = or / on 0
        if (
            screen.innerText.includes(" = ") ||
            screen.innerText === "You can't divide on 0!"
        ) {
            answer = "";
            textBeforeEqual = "";
        }
        //Add animation after each use of button
        button.classList.add("animation");
        setTimeout(() => {
            button.classList.remove("animation");
        }, 100);

        switch (true) {
            //Stop if one num and use =
            case answer.split(" ").length === 1 && button.value === " = ":
                break;
            //Clear screen if was too much symbols
            case screen.innerText ===
                "Sorry you wrote too much symbols, try again!":
                screen.innerText = "";
                break;
            //Check on symbols limit and clear vars
            case screen.innerText.length === 122:
                screen.innerText =
                    "Sorry you wrote too much symbols, try again!";
                answer = "";
                textBeforeEqual = "";
                break;

            case button.value === "(-)":
                answer = answer.split(" ");
                let tempNum = answer.slice(-1);
                //If previously change to negative that return back to positive
                console.log(tempNum);
                if (tempNum[0][1] === "-") {
                    answer.pop();
                    tempNum = tempNum[0].slice(2, -1);
                    answer.push(`${tempNum}`);
                } else {
                    answer.pop();
                    answer.push(`(-${tempNum})`);
                }

                answer = answer.join(" ");
                break;
            //Stop if don't have previous answer
            case button.value === "ans":
                button.value = previousAnswer;
                break;

            case button.value === "delete":
                operator = answer.split("").slice(-2)[0];

                switch (true) {
                    //Change screen on placeholder when delete last num
                    case answer.length === 1:
                        answer = answer.slice(0, -1);
                        screen.innerText = "0123456789.+-×÷^%=";
                        textBeforeEqual = "0123456789.+-×÷^%=";
                        screen.style.color = "rgba(0, 0, 0, 0.5)";
                        break;
                    //Delete operators with empty spaces around them
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
                    //Delete one num
                    case answer.length !== 0:
                        answer = answer.slice(0, -1);
                        textBeforeEqual = answer;
                        screen.innerText = answer;
                        break;
                }
                //Reset lastOperator [0] to default
                lastOperator[0] = "";
                break;

            //Use if not an empty screen
            case button.value === " = " &&
                answer !== "" &&
                answer.split(" ").slice(-1)[0] !== "":
                if (answer.indexOf("(") !== -1 || answer.indexOf(")") !== -1) {
                    answer = answer.split("");
                }

                let arrWithParenthesises = answer;

                for (let i = 0; i < answer.length; i++) {
                    switch (true) {
                        //Delete unused parenthesis if not have couple
                        case answer.indexOf("(") === -1 &&
                            answer.indexOf(")") !== -1:
                            answer.splice(answer.indexOf(")"), 1);
                            textBeforeEqual = answer.join("");
                            break;

                        case answer.indexOf(")") === -1 &&
                            answer.indexOf("(") !== -1:
                            answer.splice(answer.indexOf("("), 1);
                            textBeforeEqual = answer.join("");
                            break;
                        //Else use operations in parenthesises first
                        case answer.indexOf("(") !== -1 &&
                            answer.indexOf(")") !== -1:
                            let closeParenthesis = answer.indexOf(")");
                            answer = answer.slice(0, closeParenthesis + 1);
                            let openParenthesis = answer.lastIndexOf("(");
                            answer = answer.slice(
                                openParenthesis + 1,
                                closeParenthesis
                            );

                            answer = answer.filter(
                                (element) => element !== " "
                            );
                            //If num negative than use that num with minus in the next operations
                            if (
                                textBeforeEqual[
                                    textBeforeEqual.indexOf("-") + 1
                                ] !== "" &&
                                textBeforeEqual[
                                    textBeforeEqual.indexOf("-") - 1
                                ] === "("
                            ) {
                                answer = answer.join("").split(" ");
                            } else {
                                operationOrderWithoutParenthesis();
                            }

                            arrWithParenthesises[
                                openParenthesis
                            ] = `${answer[0]}`;
                            arrWithParenthesises.splice(
                                openParenthesis + 1,
                                closeParenthesis - openParenthesis
                            );
                            answer = arrWithParenthesises;
                            break;
                    }
                }

                if (answer.includes("") === false) {
                    answer = answer.join("").split(" ");
                } else {
                    answer = answer.split(" ");
                }

                operationOrderWithoutParenthesis();
                //Use if not / on 0
                if (+num2 !== false) {
                    if (+num2 === 0 && operator === "÷") {
                        break;
                    } else {
                        answer = answer.join(" ");
                        if (answer === "Infinity") {
                            answer =
                                "Sorry this number is too big. Try to use something smaller!";
                        }
                        screen.innerText = textBeforeEqual + " = " + answer;
                    }
                }

                previousAnswer = answer;
                answerInfoH3.innerText = `Answer = ${answer}`;

                if (ans.value !== "ans") {
                    ans.value = "ans";
                }

                break;
            //Clear screen and change text to placeholder
            case button.value === "clear":
                screen.innerText = "0123456789.+-×÷^%=";
                screen.style.color = "rgba(0, 0, 0, 0.5)";
                answer = "";
                textBeforeEqual = "";
                break;
        }

        switch (true) {
            case button.value === "(":
                openParenthesisCounter++;
                break;

            case button.value === ")":
                closeParenthesisCounter++;
                break;
        }

        switch (true) {
            //Stop if no operators and click on equal
            case answer.length === 1 && button.value === " = ":
                break;
            //Stop if no nums and click on operators
            case answer === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "." ||
                    button.value === " = " ||
                    button.value === "(-)"):
                break;

            case answer === "(-)":
                break;
            //Stop if use operators after num with point in the end
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
            //Stop if try to use point again and operators after num with point in the end
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
            //Change 0 to num if don't use . or operator after 0
            case answer.slice(-1) === "0" &&
                answer.slice(-2)[0] === " " &&
                (button.value === "0" ||
                    button.value === "1" ||
                    button.value === "2" ||
                    button.value === "3" ||
                    button.value === "4" ||
                    button.value === "5" ||
                    button.value === "6" ||
                    button.value === "7" ||
                    button.value === "8" ||
                    button.value === "9"):
                answer = answer.split(" ");
                answer.pop();
                answer.push(button.value);
                answer = answer.join(" ");
                screen.innerText = answer;
                textBeforeEqual = answer;
                break;
            //Change 0 to num if - is first num in equation
            case answer[0] === "0" &&
                answer[1] === undefined &&
                (button.value === "0" ||
                    button.value === "1" ||
                    button.value === "2" ||
                    button.value === "3" ||
                    button.value === "4" ||
                    button.value === "5" ||
                    button.value === "6" ||
                    button.value === "7" ||
                    button.value === "8" ||
                    button.value === "9"):
                answer = answer.split(" ");
                answer.pop();
                answer.push(button.value);
                answer = answer.join(" ");
                screen.innerText = answer;
                textBeforeEqual = answer;
                break;
            //Stop if after + try to use operators
            case lastOperator[0] === "+" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "." ||
                    button.value === "(-)"):
                answer = answer.slice(0, -3);
                answer += button.value;
                screen.innerText = answer;
                textBeforeEqual = answer;
                break;
            //Stop if after + try to use operators
            case lastOperator[0] === "-" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "." ||
                    button.value === "(-)"):
                answer = answer.slice(0, -3);
                answer += button.value;
                screen.innerText = answer;
                textBeforeEqual = answer;
                break;
            //Stop if after + try to use operators
            case lastOperator[0] === "×" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "." ||
                    button.value === "(-)"):
                answer = answer.slice(0, -3);
                answer += button.value;
                screen.innerText = answer;
                textBeforeEqual = answer;
                break;
            //Stop if after + try to use operators
            case lastOperator[0] === "÷" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "." ||
                    button.value === "(-)"):
                answer = answer.slice(0, -3);
                answer += button.value;
                screen.innerText = answer;
                textBeforeEqual = answer;
                break;
            //Stop if after + try to use operators
            case lastOperator[0] === "^" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "." ||
                    button.value === "(-)"):
                answer = answer.slice(0, -3);
                answer += button.value;
                screen.innerText = answer;
                textBeforeEqual = answer;
                break;
            //Stop if after + try to use operators
            case lastOperator[0] === "%" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "." ||
                    button.value === "(-)"):
                answer = answer.slice(0, -3);
                answer += button.value;
                screen.innerText = answer;
                textBeforeEqual = answer;
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
                answer = answer.slice(0, -3);
                answer += button.value;
                screen.innerText = answer;
                textBeforeEqual = answer;
                break;

            case answer.slice(-1) !== " " &&
                answer.slice(-1) !== "(" &&
                button.value === "(" &&
                answer.length > 1:
                break;

            //Stop if after ( try to use operators)
            case answer.slice(-1) === "(" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;
            //Stop if before point try to use multiple 0
            case answer.length > 1 &&
                answer.split(" ").slice(-1)[0][0] === "0" &&
                answer.split(" ").slice(-1)[0][1] !== "." &&
                button.value === "0":
                break;
            //Stop if ) don't have ( pair before
            case button.value === ")" &&
                (answer.includes("(") === false ||
                    answer.slice(-1) === "(" ||
                    answer.slice(answer.lastIndexOf("(")).slice(-1) === " " ||
                    answer.split(" ").slice(-1)[0].includes("(")):
                closeParenthesisCounter--;
                break;
            //Stop if open parenthesis will be less than close
            case openParenthesisCounter === closeParenthesisCounter - 1 &&
                button.value === ")":
                closeParenthesisCounter--;
                break;
            //Show manipulations on the screen
            case button.value !== " = " &&
                button.value !== "clear" &&
                button.value !== "delete" &&
                button.value !== "ans" &&
                screen.innerText !==
                    "Sorry you wrote too much symbols, try again!":
                textBeforeEqual = answer;
                if (button.value !== "(-)") {
                    answer += button.value;
                    textBeforeEqual += button.value;
                }
                screen.innerText = answer;
                //Color text in black if it's not a placeholder
                if (screen.innerText === "0123456789.+-×÷^%=") {
                    screen.style.color = rgba(0, 0, 0, 0.5);
                } else {
                    screen.style.color = "black";
                }
                break;
        }
    });
    //Add keyboard support
    window.addEventListener("keydown", (e) => {
        switch (true) {
            //0
            case button.value === "0" &&
                e.code === "Digit0" &&
                e.shiftKey === false:
                button.click();
                break;
            //1
            case button.value === "1" && e.code === "Digit1":
                button.click();
                break;
            //2
            case button.value === "2" && e.code === "Digit2":
                button.click();
                break;
            //3
            case button.value === "3" && e.code === "Digit3":
                button.click();
                break;
            //4
            case button.value === "4" && e.code === "Digit4":
                button.click();
                break;
            //5
            case button.value === "5" &&
                e.code === "Digit5" &&
                e.shiftKey === false:
                button.click();
                break;
            //6
            case button.value === "6" &&
                e.code === "Digit6" &&
                e.shiftKey === false:
                button.click();
                break;
            //7
            case button.value === "7" && e.code === "Digit7":
                button.click();
                break;
            //8
            case button.value === "8" &&
                e.code === "Digit8" &&
                e.shiftKey === false:
                button.click();
                break;
            //9
            case button.value === "9" &&
                e.code === "Digit9" &&
                e.shiftKey === false:
                button.click();
                break;
            //Decimal
            case button.value === "." && e.code === "Period":
                button.click();
                break;
            //Prevent use Enter on focus item
            case button.value === " = " &&
                e.code === "Enter" &&
                e.shiftKey === false:
                e.preventDefault();
                e.target.blur();
                button.click();
                break;
            //Clear Screen
            case button.value === "clear" &&
                e.ctrlKey === true &&
                e.code === "Backspace":
                button.click();
                break;
            //Delete
            case button.value === "delete" &&
                e.code === "Backspace" &&
                e.ctrlKey === false:
                button.click();
                break;
            //Addition
            case button.value === " + " && e.code === "Equal":
                button.click();
                break;
            //Substraction
            case button.value === " - " &&
                e.code === "Minus" &&
                e.shiftKey === false:
                button.click();
                break;
            //Multiplication
            case button.value === " × " &&
                e.shiftKey === true &&
                e.code === "Digit8":
                button.click();
                break;
            //Division
            case button.value === " ÷ " && e.code === "Slash":
                button.click();
                break;
            //Exponentiation
            case button.value === " ^ " &&
                e.shiftKey === true &&
                e.code === "Digit6":
                button.click();
                break;
            //Remainder
            case button.value === " % " &&
                e.shiftKey === true &&
                e.code === "Digit5":
                button.click();
                break;
            //Opposite Sign
            case button.value === "(-)" &&
                e.shiftKey === true &&
                e.code === "Minus":
                button.click();
                break;
            //Open Parenthesis
            case button.value === "(" &&
                e.shiftKey === true &&
                e.code === "Digit9":
                button.click();
                break;
            //Close Parenthesis
            case button.value === ")" &&
                e.shiftKey === true &&
                e.code === "Digit0":
                button.click();
                break;
            //Previous Answer
            case button.innerText === "Ans" &&
                e.shiftKey === true &&
                e.code === "Enter":
                button.click();
                break;
        }
    });
});

const previousAnswerButton = document.querySelector("#answer-info");
const answerInfo = document.querySelector("#previous-answer");
const answerInfoH3 = document.querySelector("#answer-info h3");
window.addEventListener("mouseover", (e) => {
    previousAnswerButton.classList.add("active");
    if (e.target.value !== "ans") {
        previousAnswerButton.classList.remove("active");
    }
});
