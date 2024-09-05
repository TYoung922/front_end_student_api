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

const Pricing = () => {
  const [colleges, setColleges] = useState([]);
  const [majors, setMajors] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); // State to store the total price

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

  const figurePrice = () => {
    // Calculate the total price based on the length of selected values
    const calculatedPrice =
      (selectedCollege.length * selectedCollege.length +
        selectedMajor.length * selectedCollege.length) *
      10;
    setTotalPrice(calculatedPrice); // Update state with the calculated price
  };

  //   if (totalPrice > 0) {
  //   }

  return (
    <div className="selector">
      <label htmlFor="collegeDropdown" className="dropDown">
        Colleges: &nbsp; &nbsp;
      </label>
      <select
        id="collegeDropdown"
        value={selectedCollege}
        onChange={handleCollegeChange}
      >
        <option value="">--Select a College--</option>
        {colleges.map((college, index) => (
          <option key={index} value={college}>
            {college}
          </option>
        ))}
      </select>
      <label htmlFor="majorDropdown" className="dropDown" id="majorD">
        Majors: &nbsp; &nbsp;
      </label>
      <select
        id="majorDropdown"
        value={selectedMajor}
        onChange={handleMajorChange}
      >
        <option value="">--Select a Major--</option>
        {majors.map((major, index) => (
          <option key={index} value={major}>
            {major}
          </option>
        ))}
      </select>
      <div className="quoteSelect">
        <h3>
          {totalPrice > 0 ? (
            <>
              The price for
              <br />
              {selectedMajor && `${selectedMajor}`}
              <br />
              at
              <br />
              {selectedCollege && `${selectedCollege}`}
              <br />
              is:
            </>
          ) : (
            ""
          )}
        </h3>
      </div>
      <div className="result">
        <h1>
          {totalPrice > 0
            ? `$${totalPrice}`
            : "Please select a college and major"}
        </h1>{" "}
        {/* Display price or prompt */}
        <button
          className="calculate"
          onClick={figurePrice} // Call figurePrice on button click
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default Pricing;
