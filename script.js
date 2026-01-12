const burgerMenuButton = document.getElementById('burgerMenuButton');
const burgerMenuButton2 = document.getElementById('burgerMenuButton2');
const blackWall = document.getElementById('blackWall');
const burgerMenu = document.getElementById("burgerMenu")

burgerMenuButton.addEventListener('click', () => {
    burgerMenuReveal()
});
burgerMenuButton2.addEventListener('click', () => {
    burgerMenuReveal()
});

function burgerMenuReveal() {
    if (blackWall.classList.contains('hidden')) {
        blackWall.classList.remove('hidden');
        blackWall.classList.add('visible');
        document.body.style.overflow = 'hidden';

        burgerMenu.style.left = "0px"
    } else {
        blackWall.classList.remove('visible');
        blackWall.classList.add('hidden');
        document.body.style.overflow = '';

        burgerMenu.style.transition = "400ms ease-in-out"
        burgerMenu.style.left = "-400px"
        setTimeout(() => {
            burgerMenu.style.transition = "800ms ease-in-out"
        }, 401);
    }
}

const headerQuote1 = document.getElementById("headerQuote").querySelectorAll("p")[1]
const headerQuote2 = document.getElementById("headerQuote").querySelectorAll("p")[0]
const headerQuotes = [
    "Charlotte Adams",
    "Hellen Wagner",
    "Allan Morgan",
    "Lilly Valley",
    "Comfy bedrooms",
    "Lustfilled moments",
    "Sugar mommies",
    "Women with dicks",
    "Stinky farts",
    "Sweaty armpits",
    "Dairy foodplay",
    "Kinda gross things",
    "Foodbased Creatures"
]
let checkArray = new Array(headerQuotes.length).fill(false);
function headerQuoteUpdate() {

    let going = true;
    let index = 0;

    if (checkArray.every(element => element == true)) {
        checkArray = new Array(headerQuotes.length).fill(false);
    }

    while (going) {
        index = Math.floor(Math.random() * headerQuotes.length);
        if (checkArray[index] == false) {
            checkArray[index] = true;
            going = false;
            return headerQuotes[index];
        }
    }
}
headerQuote1.innerText = headerQuoteUpdate()
headerQuote2.innerText = headerQuoteUpdate()
headerQuote1.style.opacity = "1"
headerQuote2.style.opacity = "0"
setInterval(() => {
    headerQuote2.innerText = headerQuoteUpdate()
    headerQuote1.style.opacity = "0"
    headerQuote2.style.opacity = "1"
    setTimeout(() => {
        headerQuote1.innerText = headerQuoteUpdate()
        headerQuote1.style.opacity = "1"
        headerQuote2.style.opacity = "0"
    }, 1500);
}, 3000);

let isUp = false
window.addEventListener('scroll', () => {
    blackWall.style.top = window.scrollY + "px";
    burgerMenu.style.top = window.scrollY + "px";

    const nav = document.querySelector("nav");
    const header = document.querySelector("header");
    header.style.top = window.scrollY + "px";
    const html = document.documentElement;
    if (window.scrollY <= 2 && isUp) {
        isUp = false;
        nav.style.transform = "translateY(-60px)";
        html.classList.add("hide-scrollbar");
        header.style.display = "flex";
        header.style.zIndex = "9"
        setTimeout(() => {
            header.style.opacity = "1";
        }, 1);
    } 
    else if (window.scrollY > 2 && !isUp) {
        isUp = true;
        nav.style.transform = "translateY(0px)";
        html.classList.remove("hide-scrollbar");
        header.style.opacity = "0"
        setTimeout(() => {
            header.style.zIndex = "-1"
            header.style.display = "none"
        }, 500);
    }

    const welcome = document.querySelector(".welcome");
    if (window.scrollY >= 100 && window.scrollY <= 195) {
        welcome.style.width = "95vw"
        welcome.style.boxShadow = "0px 0px 100px 10px #fface8be inset"
    } else {
        welcome.style.width = "1010px"
        welcome.style.boxShadow = "none"
    }
});



function autoGrow(el) {
    el.style.height = "auto";
    el.style.height = (el.scrollHeight - 10) + "px";
}

