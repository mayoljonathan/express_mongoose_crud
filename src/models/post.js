const mongoose = require('mongoose');
const Comment = require('./comment').schema;

const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    body: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [Comment],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Post = model('Post', postSchema);

module.exports = Post;
