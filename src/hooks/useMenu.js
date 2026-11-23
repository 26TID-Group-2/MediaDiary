import { useState } from "react";

export default function useMenu() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuOpen = menuAnchor !== null;

  function handleMenuOpen(event) {
    setMenuAnchor(event.currentTarget);
  }

  function handleMenuClose() {
    setMenuAnchor(null);
  }

  return {
    menuAnchor,
    isMenuOpen,
    handleMenuOpen,
    handleMenuClose,
  };
}
