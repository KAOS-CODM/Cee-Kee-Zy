import multer from "multer";

const allowed = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
]);

export const uploadImages = multer({

    storage: multer.memoryStorage(),

    fileFilter: (_req, file, cb) => {

        if (!allowed.has(file.mimetype)) {
            cb(null, false);
            return;
        }

        cb(null, true);

    },

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 6,
    },

});

/*import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';

const allowed = new Set(['image/jpeg', 'image/png', 'image/webp']);

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const uploadDir = process.env.UPLOAD_DIR ? path.resolve(process.env.UPLOAD_DIR) : path.resolve('uploads');
ensureDir(uploadDir);

export const uploadImages = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const ext = file.mimetype === 'image/png' ? 'png' : file.mimetype === 'image/webp' ? 'webp' : 'jpg';
      const safe = file.originalname.replace(/[^a-zA-Z0-9.]/g, '');
      const base = safe.replace(/\.[^/.]+$/, '');
      cb(null, `${base}-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`);
    },
  }),
  fileFilter: (_req, file, cb) => {
    if (!allowed.has(file.mimetype)) {
      // reject the file (do not accept)
      cb(null, false);
      return;
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024, files: 6 },
});

*/