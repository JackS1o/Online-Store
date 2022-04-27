export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlCategoryIdQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(urlCategoryIdQuery);
  const data = await response.json();
  return data;
}

export async function getProductsFromQuery(query) {
  const urlQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(urlQuery);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryId(categoryId) {
  const urlCategoryId = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(urlCategoryId);
  const data = await response.json();
  return data;
}
