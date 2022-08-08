const API_ROUTES = {
  port: process.env.NEXT_PUBLIC_API_PORT || '10369',
  root: process.env.NEXT_PUBLIC_API_URL || 'localhost', 
  items: {
    search: (value) => '/api/items?q=' + value,
    detail: (id) => '/api/items/' + id,
  }
}
export default API_ROUTES;
