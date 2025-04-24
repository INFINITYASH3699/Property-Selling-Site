// src/constants/config.js
export const MOCK_LISTINGS = [
    {
      id: 1,
      title: 'Beautiful Family Home',
      description: 'A spacious 4-bedroom house with a large backyard and modern amenities.',
      price: 37500000, // Converting from USD to INR (approximately)
      image: 'https://archipro.com.au/images/cdn-images/width%3D3840%2Cquality%3D80/images/s1/article/building/Form-Apartments-Port-Coogee-by-Stiebel-Eltron-.jpg/eyJlZGl0cyI6W3sidHlwZSI6InpwY2YiLCJvcHRpb25zIjp7ImJveFdpZHRoIjoxOTIwLCJib3hIZWlnaHQiOjE1NTgsImNvdmVyIjp0cnVlLCJ6b29tV2lkdGgiOjIzMTcsInNjcm9sbFBvc1giOjU2LCJzY3JvbGxQb3NZIjozMywiYmFja2dyb3VuZCI6InJnYigxMTUsMTQwLDE5NCkiLCJmaWx0ZXIiOjZ9fSx7InR5cGUiOiJmbGF0dGVuIiwib3B0aW9ucyI6eyJiYWNrZ3JvdW5kIjoiI2ZmZmZmZiJ9fV0sInF1YWxpdHkiOjg3LCJ0b0Zvcm1hdCI6ImpwZyJ9',
      location: 'Bandra, Mumbai',
      bedrooms: 4,
      bathrooms: 3,
      area: 2500, // in sq. ft.
    },
    {
      id: 2,
      title: 'Modern Apartment in the City',
      description: 'A sleek 2-bedroom apartment with stunning city views and premium finishes.',
      price: 26250000,
      image: 'https://is1-2.housingcdn.com/4f2250e8/9a3ba28eaa3475a8d913a38f59668790/v0/fs/sanjivani_snehal_apartment-chinchwad_1-pune-sanjivani_reality.jpeg',
      location: 'Koramangala, Bangalore',
      bedrooms: 2,
      bathrooms: 2,
      area: 1500,
    },
    {
      id: 3,
      title: 'Cozy Cottage Near the Lake',
      description: 'A charming 3-bedroom cottage with a private garden and lake access.',
      price: 33750000,
      image: 'https://images.nobroker.in/img/5ba3f029714b56aa085747fe/5ba3f029714b56aa085747fe_75932_435888_large.jpg',
      location: 'Jubilee Hills, Hyderabad',
      bedrooms: 3,
      bathrooms: 2,
      area: 2000,
    },
  ];

  export const API_ENDPOINTS = {
    listings: '/api/listings',
  };
