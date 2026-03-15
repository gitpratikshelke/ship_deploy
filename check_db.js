const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');
const Shipment = require('./models/Shipment');

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('--- DATABASE AUDIT ---');

        const users = await User.find({}, 'name email role');
        console.log(`TOTAL USERS: ${users.length}`);
        users.forEach(u => console.log(`- ${u.name} (${u.email}) [${u.role}] ID: ${u._id}`));

        const shipments = await Shipment.find({});
        console.log(`\nTOTAL SHIPMENTS: ${shipments.length}`);
        shipments.forEach(s => {
            console.log(`- ${s.shipmentId}: ${s.companyName} | Owner: ${s.user} | Status: ${s.status}`);
        });

        console.log('--- END AUDIT ---');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkDB();