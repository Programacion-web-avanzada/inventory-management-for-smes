import React, { useState, useEffect } from "react";
import useStore from "@/hooks/useStore";
import { Button } from "@mui/material";
import UserData from "@/types/UserData";
import StoreData from "@/types/StoreData";
import { toast } from "react-hot-toast";
import ModalAddInventory from "./ModalAddInventory";

interface MainInventoryProps {
  userData: UserData;
}

const MainInventory = ({ userData }: MainInventoryProps) => {
  const [store, setStore] = useState<StoreData | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fetchStoreData = async () => {
    try {
      const response = await useStore.useGetStore(userData.storeId);
      const storeData: StoreData = response.data;
      setStore(storeData);
    } catch (error) {
      toast.error("Error al cargar la tienda");
    }
  };

  const fetchInventoryData = async () => {
    try {
      const response = await useStore.useGetStore(userData.storeId);
      const storeData: StoreData = response.data;
      setStore(storeData);
    } catch (error) {
      toast.error("Error al cargar la tienda");
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  return (
    <>
      <div>
        <div className="w-[100%] flex text-3xl mt-4 flex-col">
          <p className="text-center">
            Bienvenido a la sección de Inventario, a continuación podras ver los
            inventarios de la tienda:
          </p>
          <p className="font-bold text-center text-5xl">{store?.name}</p>
        </div>
        <div className="flex mt-10 flex-row justify-center">
          <Button
            variant="outlined"
            sx={{ fontSize: 15, width: "30%" }}
            onClick={() => setOpenModal(!openModal)}
          >
            Agregar Nuevo Inventario
          </Button>
        </div>
        <div>
          {store?.inventory.length === 0 ? (
            <div className="flex flex-row justify-center text-sm mt-3">
              No existen Inventarios
            </div>
          ) : (
            <div>Existen Inventarios</div>
          )}
        </div>
      </div>
      <ModalAddInventory openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default MainInventory;
