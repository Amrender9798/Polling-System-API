import { Schema, model } from 'mongoose';


const optionSchema = new Schema({
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
});



const Option = model('Option', optionSchema);

export default Option;
