// === лабораторна робота 7 (події) ===

// 1.1 обробник події через атрибут html
// шпаргалка: функція викликається, бо в html прямо в тезі кнопки написано onclick="attributehandler()"
function attributeHandler() {
    alert("Намет успішно встановлено!");
}

// 1.2 обробник події через властивість dom
// шпаргалка: ми знаходимо кнопку за id і вписуємо функцію в її властивість onclick
let propBtn = document.getElementById("prop-btn");
propBtn.onclick = function() {
    alert("Вогнище розпалено!");
};

// 1.3 декілька обробників на одну подію
// шпаргалка: метод addeventlistener дозволяє додати багато дій на один клік
let multiBtn = document.getElementById("multi-btn");
multiBtn.addEventListener("click", () => {
    alert("Ви дістали бінокль.");
});
multiBtn.addEventListener("click", () => {
    alert("Там ведмідь!");
});

// 1.4 використання об'єкта як обробника події
// шпаргалка: об'єкт compassObject має метод handleevent. ми зробили так, щоб він показував напрямок.
let compassBtn = document.getElementById("obj-btn");
let switchCompassBtn = document.getElementById("remove-obj-btn");

let compassObject = {
    handleEvent(event) {
        alert(`🧭 Північ там! ➡️\n(Системно: спрацювало на тезі ${event.currentTarget.tagName})`);
    }
};

// одразу вмикаємо компас при завантаженні сторінки
compassBtn.addEventListener("click", compassObject);
let isCompassOn = true; // змінна, яка запам'ятовує стан компаса

// 1.5 видалення (та повернення) обробника події
// шпаргалка: якщо компас увімкнений - ми його видаляємо через removeeventlistener. якщо вимкнений - додаємо знову.
switchCompassBtn.addEventListener("click", () => {
    if (isCompassOn) {
        // якщо був увімкнений, то вимикаємо
        compassBtn.removeEventListener("click", compassObject);
        switchCompassBtn.textContent = "Увімкнути компас";
        switchCompassBtn.style.backgroundColor = "#2ecc71"; // робимо кнопку зеленою для привернення уваги
        isCompassOn = false;
        alert("Компас вимкнено! Тепер він не реагуватиме на кліки.");
    } else {
        // якщо був вимкнений, то вмикаємо назад
        compassBtn.addEventListener("click", compassObject);
        switchCompassBtn.textContent = "Вимкнути компас";
        switchCompassBtn.style.backgroundColor = ""; // повертаємо стандартний колір
        isCompassOn = true;
        alert("Компас знову увімкнено і готовий до роботи!");
    }
});

// 2.1 делегування подій для списку
// шпаргалка: ми вішаємо один слухач на весь список ul. event.target дозволяє знайти конкретне місто, на яке клікнули
let placesList = document.getElementById("places-list");
placesList.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("highlight-place");
    }
});


// 2.2 створення меню за допомогою атрибутів data-*
// шпаргалка: делегуємо клік на весь div з меню. потім беремо значення з data-action і запускаємо відповідну функцію
let travelMenu = document.getElementById("travel-menu");
let menuActions = {
    save: function() { alert("Маршрут збережено."); },
    load: function() { alert("Маршрут завантажено."); },
    clear: function() { alert("Карту очищено."); }
};

travelMenu.addEventListener("click", function(event) {
    let action = event.target.dataset.action;
    if (action) {
        menuActions[action]();
    }
});


// 2.3 патерн проєктування "поведінка" (behavior)
// шпаргалка: глобальний обробник на всьому документі перевіряє кліки. якщо клікнули по елементу з атрибутом data-counter, лічильник збільшується
document.addEventListener("click", function(event) {
    if (event.target.dataset.counter !== undefined) {
        let span = event.target.querySelector("span");
        span.textContent++; 
    }
});

// ==========================================
// === лабораторна робота 8 (події миші) ===
// ==========================================

// --- завдання 1: mouseover та mouseout ---

let hoverZone = document.getElementById("hover-zone");

// шпаргалка: mouseover спрацьовує, коли курсор ЗАХОДИТЬ на елемент
hoverZone.addEventListener("mouseover", function(event) {
    // перевіряємо, чи мишка наведена саме на річ (клас hover-item)
    if (event.target.classList.contains("hover-item")) {
        // event.target - це елемент, НА який щойно зайшла мишка
        // event.relatedtarget - це елемент, З якого мишка прийшла (викладачі часто про це питають)
        
        // додаємо клас, який змінює стиль (робить зеленим і збільшує)
        event.target.classList.add("hover-active");
    }
});

// шпаргалка: mouseout спрацьовує, коли курсор ЙДЕ з елемента
hoverZone.addEventListener("mouseout", function(event) {
    if (event.target.classList.contains("hover-item")) {
        // прибираємо клас, щоб елемент повернувся до звичайного стану
        event.target.classList.remove("hover-active");
    }
});


// --- завдання 2: drag-and-drop (перетягування) ---

let dragItem = document.getElementById("drag-item");

// шпаргалка: mousedown спрацьовує, коли ми затискаємо кнопку миші
dragItem.addEventListener("mousedown", function(event) {
    dragItem.style.cursor = "grabbing";

    // обчислюємо зсув (де саме всередині компаса ми клацнули)
    let shiftX = event.clientX - dragItem.getBoundingClientRect().left;
    let shiftY = event.clientY - dragItem.getBoundingClientRect().top;

    // знаходимо батьківський блок (сіру зону), щоб компас не відлітав за екран
    let container = dragItem.parentElement;

    function moveAt(clientX, clientY) {
        // отримуємо координати сірої зони відносно екрана
        let containerRect = container.getBoundingClientRect();

        // вираховуємо нову позицію компаса ВІДНОСНО його коробки
        let newLeft = clientX - containerRect.left - shiftX;
        let newTop = clientY - containerRect.top - shiftY;

        // рухаємо елемент
        dragItem.style.left = newLeft + 'px';
        dragItem.style.top = newTop + 'px';
    }

    // шпаргалка: mousemove рухає елемент за мишкою
    function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);
    }

    document.addEventListener("mousemove", onMouseMove);

    // шпаргалка: mouseup відпускає елемент
    document.addEventListener("mouseup", function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        dragItem.style.cursor = "grab";
    });
});

dragItem.ondragstart = function() {
    return false;
};