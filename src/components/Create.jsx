import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    currentCollege: "",
  });
  const navigate = useNavigate();

  //these methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  //this function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    //when a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:4000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      currentCollege: "",
    });
    navigate("/");
  }

  //this following section will display the form that takes the input from the user.
  return (
    <div style={{ padding: "20px" }}>
      <h3>Create New Contact</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={form.firstName}
            onChange={(e) => updateForm({ firstName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={form.lastName}
            onChange={(e) => updateForm({ lastName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            value={form.age}
            onChange={(e) => updateForm({ age: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Currenct College</label>
          <input
            type="text"
            className="form-control"
            id="currentCollege"
            value={form.currentCollege}
            onChange={(e) => updateForm({ currentCollege: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ marginTop: "10px" }}>
          <input
            type="submit"
            value="Create Contact"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
