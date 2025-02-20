"use server"

import config from "@/app/config";
import { GenerateEmailInput, CreateEmailInput, GetEmailsInput, UpdateEmailInput } from "@/services/constants";
import { cookies } from 'next/headers'
import { renewToken } from "../auth";

const API_MODEL_URL = config.MODEL_SERVER;
const API_SERVER_URL = config.API_SERVER;
const MAX_NUMBER_OF_TRIES = 3

export const generateEmail = async (generateEmailInput: GenerateEmailInput): Promise<{ data: any; ok: boolean }> => {
    try {
        for (let tries = 0; tries < MAX_NUMBER_OF_TRIES; tries++) {
            const cookieStore = await cookies();
            const accessToken = cookieStore.get('access_token')?.value;
            const userId = cookieStore.get('user_id')?.value;

            const response = await fetch(`${API_MODEL_URL}/email_generate`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId,
                    ...generateEmailInput,
                    access_token: accessToken
                }),
            });
            const data = await response.json();

            if (response.ok === true) {
                return { data, ok: response.ok };
            } else {
                await renewToken();
            }
        }
    } catch (error) {
        console.error('Cannot generate info:', error);
        throw error;
    }
    return { data: null, ok: false };
};

export const createEmail = async (createEmailInput: CreateEmailInput) => {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('user_id')?.value;

        const response = await fetch(`${API_SERVER_URL}/create_email`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                ...createEmailInput
            }),
        });
        const data = await response.json();

        return { data, ok: response.ok };
    } catch (error) {
        console.error('Cannot get the profile info:', error);
        throw error;
    }
}


export const getEmail = async (id: string) => {
    try {
        const response = await fetch(`${API_SERVER_URL}/get_email/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });
        const data = await response.json();

        return { data, ok: response.ok };
    } catch (error) {
        console.error('Cannot get the email info:', error);
        throw error;
    }
}

export const getEmails = async (getEmailsInput: GetEmailsInput) => {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('user_id')?.value;
        const response = await fetch(`${API_SERVER_URL}/get_emails/${userId}/page/${getEmailsInput.page}/limit/${getEmailsInput.limit}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });
        const data = await response.json();

        return { data, ok: response.ok };
    } catch (error) {
        console.error('Cannot get the email info:', error);
        throw error;
    }
}

export const updateEmail = async (id: string, UpdateEmailInput: UpdateEmailInput): Promise<{ data: any; ok: boolean }> => {
    try {
        for (let tries = 0; tries < MAX_NUMBER_OF_TRIES; tries++) {
            const cookieStore = await cookies();
            const userId = cookieStore.get('user_id')?.value;

            const response = await fetch(`${API_SERVER_URL}/update_email/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId,
                    ...UpdateEmailInput
                }),
            });
            const data = await response.json();

            if (response.ok === true) {
                return { data, ok: response.ok };
            } else {
                await renewToken();
            }
        }
    } catch (error) {
        console.error('Cannot get the email info:', error);
        throw error;
    }
    return { data: null, ok: false };
}