import "./App.css";
import Listing from "./components/Listing";
import etsy from "./data/etsy.json";
import type { EtsyItem } from "./types";

export default function App() {
  return (
    <div className="container">
      <Listing items={etsy as EtsyItem[]} />
    </div>
  );
}
