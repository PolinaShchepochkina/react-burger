import styles from './orders-history.module.css';
import { OrderCard } from '../order-card/order-card';
import { useSelector } from '../../services/hooks/hooks';

export const OrdersHistory = () => {

  const orders = useSelector(state => state.webSocket.orders);

  return (
    <section>
      <ul className={styles.scroll}>
        {orders.map(order =>
          <li key={order._id}>
            <OrderCard order={order} />
          </li>
        )}
      </ul>
    </section>
  )
}
