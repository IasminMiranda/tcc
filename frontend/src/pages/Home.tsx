import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useCart } from '../CartContext'

interface Cupcake {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  sales_count: number
  stock: number
}

function isLoggedIn() {
  return !!localStorage.getItem('token')
}

function getUserRole() {
  const user = localStorage.getItem('user')
  if (!user) return null
  try {
    return JSON.parse(user).role || 'user'
  } catch {
    return 'user'
  }
}

export default function Home() {
  const [cupcakes, setCupcakes] = useState<Cupcake[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMsg, setSnackMsg] = useState('')
  const [snackSeverity, setSnackSeverity] = useState<'success'|'warning'>('success')
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantities, setQuantities] = useState<{[id: number]: number}>({})

  useEffect(() => {
    fetchTopCupcakes()
  }, [])

  async function fetchTopCupcakes() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('http://localhost:5000/api/cupcakes/top-selling')
      if (!res.ok) throw new Error('Erro ao buscar cupcakes')
      const data = await res.json()
      setCupcakes(data)
    } catch (err) {
      setError('Erro ao carregar cupcakes. Verifique se o backend está rodando.')
    } finally {
      setLoading(false)
    }
  }

  function handleQuantityChange(id: number, value: number) {
    const cupcake = cupcakes.find(c => c.id === id)
    const maxQty = cupcake ? cupcake.stock : 1
    setQuantities(q => ({ ...q, [id]: Math.max(1, Math.min(value, maxQty)) }))
  }

  function handleAddToCart(cupcake: Cupcake) {
    if (!isLoggedIn()) {
      setSnackMsg('Você precisa estar logado para comprar!')
      setSnackSeverity('warning')
      setSnackOpen(true)
      setTimeout(() => navigate('/login'), 1200)
      return
    }
    const qty = quantities[cupcake.id] || 1
    for (let i = 0; i < qty; i++) {
      addItem({
        id: cupcake.id,
        name: cupcake.name,
        price: cupcake.price,
        image_url: cupcake.image_url
      })
    }
    setSnackMsg(`${qty}x ${cupcake.name} adicionado ao carrinho!`)
    setSnackSeverity('success')
    setSnackOpen(true)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h3" component="h1" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
        🧁 Cupcake Factory
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, color: '#666' }}>
        Nossos 5 cupcakes mais vendidos da semana
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {cupcakes.length === 0 ? (
        <Typography>Nenhum cupcake encontrado.</Typography>
      ) : (
        <Grid container spacing={3}>
          {cupcakes.map((cupcake) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={cupcake.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 2, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-8px)', boxShadow: 4 } }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={cupcake.image_url}
                  alt={cupcake.name}
                  onError={(e: any) => {
                    e.target.src = 'https://via.placeholder.com/250?text=' + encodeURIComponent(cupcake.name)
                  }}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {cupcake.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {cupcake.description}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>
                    R$ {cupcake.price.toFixed(2)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Typography variant="body2" sx={{ minWidth: 80, color: 'text.secondary' }}>Quantidade:</Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <input
                        type="number"
                        min={1}
                        max={cupcake.stock}
                        value={quantities[cupcake.id] || 1}
                        onChange={e => handleQuantityChange(cupcake.id, Number(e.target.value))}
                        style={{
                          width: '56px',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: '1.5px solid #a259e6',
                          fontSize: '1rem',
                          textAlign: 'center',
                          background: '#f7f3ff',
                          color: '#6c2eb6',
                          boxShadow: '0 1px 2px rgba(162,89,230,0.08)',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={e => (e.target.style.borderColor = '#6c2eb6')}
                        onBlur={e => (e.target.style.borderColor = '#a259e6')}
                      />
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 'auto', backgroundColor: 'primary.main', '&:hover': { backgroundColor: '#a259e6' } }}
                    onClick={() => handleAddToCart(cupcake)}
                  >
                    Comprar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar open={snackOpen} autoHideDuration={2500} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: '100%' }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  )
}
