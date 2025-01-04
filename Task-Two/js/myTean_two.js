(function () {
  document.addEventListener("DOMContentLoaded", function () {
    filter();
    removeEvent();
  });

  function filter() {
    var htmlStr = "";
    var data = JSON.parse(localStorage.getItem("myTeam"));

    data.filter(function (element) {
      if (element.isMember) {
        htmlStr += htmlTemplate(element);
        document.getElementById("card").innerHTML = htmlStr;
      }
      if (htmlStr == "") {
        document.getElementById("card").innerHTML =
          "<h2 class='noTeamFound'>No Team Members Found.</h2>";
      }
    });
  }

  function htmlTemplate(obj) {
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
      <button data-btn=${obj.id}>Remove From Team</button>
    </div>
 </div>
    `;
  }

  function removeEvent() {
    document.querySelectorAll("[data-btn]").forEach(function (element) {
      element.addEventListener("click", buttonClicked);
    });
  }

  function buttonClicked(event) {
    var data = JSON.parse(localStorage.getItem("myTeam"));
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === event.currentTarget.dataset.btn) {
        data[i].isMember = false;
        break;
      }
    }

    localStorage.setItem("myTeam", JSON.stringify(data));
    filter();
    removeEvent();
  }
})();
