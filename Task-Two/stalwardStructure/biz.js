(function () {
  document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("myTeam")) {
      var data = JSON.parse(localStorage.getItem("myTeam"));
      populateDataObj.populateData(data);
      addEvents();
    } else {
      apiObj
        .apiCall("GET", "../js/api.json")
        .then(function (response) {
          console.log(response);
          var data = JSON.parse(response).items;
          data = data.map(function (element) {
            element.isMember = false;

            return element;
          });
          localStorage.setItem("myTeam", JSON.stringify(data));
          populateDataObj.populateData(data);
          addEvents();
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  });

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
    populateDataObj.populateData(data);
    addEvents();
  }
})();
