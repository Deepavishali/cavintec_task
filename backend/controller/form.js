import form from "../model/form.js";
import bcrypt from "bcrypt";

export const submitForm = async (req, res) => {
    try {
        const { name, email, password, selectfield } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const formData = new form({
            name,
            email,
            password: hashedPassword,
            selectfield,
        });

        const savedForm = await formData.save();

        res.status(200).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'An error occurred, please try again' });
    }
};
