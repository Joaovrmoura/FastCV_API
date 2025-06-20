export default (_req, res, _next) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada' });
}