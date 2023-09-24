import Item from "./Item";
import { useEffect } from "react";

export default function ItemList({ items, getFiles }) {
  useEffect(getFiles);

  return (
    <div>
      {items.map((name) => (
        <Item key={name} fullName={name} getFiles={getFiles}></Item>
      ))}
    </div>
  );
}
