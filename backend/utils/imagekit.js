// backend/utils/imagekit.js
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_tSAPB2gSzHbcZnjK7aZ055XZL",
  privateKey: "private_1yPj************************",
  urlEndpoint: "https://ik.imagekit.io/nugp7ubl1/",
});

module.exports = imagekit;
