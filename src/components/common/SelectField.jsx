const SelectField = ({ value, label, name, onChange, options }) => {
  return (
    <>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded bg-white"
      >
        <option value="">Select {label}</option>
        {options && options.length > 0 ? (
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))
        ) : (
          <option value="">No options available</option>
        )}
      </select>
    </>
  );
};

export default SelectField;
