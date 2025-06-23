const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// نقطة استقبال الطلبات
app.post('/api/orders', (req, res) => {
    const order = req.body;

    fs.readFile('orders.json', 'utf8', (err, data) => {
        const orders = data ? JSON.parse(data) : [];

        orders.push(order);

        fs.writeFile('orders.json', JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                console.error('Failed to save order:', err);
                return res.status(500).json({ error: 'فشل حفظ الطلب' });
            }

            res.status(201).json({ message: 'تم إرسال الطلب بنجاح' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
