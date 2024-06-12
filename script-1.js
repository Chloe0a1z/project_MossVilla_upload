//這是廣告
document.getElementById("adButton").addEventListener("click", function () {
  document.getElementById("myAd").classList.remove("hidden");
  document.getElementById("adButton").style.display = "none";
});

document.getElementById("myAdClose").addEventListener("click", function () {
  document.getElementById("myAd").classList.add("fadeOut");
  setTimeout(function () {
    document.getElementById("myAd").classList.add("hidden");
    document.getElementById("myAd").classList.remove("fadeOut");
    document.getElementById("adButton").style.display = "block";
  }, 500);
});

//login & register start
//偵測點擊後更換登入或註冊
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");

//偵測點擊後開啟卡片
const btnPopups = document.querySelectorAll(".btnLogin-popup");

//偵測點擊x關閉
const iconClose = document.querySelector(".icon-close");

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

// 為每個匹配的按鈕添加點擊事件監聽器
btnPopups.forEach((btnPopup) => {
  btnPopup.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
  });
});

//點XX移出
iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});
//點任何位置都會關閉，除了上一頁下一頁的按鈕(banner)，加在本頁會讓側邊失效
document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".wrapper") &&
    !event.target.closest(".btnLogin-popup") &&
    !event.target.closest("#next") && // 排除下一張按鈕
    !event.target.closest("#previous") // 排除上一張按鈕
  ) {
    wrapper.classList.remove("active-popup");
    document.getElementById("login").classList.remove("active-popup");
  }
});

//login & register end

// 首頁側拉選單
function toggleOffcanvas(button) {
  const container = button.querySelector(".container");
  container.classList.toggle("change");
  const myOffcanvas = document.getElementById("offcanvasNavbar");
  const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(myOffcanvas);

  // 切換 Offcanvas 的顯示狀態
  bsOffcanvas.toggle();
}

// 選取下拉選單中的所有選項
document.querySelectorAll(".lang").forEach((item) => {
  item.addEventListener("click", function () {
    // 當選項被點擊時，更新按鈕的文字
    document.getElementById("lang").textContent = this.textContent;
  });
});
document.querySelectorAll(".幣別").forEach((item) => {
  item.addEventListener("click", function () {
    // 當選項被點擊時，更新按鈕的文字
    document.getElementById("幣別").textContent = this.textContent;
  });
});

// 更新時間
function updateTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var timeString =
    hours +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  document.getElementById("navbarTime").innerHTML = timeString;
}

// 把時間初始化
updateTime();

// 然後在更新每秒的時間
setInterval(updateTime, 1000);

// 放大鏡，爆開以後修哈哈

// main-4滾動end
// let ul = document.querySelector(".active-img輪播");
// let lis = document.querySelectorAll(".active-img輪播 li");
// let btns = document.querySelectorAll(".btn-active");
// let spa = 2;

// ul.innerHTML += ul.innerHTML;
// lis = document.querySelectorAll(".active-img輪播 li");
// ul.style.width = lis[0].offsetWidth * lis.length + "px";

// //滾動函數
// function move() {
//   if (ul.offsetLeft < -ul.offsetWidth / 2) {
//     ul.style.left = "0";
//   }
//   if (ul.offsetLeft > 0) {
//     ul.style.left = -ul.offsetWidth / 2 + "px";
//   }
//   ul.style.left = ul.offsetLeft - spa + "px";
// }

// let timer = setInterval(move, 30);

// btns[0].addEventListener("click", function () {
//   spa = -2;
// });

// btns[1].addEventListener("click", function () {
//   spa = 2;
// });

// ul.addEventListener("mouseenter", function () {
//   clearInterval(timer);
// });

// ul.addEventListener("mouseleave", function () {
//   timer = setInterval(move, 30);
// });

