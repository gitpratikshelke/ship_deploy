const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const {
  createShipment,
  getShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
} = require('../controllers/shipmentController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Shipment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         shipmentId:
 *           type: string
 *           example: SHP101
 *         companyName:
 *           type: string
 *           example: Global Cargo Ltd
 *         originPort:
 *           type: string
 *           example: Mumbai Port
 *         destinationPort:
 *           type: string
 *           example: Jebel Ali Port
 *         status:
 *           type: string
 *           enum: [Pending, In Transit, Delivered]
 *           example: Pending
 *         createdAt:
 *           type: string
 *     ShipmentInput:
 *       type: object
 *       required:
 *         - companyName
 *         - originPort
 *         - destinationPort
 *       properties:
 *         companyName:
 *           type: string
 *           example: Global Cargo Ltd
 *         originPort:
 *           type: string
 *           example: Mumbai Port
 *         destinationPort:
 *           type: string
 *           example: Jebel Ali Port
 *         status:
 *           type: string
 *           enum: [Pending, In Transit, Delivered]
 *           example: Pending
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/shipments:
 *   post:
 *     summary: Create a new shipment
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShipmentInput'
 *     responses:
 *       201:
 *         description: Shipment created successfully
 *       401:
 *         description: Not authorized
 */
router.post(
  '/',
  protect,
  body('companyName', 'Company name is required').notEmpty(),
  body('originPort', 'Origin port is required').notEmpty(),
  body('destinationPort', 'Destination port is required').notEmpty(),
  createShipment
);

/**
 * @swagger
 * /api/shipments:
 *   get:
 *     summary: Get all shipments for logged in user
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Pending, In Transit, Delivered]
 *         description: Filter by status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of shipments
 *       401:
 *         description: Not authorized
 */
router.get('/', protect, getShipments);

/**
 * @swagger
 * /api/shipments/{id}:
 *   get:
 *     summary: Get shipment by ID
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shipment details
 *       404:
 *         description: Shipment not found
 */
router.get('/:id', protect, getShipmentById);

/**
 * @swagger
 * /api/shipments/{id}:
 *   put:
 *     summary: Update a shipment
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShipmentInput'
 *     responses:
 *       200:
 *         description: Shipment updated
 *       404:
 *         description: Shipment not found
 */
router.put('/:id', protect, updateShipment);

/**
 * @swagger
 * /api/shipments/{id}:
 *   delete:
 *     summary: Delete a shipment
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shipment deleted
 *       404:
 *         description: Shipment not found
 */
router.delete('/:id', protect, deleteShipment);

module.exports = router;
