const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full md:w-1/3 rounded-lg border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
