import express from 'express';
import {
  tambahGame,
  lihatSemuaGame,
  lihatGameById,
  updateStatusGame,
  hapusGame
} from "../controller/gameController.js";

const router = express.Router();

router.post('/games', tambahGame);
router.get('/games', lihatSemuaGame);
router.get('/games/:id', lihatGameById);
router.patch('/games/:id', updateStatusGame);
router.delete('/games/:id', hapusGame);

export default router; 