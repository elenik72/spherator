import http from 'http'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicFolder = path.join(__dirname, 'dist')

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
}

const NOT_FOUND = 404
const SERVER_ERROR = 500

const PORT = 8000

const server = http.createServer(async (req, res) => {
  try {
    const filePath = path.join(publicFolder, req.url === '/' ? 'index.html' : req.url)
    const extname = path.extname(filePath)
    const contentType = mimeTypes[extname]

    const content = await fs.readFile(filePath)
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(content, 'utf-8')
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(NOT_FOUND)
      res.end('<h1>404 Not Found</h1>', 'utf-8')
    } else {
      res.writeHead(SERVER_ERROR)
      res.end(`Server Error: ${err.code}`)
    }
  }
})
 
server.listen(PORT, () => {
   
  console.log(`Server running on port ${PORT}`)
})
