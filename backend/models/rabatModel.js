import mongoose from 'mongoose';
import { orderStatusMess } from '../variables.js';

const rabatSchema = new mongoose.Schema({
	rabatCode: {
		type: String,
		required: true,
		unique: true,
	},
    rabatValue: {
		type: String,
		required: true,
	},
	rabatCodeExpiresAt: {
		type: Date
	},
	emailArr: { type: Array, default: ['all'] },
});

const rabatModel =
	mongoose.models.rabat || mongoose.model('rabat', rabatSchema);

export default rabatModel;
