app.get('/api/importar-coasters', async (req, res) => {
  const resultado = await ejecutarScraperRCDB(); // función que scrapea y sube
  res.json({ subidos: resultado.length });
});
