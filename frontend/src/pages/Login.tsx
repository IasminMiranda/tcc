import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [regUser, setRegUser] = useState('')
  const [regPass, setRegPass] = useState('')
  const [regCep, setRegCep] = useState('')
  const [regStreet, setRegStreet] = useState('')
  const [regNumber, setRegNumber] = useState('')
  const [regComplement, setRegComplement] = useState('')
  const [regCity, setRegCity] = useState('')
  const [regMsg, setRegMsg] = useState('')
  const [successSnack, setSuccessSnack] = useState(false)
  const navigate = useNavigate()

  function isValidPassword(pw: string) {
    return pw.length > 6 && /\d/.test(pw)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.message || 'Erro no login')
        return
      }
      // Simula role: se username for 'admin', role = 'admin', senão 'user'
      const role = json.user?.username === 'admin' ? 'admin' : 'user'
      localStorage.setItem('token', json.token)
      localStorage.setItem('user', JSON.stringify({ ...json.user, role }))
      navigate('/')
    } catch (err) {
      setError('Erro ao contactar backend')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister() {
    if (!regUser || !regPass || !regCep || !regStreet || !regNumber || !regCity) {
      setRegMsg('Preencha todos os campos')
      return
    }
    if (!isValidPassword(regPass)) {
      setRegMsg('A senha deve ter mais de 6 caracteres e conter pelo menos um número')
      return
    }
    setRegMsg('')
    try {
      const res = await fetch('http://localhost:5000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: regUser, password: regPass, cep: regCep, street: regStreet, number: regNumber, complement: regComplement, city: regCity})
      })
      const json = await res.json()
      if (!res.ok) {
        setRegMsg(json.message || 'Erro ao cadastrar')
        return
      }
      setRegMsg('Usuário cadastrado com sucesso!')
      setSuccessSnack(true)
      setTimeout(() => {
        setRegisterOpen(false)
        setRegUser('')
        setRegPass('')
        setRegCep('')
        setRegStreet('')
        setRegNumber('')
        setRegComplement('')
        setRegCity('')
        setRegMsg('')
        navigate('/')
      }, 1500)
    } catch {
      setRegMsg('Erro ao contactar backend')
    }
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={submit}>
        <TextField
          label="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Aguarde...' : 'Entrar'}
          </Button>
          <Button variant="outlined" onClick={() => setRegisterOpen(true)}>
            Cadastrar novo usuário
          </Button>
        </Box>
      </form>
      <Typography sx={{ mt: 3, textAlign: 'center', color: 'text.secondary' }}>
        Ainda não é cadastrado? Se inscreva agora!
      </Typography>
      <Dialog open={registerOpen} onClose={() => setRegisterOpen(false)}>
        <DialogTitle>Cadastrar novo usuário</DialogTitle>
        <DialogContent>
          <TextField
            label="Usuário"
            value={regUser}
            onChange={e => setRegUser(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Senha"
            type="password"
            value={regPass}
            onChange={e => setRegPass(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="CEP"
            value={regCep}
            onChange={e => setRegCep(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Rua"
            value={regStreet}
            onChange={e => setRegStreet(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Número"
            value={regNumber}
            onChange={e => setRegNumber(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Complemento"
            value={regComplement}
            onChange={e => setRegComplement(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Cidade"
            value={regCity}
            onChange={e => setRegCity(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {regMsg && (
            <Typography color={regMsg.includes('sucesso') ? 'primary' : 'error'} sx={{ mt: 1 }}>
              {regMsg}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRegisterOpen(false)}>Cancelar</Button>
          <Button onClick={handleRegister} variant="contained">Cadastrar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={successSnack} autoHideDuration={2500} onClose={() => setSuccessSnack(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSuccessSnack(false)} severity="success" sx={{ width: '100%' }}>
          Usuário cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  )
}
