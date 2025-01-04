(function () {
  var card = document.getElementById("card");
  var info = [];

  window.onload = loadXhr();

  // Ajax Call
  function loadXhr() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        var data = json.items;
        info = data;

        allData();
        btnClicked();
      }
    };

    xhr.open("GET", "../js/api.json");
    xhr.send();
  }

  function allData() {
    // Rendering Cards
    info.forEach((currElem) => {
      var { name, id, avatar } = currElem;

      card.innerHTML += `
      <div class="cardBody">
        <div class="cardImage">
          <img src="${avatar}" alt="Dummy">
        </div>
        <div class="content">
          <h2>${name}</h2>
          <p>Emp. Id : ${id}</p>
        </div>
        <div class="button">
          <button data-btn="${id}" >Add To Team</button>
        </div>    
      </div>
      `;
    });
  }

  // if Any Button CLicked
  function btnClicked() {
    var btn = document.querySelectorAll("[data-btn]");
    var currentCard;

    btn.forEach((currElem) => {
      // filtering value when come again on page
      if (localStorage.getItem("myTeam")) {
        var existedMyTeam = JSON.parse(localStorage.getItem("myTeam"));

        existedMyTeam.forEach(function (elem) {
          // console.log(elem);
          (elem.id === currElem.dataset.btn) == true
            ? ((currElem.innerHTML = "Remove From Team"),
              currElem.classList.toggle("removeBtnActivated"))
            : "";
          // if ((elem.id == currElem.dataset.btn) == true) {
          //   currElem.innerHTML = "Remove From Team";
          //   currElem.classList.toggle("removeBtnActivated");
          // }
        });
      }

      currElem.addEventListener("click", function () {
        var currId = currElem.dataset.btn;
        var getData;

        currElem.classList.toggle("removeBtnActivated");

        // Getting current Data
        currentCard = info.filter(function (e) {
          return e.id == currId;
        });

        if (currElem.classList.value) {
          currElem.innerHTML = "Remove From Team";
          // Storing Value on LocalStorage
          if (!localStorage.getItem("myTeam")) {
            localStorage.setItem("myTeam", JSON.stringify(currentCard));
          } else {
            getData = JSON.parse(localStorage.getItem("myTeam"));
            getData.push(currentCard[0]);
            localStorage.setItem("myTeam", JSON.stringify(getData));
          }
        } else {
          currElem.innerHTML = "Add To Team";
          getData = JSON.parse(localStorage.getItem("myTeam"));

          // filtering getData to get the Real Current Element
          getData.forEach(function (currElem) {
            if (currElem.id == currentCard[0].id) {
              var index = getData.indexOf(currElem);
              getData.splice(index, 1);
            }
          });

          localStorage.setItem("myTeam", JSON.stringify(getData));
        }
      });
    });
  }
})();
