import { useState, useRef } from "react";
import style from "./form.module.css";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const refs = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    message: useRef(null),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    };
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      for (const key in newErrors) {
        if (newErrors[key]) {
          refs[key].current.focus();
          break;
        }
      }
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted successfully:", formData);
      alert("Form submitted successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    }
  };

  return (
    <section className={style.container}>
      <div className={style.lines}></div>
      <h2 className={style.contactUs}>Contact Us</h2>
      <h3 className={style.help}>We always want to help</h3>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.rowField}>
          <div className={style.field}>
            {!errors.firstName ? (
              <label>First name</label>
            ) : (
              <label>First name *</label>
            )}
            <input
              type="text"
              name="firstName"
              className={style.input}
              value={formData.firstName}
              onChange={handleInputChange}
              ref={refs.firstName}
            />
            {errors.firstName && (
              <p className={style.error}>{errors.firstName}</p>
            )}
          </div>
          <div className={style.field}>
            {!errors.lastName ? (
              <label>Last name</label>
            ) : (
              <label>Last name *</label>
            )}
            <input
              type="text"
              name="lastName"
              className={style.input}
              value={formData.lastName}
              onChange={handleInputChange}
              ref={refs.lastName}
            />
            {errors.lastName && (
              <p className={style.error}>{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className={style.field}>
          {!errors.email ? (
            <label>Your email</label>
          ) : (
            <label>Your email *</label>
          )}
          <input
            type="email"
            name="email"
            className={style.input}
            value={formData.email}
            onChange={handleInputChange}
            ref={refs.email}
          />
          {errors.email && <p className={style.error}>{errors.email}</p>}
        </div>
        <div className={style.textareaContainer}>
          {!errors.message ? (
            <label>Write a message</label>
          ) : (
            <label>Write a message *</label>
          )}
          <textarea
            name="message"
            className={style.textArea}
            value={formData.message}
            onChange={handleInputChange}
            ref={refs.message}
          />
          {errors.message && <p className={style.error}>{errors.message}</p>}
        </div>
        <button type="submit" className={style.submit}>
          Submit
        </button>
      </form>
    </section>
  );
}

export default Form;
