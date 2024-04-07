import './cButton.css'

export const CButton = ({ className, title, onClick }) => {

    const combinedClasses = `buttonDesign ${className || ""}`

    return (
        <div className={combinedClasses} onClick={onClick}>{title}</div>
    )
}