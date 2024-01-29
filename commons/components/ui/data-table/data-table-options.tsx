import {
  FaBox,
  FaCheckCircle,
  FaMotorcycle,
  FaPlane,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaTruck,
  FaWarehouse,
} from "react-icons/fa";

export const orderStatus = [
  {
    value: "Order_Placed",
    label: "Order Placed",
    icon: FaBox,
  },
  {
    value: "Order_Shipped",
    label: "Order Shipped",
    icon: FaTruck,
  },
  {
    value: "In_Transit",
    label: "In Transit",
    icon: FaPlane,
  },
  {
    value: "Arrived_at_Hub",
    label: "Arrived at Hub",
    icon: FaWarehouse,
  },
  {
    value: "Out_for_Delivery",
    label: "Out for Delivery",
    icon: FaMotorcycle,
  },
  {
    value: "Delivered",
    label: "Delivered",
    icon: FaCheckCircle,
  },
];

export const deliveredStatus = [
  {
    value: "Yes",
    label: "Yes",
    icon: FaRegCheckCircle,
  },
  {
    value: "No",
    label: "No",
    icon: FaRegTimesCircle,
  },
];
