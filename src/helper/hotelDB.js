const Hotel = require("../models/Hotel");

const hotels = [
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Hotel Gran Estrella",
    address: "123 Avenida Elegante",
    city: "Londres",
    country: "Reino Unido",
    description: "Una experiencia de cinco estrellas para el viajero exigente.",
  },
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Resort junto al Mar",
    address: "456 Camino Frente a la Playa",
    city: "Miami",
    country: "Estados Unidos",
    description: "Escapa a nuestro tranquilo oasis junto a la playa.",
  },
  {
    available: true,
    image:
      "https://plus.unsplash.com/premium_photo-1675745329378-5573c360f69f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Mountain Lodge Retreat",
    address: "789 Calle Alpine",
    city: "Toronto",
    country: "Canadá",
    description: "Experimenta la belleza de la naturaleza con comodidad.",
  },
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
    name: "Posada Luces de la Ciudad",
    address: "101 Calle Urbana",
    city: "Paris",
    country: "Francia",
    description: "Quédate en el corazón de la ciudad vibrante.",
  },
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
    name: "Lodge a Orillas del Río",
    address: "222 Calle Riverside",
    city: "Sidney",
    country: "Australia",
    description: "Relájate junto al río y disfruta de vistas serenas.",
  },
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    name: "Hotel Mansión Histórica",
    address: "333 Calle Patrimonial",
    city: "Sicilia",
    country: "Italia",
    description: "Experimenta la opulencia de una era pasada.",
  },
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    name: "Resort Oasis en el Desierto",
    address: "444 Avenida Duna de Arena",
    city: "Dubai",
    country: "Emiratos Árabes Unidos",
    description: "Indulge en el lujo en medio del desierto.",
  },
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Lodge en el Bosque",
    address: "555 Calle Siempreverde",
    city: "Frankfurt",
    country: "Alemania",
    description: "Encuentra tranquilidad entre los árboles imponentes.",
  },
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Posada paraíso tropical",
    address: "666 Boulevard Playa Palm",
    city: "Bahia",
    country: "Brasil",
    description: "Escapa a un paraíso exuberante junto al mar.",
  },
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Encantador Hotel Cabaña",
    address: "777 Calle del Campo",
    city: "Valencia",
    country: "España",
    description: "Experimenta la calidez de la hospitalidad rústica.",
  },
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1580041065738-e72023775cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Hotel Elegante en la Montaña",
    address: "111 Alpine View Road",
    city: "Ginebra",
    country: "Suiza",
    description: "Sumérgete en la majestuosidad de los Alpes suizos.",
  },
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1614957004131-9e8f2a13123c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Resort en la Playa Esmeralda",
    address: "222 Playa Esmeralda Avenue",
    city: "Cancun",
    country: "México",
    description: "Disfruta de aguas cristalinas y arenas doradas.",
  },
  {
    available: true,
    image:
      "https://plus.unsplash.com/premium_photo-1678286769888-ef3698e72a6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    name: "Hotel en el Corazón del Bosque",
    address: "333 Camino del Bosque",
    city: "Cordoba",
    country: "Argentina",
    description: "Conéctate con la naturaleza en un entorno mágico.",
  },
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    name: "Hotel Histórico de la Ciudad",
    address: "101 Calle Antigua",
    city: "Barcelona",
    country: "España",
    description: "Revive el pasado en un hotel lleno de historia.",
  },
  {
    available: true,
    image:
      "https://images.unsplash.com/photo-1564574685150-74a84d02d695?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=396&q=80",
    name: "Retiro Sereno en la Montaña",
    address: "444 Camino Tranquilo",
    city: "Santiago de Chile",
    country: "Chile",
    description: "Encuentra paz y tranquilidad en la cima de los Andes.",
  },
];

const loadHotels = async () => {
  try {
    const conteoHoteles = await Hotel.count();
    if (conteoHoteles <= 0) {
      const newHotel = await Hotel.bulkCreate(hotels);
      console.log("Hoteles creados");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = loadHotels;
