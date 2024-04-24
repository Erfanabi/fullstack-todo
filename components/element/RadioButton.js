function RadioButton({
  children,
  title,
  value,
  type = "radio",
  status,
  setStatus,
}) {
  const handleRadioChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className={value}>
      <label htmlFor={value}>
        {children}
        {title}
      </label>
      <input
        id={value}
        name={value}
        type={type}
        value={value}
        onChange={handleRadioChange}
        checked={status === value}
      />
    </div>
  );
}

export default RadioButton;
