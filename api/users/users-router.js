const express = require('express');
const Users = require('./users-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');
const db = require('../../data/db-config'); 

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const users = await Users.get();
    res.json(users);
  } catch (error) {
    next(error);
  }
});


router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
});


router.post('/', validateUser, async (req, res, next) => {
  try {
    const created = await Users.insert({ name: req.body.name });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});


router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  try {
    const updated = await Users.update(req.params.id, { name: req.body.name });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    await Users.remove(req.params.id);
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const [id] = await db('posts').insert({
      text: req.body.text,
      user_id: req.params.id,
    });
    const created = await db('posts').where({ id }).first();
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

module.exports = router;