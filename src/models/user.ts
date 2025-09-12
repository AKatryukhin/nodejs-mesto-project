import mongoose from 'mongoose';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'name не может быть пустым'],
    default: 'Саша',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'about не может быть пустым'],
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: [true, 'ссылка avatar не может быть пустым'],
  },
}, { versionKey: false });

export default mongoose.model<IUser>('user', userSchema);
