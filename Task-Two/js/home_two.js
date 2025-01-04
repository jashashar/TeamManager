(function () {
  document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("myTeam")) {
      var data = JSON.parse(localStorage.getItem("myTeam"));
      populateData(data);
      addEvents();
    } else {
      apiCall("GET", "../js/api.json")
        .then(function (response) {
          var data = JSON.parse(response).items;
          data = data.map(function (element) {
            element.isMember = false;

            return element;
          });
          localStorage.setItem("myTeam", JSON.stringify(data));
          populateData(data);
          addEvents();
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  });

  function apiCall(method, url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.send();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          switch (xhr.status) {
            case 200:
              resolve(this.responseText);
              break;
            case 403:
              throw Error(forbidden);
              break;
            case 404:
              throw Error(notFound);
              break;
            default:
              reject("No Data Found");
          }
        }
      };
    });
  }

  // populate Data
  function populateData(data) {
    var htmlStr = "";

    if (data.length > 0) {
      data.forEach(function (element) {
        htmlStr += htmlTemplate(element);
        document.getElementById("card").innerHTML = htmlStr;
      });
    } else {
      document.getElementById("card").innerHTML = "Data Not Found";
    }
  }

  // Html Template
  function htmlTemplate(obj) {
    var isMemberStyle = obj.isMember ? "removeBtnActivated" : "";

    return `
      <div class="cardBody">
        <div class="cardImage">
          <img src="${obj.avatar}" alt="Dummy">
        </div>
        <div class="content">
          <h2>${obj.name}</h2>
          <p>Emp. Id : ${obj.id}</p>
        </div>
        <div class="button">
          <button class="${isMemberStyle}" data-btn="${obj.id}" >${
      obj.isMember ? "Remove from Team" : "Add To Team"
    }</button>
        </div>
      </div>
      `;
  }

  function addEvents() {
    document.querySelectorAll("[data-btn]").forEach(function (element) {
      element.addEventListener("click", buttonClicked);
    });
  }

  function buttonClicked(event) {
    var data = JSON.parse(localStorage.getItem("myTeam"));
    for (var i = 0; i <= data.length - 1; i++) {
      if (data[i].id == event.currentTarget.dataset.btn) {
        data[i].isMember = !data[i].isMember;
        break;
      }
    }

    localStorage.setItem("myTeam", JSON.stringify(data));
    populateData(data);
    addEvents();
  }
})();
