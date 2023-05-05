var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/bookings.json";

/**
 *
 */
router.get("/", function (req, res, next) {
  console.log("reading file %o", DATA_PATH);
  const bookings = getBookings();
  res.json(bookings);
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const lname = req.body.lname;
  const fname = req.body.fname;
  const phone = req.body.phone;
  const peg = req.body.peg;

  const bookings = getBookings();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  bookings.push({
    id,
    lname,
    fname,
    phone,
    peg
  });

  setBookings(bookings);

  res.json({ success: true, id });
  res.status(201);
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  const bookings = getBookings().filter(booking => booking.id != id);

  setBookings(bookings);

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const lname = req.body.lname;
  const fname = req.body.fname;
  const phone = req.body.phone;
  const peg = req.body.peg;

  const bookings = getBookings();

  const booking = bookings.find(booking => booking.id == id);
  if (booking) {
    booking.lname = lname;
    booking.fname = fname;
    booking.phone = phone;
    booking.peg = peg;
  }

  setBookings(bookings);

  res.json({ success: true });
});

function getBookings() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setBookings(bookings) {
  const content = JSON.stringify(bookings, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
