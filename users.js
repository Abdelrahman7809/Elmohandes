const db = require('./db');

    async function saveUserPhone(phone) {
        try {
            const [results] = await db.execute(
                'INSERT INTO users (phone) VALUES (?) ON DUPLICATE KEY UPDATE phone = ?',
                [phone, phone]
            );
            return results.insertId;
        } catch (error) {
            console.error('Error saving user phone:', error);
            throw error;
        }
    }

    async function confirmUserPhone(phone) {
        try {
            const [results] = await db.execute(
                'UPDATE users SET is_phone_confirmed = TRUE WHERE phone = ?',
                [phone]
            );
            return results.affectedRows > 0;
        } catch (error) {
            console.error('Error confirming user phone:', error);
            throw error;
        }
    }

    async function isPhoneConfirmed(phone) {
        try {
            const [results] = await db.execute(
                'SELECT is_phone_confirmed FROM users WHERE phone = ?',
                [phone]
            );
            if (results.length > 0) {
                return results[0].is_phone_confirmed;
            }
            return false;
        } catch (error) {
            console.error('Error checking phone confirmation:', error);
            throw error;
        }
    }

    async function getUserIdByPhone(phone) {
        try {
            const [results] = await db.execute(
                'SELECT id FROM users WHERE phone = ?',
                [phone]
            );
            if (results.length > 0) {
                return results[0].id;
            }
            return null;
        } catch (error) {
            console.error('Error getting user ID:', error);
            throw error;
        }
    }

    module.exports = {
        saveUserPhone,
        confirmUserPhone,
        isPhoneConfirmed,
        getUserIdByPhone
    };