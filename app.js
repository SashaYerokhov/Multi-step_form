const form = document.querySelector("#form");
// номера слева
const numberCards = document.querySelectorAll(".card__left-number p");
// карточки которые меняются
const cardBlocks = document.querySelectorAll(".card__block");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const telInput = document.querySelector("#tel");
const btnsNext = document.querySelectorAll(".btn-next");
const btnsBack = document.querySelectorAll(".btn-prev");
const inputFields = document.querySelectorAll(".input__fields");

// const formInputs = document.querySelectorAll('form input')

// регулярное выражение для имени,
const namePattern = /^[a-zA-Z]{3,30}$/;
// регулярное выражение для электоной почты
const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// регулярное выражение для телефона -  цифр не меньше 10, но не больше 13
const telPattern = /^\+1\d{10,13}/;

// Индекс для отслеживания текущего шага карты (начиная с 0 для шага 1)
let cardBlockIndex = 0;
// Переменная для отображения количества шагов формы
let formStepIndex = 0;

// Функция для обновление кругов слева, чтобы при переключение страницы изменялся цвет круга
function updateNumber() {
  numberCards.forEach((numberCard, index) => {
    // если индекс номер меньше или равен индексу карты добавляется класс и номер окрашивается в цвет
    if (index === cardBlockIndex) {
      // console.log(index, cardBlockIndex); // 0 0
      numberCard.parentElement.parentElement.classList.add("info-active");
    } else {
      numberCard.parentElement.parentElement.classList.remove("info-active");
    }
  });
}
cardBlocks[cardBlockIndex].classList.add("card__block-active");
btnsNext.forEach((btnNext) => {
  btnNext.addEventListener("click", () => {
    if (formStepIndex === 0) {
      if (validateForm) {
        cardBlocks[cardBlockIndex].classList.remove("card__block-active");
        cardBlockIndex++;
        updateNumber();
      }
      cardBlocks[cardBlockIndex].classList.add("card__block-active");
    }
    if (formStepIndex === 1) {
      if (selectCard()) {
        cardBlocks[cardBlockIndex].classList.remove("card__block-active");
        cardBlockIndex++;
        updateNumber();
      }
      cardBlocks[cardBlockIndex].classList.add("card__block-active");
    }
    if (formStepIndex === 2) {
      if (cardChecked())
        cardBlocks[cardBlockIndex].classList.remove("card__block-active");
      cardBlockIndex++;
      updateNumber();
    }
    cardBlocks[cardBlockIndex].classList.add("card__block-active");
    if (formStepIndex === 3) {
    }
  });
});

// Показать текущий шаг формы
// function showCard(card) {
//   cardBlocks.forEach((cardBlock, index) => {
//     cardBlock.classList.remove("card__block-active");
//     if (index === card) {
//       cardBlock.classList.add("card__block-active");
//     }
//   });
// }

// Переход к следующему шагу
// btnsNext.forEach((btn, index) => {
//   btn.addEventListener("click", () => {
//     if (validateForm(index)) {
//       cardBlockIndex++;
//       showCard(cardBlockIndex);
//     } else if (selectCard(index)) {
//       cardBlockIndex++;
//       showCard(cardBlockIndex);
//     }
//   });
// });

// Переход к предыдущему шагу
btnsBack.forEach((btn) => {
  btn.addEventListener("click", () => {
    cardBlockIndex--;
    showCard(cardBlockIndex);
  });
});

// Проверьте поля формы перед переходом к следующему шагу
function validateForm(card) {
  const inputs = cardBlocks[card].querySelectorAll("input");

  let valid = true;

  inputs.forEach((input) => {
    // Обращаемся к ошибке через инпут то есть к его родительскому элементу

    if (!input.value) {
      input.parentElement.classList.add("error-block");
      input.style.border = "2px solid hsl(354, 84%, 57%)";
      valid = false;
    } else {
      valid = true;
      input.style.border = "";
      input.parentElement.classList.remove("error-block");

      // valid = true;
    }
  });
  return valid;
}

// Обработка отправки формы
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Step 2 - Toggle
const toggleBox = document.querySelector("#toggle");
const choiceMonthly = document.querySelectorAll(".card__plan-month");
const choiceYearly = document.querySelectorAll(".card__plan-year");
const freeTexts = document.querySelectorAll(".card__plan-free");

const planSelections = document.querySelectorAll(".card__plan-selection");

// переменные для блока месяца и блока год в 3 шаге формы
const cardAddMonthly = document.querySelector(".card__add-monthly");
const cardAddYearly = document.querySelector(".card__add-yearly");

const selectedPlanName = document.getElementById("selected-plan-name");
const selectedPlanPrice = document.getElementById("selected-plan-price");

