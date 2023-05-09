import React, {useRef, useState} from 'react'
import styled from "styled-components";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import FlyingLetters from "../components/FlyingLetters";
import MyPhoneNumber from "../components/MyPhoneNumber";
import SubmitButton from "../components/SubmitButton";
import { object, string } from 'yup';
import { Formik } from 'formik';
import emailjs from '@emailjs/browser';

import { MdOutlineEmail } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";

const EmailSchema = object().shape({
  email: string().email("Your email is invalid.").required("Email is required."),
  name: string()
      .min(2, "Name is too short")
      .max(70, "Your name is too long")
      .required("Name is required."),
  message: string()
    .min(6, "Your message is too short.")
    .max(250, "You're talkative right? Sadly tho, I can't read that long :(")
    .required("Message text is required."),
});

const FormFields = [
    {
      Component: Input,
      name: "name",
      label: "Your name",
      placeholder: "For example, Kwstas",
      icon: <BsFillPersonFill />
    },
    {
      Component: Input,
      name: "email",
      label: "Type your email",
      placeholder: "Your message",
      icon: <MdOutlineEmail />
    },
    {
      Component: Textarea,
      name: "message",
      label: "Write a message",
      placeholder: "Your message"
    }
]

function ContactForm({isModal, theme}) {
  const formRef = useRef();

  console.log("CONTACT FORM THEME", theme)

  const [submitMessage, setSubmitMessage] = useState({
    message: "",
    type: ""
  });

  const initialFormValues = {
    name: "",
    email: "",
    message: ""
  }

  const submitForm = async (values, {resetForm, setSubmitting}) => {
    setSubmitting(true)
    
    try {
      await emailjs.sendForm(import.meta.env.VITE_EMAIL_SERVICE_ID, import.meta.env.VITE_EMAIL_TEMPLATE_ID, formRef.current, import.meta.env.VITE_EMAIL_PUBLIC_KEY)
      
      const senderName = values.name.split(" ")[0]
      setSubmitMessage({
        message: `Okay ${senderName}, your email has been succesfully sent! I will be in contact with you shortly.`,
        type: "success"
      })

      resetForm({
        initialFormValues
      })


    } catch(error) {
      setSubmitMessage({
        message: `There was an error, please try again.`,
        type: "error"
      })
      console.log(error);
    } finally {
      setSubmitting(false)
      setTimeout(() => {
        setSubmitMessage({
          message: "",
          type: ""
        })
      }, 6000)
    }
  }
  return (
    <>
      <FlyingLetters theme={theme} />
      <Formik
        initialValues={initialFormValues}
        validationSchema={EmailSchema}
        onSubmit={submitForm}
      >
        {
          (formik) => {
            const { values, handleChange, handleSubmit, errors, touched, handleBlur, isValid, dirty, isSubmitting } = formik;

            return (
              <Form onSubmit={handleSubmit} ref={formRef} >
                {
                  submitMessage.message !== "" && 
                  <SubmitMessage className={submitMessage.type}>
                    {submitMessage.message}
                  </SubmitMessage>
                }
                {!isModal ? <MyPhoneNumber theme={theme} /> : undefined}
                {FormFields.map(({Component, name, label, placeholder, icon }) => {
                  return <Component key={name} name={name} label={label} placeholder={placeholder} value={values[name]} onBlur={handleBlur} onChange={handleChange} error={errors[name]} touched={touched[name]} icon={icon || undefined} theme={theme} />
                })}
                <SubmitButton className={isModal ? "mb-5" : ""} type="submit" disabled={!(dirty && isValid) || isSubmitting} theme={theme} />
              </Form>
            )
          }
        }
      </Formik>
    </>
  )
}

export default ContactForm

const SubmitMessage = styled.div`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  color: #f7f7f7;
  background: #2e894e;
  border-radius: 0.2rem;

  &.error {
    background: #e724248a;
  }

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 29rem;

  button[type="submit"] {
    margin-top: 2rem;
  }

  @media (max-width: 775px) {
    width: 100%;
  }
`;