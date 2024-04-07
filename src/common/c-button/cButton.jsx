import './cButton.css'

export const CButton = ({ className, disabled, title, onClick }) => {

    const combinedClasses = `buttonDesign ${className || ""}`

    return (
        <div className={combinedClasses} disabled={disabled} onClick={onClick}>{title}</div>
    )
}