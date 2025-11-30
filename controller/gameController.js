import pustakaGame from '../data.js'; 

const getNewId = () => {
  return pustakaGame.length ? Math.max(...pustakaGame.map(g => g.id)) + 1 : 1;
};

export const tambahGame = (req, res) => {
  try {
    const { judul, genre, platform, status } = req.body;
    if (!judul || !genre || !platform || !status) {
      return res.status(400).json({
        message: "Semua kolom (judul, genre, platform, status) wajib diisi."
      });
    }

    const newGame = {
      id: getNewId(),
      judul,
      genre,
      platform,
      status
    };

    pustakaGame.push(newGame);
    res.status(201).json({
      message: "Game berhasil ditambahkan!",
      data: newGame
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan game.",
      error: error.message
    });
  }
};

export const lihatSemuaGame = (req, res) => {
  try {
    const { platform } = req.query; 

    let games = pustakaGame;
    if (platform) {
      games = pustakaGame.filter(g => g.platform.toLowerCase() === platform.toLowerCase());
      if (games.length === 0) {
        return res.status(200).json({
          message: `Tidak ada game di platform ${platform}.`,
          data: []
        });
      }
    }

    res.status(200).json({
      message: platform ? `Daftar game di platform ${platform}` : "Daftar semua game",
      jumlah: games.length,
      data: games
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data game.",
      error: error.message
    });
  }
};

export const lihatGameById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const game = pustakaGame.find(g => g.id === id);

    if (!game) {
      return res.status(404).json({
        message: `Game dengan ID ${id} tidak ditemukan.`
      });
    }

    res.status(200).json({
      message: "Game ditemukan.",
      data: game
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data game.",
      error: error.message
    });
  }
};

export const updateStatusGame = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body; 
    const statusValidLowercase = ["Sudah Tamat", "Sedang Dimainkan", "Belum Dimainkan"];
    const statusForValidation = statusInput ? statusInput.toLowerCase() : '';

    if (!status) {
      return res.status(400).json({
        message: "Status baru wajib diisi."
      });
    }

    if (!statusValidLowercase.includes(statusForValidation)) {
      const statusValidDisplay = ["Sudah Tamat", "Sedang Dimainkan", "Belum Dimainkan"];
      return res.status(400).json({
        message: `Status tidak valid: "${statusInput}". Status yang diizinkan: ${statusValidDisplay.join(', ')}.`
      });
    }
    const gameIndex = pustakaGame.findIndex(g => g.id === id);

    if (gameIndex === -1) {
      return res.status(404).json({
        message: `Game dengan ID ${id} tidak ditemukan.`
      });
    }

    const oldStatus = pustakaGame[gameIndex].status;
    pustakaGame[gameIndex].status = status;

    res.status(200).json({
      message: `Status game "${pustakaGame[gameIndex].judul}" berhasil diubah dari "${oldStatus}" menjadi "${status}".`,
      data: pustakaGame[gameIndex]
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengupdate status game.",
      error: error.message
    });
  }
};

export const hapusGame = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const gameIndex = pustakaGame.findIndex(g => g.id === id);

    if (gameIndex === -1) {
      return res.status(404).json({
        message: `Game dengan ID ${id} tidak ditemukan.`
      });
    }

    const [deletedGame] = pustakaGame.splice(gameIndex, 1);
    res.status(200).json({
      message: `Game "${deletedGame.judul}" berhasil dihapus.`,
      data: deletedGame
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus game.",
      error: error.message
    });
  }
};