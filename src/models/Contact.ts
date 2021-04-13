import mongoose from "mongoose";

interface IContact extends mongoose.Document {
  email: string;
  description: string;
  name: string;
}

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const Contact = mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