// 這串是要讓滑鼠可以跟背景有落差滾動，但是失敗了以後修哈哈
function initSlider(container, items, leftBtn, rightBtn) {
  let ul = container.querySelector("ul");
  let lis = container.querySelectorAll("li");
  let spa = 2;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;

  ul.innerHTML += ul.innerHTML;
  lis = container.querySelectorAll("li");
  ul.style.width = lis[0].offsetWidth * lis.length + "px";

  function setSliderPosition() {
    ul.style.transform = `translateX(${currentTranslate}px)`;
  }

  function animation() {
    setSliderPosition();
    if (isDragging) {
      requestAnimationFrame(animation);
    }
  }

  function move() {
    if (currentTranslate > 0) {
      currentTranslate = -ul.offsetWidth / 2;
    } else if (currentTranslate < -ul.offsetWidth / 2) {
      currentTranslate = 0;
    }
    currentTranslate -= spa;
    setSliderPosition();
  }

  let timer = setInterval(move, 50);

  leftBtn.addEventListener("click", function () {
    spa = -2;
  });

  rightBtn.addEventListener("click", function () {
    spa = 2;
  });

  ul.addEventListener("mouseenter", function () {
    clearInterval(timer);
  });

  ul.addEventListener("mouseleave", function () {
    timer = setInterval(move, 50);
  });

  // 滑鼠事件處理
  ul.addEventListener("mousedown", function (e) {
    isDragging = true;
    startPos = getPositionX(e);
    animationID = requestAnimationFrame(animation);
    ul.classList.add("grabbing");
  });

  ul.addEventListener("mousemove", function (e) {
    if (isDragging) {
      const currentPosition = getPositionX(e);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  });

  ul.addEventListener("mouseup", function () {
    cancelAnimationFrame(animationID);
    isDragging = false;
    prevTranslate = currentTranslate;
    ul.classList.remove("grabbing");
  });

  ul.addEventListener("mouseleave", function () {
    cancelAnimationFrame(animationID);
    isDragging = false;
    prevTranslate = currentTranslate;
    ul.classList.remove("grabbing");
  });

  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }
}
//失敗了

//活動播放介面，讓他可以輪播
// 初始化第一個滾動區域
let container1 = document.querySelector(".container-活動輪播");
let items1 = document.querySelectorAll(".active-img輪播 li");
let leftBtn1 = document.querySelector(
  ".container-活動輪播 .btn-active:first-child"
);
let rightBtn1 = document.querySelector(
  ".container-活動輪播 .btn-active:last-child"
);
initSlider(container1, items1, leftBtn1, rightBtn1);

// 初始化第二個滾動區域
let container2 = document.querySelector(".container-活動輪播2");
let items2 = document.querySelectorAll(".active-img輪播2 li");
let leftBtn2 = document.querySelector(
  ".container-活動輪播2 .btn-active:first-child"
);
let rightBtn2 = document.querySelector(
  ".container-活動輪播2 .btn-active:last-child"
);
initSlider(container2, items2, leftBtn2, rightBtn2);
// main-4-滾動end

//main-5-start
// 寫錯了留下來紀念
// $(document).ready(function () {
//   var modal = $('#booking-modal');
//   var btn = $('#check-availability');
//   var span = $('.close');
//   var bookingDetails = $('#booking-details');

//   $('.datepicker').datepicker({
//     dateFormat: 'yy-mm-dd',
//     minDate: 0
//   });

//   btn.click(function () {
//     var arrivalDate = $('#arrival-date').val();
//     var departureDate = $('#departure-date').val();
//     var adults = $('#adults').val();
//     var children = $('#children').val();

//     var details = "入住日期: " + arrivalDate + "<br>" +
//       "退房日期: " + departureDate + "<br>" +
//       "成人人數: " + adults + "<br>" +
//       "兒童人數: " + children;

//     bookingDetails.html(details);
//     modal.css('display', 'block');
//   });

//   span.click(function () {
//     modal.css('display', 'none');
//   });

//   $(window).click(function (event) {
//     if (event.target == modal[0]) {
//       modal.css('display', 'none');
//     }
//   });
// });
//main-5-end

//main-5-start
//立即預約
$(document).ready(function () {
  var modal = $("#booking-modal");
  var btn = $("#check-availability");
  var span = $(".close");
  var bookingDetails = $("#booking-details");

  $(".datepicker").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
  });
  //點擊後的Madal增加上面的變數
  btn.click(function () {
    var arrivalDate = $("#arrival-date").val();
    var departureDate = $("#departure-date").val();
    var checkInTime = $("#check-in-time").val();
    var adults = $("#adults").val();
    var children = $("#children").val();

    var details =
      "入住日期: " +
      arrivalDate +
      "<br>" +
      "退房日期: " +
      departureDate +
      "<br>" +
      "入住時段: " +
      (checkInTime === "other" ? "其他時間聯絡我們" : checkInTime) +
      "<br>" +
      "成人人數: " +
      adults +
      "<br>" +
      "兒童人數: " +
      children;

    bookingDetails.html(details);
    modal.css("display", "block");
  });

  span.click(function () {
    modal.css("display", "none");
  });
  // 他給到modal的第一個序列時(關閉)
  $(window).click(function (event) {
    if (event.target == modal[0]) {
      modal.css("display", "none");
    }
  });
});

