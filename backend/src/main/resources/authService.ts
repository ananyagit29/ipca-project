/// <reference types="node" />
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { createHash } from 'crypto';


const ajv = new Ajv();
addFormats(ajv as any);


// Define the 4 authorized users and their SHA-256 hashed passwords
// Passwords used for these hashes: pwd1, pwd2, pwd3, pwd4
const USER_CREDENTIALS: Record<string, string> = {
    "ananya.parabat@ipca.com": "ananya@123",
    "ruchita.saroj@ipca.com": "ruchita@123",
    "user3@ipca.com": "user3@123",
    "user4@ipca.com": "user4@123"
};


interface AuthRequest {
    email: string;
    password?: string;
}


const schema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 4, nullable: true }
    },
    required: ["email", "password"],
    additionalProperties: false
} as const;


/**
 * Hashes a plain text password using SHA-256.
 */
const hashPassword = (password: string): string => {
    return createHash('sha256').update(password).digest('hex');
};


/**
 * Validates if a user has access based on hardcoded domain, whitelist, and hashed password.
 * No database required.
 */
export const isUserAuthorized = (email: string, password?: string): { success: boolean; message: string } => {
    const validate = ajv.compile(schema);
    const validFormat = validate({ email, password });


    if (!validFormat) {
        return { success: false, message: "Invalid input format. Email and password are required." };
    }


    const normalizedEmail = email.toLowerCase().trim();


    // 1. Check domain
    if (!normalizedEmail.endsWith('@ipca.com')) {
        return { success: false, message: "Access denied. Only @ipca.com domain is authorized." };
    }


    // 2. Verify whitelist and hashed password
    const storedHash = USER_CREDENTIALS[normalizedEmail];
    if (storedHash && password && hashPassword(password) === storedHash) {
        return { success: true, message: "Access granted." };
    }


    return {
        success: false,
        message: "Access denied. Invalid credentials or unauthorized user."
    };
};
