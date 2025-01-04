const apiObj = {};
(function () {
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
              reject(403);
              break;
            case 404:
              reject(404);
              break;
            default:
              reject("No Data Found");
          }
        }
      };
    });
  }

  apiObj.apiCall = apiCall;
  Object.freeze(apiObj);
})();
