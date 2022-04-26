export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(query) {
  const urlQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  // const urlCategoryId = 'https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID';
  // const urlCategoryIdQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(urlQuery);
  const data = await response.json();
  return data;
}
