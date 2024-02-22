'use client'
import React from "react";
import { useState } from "react";

const QuestionAnswer = ({ question, answer }) => {
    const [show, setShow] = useState(false);
  return (
    <div className="p-1">
      <div className="flex mt-[30px] p-5 border rounded-md shadow-md cursor-pointer" onClick={()=>setShow(!show)}>
        <h3 className="font-semibold text-lg hover:underline">{question}</h3>
      </div>
      {
        show && <p className="p-6 text-base font-normal leading-7 text-gray-800">{answer}</p>
      }
    </div>
  );
};

export default QuestionAnswer;
