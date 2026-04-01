// === зовнішній скрипт для лабораторної 6 ===

// функція з циклом та умовою (діалог з користувачем)
function planTrip() {
    let days = prompt("Скільки днів триватиме похід?", "3");
    let numDays = parseInt(days);

    if (isNaN(numDays) || numDays <= 0) {
        alert("Помилка: введіть коректну кількість днів!");
    } else {
        let schedule = "Ваш розклад:\n";
        for (let i = 1; i <= numDays; i++) {
            schedule += `День ${i}: Пригоди чекають!\n`;
        }
        alert(schedule);
    }
}

// інформація про розробника (роль задана за замовчуванням)
function showDeveloperInfo(lastName, firstName, role = "Головний гід-розробник") {
    alert(`Автор цього туристичного гайду:\nПрізвище: ${lastName}\nІм'я: ${firstName}\nПосада: ${role}`);
}

// порівняння довжини двох рядків
function compareBackpacks(item1, item2) {
    if (item1.length > item2.length) {
        alert(`Слово "${item1}" довше за "${item2}".`);
    } else if (item2.length > item1.length) {
        alert(`Слово "${item2}" довше за "${item1}".`);
    } else {
        alert("Назви речей однакової довжини!");
    }
}

// зміна фону сторінки (справжній нічний режим)
function nightMode() {
    // 1. міняємо фон самого body
    let oldColor = document.body.style.backgroundColor;
    let oldTextColor = document.body.style.color;

    document.body.style.backgroundColor = "#1a1a2e"; // дуже темний синій
    document.body.style.color = "#ecf0f1"; 
    
    // 2. знаходимо ВСІ світлі елементи: контейнери, підвал (#footer) та рамку списку (.travel-list)
    let whiteBlocks = document.querySelectorAll(".lab5-container, .lab6-container, .info-box, #side-pocket, #footer, .travel-list");

    // 3. проходимося по них і робимо їх темними
    whiteBlocks.forEach(block => {
        block.style.backgroundColor = "#16213e"; // темний фон для блоків
        block.style.color = "#ecf0f1";
        block.style.borderColor = "#0f3460"; // приглушуємо рамки
    });

    alert("Справжній нічний режим увімкнено! Сонце зійде через 30 секунд.");

    // 4. таймер, який все повертає назад
    setTimeout(() => {
        document.body.style.backgroundColor = oldColor;
        document.body.style.color = oldTextColor;

        // повертаємо блоки до початкового стану
        whiteBlocks.forEach(block => {
            block.style.backgroundColor = "";
            block.style.color = "";
            block.style.borderColor = "";
        });
    }, 30000); 
}

// перенаправлення за допомогою об'єкта location
function buyTickets() {
    let goToTickets = confirm("Перейти на сайт Укрзалізниці для купівлі квитків?");
    if (goToTickets) {
        location.href = "https://uz.gov.ua/";
    }
}

// комплексні маніпуляції з DOM
function packBackpack() {
    // 1. використання getElementById та querySelectorAll
    let mainPocket = document.getElementById("main-pocket");
    let listItems = document.querySelectorAll(".travel-list li");
    let sidePocket = document.getElementById("side-pocket");

    // 2. демонстрація властивостей DOM-вузла (innerHTML, outerHTML, nodeValue) у консолі
    console.log("innerHTML головного відділення:", mainPocket.innerHTML);
    console.log("outerHTML головного відділення:", mainPocket.outerHTML);
    console.log("nodeValue першого текстового вузла:", sidePocket.childNodes[0].nodeValue);

    // 3. зміна тексту через textContent
    mainPocket.textContent = "Головне відділення: спальник та намет вже тут!";
    mainPocket.style.color = "green";
    mainPocket.style.fontWeight = "bold";

    // 4. створення елементів та вставка через append (в кінець)
    let firstAidKit = document.createElement("li");
    let kitText = document.createTextNode("Аптечка");
    firstAidKit.append(kitText);
    firstAidKit.style.color = "blue";
    document.querySelector(".travel-list").append(firstAidKit);

    // 5. вставка через prepend (на початок)
    let map = document.createElement("li");
    map.textContent = "Компас";
    map.style.color = "purple";
    document.querySelector(".travel-list").prepend(map);

    // 6. вставка через after (одразу після елемента)
    let waterNote = document.createElement("p");
    waterNote.textContent = "Не забудьте воду!";
    waterNote.style.color = "#2980b9";
    mainPocket.after(waterNote);

    // 7. заміна елемента через replaceWith
    let heavyItem = document.getElementById("heavy-item");
    if (heavyItem) {
        let powerbank = document.createElement("span");
        powerbank.textContent = " Компактний павербанк. ";
        powerbank.style.backgroundColor = "yellow";
        heavyItem.replaceWith(powerbank);
    }

    // 8. видалення вузла через remove
    let lostItem = document.getElementById("lost-item");
    if (lostItem) {
        lostItem.remove(); 
    }

    alert("Рюкзак успішно спаковано! Подивіться на зміни у списку.");
}