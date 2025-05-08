import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Guardar carrito
  const guardarCarrito = async (carrito) => {
    try {
      await AsyncStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (error) {
      console.error("Error al guardar el carrito:", error);
    }
  };

  // Cargar carrito
  const cargarCarrito = async () => {
    try {
      const carritoGuardado = await AsyncStorage.getItem("carrito");
      if (carritoGuardado) {
        setCarrito(JSON.parse(carritoGuardado));
      }
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    }
  };

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    const index = carrito.findIndex((p) => p.id === producto.id);
    let nuevoCarrito;

    if (index !== -1) {
      // Si ya existe, aumenta cantidad
      nuevoCarrito = [...carrito];
      nuevoCarrito[index].cantidad += 1;
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
    }

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
    guardarCarrito([]);
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
  };

  // Actualizar cantidad
  const actualizarCantidad = (index, nuevaCantidad) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad = nuevaCantidad;
    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
  };

  // Cargar carrito al iniciar la aplicación
  useEffect(() => {
    cargarCarrito();
  }, []);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        vaciarCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  return useContext(CarritoContext);
};
