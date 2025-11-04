import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { auth } from '../middleware/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const uploadBase = path.join(rootDir, 'uploads', 'profile')
fs.mkdirSync(uploadBase, { recursive: true })

const storage = multer.diskStorage({
  destination: function(req, file, cb){ cb(null, uploadBase) },
  filename: function(req, file, cb){
    const safe = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_')
    cb(null, Date.now() + '-' + safe)
  }
})
const upload = multer({ storage })

const r = Router()

// Upload profile image, returns public URL
r.post('/profile', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  const url = `/uploads/profile/${req.file.filename}`
  res.json({ url })
})

export default r
