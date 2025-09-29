const Users = require('../users/users-model');

function logger(req, res, next) {
  const tarih = new Date().toLocaleString();
  console.log(`${req.method} ${req.originalUrl} ${tarih}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id);
  if (!user) return res.status(404).json({ message: 'not found' });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  const isim = req.body && req.body.name;
  if (typeof isim !== 'string' || isim.trim() === '') {
    return res.status(400).json({ message: 'gerekli name alanı eksik' });
  }
  req.body.name = isim.trim();
  next();
}

function validatePost(req, res, next) {
  const text = req.body && req.body.text; // posts için text alanı
  if (typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ message: 'gerekli text alanı eksik' });
  }
  req.body.text = text.trim();
  next();
}

module.exports = { logger, validateUserId, validateUser, validatePost };
