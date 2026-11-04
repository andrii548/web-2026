import './Select.css';

function Select({ value, onChange, options, label }) {
  return (
    <select
      className="select"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={label}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
