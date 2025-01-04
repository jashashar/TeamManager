(function () {
  var card = document.getElementById("card");
  var data = JSON.parse(localStorage.getItem("myTeam"));
  var removeBtn;

  function displayData() {
    card.innerHTML = "";

    if (data.length === 0) {
      card.innerHTML = "No Team Member Found";
    } else {
      // Displaying the Data
      data.forEach(function (currElem) {
        let { name, id, avatar } = currElem;
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
            <button data-btn=${id}>Remove From Team</button>
          </div>
       </div>
      `;
      });
    }
  }

  displayData();

  // Removing the data from localStorage
  function removeData() {
    removeBtn = document.querySelectorAll("[data-btn]");
    removeBtn.forEach(function (currElem) {
      currElem.addEventListener("click", function () {
        var id = currElem.dataset.btn;

        var currentCard = data.filter(function (currElem) {
          return currElem.id === id;
        });

        var index = data.indexOf(currentCard[0]);
        data.splice(index, 1);

        localStorage.setItem("myTeam", JSON.stringify(data));

        displayData();
        removeData();

        //
      });
    });
  }

  removeData();
})();
