const imagesSection = document.querySelector(".new-images");

let functionRun = 0;
const delay = 400;

let after = "";

window.onscroll = function (e) {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    if (functionRun >= Date.now() - delay) {
      return;
    }
    functionRun = Date.now();
    const newElement = document.createElement("DIV");
    console.log(after);

    axios
      .get("https://www.reddit.com/r/unixporn.json", {
        params: {
          limit: 1,
          after: after,
        },
      })
      .then(function (response) {
        if (
          !response.data.data.children[response.data.data.children.length - 1]
            .data.preview
        ) {
          after = response.data.data.after;
          return;
        }

        const title =
          response.data.data.children[response.data.data.children.length - 1]
            .data.title;
        const preview = response.data.data.children[
          response.data.data.children.length - 1
        ].data.preview.images[0].resolutions[
          response.data.data.children[response.data.data.children.length - 1]
            .data.preview.images[0].resolutions.length - 1
        ].url.replace(/&amp;/g, "&");
        const permalink =
          response.data.data.children[response.data.data.children.length - 1]
            .data.permalink;
        console.log(preview);

        newElement.innerHTML = `<div class="col-lg-12">\
        <div class="card">\
          <img\
            src="${preview}"\
            class="card-img-top"\
            alt="..."\
          />\
          <div class="card-body">\
            <a target="_blank" rel="noopener" href="https://reddit.com${permalink}" class="card-text">${title}</a>\
          </div>\
        </div>\
      </div>`;

        imagesSection.appendChild(newElement);
        after = response.data.data.after;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

/*
window.onscroll = function (e) {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    if (functionRun >= Date.now() - delay) {
      return;
    }
    functionRun = Date.now();
    const newElement = document.createElement("DIV");
    console.log(after);

    axios
      .get("https://www.reddit.com/r/unixporn.json", {
        params: {
          limit: 1,
          after: after,
        },
      })
      .then(function (response) {
        if (
          response.data.data.children[response.data.data.children.length - 1]
            .data.link_flair_text !== "Screenshot"
        ) {
          window.onscroll;
          after = response.data.data.after;
          return;
        }

        const title =
          response.data.data.children[response.data.data.children.length - 1]
            .data.title;
        const preview = response.data.data.children[
          response.data.data.children.length - 1
        ].data.preview.images[0].resolutions[
          response.data.data.children[response.data.data.children.length - 1]
            .data.preview.images[0].resolutions.length - 1
        ].url.replace(/&amp;/g, "&");
        console.log(preview);

        newElement.innerHTML = `<div class="col-lg-12">\
        <div class="card">\
          <img\
            src="${preview}"\
            class="card-img-top"\
            alt="..."\
          />\
          <div class="card-body">\
            <p class="card-text">${title}</p>\
          </div>\
        </div>\
      </div>`;

        imagesSection.appendChild(newElement);
        after = response.data.data.after;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

*/
