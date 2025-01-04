const populateDataObj = {};
(function () {
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

  populateDataObj.populateData = populateData;
  Object.freeze(populateDataObj);
})();
