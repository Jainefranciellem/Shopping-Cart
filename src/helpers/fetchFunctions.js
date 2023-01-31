export const fetchProduct = async (ID) => {
  if (!ID) throw new Error('ID não informado');
  const getFetch = await fetch(`https://api.mercadolibre.com/items/${ID}`);
  const data = await getFetch.json();
  return data;
};

export const fetchProductsList = async (param) => {
  if (!param) throw new Error('Termo de busca não informado');
  const getFetch = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${param}`);
  const data = await getFetch.json();
  return data.results;
};
