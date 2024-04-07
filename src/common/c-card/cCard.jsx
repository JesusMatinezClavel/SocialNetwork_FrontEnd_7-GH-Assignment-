import './cCard.css'

export const CCard = ({ className, children }) => {

    const combinedClasses = `cardDesign ${className || ""}`
    return (
        <div className={combinedClasses}>{children}</div>
    )
}