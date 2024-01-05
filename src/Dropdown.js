import React from "react";

const DropDown = ({
    heading,
    placeholder,
    data,
    error,
    onChange,
    name,
    value,
    title,
    id,

    ...props
}) => (

    <div >
        {heading && <label className="form-control-label">{heading}</label>}
        <select value={value} placeholder={placeholder} className="form-control form-select" {...props} onChange={onChange} name={name} >
            {data && data.length > 0 && data.map((item, index) => (
                <option className="dropdown-item" key={index} value={item.value }>
                    {item.name ? item.name : item.group_name} 
                                    </option>
            ))}
        </select>
        {error && <code className="text-danger">{error}</code>}
    </div>
);

export default DropDown;
