export const validate = (type, value) => {
    switch (type) {
        case "name":
        case "firstName":
        case "lastName":
        case "nickName":
        case "nombre":
        case "surname":
        case "cognom":
        case "nameError":
        case "firstNameError":
        case "lastNameError":
        case "nickNameError":
        case "nombreError":
        case "surnameError":
        case "cognomError":
            if (value === "") {
                return ""
            }
            if (value.length < 2) {
                return "Name has to be at least 2 characters long";
            }

            return "";

        case "email":
        case "e-mail":
        case "correo":
        case "mail":
        case "emailError":
        case "e-mailError":
        case "correoError":
        case "mailError":
            if (value === "") {
                return ""
            }
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(value)) {
                return "Email format must be correct!";
            }

            return "";

        case "password":
        case "verifyPassword":
        case "passwordHash":
        case "contraseña":
        case "passwordError":
        case "verifyPasswordError":
        case "passwordHashError":
        case "contraseñaError":
            if (value === "") {
                return ""
            }
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
            if (value.length < 6 || value.length > 10) {
                return "Password has to be between 6 and 10 characters long";
            }
            if (!passwordRegex.test(value)) {
                return "Password has to have an Uppercase, a lowercase and a number"
            }

            return "";
        default:
    }
};