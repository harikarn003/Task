import "./App.css";
import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import DropDown from "./Dropdown";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import axios from "axios";
function App() {
  const [modal, setModal] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const toggle = () => setModal(!modal);
  const [selectedValue, setSelectedValue] = useState("");
  const formikRef = React.useRef(null);

  const data = [
    { id: 1, name: "first name", value: "first_name" },
    { id: 2, name: "last name", value: "last_name" },
    { id: 3, name: "gender", value: "gender" },
    { id: 4, name: "age", value: "age" },
    { id: 5, name: "account name", value: "account_name" },
    { id: 6, name: "city", value: "city" },
    { id: 7, name: "state", value: "state" },
  ];

  // Handler function for dropdown change
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
    const apiUrl = "https://webhook.site/8281bb55-b12c-479d-af08-59efb7ab2143";
    const formik = formikRef.current;
    const params = {
      segment_name: segmentName,
      schema: formik.values.schema,
    };

    axios
      .post(apiUrl, params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="App">
      <div>
        <Button
          style={{
            background: "#059c9c",
            color: "#fff",
            borderColor: "#fff",
          }}
          onClick={toggle}
        >
          Save segment
        </Button>
        <Modal isOpen={modal} size="lg" toggle={toggle}>
          <ModalHeader
            style={{ backgroundColor: "#059c9c", color: "white" }}
            toggle={toggle}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>{" "}
            Saving Segment
          </ModalHeader>
          <ModalBody>
            <div>
              <h5 className="mt-3 mb-4">Enter the name of the segment</h5>
              <Input
                type="text"
                placeholder="Name of the segment"
                onChange={(e) => {
                  setSegmentName(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <h6>
                To save your Segment, you need to add the schemas to the bulid
                query
              </h6>
            </div>
            <div>
              <Formik
                initialValues={{ schema: [] }}
                innerRef={formikRef}
                onSubmit={(values) => {}}
                render={({ values }) => (
                  <Form>
                    <FieldArray
                      name="schema"
                      render={(arrayHelpers) => (
                        <div>
                          <div 
                          //  style={{border:'4px solid blue'}}
                           >
                          {values.schema.map((item, index) => (
                            <div
                              className=" d-flex justify-content-between mb-3  "
                             
                              key={index}
                            >
                              <span className="w-100">
                                <Input className=" " value={item} name={`schema.${index}`} />
                              </span>
                              <Button
                              
                               
                                onClick={() => arrayHelpers.pop(index)}
                              >
                                -
                              </Button>
                            </div>
                          ))}
                          </div>
                          <div className="mt-3">
                            <DropDown
                              name={"Add to sehema segment"}
                              data={data}
                              value={selectedValue}
                              onChange={handleDropdownChange}
                            />
                          </div>
                          <p
                            className="mt-3"
                            style={{ color: "#059c9c" }}
                            onClick={() => arrayHelpers.push(selectedValue)}
                          >
                            + Add new schema
                          </p>
                        </div>
                      )}
                    />
                  </Form>
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ background: "#059c9c", border: "none" }}
              onClick={handleSubmit}
            >
              Save the Segment
            </Button>{" "}
            <Button
              color="secondary"
              style={{ color: "#fff", border: "none" }}
              onClick={toggle}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default App;
