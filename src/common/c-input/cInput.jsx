import './cInput.css'

export const CInput = ({ id, className, name, type, style, value, placeholder, onChange, onBlur, disabled, children }) => {

    const combinedClasses = `inputDesign ${className || ""}`
    const inputElement = type === "textarea" ? (
        <textarea
            id={id}
            className={combinedClasses}
            style={style}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
        >
            {children}
        </textarea>
    ) : (
        <input
            id={id}
            disabled={disabled}
            className={combinedClasses}
            type={type}
            style={style}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
        >
            {children}
        </input>
    )
    return inputElement;
}