// тоггл для обновленция цены
function selectCard() {
  toggleBox.addEventListener("change", () => {
    choiceMonthly.forEach((monthly) => {
      if (toggleBox.checked) {
        monthly.style.display = "none";
        cardAddMonthly.style.display = "none";
      } else {
        monthly.style.display = "block";
        cardAddYearly.style.display = "flex";
      }
    });
    choiceYearly.forEach((yearly) => {
      if (toggleBox.checked) {
        yearly.style.display = "block";
        cardAddYearly.style.display = "flex";
      } else {
        yearly.style.display = "none";
        cardAddMonthly.style.display = "none";
      }
    });
    freeTexts.forEach((text) => {
      if (toggleBox.checked) {
        text.style.display = "block";
      } else {
        text.style.display = "none";
      }
    });
  });

  // переключение карточек
  planSelections.forEach((planSelection, index) => {
    planSelection.addEventListener("click", () => {
      planSelections.forEach((planS) => planS.classList.remove("active"));
      planSelection.classList.add("active");
      updateSelectedPlan();
    });
  });

  function updateSelectedPlan() {
    const activePlan = document.querySelector(".card__plan-selection.active");
    if (!activePlan) return;

    const planName = activePlan.querySelector(".card__plan-name").textContent;
    // const isYearly = toggleBox.checked;
    // const price = isYearly;
    if (toggleBox.checked) {
      price = activePlan.querySelector(".card__plan-year").textContent;
    } else {
      price = activePlan.querySelector(".card__plan-month").textContent;
    }
    // selectedPlanName.textContent = planName;
    // selectedPlanPrice.textContent = price;
  }
}
selectCard();
// нужно сделать при открытии 3-го шага если тогл месяц - открытие месяц, если год - открытие годы

// Step 3 Checkbox
const checkBox = document.querySelectorAll("input");

const cardAddTitles = document.querySelectorAll(".card__add-title");
const cardAddPrices = document.querySelectorAll(".card__add-price");

const cardAdd = document.querySelector(".card__add");
// const selectedPlanName = document.getElementById("selected-plan-name");
// const selectedPlanPrice = document.getElementById("selected-plan-price");

/*
cardAdd.addEventListener("click", (event) => {
  // помилка - у меня уже есть такая перменная и нужно было задать новое имя переменной
  const cartAdd = event.target.closest(".card__add-block");
  // И соответственно - здесь тоже ошибка
  if (!cardAdd) return;

  if (event.target.nodeName === "INPUT") {
    // помилка - здесь класс актив добавляется родителю, а не каждому блоку
    cardAdd.classList.add("active");
    // помилка - здесь было без слова let
    price = cardAdd.querySelector(".card__add-price").textContent;
    // помилка - здесь было без слова let
    title = cardAdd.querySelector(".card__add-title").textContent;
  }
  
    selectedPlanName.textContent = title;
    selectedPlanPrice.textContent = price;
});
*/
// исправленный вариант - по подсказкам DeepSek
/* после исправления ошибок - все работает, только данные по 
    заголовку и ценам - меняются, а не добавляются как нужно, а
    значит нужно использовать пустой массив отдельно для заголовка,
    отдельно для цены и при помощи метода push добавлять туда данные
*/

function cardChecked() {
  cardAdd.addEventListener("click", (event) => {
    // переменная для блоков с переключателем, заголовком и ценой
    const cardAddBlock = event.target.closest(".card__add-block");
    if (!cardAddBlock) return;
    // переменная для переключателя
    const checkbox = cardAddBlock.querySelector('input[type="checkbox"]');

    //   если включили чекбокс и чекбокс с классом совпадают
    if (event.target === checkbox || event.target.closest(".card__add-check")) {
      // Переключаем состояние активности - добавляем/удаляем класс активности
      cardAddBlock.classList.toggle("active", checkbox.checked);

      // Собираем все активные карточки
      const activeCards = document.querySelectorAll(".card__add-block.active");

      // Формируем список выбранных планов и их цен
      const selectedTitles = [];
      const selectedPrices = [];

      // проходим по каждой активной карточке и добавляем в пустой массив название и цену
      activeCards.forEach((card) => {
        selectedTitles.push(card.querySelector(".card__add-title").textContent);
        selectedPrices.push(card.querySelector(".card__add-price").textContent);
      });

      // Обновляем отображение
      selectedPlanName.textContent = selectedTitles.join(", ") || "None";
      selectedPlanPrice.textContent = selectedPrices.join(", ") || "$0";
    }
  });
}
cardChecked();

/**
 * Шаг формы - 2
 * Сделать переход со втрого шага на третий
 * При переключении тогла на месяц - 3 шаг откроется месяц, год - должен открыться год
 */

/**
 * кнопка вперед только на первой странице,
 * на второй появляется кнопка - назад
 * Переключение между другими формами использвать
 * как переключение между слайдерами
 * 2 выбор - сделать как переключение планов в кофе
 *  и тоггл как переключение планов как в фотоснапе
 *
 *  * Регулярное выражение для телефоного номера
 * валидация формы
 * действия при ошибке
 * действия при положительном исходе
 * если положительный исход - кнопка дальше
 * если положительный исход - переключение кнопки слева
 * на 2 и так далее
 * попробовать все переключения
 */
