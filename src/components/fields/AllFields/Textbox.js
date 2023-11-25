import React, { useEffect, useState } from "react";
import "./allfields.css";
import InputFields from "../inputFields";
import { v4 as uuidv4 } from "uuid";
import { useImmer } from "use-immer";
export const Textbox = ({ field, onchange }) => {
  return (
    <>
      <input
        className="input-field"
        value={field?.value}
        placeholder={field?.placeholder}
        onChange={(e) => onchange(e.target.value)}
      />
    </>
  );
};
export const Select = ({ field, onchange }) => {
  return (
    <>
      <select
        value={field?.value}
        defaultValue={field?.defaultValue}
        className="input-field"
        onChange={(e) => onchange(e.target.value)}
      >
        {Array.isArray(field?.validate?.options) &&
          field?.validate?.options?.map((item) => (
            <option value={item?.value}>{item?.label}</option>
          ))}
      </select>
    </>
  );
};
export const Radio = ({ field, onchange }) => {
  return (
    <>
      {Array.isArray(field?.validate?.options) &&
        field?.validate?.options?.map((item) => (
          <label
            key={uuidv4()}
            className="radio-label"
            htmlFor={`${field?.jsonKey} ${item?.value}`}
          >
            {console.log({ field, item })}
            <input
              type="radio"
              name={field?.jsonKey}
              id={`${field?.jsonKey} ${item?.value}`}
              checked={field?.value === item?.value}
              value={item?.value}
              defaultChecked={field?.validate?.defaultValue}
              onChange={(e) => onchange(item?.value)}
            />
            {item?.label}
          </label>
        ))}
    </>
  );
};
export const Toggle = ({ field, onchange }) => {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!isToggled);
    onchange(!isToggled);
  };

  return (
    <div className={`toggle-container ${isToggled ? "active" : ""}`}>
      <label className="toggle">
        <input type="checkbox" checked={isToggled} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
export const Group = ({ field, onchange, setUpdatedData, mainJson }) => {
  const [subParameters, setSubParameters] = useImmer(field?.subParameters);
  useEffect(() => {
    setUpdatedData((state) => {
      for (let index = 0; index < state.length; index++) {
        const element = state[index];
        if (element?.jsonKey === field?.jsonKey) {
          state[index]["subParameters"] = subParameters;
        }
      }
    });
  }, [subParameters]);
  return (
    <div className="group">
      {Array.isArray(field?.subParameters) &&
        field?.subParameters?.map((item) => (
          <InputFields
            field={item}
            json={subParameters}
            setUpdatedData={setSubParameters}
            mainJson={mainJson}
          />
        ))}
    </div>
  );
};
