import './cText.css'

export const CText = ({ className, title, children }) => {

    const combinedClasses = `textDesign ${className || ""}`

    return (
        <div className={combinedClasses}>{title}{children}</div>
    )
}