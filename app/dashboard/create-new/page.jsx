"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";

const CreateNew = () => {
  const [formData, setFormData] = useState([]);
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        {/* Select Topic Component */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Select Style Component  */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration Component  */}

        {/* Create Button  */}
      </div>
    </div>
  );
};

export default CreateNew;
