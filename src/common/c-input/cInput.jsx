import './cInput.css'

export const CInput = ({ className, name, type, value, placeholder }) => {

    const combinedClasses = `inputDesign ${className || ""}`

    return (
        <input className={combinedClasses} type={type} name={name} value={value} placeholder={placeholder}></input>
    )
}