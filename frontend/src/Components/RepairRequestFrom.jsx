import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "./RepairRequestForm.css";

function RepairRequestForm() {
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const navigate = useNavigate();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm();

  // Handle Next Step
  const handleNext = async () => {
    let isValid = false;

    // Validate fields based on the current step
    if (currentStep === 1) {
      isValid = await trigger([
        "customerNameR",
        "contactNumberR",
        "emailR",
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger([
        "vehicleRegiNumberR",
        "vehicleMakeR",
        "vehicleModelR",
        "yearOfManufactureR",
      ]);
    }

    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle Previous Step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle Form Submission
  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "vehiclePhotoR") {
        formData.append(key, data[key][0]); // Handle file upload
      } else {
        formData.append(key, data[key]);
      }
    }

    axios
      .post("http://localhost:5000/repairRequest/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result);
        navigate("/");
        alert("Successfully submitted!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="contact-form">
        <fieldset>
          <h1>REPAIR REQUEST FORM</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step Navigation */}
            <div className="step-navigation">
              <div
                className={`step ${currentStep >= 1 ? "completed" : ""} ${
                  currentStep === 1 ? "active" : ""
                }`}
                onClick={() => setCurrentStep(1)}
              >
                Step 1: Customer Details
              </div>
              <div
                className={`step ${currentStep >= 2 ? "completed" : ""} ${
                  currentStep === 2 ? "active" : ""
                }`}
                onClick={() => setCurrentStep(2)}
              >
                Step 2: Vehicle Details
              </div>
              <div
                className={`step ${currentStep >= 3 ? "completed" : ""} ${
                  currentStep === 3 ? "active" : ""
                }`}
                onClick={() => setCurrentStep(3)}
              >
                Step 3: Repair Details
              </div>
            </div>

            {/* Step 1: Customer Details */}
            {currentStep === 1 && (
              <div className="step">
                <h2>Customer Details</h2>
                <div className="form-group">
                  <label htmlFor="customerNameR" style={{ textAlign: "left" }}>
                    Customer Name
                  </label>
                  <input 
                    type="text"
                    className="form-control"
                    id="customerNameR"
                    placeholder="Enter your full name"
                    {...register("customerNameR" , { required:  "Customer Name is required" })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="customerNameR"
                    render={({ message }) => (
                      <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                    )}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="contactNumberR" style={{ textAlign: "left" }}>
                        Contact Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="contactNumberR"
                        placeholder="Enter contact number"
                        {...register("contactNumberR", { required: "Contact Number is required" })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="contactNumberR"
                        render={({ message }) => (
                          <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="emailR" style={{ textAlign: "left" }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailR"
                        placeholder="Enter email"
                        {...register("emailR", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="emailR"
                        render={({ message }) => (
                          <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="addressR" style={{ textAlign: "left" }}>
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressR"
                    placeholder="Enter your address"
                    {...register("addressR")}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            )}

            {/* Step 2: Vehicle Details */}
            {currentStep === 2 && (
              <div className="step">
                <h2>Vehicle Details</h2>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="vehicleRegiNumberR" style={{ textAlign: "left" }}>
                        Vehicle Registration Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="vehicleRegiNumberR"
                        placeholder="Enter registration number"
                        {...register("vehicleRegiNumberR", {
                          required: "Vehicle Registration Number is required",
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="vehicleRegiNumberR"
                        render={({ message }) => (
                          <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="vehicleMakeR" style={{ textAlign: "left" }}>
                        Vehicle Make
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="vehicleMakeR"
                        placeholder="Enter vehicle make"
                        {...register("vehicleMakeR", {
                          required: "Vehicle Make is required",
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="vehicleMakeR"
                        render={({ message }) => (
                          <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="vehicleModelR" style={{ textAlign: "left" }}>
                        Vehicle Model
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="vehicleModelR"
                        placeholder="Enter vehicle model"
                        {...register("vehicleModelR", {
                          required: "Vehicle Model is required",
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="vehicleModelR"
                        render={({ message }) => (
                          <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                        )}
                      />
                    </div>
                  </div>


                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="yearOfManufactureR" style={{ textAlign: "left" }}>
                        Year of Manufacture
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="yearOfManufactureR"
                        placeholder="Enter year"
                        {...register("yearOfManufactureR", {
                          required: "Year of Manufacture is required",
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="yearOfManufactureR"
                        render={({ message }) => (
                          <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                        )}
                      />
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="yearOfManufactureR" style={{ textAlign: "left" }}>
                        Year of Manufacture
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="yearOfManufactureR"
                        placeholder="Enter year"
                        min="1900"
                        max={new Date().getFullYear()}
                        {...register("yearOfManufactureR", {
                          required: "Year of Manufacture is required",
                          min: { value: 1900, message: "Year must be 1900 or later" },
                          max: {
                            value: new Date().getFullYear(),
                            message: `Year cannot be later than ${new Date().getFullYear()}`,
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="yearOfManufactureR"
                        render={({ message }) => (
                          <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                        )}
                      />
                    </div>
                  </div>



                </div>

                <div className="row">


                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="mileageR" style={{ textAlign: "left" }}>
                        Mileage
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="mileageR"
                        placeholder="Enter mileage"
                        {...register("mileageR")}
                      />
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="mileageR" style={{ textAlign: "left" }}>
                        Mileage (km)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="mileageR"
                        placeholder="Enter mileage"
                        min="0"
                        max="1000000"
                        {...register("mileageR", {
                          required: "Mileage is required",
                          min: { value: 0, message: "Mileage cannot be negative" },
                          max: { value: 1000000, message: "Mileage cannot exceed 1,000,000 km" },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="mileageR"
                        render={({ message }) => (
                          <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                        )}
                      />
                    </div>
                  </div>



                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="vehicleIdentiNumberR" style={{ textAlign: "left" }}>
                        Vehicle Identification Number (VIN)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="vehicleIdentiNumberR"
                        placeholder="Enter VIN"
                        {...register("vehicleIdentiNumberR")}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            )}

            {/* Step 3: Repair Details */}
            {currentStep === 3 && (
              <div className="step">
                <h2>Repair Details</h2>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="vehiclePhotoR" style={{ textAlign: "left" }}>Vehicle Photo</label>
                      <input
                        type="file"
                        className="form-control"
                        id="vehiclePhotoR"
                        {...register("vehiclePhotoR")}
                      />
                    </div>
                  </div>



                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="serviceTypeR" style={{ textAlign: "left" }}>Service Type</label> */}
                      {/* <input
                        type="text"
                        className="form-control"
                        id="serviceTypeR"
                        placeholder="Enter service type"
                        {...register("serviceTypeR", {
                          required: "Service Type is required",
                        })}
                      /> */}
                      {/* <select
                        className="form-control"
                        id="serviceTypeR"
                        placeholder="Enter service type"
                        {...register("serviceTypeR", {
                          required: "Service Type is required",
                        })}
                      >
                        <option value="Cash">Vehicle Repair</option>
                        <option value="Card">Vehicle Restoreation</option>
                        <option value="Online Payment">Service</option>
                      </select>

                      <ErrorMessage
                        errors={errors}
                        name="serviceTypeR"
                        render={({ message }) => (
                          <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                        )}
                      />
                    </div>
                  </div> */}
                  
                  <div className="col-md-6">
  <div className="form-group">
    <label htmlFor="serviceTypeR" style={{ textAlign: "left" }}>Service Type</label>
    <select
      className="form-control"
      id="serviceTypeR"
      {...register("serviceTypeR", {
        required: "Service Type is required",
      })}
    >
      <option value="">Select a service type</option>
      <option value="Vehicle Repair">Vehicle Repair</option>
      <option value="Vehicle Restoration">Vehicle Restoration</option>
      <option value="General Service">General Service</option>
      <option value="Oil Change">Oil Change</option>
      <option value="Tire Replacement">Tire Replacement</option>
      <option value="Battery Replacement">Battery Replacement</option>
      <option value="Brake Inspection">Brake Inspection</option>
    </select>

    <ErrorMessage
      errors={errors}
      name="serviceTypeR"
      render={({ message }) => (
        <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
      )}
    />
  </div>
</div>




                </div>

                <div className="form-group">
                  <label htmlFor="descripIssueR" style={{ textAlign: "left" }}>Description of Issue</label>
                  <textarea
                    className="form-control"
                    id="descripIssueR"
                    rows="3"
                    placeholder="Describe the issue"
                    {...register("descripIssueR", {
                      required: "Description of Issue is required",
                    })}
                  ></textarea>
                  <ErrorMessage
                    errors={errors}
                    name="descripIssueR"
                    render={({ message }) => (
                      <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                    )}
                  />
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="prefDateAndTimeR" style={{ textAlign: "left" }}>Preferred Date and Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="prefDateAndTimeR"
                        {...register("prefDateAndTimeR", {
                          required: "Preferred Date and Time is required",
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="prefDateAndTimeR"
                        render={({ message }) => (
                          <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                        )}
                      />
                    </div>
                  </div>


                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="urgencyLevelR" style={{ textAlign: "left" }}>Urgency Level</label>
                      <select
                        className="form-control"
                        id="urgencyLevelR"
                        {...register("urgencyLevelR", {
                          required: "Urgency Level is required",
                        })}
                      >
                        <option value="Normal">Normal</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                      <ErrorMessage
                        errors={errors}
                        name="urgencyLevelR"
                        render={({ message }) => (
                          <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                        )}
                      />
                    </div>
                  </div>

                  
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="paymentMethodR" style={{ textAlign: "left" }}>Payment Method</label>
                      <select
                        className="form-control"
                        id="paymentMethodR"
                        {...register("paymentMethodR", {
                          required: "Payment Method is required",
                        })}
                      >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="Online Payment">Online Payment</option>
                      </select>
                      <ErrorMessage
                        errors={errors}
                        name="paymentMethodR"
                        render={({ message }) => (
                          <p className="error-message" style={{ textAlign: "left" }}>{message}</p>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            )}
          </form>
        </fieldset>
      </div>
    </div>
  );
}

export default RepairRequestForm;