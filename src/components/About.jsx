import React, { useEffect, useState } from "react";
import "./priceAbout.scss";

async function fetchRecords() {
  try {
    const response = await fetch("http://localhost:4000/students");
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const records = await response.json();
    return records;
  } catch (error) {
    console.error("Failed to fetch records:", error);
    return [];
  }
}

const About = () => {
  const [colleges, setColleges] = useState([]);
  const [majors, setMajors] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [info, setInfo] = useState(0);
  const [majorInfo, setMajorInfo] = useState(0);
  const [currentPhone, setPhone] = useState([]);
  const [majorNumb, setMajorNumb] = useState([]);
  const [currentCollege, setCurrentCollege] = useState("");
  const [currentMajor, setCurrentMajor] = useState("");

  useEffect(() => {
    const loadColleges = async () => {
      const records = await fetchRecords();
      const collegeNames = [
        ...new Set(records.map((record) => record.currentCollege)),
      ];
      setColleges(collegeNames);
    };

    loadColleges();
  }, []);

  useEffect(() => {
    const loadMajors = async () => {
      const records = await fetchRecords();
      const majorNames = [...new Set(records.map((record) => record.major))];
      setMajors(majorNames);
    };

    loadMajors();
  }, []);

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
  };

  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
  };
  let firstMajors = majors.slice(0, majors.length - 1);
  let lastMajor = majors[majors.length - 1];

  //   let firstColleges = colleges.slice(0, colleges.length - 1);
  //   let lastCollege = colleges[colleges.length - 1];

  //   let phoneNumb = [];

  const makePhone = () => {
    if (selectedCollege === "") {
      setInfo(0);
      document.querySelector(".majorContainer").style.display = "none";
    } else {
      setInfo(1);
      document.querySelector(".majorContainer").style.display = "block";
    }
    let currentPhone = [];
    if (selectedCollege.length < 10) {
      currentPhone.push(selectedCollege.length * 100);
    } else {
      currentPhone.push(selectedCollege.length * 10);
    }
    currentPhone.push(selectedCollege.length * 20);

    if (selectedCollege.length < 10) {
      currentPhone.push(selectedCollege.length * 1500);
    } else {
      currentPhone.push(selectedCollege.length * 150);
    }
    console.log(currentPhone);
    setPhone(currentPhone);
    setCurrentCollege(selectedCollege);
  };
  //   makePhone();

  const majorPhone = () => {
    if (selectedMajor === "") {
      setMajorInfo(0);
    } else {
      setMajorInfo(1);
    }
    let currentPhone = [];
    currentPhone.push(selectedMajor.length * 150);
    console.log(currentPhone);
    setMajorNumb(currentPhone);
    setCurrentMajor(selectedMajor);
  };

  return (
    <div className="selector">
      <label htmlFor="collegeDropdown" className="dropDown">
        <strong>Colleges:</strong> &nbsp; &nbsp;
      </label>
      <select
        id="collegeDropdown"
        value={selectedCollege}
        onChange={handleCollegeChange}
      >
        <option value=""></option>
        {colleges.map((college, index) => (
          <option key={index} value={college}>
            {college}
          </option>
        ))}
      </select>

      <div className="collegeInfo">
        <h3>{info > 0 ? "" : "Please Select a College"}</h3>
        <p className="aboutInfo">
          {info > 0 ? (
            <>
              {`${currentCollege} is a fine place to learn about all sorts of subjects. ${currentCollege} is one of the very best places to learn. Some of their majors include ${firstMajors.join(
                ", "
              )}, and ${lastMajor}. If you would like to enroll in ${currentCollege}, please click the New Student link. If you have any questions and need to speak with someone from ${currentCollege}, please call them at `}
              <strong>
                ({currentPhone[0]})-{currentPhone[1]}-{currentPhone[2]}
              </strong>
              .
            </>
          ) : (
            ""
          )}
        </p>
        <button className="learnMore" onClick={makePhone}>
          Learn More
        </button>
      </div>
      <div className="majorContainer" style={{ display: "none" }}>
        <div>
          <label htmlFor="majorDropdown" className="dropDown" id="majorD">
            <strong>Majors:</strong> &nbsp; &nbsp;
          </label>
          <select
            id="majorDropdown"
            value={selectedMajor}
            onChange={handleMajorChange}
          >
            <option value=""></option>
            {majors.map((major, index) => (
              <option key={index} value={major}>
                {major}
              </option>
            ))}
          </select>
        </div>
        <div className="majorDetails">
          <h3>{majorInfo > 0 ? "" : "Please Select a Major"}</h3>
          <p className="aboutInfo">
            {majorInfo > 0 ? (
              <>
                {`${currentMajor} is a great subject to learn. While you can learn ${currentMajor} at any school, ${currentCollege} is a great place to take this major. In ${currentMajor} you will learn everything one would need for a successful career as a ${currentMajor} professional.
                If you wish to enroll in ${currentMajor}, or any other major you can think of, please click the New Student link. If you have any questions or need to speak with someone from the ${currentMajor} department at ${currentCollege}, please call at
 `}
                <strong>
                  ({currentPhone[0]})-{currentPhone[1]}-{majorNumb}
                </strong>
                .
              </>
            ) : (
              ""
            )}
          </p>
          <button className="learnMore" onClick={majorPhone}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
