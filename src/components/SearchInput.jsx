import './SearchInput.css';

function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      className="search-input"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
    />
  );
}

export default SearchInput;
