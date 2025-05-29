import { bazaarApiGet } from "../../utils/api-helper";

export const fetchOrders = async (tab: string, page: number) => {
  try {
    const response = await bazaarApiGet(`/orders/${tab}?page=${page}`);
    return response;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