//快樂的圖片轉轉轉>謝謝gpt
//初始化輪播索引，設定list的變數，同時進行六個卡片的輪播(讓他們衝突)，用來存他們的索引
let slideIndex = [1, 1, 1, 1, 1, 1];
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);
showSlides(1, 4);
showSlides(1, 5);
showSlides(1, 6);

// Next/previous controls
//顯示n+1張圖
function plusSlides(n, no) {
  //no用來指定撥放的當前圖片,n為數字
  showSlides((slideIndex[no - 1] += n), no); //更新圖片索引
}

//currentSlide(n, no) 用來顯示第 no 個輪播中的第 n 張圖片。
//這個函數將 slideIndex[no - 1] 設置為 n，然後調用 showSlides 顯示相應的圖片
// Thumbnail image controls
function currentSlide(n, no) {
  showSlides((slideIndex[no - 1] = n), no);
}

//dot失效了，顯示出現的圖片+active，然後block，這列不見所有圖片都會報開
//滑走的i++和i-1都會消失
function showSlides(n, no) {
  let i;
  let slides = document.getElementsByClassName("mySlides" + no);
  let dots = document.getElementsByClassName("dot" + no);
  if (n > slides.length) {
    slideIndex[no - 1] = 1;
  }
  if (n < 1) {
    slideIndex[no - 1] = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex[no - 1] - 1].style.display = "block";
  dots[slideIndex[no - 1] - 1].className += " active";
}

//機器人
function toggleChatbot() {
  let chatbotContainer = document.querySelector(".chatbot-container");
  let chatbot = document.querySelector(".chatbot");

  if (chatbotContainer.style.display === "block") {
    chatbotContainer.style.display = "none";
    chatbot.style.backgroundColor = "#ffffff";
  } else {
    chatbotContainer.style.display = "block";

    document.getElementById("chatbotInput").focus();
  }
}

function sendMessage() {
  var input = document.getElementById("chatbotInput");
  var message = input.value;
  if (message.trim() !== "") {
    displayMessage("user", message);
    input.value = "";

    // AI自動回覆時間
    var reply = getReply(message);
    setTimeout(function () {
      displayMessage("bot", reply);
    }, 500);
  }
}

// 設置回覆時css樣式
function displayMessage(sender, message) {
  var chatbotMessages = document.getElementById("chatbotMessages");
  var messageElement = document.createElement("div");
  messageElement.className = "message " + sender + "-message";
  messageElement.innerHTML = message;
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getReply(message) {
  // 增加喜歡的句子
  if (message.toLowerCase().includes("你好")) {
    return "您好！歡迎光臨moss villa。請問您想預訂哪個房型呢？";
  } else if (message.toLowerCase().includes("房")) {
    return "好的,我們提供多個熱門房間,包括商業套房、情侶套房、家庭套房等。請問您計劃什麼時間入住呢？";
  } else if (message.toLowerCase().includes("月", "日", "號")) {
    return "了解,請問您預計入住幾晚呢？我們可以為您推薦符合條件的優質酒店。";
  } else if (message.toLowerCase().includes("晚")) {
    return (
      "好的,根據您提供的城市、入住時間和晚數,我們為您推薦了以下幾間房間:\n" +
      "1. 春.萬物居 - 現代化設計，適合享受自然的您。\n" +
      "2. 夏.綠地 - 清新簡約的空間，面眺山林。\n" +
      "3. 秋.吉時吉第 - 日式侘寂空間，自由與孤獨的夢\n" +
      "請問您對哪個房間感興趣呢?我可以為您提供更多詳情。"
    );
  } else if (message.toLowerCase().includes("服務")) {
    return "提供免費WiFi,健身中心和室外游泳池。鄰近多個購物中心和餐廳。我們目前提供特惠價,每晚僅需 NT$5,000 起。如果您想預訂或了解更多,請告訴我,我很樂意為您服務!";
  } else {
    return "我也不知道!";
  }
  return "感謝您的詢問!如果您還有任何關於訂房的問題,歡迎隨時與我聯繫。祝您旅途愉快!";
}
//機器人結束

//餐廳卡牌組
// 打開模態框
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "block";
}

