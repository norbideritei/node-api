CREATE TABLE IF NOT EXISTS bookings 
(
  id INT NOT NULL AUTO_INCREMENT,
  lname text NOT NULL,
  fname TEXT NOT NULL,
  phone TEXT NOT NULL,
  peg TEXT NOT NULL,
  PRIMARY KEY (id)
) ENGINE = InnoDB;