import React, { useState } from 'react';
import ModalPage from '../ModalPage/ModalPage';
import CardList from '../CardList/CardList';

const ButtonOnClose = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRefreshList = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="p-4">
      {/* Botón alineado al extremo derecho */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleOpenModal}
          className="px-6 py-3 rounded-lg text-white text-sm font-semibold tracking-wide bg-[#2e736b] hover:bg-green-500 shadow-lg"
        >
          Publicar Mascota
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ModalPage onClose={handleCloseModal} onRefreshList={handleRefreshList} />
        </div>
      )}

      {/* Lista de tarjetas */}
      <CardList key={refreshKey} />
    </div>
  );
};

export default ButtonOnClose;

