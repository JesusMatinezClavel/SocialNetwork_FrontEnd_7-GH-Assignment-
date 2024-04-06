import './cInput.css'

export const CInput = ({ className, name, type, value, placeholder, onChange, onBlur, disabled }) => {

    const combinedClasses = `inputDesign ${className || ""}`

    return (
        <input
            disabled={disabled}
            className={combinedClasses}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
        ></input>
    )
}