const headerExampleButton = document.getElementById("headerExampleButton");
headerExampleButton.addEventListener("click", () => {
    exampleReveal("header")
})
const infoExampleButton = document.getElementById("infoExampleButton")
infoExampleButton.addEventListener("click", () => {
    exampleReveal("info")
});

function exampleReveal(section) {
    const input = document.getElementById(`${section}Input`)
    const example = document.getElementById(`${section}Example`)
    const exampleButton = document.getElementById(`${section}ExampleButton`)
    const cross = exampleButton.querySelector(".Cross")

    if(exampleButton.style.opacity == "50%" || exampleButton.style.opacity == "" || exampleButton.style.opacity == "0.5") {
        cross.style.opacity = "0%"
        exampleButton.style.opacity = "100%"

        example.style.opacity = "1"
        example.style.zIndex = "1"
        example.style.position = "relative"
    }
    else {
        cross.style.opacity = "100%"
        exampleButton.style.opacity = "50%"

        example.style.opacity = "0"
        example.style.zIndex = "-1"
        example.style.position = "absolute"
    }
}

let italic1 = `<span style='color: #fface8;'>`
let italic2 = `</span>`
let strong1 = `<span style='color: #fface8;'><strong>`
let strong2 = `</strong></span>`

function styleText(text) {
    let finalText = text;

    finalText = finalText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    finalText = finalText.replace(/\*\*(.+?)\*\*/g, `${strong1}$1${strong2}`);
    finalText = finalText.replace(/\*(.+?)\*/g, `${italic1}$1${italic2}`);

    return finalText;
}

function updateExample(section) {
    const text = document.getElementById(`${section}Input`).value
    const output = document.getElementById(`${section}Example`).querySelector("span")

    let finalText = text;

    finalText = styleText(finalText);

    output.innerHTML = finalText
    if (finalText.trim() === "") {
        output.innerHTML = ". . ."
    }
}

function updateInfo() {
    const sections = document.querySelectorAll(".info_section");
    const output = document.getElementById(`infoExample`).querySelector("span")
    let finalText = ""

    sections.forEach((section) => {
        let inputText = ""
        
        if (!section.querySelector("p")) {
            let input = section.querySelector("input").value;
            inputText = input;
        } else {
            let input = section.querySelector("p").textContent;
            input = input.replace(/\n/g, " ").trim().replace(/:/g, "").replace(/metric units/g, "").trim();
            inputText = input;
        }
        let areaText = section.querySelector("textarea").value;
        
        finalText += `<p>${inputText}: **${areaText}**</p>`;
        
        finalText = finalText.replace(/\*\*(.+?)\*\*/g, `${strong1}$1${strong2}`);
        finalText = finalText.replace(/\*(.+?)\*/g, `${italic1}$1${italic2}`);

        output.innerHTML = finalText;
        if (finalText.trim() === "") {
            output.innerHTML = ". . ."
        }
    });
}

const button = document.getElementById("createNewSection");

button.addEventListener("click", () => {
    const section = document.createElement("div");
    section.classList.add("info_section");

    const labelInput = document.createElement("input");
    labelInput.type = "text";
    labelInput.placeholder = "placeholder";
    labelInput.classList.add("info_custom_input");
    labelInput.oninput = function () {
        updateInfo();
    };

    const textareaDiv = document.createElement("div");
    textareaDiv.classList.add("textarea_div", "gradient_border");

    const textarea = document.createElement("textarea");
    textarea.placeholder = ". . .";
    textarea.oninput = function () {
        autoGrow(this);
        updateInfo();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete_section");
    deleteBtn.onclick = function () {
        section.style.opacity = "0";
        section.style.transform = "scaleY(0)";
        setTimeout(() => {
            section.remove();
            updateInfo();
        }, 500);
    };

    textareaDiv.appendChild(textarea);
    section.appendChild(labelInput);
    section.appendChild(textareaDiv);
    section.appendChild(deleteBtn);

    button.parentNode.insertBefore(section, button);

    section.style.opacity = "0";
    section.style.transform = "scaleY(0)";
    setTimeout(() => {
        section.style.opacity = "1";
        section.style.transform = "scaleY(1)";
    }, 1);

    updateInfo();
});

