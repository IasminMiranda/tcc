import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default function Home() {
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // no-op
  }, [])

  async function callApi() {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/hello/')
      const json = await res.json()
      setMessage(json.message)
    } catch (err) {
      setMessage('Erro ao contactar backend')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Página Inicial
      </Typography>
      <Typography paragraph>
        Clique no botão para chamar o backend Flask-RESTX em `http://localhost:5000/api/hello/`.
      </Typography>
      <Button variant="contained" onClick={callApi} disabled={loading}>
        {loading ? 'Aguarde...' : 'Chamar backend'}
      </Button>

      {message && (
        <Typography sx={{ mt: 2 }} color="primary">
          {message}
        </Typography>
      )}
    </Box>
  )
}
