/**
 * Validate email format
 * @param {String} email - Email to validate
 * @returns {Boolean} - Whether email is valid
 */
exports.isValidEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };
  
  /**
   * Validate password strength
   * @param {String} password - Password to validate
   * @returns {Object} - Validation result with isValid and message
   */
  exports.validatePassword = (password) => {
    if (password.length < 6) {
      return {
        isValid: false,
        message: 'Password must be at least 6 characters'
      };
    }
  
    // Check for stronger password requirements if needed
    // const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    // if (!strongRegex.test(password)) {
    //   return {
    //     isValid: false,
    //     message: 'Password must contain at least 1 lowercase, 1 uppercase, 1 numeric, and 1 special character'
    //   };
    // }
  
    return { isValid: true };
  };
  
  /**
   * Validate property data
   * @param {Object} data - Property data to validate
   * @returns {Object} - Validation result with isValid and errors
   */
  exports.validatePropertyData = (data) => {
    const errors = {};
  
    // Required fields
    const requiredFields = [
      'title',
      'description',
      'price',
      'bedrooms',
      'bathrooms',
      'propertySize',
      'propertyType'
    ];
  
    requiredFields.forEach(field => {
      if (!data[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
  
    // Address validation
    if (!data.address) {
      errors.address = 'Address is required';
    } else {
      if (!data.address.city) errors.city = 'City is required';
      if (!data.address.state) errors.state = 'State is required';
    }
  
    // Numeric fields validation
    if (data.price && isNaN(Number(data.price))) {
      errors.price = 'Price must be a number';
    }
  
    if (data.bedrooms && isNaN(Number(data.bedrooms))) {
      errors.bedrooms = 'Bedrooms must be a number';
    }
  
    if (data.bathrooms && isNaN(Number(data.bathrooms))) {
      errors.bathrooms = 'Bathrooms must be a number';
    }
  
    if (data.propertySize && isNaN(Number(data.propertySize))) {
      errors.propertySize = 'Property size must be a number';
    }
  
    // Property type validation
    const validPropertyTypes = ['Apartment', 'House', 'Condo', 'Villa', 'Land', 'Commercial', 'Other'];
    if (data.propertyType && !validPropertyTypes.includes(data.propertyType)) {
      errors.propertyType = 'Invalid property type';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };