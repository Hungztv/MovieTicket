const express = require('express');
const router = express.Router();

router.get("/booking", function (req, res) {
  res.json({
    message: 'register route accessed successfully'
  });
});



module.exports = router;