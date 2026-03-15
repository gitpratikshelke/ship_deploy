const mongoose = require('mongoose');
const shipmentSchema = new mongoose.Schema(
  {
    shipmentId: {
      type: String,
      unique: true,
    },
    companyName: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true,
    },
    originPort: {
      type: String,
      required: [true, 'Please add an origin port'],
      trim: true,
    },
    destinationPort: {
      type: String,
      required: [true, 'Please add a destination port'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Transit', 'Delivered'],
      default: 'Pending',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

shipmentSchema.pre('save', async function () {
  if (!this.shipmentId) {
    const count = await this.constructor.countDocuments();
    this.shipmentId = `SHP${String(count + 101).padStart(3, '0')}`;
  }
});

module.exports = mongoose.model('Shipment', shipmentSchema);