import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

interface Cupcake {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  sales_count: number;
  stock: number;
}

export default function StockManagement() {
  const [cupcakes, setCupcakes] = useState<Cupcake[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [snackSeverity, setSnackSeverity] = useState<'success'|'error'>('success');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCupcake, setNewCupcake] = useState({
    name: '', description: '', price: '', image_url: '', stock: ''
  });

  useEffect(() => {
    fetchCupcakes();
  }, []);

  async function fetchCupcakes() {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/cupcakes/top-selling');
      if (!res.ok) throw new Error('Erro ao buscar cupcakes');
      const data = await res.json();
      setCupcakes(data);
    } catch {
      setSnackMsg('Erro ao carregar cupcakes');
      setSnackSeverity('error');
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleStockChange(id: number, delta: number) {
    try {
      const res = await fetch(`http://localhost:5000/api/cupcakes/${id}/update-stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delta })
      });
      if (!res.ok) throw new Error('Erro ao atualizar estoque');
      setSnackMsg('Estoque atualizado!');
      setSnackSeverity('success');
      setSnackOpen(true);
      fetchCupcakes();
    } catch {
      setSnackMsg('Erro ao atualizar estoque');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  }

  async function handleAddCupcake() {
    try {
      const res = await fetch('http://localhost:5000/api/cupcakes/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCupcake.name,
          description: newCupcake.description,
          price: parseFloat(newCupcake.price),
          image_url: newCupcake.image_url,
          stock: parseInt(newCupcake.stock)
        })
      });
      if (!res.ok) throw new Error('Erro ao cadastrar cupcake');
      setSnackMsg('Cupcake cadastrado!');
      setSnackSeverity('success');
      setSnackOpen(true);
      setDialogOpen(false);
      setNewCupcake({ name: '', description: '', price: '', image_url: '', stock: '' });
      fetchCupcakes();
    } catch {
      setSnackMsg('Erro ao cadastrar cupcake');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
        Gerenciamento de Estoque
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setDialogOpen(true)}>
          Cadastrar novo cupcake
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Estoque</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cupcakes.map((cupcake) => (
                <TableRow key={cupcake.id}>
                  <TableCell>{cupcake.id}</TableCell>
                  <TableCell>{cupcake.name}</TableCell>
                  <TableCell>{cupcake.stock}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" color="success" size="small" sx={{ mr: 1 }} onClick={() => handleStockChange(cupcake.id, 1)}>
                      +1
                    </Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => handleStockChange(cupcake.id, -1)}>
                      -1
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Cadastrar novo cupcake</DialogTitle>
        <DialogContent>
          <TextField label="Nome" fullWidth sx={{ mb: 2 }} value={newCupcake.name} onChange={e => setNewCupcake({ ...newCupcake, name: e.target.value })} />
          <TextField label="Descrição" fullWidth sx={{ mb: 2 }} value={newCupcake.description} onChange={e => setNewCupcake({ ...newCupcake, description: e.target.value })} />
          <TextField label="Preço" type="number" fullWidth sx={{ mb: 2 }} value={newCupcake.price} onChange={e => setNewCupcake({ ...newCupcake, price: e.target.value })} />
          <TextField label="URL da imagem" fullWidth sx={{ mb: 2 }} value={newCupcake.image_url} onChange={e => setNewCupcake({ ...newCupcake, image_url: e.target.value })} />
          <TextField label="Estoque inicial" type="number" fullWidth sx={{ mb: 2 }} value={newCupcake.stock} onChange={e => setNewCupcake({ ...newCupcake, stock: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddCupcake} variant="contained" color="primary">Cadastrar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackOpen} autoHideDuration={2500} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: '100%' }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
