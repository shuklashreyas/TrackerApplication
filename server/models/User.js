const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  attributes: {
    iq: { type: Number, default: 50 },
    health: { type: Number, default: 50 },
    focus: { type: Number, default: 50 },
    discipline: { type: Number, default: 50 },
    charisma: { type: Number, default: 50 },
    confidence: { type: Number, default: 50 },
  },
  sins: {
    sloth: { type: Number, default: 0 },
    greed: { type: Number, default: 0 },
    wrath: { type: Number, default: 0 },
    envy: { type: Number, default: 0 },
    pride: { type: Number, default: 0 },
    gluttony: { type: Number, default: 0 },
    lust: { type: Number, default: 0 },
  },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  tasks: [
    {
      name: String,
      type: String, // e.g., "focus", "health"
      completed: Boolean,
      date: Date,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
