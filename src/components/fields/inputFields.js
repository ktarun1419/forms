import React, { useCallback, useEffect, useState } from "react";
import "./field.css";
import { Group, Radio, Select, Textbox, Toggle } from "./AllFields/Textbox";
import { Tooltip } from "react-tooltip";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";
const InputFields = ({ field, json, setUpdatedData, mainJson }) => {
  const [inputValue, setInputValue] = useImmer(field);
  const handleChange = (value) => {
    console.log({ value });
    setUpdatedData((state) => {
      for (let index = 0; index < state.length; index++) {
        const element = state[index];
        if (element?.jsonKey === inputValue?.jsonKey) {
          console.log({ index });
          state[index]["value"] = value;
        }
      }
    });
  };
  const returnuiType = () => {
    switch (field?.uiType) {
      case "Input":
        return <Textbox field={field} onchange={handleChange} />;
      case "Select":
        return <Select field={field} onchange={handleChange} />;
      case "Switch":
        return <Toggle field={field} onchange={handleChange} />;
      case "Group":
        return (
          <Group
            field={field}
            onchange={handleChange}
            setUpdatedData={setUpdatedData}
            mainJson={mainJson}
          />
        );
      case "Ignore":
        return (
          <Group
            field={field}
            onchange={handleChange}
            setUpdatedData={setUpdatedData}
          />
        );
      case "Radio":
        return <Radio field={field} onchange={handleChange} />;
      default:
        break;
    }
  };

  let operand = {
    "+": function (a, b) {
      return a + b;
    },
    "==": function (a, b) {
      return a == b;
    },
    "===": function (a, b) {
      return a === b;
    },
  };
  const checkCondition = () => {
    let returnValue = false;
    if (Array.isArray(field?.conditions) && field?.conditions.length > 0) {
      field?.conditions.forEach((item) => {
        let extract = String(item?.jsonKey).split(".");
        let checkValue = mainJson;
        extract.forEach((item, index) => {
          let sub = Array.isArray(checkValue)
            ? checkValue?.filter((obj) => obj?.jsonKey === item)
            : [];

          if (index !== extract?.length - 1) {
            checkValue = sub[0]?.subParameters;
          } else {
            checkValue = sub;
          }
        });
        if (checkValue?.length > 0) {
          returnValue = operand[item?.op](checkValue[0]?.value, item?.value);
        }
      });
    } else {
      returnValue = true;
    }
    return returnValue;
  };
  return (
    <>
      {checkCondition() && (
        <div
          className={`field ${
            (field?.uiType === "Group" || field?.uiType === "Ignore") && "group"
          } `}
        >
          <label>
            {" "}
            {String(field?.label)?.split("_").join(" ")}
            {field?.validate?.required && (
              <span className="required">*</span>
            )}{" "}
          </label>
          {/* {true && <div data-tooltip-id={field?.jsonKey} data-tooltip-content={field?.description} className='info_tooltip'>i</div>} */}
          {/* <Tooltip id={field?.jsonKey} /> */}
          {returnuiType()}
        </div>
      )}
    </>
  );
};

export default InputFields;
