/**
 * Format price to currency string
 * @param {Number} price - The price to format
 * @param {String} currency - The currency code (default: USD)
 * @returns {String} - Formatted price string
 */
exports.formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };
  
  /**
   * Create slug from string
   * @param {String} text - Text to slugify
   * @returns {String} - Slugified text
   */
  exports.slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')         // Replace spaces with -
      .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
      .replace(/\-\-+/g, '-')       // Replace multiple - with single -
      .replace(/^-+/, '')           // Trim - from start of text
      .replace(/-+$/, '');          // Trim - from end of text
  };
  
  /**
   * Get file extension from filename
   * @param {String} filename - Name of the file
   * @returns {String} - File extension
   */
  exports.getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  };
  
  /**
   * Create pagination data
   * @param {Number} page - Current page
   * @param {Number} limit - Items per page
   * @param {Number} total - Total items
   * @returns {Object} - Pagination data
   */
  exports.getPaginationData = (page, limit, total) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pagination = {};
  
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
  
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
  
    pagination.totalPages = Math.ceil(total / limit);
    pagination.currentPage = page;
    pagination.totalItems = total;
  
    return pagination;
  };