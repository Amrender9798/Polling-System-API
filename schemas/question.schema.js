import { Schema, model } from 'mongoose';
// Define Question schema
const questionSchema = new Schema({
    title: { type: String, required: true },
    options: [{ type: Schema.Types.ObjectId, ref: 'Option' }],
});

const Question = model('Question', questionSchema);

export default Question;