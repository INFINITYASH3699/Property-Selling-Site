/**
 * Utility functions for managing favorite properties
 */

// Get all favorite property IDs from localStorage
export const getFavoriteIds = () => {
    if (typeof window === 'undefined') return [];
    
    try {
      const savedFavorites = localStorage.getItem('favoriteProperties');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error('Error retrieving favorites:', error);
      return [];
    }
  };
  
  // Check if a property is in favorites
  export const isFavorite = (propertyId) => {
    const favoriteIds = getFavoriteIds();
    return favoriteIds.includes(propertyId);
  };
  
  // Add a property to favorites
  export const addToFavorites = (propertyId) => {
    if (typeof window === 'undefined') return;
    
    try {
      const favoriteIds = getFavoriteIds();
      if (!favoriteIds.includes(propertyId)) {
        const updatedFavorites = [...favoriteIds, propertyId];
        localStorage.setItem('favoriteProperties', JSON.stringify(updatedFavorites));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  };
  
  // Remove a property from favorites
  export const removeFromFavorites = (propertyId) => {
    if (typeof window === 'undefined') return;
    
    try {
      const favoriteIds = getFavoriteIds();
      const updatedFavorites = favoriteIds.filter(id => id !== propertyId);
      localStorage.setItem('favoriteProperties', JSON.stringify(updatedFavorites));
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return false;
    }
  };
  
  // Clear all favorites
  export const clearAllFavorites = () => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem('favoriteProperties');
      return true;
    } catch (error) {
      console.error('Error clearing favorites:', error);
      return false;
    }
  };
  
  // Get all favorite properties by combining IDs with property data
  export const getFavoriteProperties = (allProperties) => {
    const favoriteIds = getFavoriteIds();
    return allProperties.filter(property => favoriteIds.includes(property.id));
  };