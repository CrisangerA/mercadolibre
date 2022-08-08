interface ItemPaginationProps {
  activePage: number;
  handleChangePage: (page: number) => void;
  pages: number;
}

export default function ItemPagination({ activePage, handleChangePage, pages }: ItemPaginationProps) {
  return (
    <div className='d-flex justify-content-center'>
      <nav>
        <ul className='pagination'>
          {
            Array.from({ length: pages }, (_, id) => id)
              .map((item, i) =>
                <li key={'index-' + i} className="page-item">
                  <a className={`page-link ${item === activePage && 'active'}`} href="#" onClick={() => handleChangePage(item)}>
                    {item + 1}
                  </a>
                </li>
              )
          }
        </ul>
      </nav>
    </div>
  )
}