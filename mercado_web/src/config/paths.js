// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/";

// ----------------------------------------------------------------------

export const SCREEN_ROUTES = {
  root: '/',
  items: {
    search: (value) => path(ROOTS_DASHBOARD, 'items?search=' + value),
    detail: (id) => path(ROOTS_DASHBOARD, 'items/' + id)
  },
};
