import './cInput.css'

export const CInput = ({ className, name, type, style, value, placeholder, onChange, onBlur, disabled, children }) => {

    const combinedClasses = `inputDesign ${className || ""}`

    return (
        <input
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
}