import request from "./request";
import API_ROUTES from '@config/api.routes';
import Item from "src/interfaces/item";

class ItemService {
  hostname: string;
  port: string;
  constructor() {
    this.hostname = API_ROUTES.root;
    this.port = API_ROUTES.port;
  }

  SearchItem(value: string) {
    return request<Item[]>({
      hostname: this.hostname,
      path: API_ROUTES.items.search(value),
      method: 'GET',
      port: this.port
    });
  }

  GetItemDetails(id: string) {
    return request<Item>({
      hostname: this.hostname,
      path: API_ROUTES.items.detail(id),
      method: 'GET',
      port: this.port
    });
  }
}
const itemService = new ItemService();
export default itemService;