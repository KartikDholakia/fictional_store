/**
 * @desc Pagination Middleware that can be used to paginate
 * results in any of the routes.
 * @param model 
 * @returns async function that can be used in any route that 
 * requires pagination.
 */
const paginateResults = (model) => {
	return async (req, res, next) => {
		// Current page number, defaulting to 1 if not provided
		const page = parseInt(req.query.page) || 1; 

		// Number of products per page, defaulting to 10 if not provided
		const limit = parseInt(req.query.limit) || 10;

		// Total number of documents
		const count = await model.countDocuments(); 

		// Total number of pages
		const totalPages = Math.ceil(count / limit); 

		// Number of documents to skip
		const skip = (page - 1) * limit;

		req.pagination = {
			page,
			totalPages,
			count
		};

		try {
			// Retrieve documents for the current page
			const results = await model.find().skip(skip).limit(limit); 
			req.pagination.results = results;
			next();
		} catch (error) {
			return res.status(500).json({ message: 'Failed to paginate results' });
		}
	};
};

module.exports = { paginateResults };