import Image from 'next/image';
import { useState } from 'react';
import { useUrl } from '@hooks/index';
import { SCREEN_ROUTES } from '@config/paths';
import Link from 'next/link';

export default function SearchBar() {
  const { goTo } = useUrl();
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    let value = searchText;
    if (searchText.includes(' ')) {
      value = searchText.replace(/ /g, '%20');
    }
    value !== '' && goTo(SCREEN_ROUTES.items.search(value));
    // debouncer with search real-time ddl options
  }
  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.key === 'Enter') handleSearch();
  }
  return (
    <div className='container-fluid bg-primary p-3'>
      <div className="row">
        <div className="col-md-1">
        </div>
        <div className='col-md-1 d-flex align-items-center justify-content-end'>
          <Link href={SCREEN_ROUTES.root}>
            <Image src='/static/logos/Logo_ML.png' alt='Logo_ML' width={50} height={34} style={{ cursor: 'pointer' }} />
          </Link>
        </div>
        <div className='col-md-9'>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Nunca dejes de buscar"
              style={{ fontSize: '18px', }}
              className='form-control'
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onKeyDown={e => handleKeyPress(e)}
            />
            <div style={{
              padding: '10px',
              width: '40px',
              height: '40px',
              position: 'absolute',
              right: 0,
              bottom: 0,
              cursor: 'pointer'
            }} onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
        <div className="col-md-1">
        </div>
      </div>
    </div>
  )
}
