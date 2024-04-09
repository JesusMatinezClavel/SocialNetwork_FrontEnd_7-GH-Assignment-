import './cCard.css'

export const CCard = ({ className, children, onClick }) => {

    const combinedClasses = `cardDesign ${className || ""}`
    return (
        <div className={combinedClasses} onClick={onClick}>{children}</div>
    )
}