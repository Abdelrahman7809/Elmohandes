const express = require('express');
    const bodyParser = require('body-parser');
    const users = require('./users'); // استيراد وحدات المستخدم
    const orders = require('./orders'); // استيراد وحدات الطلب
    const cors = require('cors');

    const app = express();
    const port = 3000;

    app.use(cors());
    app.use(bodyParser.json());

    //  نقاط نهاية المستخدمين
    app.post('/api/users/phone', async (req, res) => {
        try {
            const phone = req.body.phone;
            await users.saveUserPhone(phone);
            const verificationCode = '1234';  //  يجب إنشاء رمز التحقق وإرساله عبر الرسائل القصيرة
            res.json({ success: true, verificationCode: verificationCode });
        } catch (error) {
            res.status(500).json({ message: 'Error saving phone' });
        }
    });

    app.post('/api/users/verify', async (req, res) => {
        try {
            const { phone, code } = req.body;
            if (code === '1234') {  //  يجب التحقق من الرمز الفعلي
                await users.confirmUserPhone(phone);
                res.json({ success: true });
            } else {
                res.status(400).json({ message: 'Invalid verification code' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error verifying phone' });
        }
    });

    app.post('/api/users/is-phone-confirmed', async (req, res) => {
        try {
            const phone = req.body.phone;
            const isConfirmed = await users.isPhoneConfirmed(phone);
            res.json({ isConfirmed });
        } catch (error) {
            res.status(500).json({ message: 'Error checking phone confirmation' });
        }
    });

    //  نقاط نهاية الطلبات
    app.post('/api/orders', async (req, res) => {
        try {
            const { userPhone, cartItems } = req.body;
            const userId = await users.getUserIdByPhone(userPhone);
            if (!userId) {
                return res.status(404).json({ message: 'User not found' });
            }
            const orderId = await orders.createOrder(userId, cartItems);
            res.json({ success: true, orderId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating order' });
        }
    });

    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });