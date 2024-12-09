import { useEffect, useState } from 'react';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';

export default function OrderShow({ currentUser }) {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => Router.push('/orders'),
  });

  useEffect(async () => {
    const { data } = await axios.get(`/api/orders/${orderId}`);
    setOrder(data);
  }, []);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      {!order.ticket || (
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey="pk_test_51IaR26Ah8Fbf2OFyDWmgtmoGk5eXnzRbRmxNVzncWVWlTyYV8hxSimwYRt7YUYqH0OLGFNUHMWc60dY3xOxOArDV00aOHblr7N"
          currency="EUR"
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />
      )}
      {errors}
    </div>
  );
}
