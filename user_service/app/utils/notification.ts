import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

/**
 * Twilio SMS client for sending verification codes.
 */
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

/**
 * Generates a random access code along with its expiry time (30 minutes).
 * @returns {Object} An object containing the generated code and its expiry time.
 */
export const GenerateAccessCode = () => {
    const code = Math.floor(10000 + Math.random() * 900000);
    const expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { code, expiry };
};

/**
 * Sends a verification code via SMS to the specified phone number.
 * @param {number} code - The verification code to send.
 * @param {string} toPhoneNumber - The destination phone number.
 * @returns {Promise<Object>} The Twilio API response.
 */
export const SendVerificationCode = async (code: number, toPhoneNumber: string) => {
    try {
        // Use Twilio client to send an SMS
        const response = await client.messages.create(
            {
                body: `Your verification code is ${code}. It will expire within 30 minutes.`,
                from: "+2348064248389",
                to: toPhoneNumber.trim(),
            }
        );

        // Log the Twilio API response
        console.log(response);

        // Return the Twilio API response
        return response;
    } catch (error) {
        // Log any errors that occur during SMS sending
        console.error("Error sending verification code:", error);
        throw error;
    }
};