// 關閉模態框
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

// 點擊模態框外部區域關閉模態框
window.onclick = function (event) {
  var modals = document.getElementsByClassName("modal");
  for (var i = 0; i < modals.length; i++) {
    if (event.target == modals[i]) {
      modals[i].style.display = "none";
    }
  }
};

//--------------------------------------------------------room page--失敗範例
//選擇器
// const allFilterItems = document.querySelectorAll('.filter-item');
// const allFilterBtns = document.querySelectorAll('.filter-btn');

// allFilterBtns.forEach((x) => {
//   x.addEventListener('click', () => {
//     showFilteredContent(x);
//   });
// });

// function showFilteredContent(x) {
//   allFilterItems.forEach((item) => {
//     if (item.classList.contains(x.id)) {
//       item.style.display = 'block';
//     } else {
//       item.style.display = 'none';
//     }
//   });
// }
//查看w3scool好好用
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filter-item");
  if (c == "all") c = "";

  // 移除所有卡片的 "show" 類別
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }

  // 設置激活的按鈕樣式
  var btns = document.getElementsByClassName("filter-btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
  }
  document.getElementById(c || "all").classList.add("active");
}

// 顯示過濾後的元素
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// 隱藏未被選擇的元素
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
//-----------------------room-main-2gallery------------------------------
//這組也失效了qq，目標是點擊gallery可以變大，為啥????
document.addEventListener("DOMContentLoaded", function () {
  var gallery = document.getElementById("gallery");
  var modal = new bootstrap.Modal(document.getElementById("myModal"));

  gallery.addEventListener("click", function (event) {
    var target = event.target;
    if (target.tagName === "IMG") {
      var src = target.getAttribute("src");
      document.querySelector(".modal-body").innerHTML =
        "<img src='" + src + "' class='modal-img'>";
      modal.show();
    } else if (target.tagName === "VIDEO") {
      var src = target.querySelector("source").getAttribute("src");
      document.querySelector(".modal-body").innerHTML =
        "<video class='model-vid' controls><source src='" +
        src +
        "' type='video/mp4'></source></video>";
      modal.show();
    }
  });
});

//-----------------------room-main-2 test------------------------------
//-----搜索功能(nav2、側邊)開始--------
//注意輸入01、02、03會讓畫面當機-----這邊也有問題why，輸入123、含有class名稱、img名稱會爆開
let currentIndex = 0;
let matches = [];

function searchAndHighlight(event) {
  event.preventDefault();
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return false;

  // Reset matches and currentIndex
  matches = [];
  currentIndex = 0;

  // Remove previous highlights
  document.querySelectorAll(".highlight").forEach((el) => {
    el.outerHTML = el.innerHTML; // Remove the highlight tags but keep the content
  });

  // Find and highlight matches
  const bodyText = document.body.innerHTML;
  const regex = new RegExp(`(${query})`, "gi");
  const newText = bodyText.replace(regex, '<span class="highlight">$1</span>');
  document.body.innerHTML = newText;

  // Collect all matches
  matches = Array.from(document.querySelectorAll(".highlight"));

  // Scroll to the first match
  if (matches.length > 0) {
    matches[currentIndex].style.backgroundColor = "yellow";
    matches[currentIndex].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  // Listen for next key press to jump to next match
  document.addEventListener("keydown", handleKeyPress);

  return false;
}

function handleKeyPress(event) {
  if (event.key === "Enter" && matches.length > 0) {
    // Remove highlight from current match
    matches[currentIndex].style.backgroundColor = "";

    // Increment index and loop back if necessary
    currentIndex = (currentIndex + 1) % matches.length;

    // Highlight and scroll to the new match
    matches[currentIndex].style.backgroundColor = "yellow";
    matches[currentIndex].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}
//-----搜索功能(nav2、側邊)結束，參考js-搜索--------
