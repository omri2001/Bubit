import Item from "./Item";
import { useEffect, useRef } from "react";

export default function ItemList({ user, items, getFiles }) {
  return items.length > 0 ? (
    <div>
      {items.map((name) => (
        <Item key={name} user={user} fullName={name} getFiles={getFiles}></Item>
      ))}
    </div>
  ) : (
    <div>NO FILES UPLOADED</div>
  );
}
