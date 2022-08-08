import Product from 'src/models/product';
import IDataSource from 'src/datasource';

const mockProduct = {
  health: null,
  video_id: null,
  id: 'MCO870741170',
  site_id: 'MCO',
  title: 'Apple iPhone 12 64 Gb - Negro - Garantía 1 Año - Factura',
  subtitle: null,
  seller_id: 1015682238,
  category_id: 'MCO1055',
  official_store_id: null,
  price: 4100900,
  base_price: 4100900,
  original_price: null,
  currency_id: 'COP',
  initial_quantity: 1,
  available_quantity: 1,
  sold_quantity: 0,
  sale_terms: [
    {
      id: 'WARRANTY_TYPE',
      name: 'Tipo de garantía',
      value_id: '2230280',
      value_name: 'Garantía del vendedor',
      value_struct: null,
      values: []
    },
  ],
  buying_mode: 'buy_it_now',
  listing_type_id: 'gold_pro',
  start_time: new Date('2022-03-16T03:56:55.000Z'),
  stop_time: new Date('2042-03-10T04:00:00.000Z'),
  condition: 'new',
  permalink: 'https://articulo.mercadolibre.com.co/MCO-870741170-apple-iphone-12-64-gb-negro-garantia-1-ano-factura-_JM',
  thumbnail_id: '732171-MLA46153583466_052021',
  thumbnail: 'http://http2.mlstatic.com/D_732171-MLA46153583466_052021-I.jpg',
  secure_thumbnail: 'https://http2.mlstatic.com/D_732171-MLA46153583466_052021-I.jpg',
  pictures: [
    {
      id: '732171-MLA46153583466_052021',
      url: 'http://http2.mlstatic.com/D_732171-MLA46153583466_052021-O.jpg',
      secure_url: 'https://http2.mlstatic.com/D_732171-MLA46153583466_052021-O.jpg',
      size: '250x500',
      max_size: '600x1200',
      quality: ''
    },
  ],
  descriptions: [],
  accepts_mercadopago: true,
  non_mercado_pago_payment_methods: [],
  shipping: {
    mode: 'me2',
    methods: [],
    tags: ['self_service_in', 'mandatory_free_shipping'],
    dimensions: null,
    local_pick_up: true,
    free_shipping: true,
    logistic_type: 'drop_off',
    store_pick_up: false
  },
  international_delivery_mode: 'none',
  seller_address: {
    city: { id: 'TUNPQ0ZPTjcyNzAz', name: 'Fontibón' },
    state: { id: 'CO-DC', name: 'Bogotá D.C.' },
    country: { id: 'CO', name: 'Colombia' },
    search_location: { city: { id: '', name: '' }, state: { id: '', name: '' }, neighborhood: { id: '', name: '' } },
    id: 1200320379
  },
  seller_contact: null,
  location: {},
  coverage_areas: [],
  attributes: [
    {
      id: 'BATTERY_TYPE',
      name: 'Tipo de batería',
      value_id: '95013',
      value_name: 'Ion de litio',
      value_struct: null,
      values: [],
    },
  ],
  warnings: [],
  listing_source: '',
  variations: [
    {
      id: 174307642688,
      price: 4100900,
      attribute_combinations: [Array],
      available_quantity: 1,
      sold_quantity: 0,
      sale_terms: [],
      picture_ids: [Array],
      catalog_product_id: 'MCO16163648'
    }
  ],
  status: 'active',
  sub_status: [],
  tags: [
    'good_quality_picture',
    'good_quality_thumbnail',
    'immediate_payment',
    'cart_eligible'
  ],
  warranty: 'Garantía del vendedor: 12 meses',
  catalog_product_id: 'MCO16163646',
  domain_id: 'MCO-CELLPHONES',
  parent_item_id: null,
  differential_pricing: null,
  deal_ids: [],
  automatic_relist: false,
  date_created: new Date('2022-03-16T03:56:55.000Z'),
  last_updated: new Date('2022-07-05T22:26:12.000Z'),
  catalog_listing: false,
  channels: ['marketplace', 'mshops'],
  description: { text: '', plain_text: '', snapshot: { height: 1, width: 2, url: '', status: '' }, last_updated: new Date(), date_created: new Date() }
}

class MockDataSourceService implements IDataSource<Product> {
  GetById(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  GetDescriptionById<T>(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  SearchItem<T>(value: string): Promise<T> {
    throw new Error('Method not implemented.');
  }

}

describe('Mercado Libre Data Source', () => {
  let mockDataSourceService: MockDataSourceService;

  beforeAll(() => {
    mockDataSourceService = new MockDataSourceService();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /items", () => {

    test("GetById should return success", async () => {
      const ExpectedData = mockProduct;
      jest.spyOn(mockDataSourceService, "GetById").mockImplementation(() => Promise.resolve(ExpectedData))
      const response = await mockDataSourceService.GetById('MLD12D2');
      expect(response).toStrictEqual(ExpectedData)
    });
    test("SearchItem should return success", async () => {
      const ExpectedData = [mockProduct];
      jest.spyOn(mockDataSourceService, "SearchItem").mockImplementation(() => Promise.resolve(ExpectedData))
      const response = await mockDataSourceService.SearchItem('Samsung');
      expect(response).toStrictEqual(ExpectedData)
    });
  })

});