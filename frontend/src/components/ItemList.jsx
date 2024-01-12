import Item from "./Item";
import { useEffect, useRef } from "react";

export default function ItemList({ items, getFiles }) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      getFiles();
      isInitialMount.current = false;
    } else {
    }
  });
  return (
    <div>
      {items.map((name) => (
        <Item key={name} fullName={name} getFiles={getFiles}></Item>
      ))}
    </div>
  );
}
