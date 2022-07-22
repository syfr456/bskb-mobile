export class ProductModel{
    cart: Cart = new Cart();
    crtShop: CartShop[] = [];
}

export class Cart {
  idSembako: number;
  namaSembako: string;
  harga: number;
  satuan: string;

}

export class CartShop {
    idPembelian: number;
    idSembako: number;
    idNsbh: number;
    idRek: number;
    tanggalPembelian: Date = new Date();
    total: number;
}
