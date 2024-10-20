export default function InputField({
  label,
  type,
  name,
  id,
  value,
  onChange,
  inputError = '',
  isValid = true,
}) {
  return (
    <div className="flex flex-col w-full my-2">
      {!isValid && <p className="text-sm text-Red">{inputError}</p>}
      <input
        name={name}
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={label}
        className={`p-2 bg-White dark:bg-Black border rounded-lg shadow-md border-blue-300 text-Black dark:text-White dark:border-White/70 outline-0 focus-visible:border-2 focus-visible:border-blue-300  placeholder:text-Black/70 dark:placeholder:text-White ${
          !isValid && 'animate-wiggle border-Red'
        }`}
      />
    </div>
  )
}
