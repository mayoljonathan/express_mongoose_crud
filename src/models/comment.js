const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    body: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
