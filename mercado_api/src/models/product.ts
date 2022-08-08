interface Author {
  name: string;
  lastName: string;
}
interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

export class ProductDTO {
  //product: IProductDTO
  author: Author; id: string; title: string; price: Price; picture: string; condition: string; freeShipping: boolean; soldQuantity: number; description: string;
  constructor(author: Author, id: string, title: string, price: Price, picture: string, condition: string, freeShipping: boolean, soldQuantity: number, description: string) {
    this.author = author;
    this.id = id;
    this.title = title;
    this.price = price;
    this.picture = picture;
    this.condition = condition;
    this.freeShipping = freeShipping;
    this.soldQuantity = soldQuantity;
    this.description = description;
  }

  static MapFromProduct(product: Product): ProductDTO {
    return new ProductDTO(
      {
        name: 'Generic',
        lastName: 'Vendor'
      },
      product.id,
      product.title,
      {
        amount: product.price,
        currency: product.currency_id,
        decimals: 0
      },
      product.pictures?.find(p => p)?.secure_url || '',
      product.condition,
      product.shipping?.free_shipping,
      product.sold_quantity,
      product.description?.plain_text || ''
    );
  }
  static MapFromIProduct(product: IProduct): ProductDTO {
    return new ProductDTO(
      {
        name: product.address?.state_name || '', lastName: product.address?.city_name || ''
      },
      product.id,
      product.title,
      {
        amount: product.price,
        currency: product.currency_id,
        decimals: 0
      },
      product.thumbnail,
      product.condition,
      product.shipping?.free_shipping,
      product.sold_quantity,
      ''
    );
  }
}

export class ProductsDTO {
  author: Author;
  categories: string[];
  items: ProductDTO[];

  constructor(author: Author, categories: string[], items: ProductDTO[]) {
    this.author = author;
    this.categories = categories;
    this.items = items;
  }
  static MapFromProducts(products: Products): ProductsDTO {
    return new ProductsDTO(
      {
        name: 'Generic',
        lastName: 'Vendor'
      },
      products.filters.filter(f => f.id === 'category').flatMap(f => f.values.flatMap(v => v.path_from_root)).map(p => p.name),
      products.results.map(prod => ProductDTO.MapFromIProduct(prod))
    );
  }
}

// --------------------------------------------------------------------------------
interface Paging {
  total: number;
  primary_results: number;
  offset: number;
  limit: number;
}
interface Sort {
  id: string;
  name: string;
}
interface FilterValue {
  id: string;
  name: string;
  path_from_root: Sort[];
}
interface AvailableFilterValue {
  id: string;
  name: string;
  results: number;
}
interface AvailableFilter {
  id: string;
  name: string;
  type: AvailableFilterType;
  values: AvailableFilterValue[];
}
enum AvailableFilterType {
  Boolean = "boolean",
  List = "list",
  Range = "range",
  String = "STRING",
  Text = "text",
}
interface Filter {
  id: string;
  name: string;
  type: AvailableFilterType;
  values: FilterValue[];
}
export interface Products {
  site_id: string;
  country_default_time_zone: string;
  query: string;
  paging: Paging;
  results: IProduct[];
  sort: Sort;
  available_sorts: Sort[];
  filters: Filter[];
  available_filters: AvailableFilter[];
}
interface Installments {
  quantity: number;
  amount: number;
  rate: number;
  currency_id: string;
}
interface Seller {
  id: number;
  permalink: null;
  registration_date: null;
  car_dealer: boolean;
  real_estate_agency: boolean;
  tags: null;
}
interface Prices {
  id: string;
  prices: Price[];
  presentation: any;
  payment_method_prices: any[];
  reference_prices: any[];
  purchase_discounts: any[];
}
interface Address {
  state_id: string;
  state_name: string;
  city_id: string;
  city_name: string;
}

export interface IProduct {
  id: string;
  site_id: string;
  title: string;
  seller: Seller;
  price: number;
  prices: Prices;
  sale_price: null;
  currency_id: string;
  available_quantity: number;
  sold_quantity: number;
  buying_mode: string;
  listing_type_id: string;
  stop_time: Date;
  condition: string;
  permalink: string;
  thumbnail: string;
  thumbnail_id: string;
  accepts_mercadopago: boolean;
  installments: Installments;
  address: Address;
  shipping: Shipping;
  seller_address: SellerAddress;
  attributes: Attribute[];
  original_price: null;
  category_id: string;
  official_store_id: null;
  domain_id: string;
  catalog_product_id: string;
  tags: string[];
  catalog_listing: boolean;
  use_thumbnail_id: boolean;
  offer_score: null;
  offer_share: null;
  match_score: null;
  winner_item_id: null;
  melicoin: null;
  discounts: null;
  order_backend: number;
}

// ------------------------------------------------------------------
export default interface Product {
  id: string;
  site_id: string;
  title: string;
  subtitle: null;
  seller_id: number;
  category_id: string;
  official_store_id: null;
  price: number;
  base_price: number;
  original_price: null;
  currency_id: string;
  initial_quantity: number;
  available_quantity: number;
  sold_quantity: number;
  sale_terms: Attribute[];
  buying_mode: string;
  listing_type_id: string;
  start_time: Date;
  stop_time: Date;
  condition: string;
  permalink: string;
  thumbnail_id: string;
  thumbnail: string;
  secure_thumbnail: string;
  pictures: Picture[];
  video_id: null;
  descriptions: any[];
  accepts_mercadopago: boolean;
  non_mercado_pago_payment_methods: any[];
  shipping: Shipping;
  international_delivery_mode: string;
  seller_address: SellerAddress;
  seller_contact: null;
  location: Location;
  coverage_areas: any[];
  attributes: Attribute[];
  warnings: any[];
  listing_source: string;
  variations: any[];
  status: string;
  sub_status: any[];
  tags: string[];
  warranty: string;
  catalog_product_id: string;
  domain_id: string;
  parent_item_id: null;
  differential_pricing: null;
  deal_ids: any[];
  automatic_relist: boolean;
  date_created: Date;
  last_updated: Date;
  health: null;
  catalog_listing: boolean;
  channels: string[];
  description: Description;
}

export interface Attribute {
  id: string;
  name: string;
  value_id: null | string;
  value_name: string;
  value_struct: Struct | null;
  values: Value[];
  attribute_group_id?: AttributeGroupID;
  attribute_group_name?: AttributeGroupName;
}

export enum AttributeGroupID {
  Others = "OTHERS",
}

export enum AttributeGroupName {
  Otros = "Otros",
}

export interface Struct {
  number: number;
  unit: string;
}

export interface Value {
  id: null | string;
  name: string;
  struct: Struct | null;
}

export interface Description {
  text: string;
  plain_text: string;
  last_updated: Date;
  date_created: Date;
  snapshot: Snapshot;
}

export interface Snapshot {
  url: string;
  width: number;
  height: number;
  status: string;
}

export interface Location {
}

export interface Picture {
  id: string;
  url: string;
  secure_url: string;
  size: string;
  max_size: string;
  quality: string;
}

export interface SellerAddress {
  city: City;
  state: City;
  country: City;
  search_location: SearchLocation;
  id: number;
}

export interface City {
  id: string;
  name: string;
}

export interface SearchLocation {
  neighborhood: City;
  city: City;
  state: City;
}

export interface Shipping {
  mode: string;
  methods: any[];
  tags: string[];
  dimensions: null;
  local_pick_up: boolean;
  free_shipping: boolean;
  logistic_type: string;
  store_pick_up: boolean;
}
