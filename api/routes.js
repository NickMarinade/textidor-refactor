// require the handlers
const handlers = require("./handlers.js");
const express = require('express');

// build the router
const router = express.Router();;

router.get('/', (req, res) => {
  res.send('files API!');
});

// add routes to router
router.get('/files', handlers.getFiles);
router.get('/files/:name', handlers.getFile);
router.post("/files/:name", handlers.postFile);
router.delete("/files/:name", handlers.deleteFile);
// export the router
module.exports = router;;
