function zoom(e) {
  var zoomer = e.currentTarget;
  e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
  e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageX);
  x = (offsetX / zoomer.offsetWidth) * 100;
  y = (offsetY / zoomer.offsetHeight) * 100;
  zoomer.style.backgroundPosition = x + "% " + y + "%";
}

/*carusel*/
var slide_index = 1;
displaySlides(slide_index);

function nextSlide(n) {
  displaySlides((slide_index += n));
}

function currentSlide(n) {
  displaySlides((slide_index = n));
}

function displaySlides(n) {
  var i;
  var slides = document.getElementsByClassName("showSlide");
  if (n > slides.length) {
    slide_index = 1;
  }
  if (n < 1) {
    slide_index = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slide_index - 1].style.display = "block";
}

////////////////
document.getElementById("feedback-form").addEventListener(
  "submit",
  function (evt) {
    var http = new XMLHttpRequest(),
      f = this;
    evt.preventDefault();
    http.open("POST", "contacts.php", true);
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
        if (http.responseText.indexOf(f.nameFF.value) == 0) {
          // очистить поле сообщения, если в ответе первым словом будет имя отправителя
          f.messageFF.removeAttribute("value");
          f.messageFF.value = "";
        }
      }
    };
    http.onerror = function () {
      alert("Извините, данные не были переданы");
    };
    http.send(new FormData(f));
  },
  false,
);
