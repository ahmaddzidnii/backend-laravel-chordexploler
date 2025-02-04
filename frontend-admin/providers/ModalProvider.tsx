"use client";

import { useEffect, useState } from "react";
import AddChordsModal from "@/features/songs/modals/AddChordsModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AddChordsModal />
    </>
  );
};

export default ModalProvider;
