import axios from 'axios';
import { useEffect, useState } from 'react';

export default function OrderIndex() {
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get('/api/orders');
    setOrders(data);
  }, []);

  return (
    <ul>
      {orders.map((order) => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        );
      })}
    </ul>
  );
}
