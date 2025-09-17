import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { CreateOrderForm } from "../components/CreateOrderForm";
import { useState } from "react";
import { UserOrdersTable } from "../components/UserOrdersTable";
import { orderApi } from "../api/orderApi";
import type { User } from "../types";

const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [userId, setUserId] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleOrderCreated = () => {
    setRefreshTrigger(prev => !prev);
  };

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const token = await getToken();

          const { userId } = await orderApi.syncUser(
            token as string,
            user as User
          );

          setUserId(userId);
        } catch (error) {
          console.error("Error syncing user with backend:", error);
        }
      }
    })();
  }, [user, getToken]);
  return (
    <>
      <CreateOrderForm onOrderCreated={handleOrderCreated} curUserId={userId} />
      <UserOrdersTable refreshTrigger={refreshTrigger} userId={userId} />
    </>
  );
};

export default Dashboard;
