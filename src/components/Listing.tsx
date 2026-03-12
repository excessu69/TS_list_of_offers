import type { EtsyItem } from "../types";

type ListingProps = {
  items?: EtsyItem[];
};

function truncateTitle(title: string): string {
  return title.length > 50 ? `${title.slice(0, 50)}…` : title;
}

function formatPrice(price: string, currencyCode: string): string {
  switch (currencyCode) {
    case "USD":
      return `$${price}`;
    case "EUR":
      return `€${price}`;
    case "GBP":
      return `£${price}`;
    default:
      return `${currencyCode} ${price}`;
  }
}

function getStockClass(quantity: number): string {
  if (quantity <= 10) {
    return "stock-low";
  }

  if (quantity <= 20) {
    return "stock-medium";
  }

  return "stock-high";
}

export default function Listing({ items = [] }: ListingProps) {
  const filteredItems = items.filter((item) => {
    return (
      item.title &&
      item.price &&
      item.currency_code &&
      item.MainImage?.url_570xN
    );
  });

  return (
    <div className="product-grid">
      {filteredItems.map((item) => (
        <a
          key={item.listing_id}
          href={item.url}
          className="product-card"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={item.MainImage?.url_570xN}
            alt={item.title}
            className="product-image"
          />

          <div className="product-info">
            <h3 className="product-title">{truncateTitle(item.title ?? "")}</h3>

            <div className="price-container">
              <div className="product-price">
                {formatPrice(item.price, item.currency_code)}
              </div>

              <span className={`stock-badge ${getStockClass(item.quantity)}`}>
                {item.quantity} left
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
