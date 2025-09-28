import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  dob: { type: Date, required: true },
  fieldOfStudy: { type: String, required: true, trim: true },
  address: { type: String, trim: true }, // optional
}, { timestamps: true });

// Avoid recompiling model on hot reload
export default mongoose.models.User || mongoose.model('User', UserSchema);
