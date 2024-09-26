// src/components/Header.tsx
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Using react-icons for cart and user icons
import { RootState, useAppSelector } from "../store/store";
import SearchDropdown from "./SearchDropdown";
import useRoute from "../hook/useRouter";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const { clickRouteLink } = useRoute();

  return (
    <header className="tw-bg-light-50 tw-p-4 tw-flex tw-justify-between tw-items-center tw-shadow">
      {/* Logo Section */}
      <div className="tw-flex tw-items-center">
        <Link to={"/"}>
          <img
            src="https://i.ibb.co/DpK6Z0m/1673291260756.png"
            alt="Logo"
            className="tw-h-10 tw-w-auto"
          />
        </Link>
      </div>

      <SearchDropdown />

      {/* Icons Section */}
      <div className="tw-flex tw-space-x-4">
        <button
          className="tw-text-gray-700 hover:tw-text-blue-500"
          onClick={() => clickRouteLink("cart")}
        >
          {cartItems.length > 0 && (
            <span className="tw-top-0 tw-right-0 tw-bg-red-500 tw-text-white tw-rounded-full tw-text-xs tw-w-4 tw-h-4 tw-flex tw-justify-center tw-items-center">
              {cartItems.length}
            </span>
          )}
          {/* {cartItems.length} */}
          <FaShoppingCart size={24} />
        </button>
        <button
          className="tw-text-gray-700 hover:tw-text-blue-500"
          onClick={() => clickRouteLink("register")}
        >
          <FaUser size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
