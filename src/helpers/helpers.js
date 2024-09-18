const handleGenerateHATEOAS = ({ data, currentPage, pages, limit }) => {
  const links = {};

  // Enlace a la página anterior
  if (currentPage > 1) {
      links.prev = `/joyas?page=${currentPage - 1}&limit=${limit}`;
  }

  // Enlace a la página siguiente
  if (currentPage < pages) {
      links.next = `/joyas?page=${currentPage + 1}&limit=${limit}`;
  }

  return {
      data,        // Lista de joyas
      currentPage, // Página actual
      totalPages: pages,  // Total de páginas
      links        // Enlaces para paginación
  };
};

module.exports = { handleGenerateHATEOAS };
