import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader/Loader";
import "./RecordList.scss";

const Record = (props) => {
  return (
    <tr>
      <td>{props.record.firstName}</td>
      <td>{props.record.lastName}</td>
      <td>{props.record.email}</td>
      <td>{props.record.age}</td>
      <td>{props.record.currentCollege}</td>
      <td>
        <Link
          className="btn btn-edit"
          id="edit"
          to={`/edit/${props.record._id}`}
        >
          Edit
        </Link>
        |
        <button
          className="btn btn-delete"
          id="delete"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default function RecordList() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

  //this method fetches the rcords from the databse.
  useEffect(() => {
    setLoading(true);
    async function getRecords() {
      const response = await fetch("http://localhost:4000/students");
      console.log(response);
      setLoading(false);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }

    getRecords();
  }, [records.length]);

  //this method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:4000/students/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  //this method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  //this following section will display the table with the records of individuals
  return (
    <div className="container">
      <h3 className="contact-title">Contact List</h3>
      <table className="table table-stripped" style={{ marginTop: 20 }}>
        <thead>
          <tr className="tableTop">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Current College</th>
            <th>Modify Student</th>
          </tr>
        </thead>
        <tbody>{loading ? <Loader /> : recordList()}</tbody>
      </table>
    </div>
  );
}

/* <tr className="tableTop">
          <td> First Name</td>
          <td>Last Name</td>
          <td>Email</td>
          <td>age</td>
          <td>Current College</td>
          <td>Modify Student</td>
        </tr> */
