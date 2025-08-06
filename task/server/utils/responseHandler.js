// Success response handler
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res, message = 'Error occurred', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message
  };

  if (errors) {
    response.errors = errors;
  }

  res.status(statusCode).json(response);
};

const paginateResults = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

const createSearchQuery = (searchTerm, fields) => {
  if (!searchTerm) return {};
  
  const searchQuery = {
    $or: fields.map(field => ({
      [field]: { $regex: searchTerm, $options: 'i' }
    }))
  };
  
  return searchQuery;
};

const createSortQuery = (sortBy = 'createdAt', sortOrder = 'desc') => {
  const sortQuery = {};
  sortQuery[sortBy] = sortOrder === 'desc' ? -1 : 1;
  return sortQuery;
};

module.exports = {
  successResponse,
  errorResponse,
  paginateResults,
  createSearchQuery,
  createSortQuery
}; 