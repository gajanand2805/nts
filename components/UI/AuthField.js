export default function AuthField({
  label,
  type,
  name,
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
        id={name}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={label}
        className={`p-2 bg-White dark:bg-Black border-2 rounded-lg shadow-md border-Black text-Black dark:text-White dark:border-White outline-0 focus-visible:border-3 focus-visible:border-blue-300 dark:focus-visible:border-blue-300  placeholder:text-Black/70 dark:placeholder:text-White ${
          !isValid && 'animate-wiggle border-Red'
        }`}
      />
    </div>
  )
}
