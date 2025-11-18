import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import HomeIcon from '@mui/icons-material/Home'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import UserManagement from './pages/UserManagement'
import StockManagement from './pages/StockManagement'
import { CartProvider, useCart } from './CartContext'

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, clearCart } = useCart()
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const [checkoutOpen, setCheckoutOpen] = React.useState(false)
  const [payment, setPayment] = React.useState('cartao')
  const [confirmed, setConfirmed] = React.useState(false)

  function handleCheckout() {
    setCheckoutOpen(true)
  }
  async function handleConfirm() {
    setConfirmed(true)
    // Atualiza estoque no backend
    try {
      await Promise.all(items.map(item =>
        fetch(`http://localhost:5000/api/cupcakes/${item.id}/reduce-stock`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: item.quantity })
        })
      ))
    } catch (err) {
      // erro pode ser tratado aqui
    }
    clearCart()
  }
  function handleCloseCheckout() {
    setCheckoutOpen(false)
    setConfirmed(false)
  }

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 420, p: 3, position: 'relative' }}>
          <Button onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, minWidth: 32, padding: 0, borderRadius: '50%', background: '#f7f3ff', color: 'primary.main', boxShadow: 1 }} aria-label="Fechar">
            <span style={{ fontSize: 22, fontWeight: 700 }}>&times;</span>
          </Button>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Carrinho de Compras
          </Typography>
          <Divider />
          <List>
            {items.length === 0 ? (
              <ListItem>
                <ListItemText primary="Carrinho vazio" />
              </ListItem>
            ) : (
              items.map((item) => (
                <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
                  <img src={item.image_url} alt={item.name} style={{ width: 56, height: 56, marginRight: 16, borderRadius: 10, objectFit: 'cover', boxShadow: '0 1px 4px rgba(162,89,230,0.10)' }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'primary.main' }}>{item.name} <span style={{ color: '#888', fontWeight: 400 }}>x{item.quantity}</span></Typography>
                    <Typography variant="body2" sx={{ color: '#6c2eb5', fontWeight: 500 }}>R$ {(item.price * item.quantity).toFixed(2)}</Typography>
                  </Box>
                  <Button color="error" size="small" variant="outlined" sx={{ ml: 2, minWidth: 80 }} onClick={() => removeItem(item.id)}>
                    Remover
                  </Button>
                </ListItem>
              ))
            )}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Total: <b style={{ color: '#6c2eb5' }}>R$ {total.toFixed(2)}</b>
          </Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }} disabled={items.length === 0} onClick={handleCheckout}>
            Finalizar compra
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={clearCart} disabled={items.length === 0}>
            Limpar carrinho
          </Button>
        </Box>
      </Drawer>
      <Dialog open={checkoutOpen} onClose={handleCloseCheckout}>
        <DialogTitle>Finalizar compra</DialogTitle>
        <DialogContent>
          {confirmed ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                Pedido realizado com sucesso!
              </Typography>
              <Typography>Obrigado por comprar na Cupcake Factory 🎉</Typography>
            </Box>
          ) : (
            <>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Selecione o método de pagamento:
              </Typography>
              <RadioGroup value={payment} onChange={e => setPayment(e.target.value)}>
                <FormControlLabel value="cartao" control={<Radio />} label="Cartão de crédito" />
                <FormControlLabel value="pix" control={<Radio />} label="Pix" />
                <FormControlLabel value="boleto" control={<Radio />} label="Boleto" />
              </RadioGroup>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Resumo do pedido:</Typography>
              <List>
                {items.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.name} x${item.quantity}`} secondary={`R$ ${(item.price * item.quantity).toFixed(2)}`} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Total: <b style={{ color: '#6c2eb5' }}>R$ {total.toFixed(2)}</b>
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {confirmed ? (
            <Button onClick={handleCloseCheckout} color="primary">Fechar</Button>
          ) : (
            <>
              <Button onClick={handleCloseCheckout}>Cancelar</Button>
              <Button onClick={handleConfirm} variant="contained" color="primary">Confirmar pedido</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

function AppContent() {
  const { items } = useCart()
  const [cartOpen, setCartOpen] = React.useState(false)
  const user = React.useMemo(() => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  }, [localStorage.getItem('user')])
  const [adminMenuAnchor, setAdminMenuAnchor] = React.useState<null | HTMLElement>(null);
  const handleAdminMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAdminMenuAnchor(event.currentTarget);
  };
  const handleAdminMenuClose = () => {
    setAdminMenuAnchor(null);
  };
  return (
    <BrowserRouter>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Cupcake Factory
            </Typography>
            {user && user.role === 'admin' && (
              <>
                <IconButton color="inherit" sx={{ mr: 2 }} title="Administração" onClick={handleAdminMenuOpen}>
                  <AdminPanelSettingsIcon />
                </IconButton>
                <Menu anchorEl={adminMenuAnchor} open={!!adminMenuAnchor} onClose={handleAdminMenuClose}>
                  <MenuItem component={Link} to="/users" onClick={handleAdminMenuClose}>Gerenciar usuários</MenuItem>
                  <MenuItem component={Link} to="/stock" onClick={handleAdminMenuClose}>Gerenciar estoque</MenuItem>
                </Menu>
              </>
            )}
            <IconButton color="inherit" onClick={() => setCartOpen(true)}>
              <Badge badgeContent={items.reduce((sum, i) => sum + i.quantity, 0)} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </Toolbar>
        </AppBar>
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/stock" element={<StockManagement />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}
