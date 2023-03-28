import firebase from 'firebase/app';
import 'firebase/functions';

const sendContactForm = firebase.functions().httpsCallable('sendContactEmail');

const handleSubmit = async event => {
  event.preventDefault();

  const { name, email, message } = event.target.elements;

  try {
    await sendContactForm({ name: name.value, email: email.value, message: message.value });
    console.log('Email sent successfully!');
  } catch (error) {
    console.error(error);
  }
};
