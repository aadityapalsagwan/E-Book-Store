const generateOrderId = () => {
  const timestamp = Date.now().toString(36); // base36 for compactness
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

module.exports = generateOrderId;
