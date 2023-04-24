export const InputWithLabel = ({ name, label, type, value, onInputChange }) => {
    return (
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onInputChange}
          className="peer h-9 w-[40vw] md:w-[20vw] border-b-1 text-gray-800 placeholder-transparent bg-white text-center rounded-xl px-[0.5rem]"
          placeholder=" "
        />
        <label
          htmlFor={name}
          className="absolute left-2 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-center peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
        >
          {label}
        </label>
      </div>
    );
  };