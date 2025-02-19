import mongoose, { Schema } from 'mongoose';
import { INote } from '../types';

const NoteSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for this note'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide the content of the note'],
  },
  tags: {
    type: [String],
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  modified_at: {
    type: Date,
    default: Date.now,
  },
});

const Note =
  mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);

export default Note;
