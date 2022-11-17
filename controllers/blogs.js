

// Helper Function
// Selects blog by Id with findById(id) and reuse when need to find by id
// async function
// destructure id with params
// find blog with 


// * Index route
// Method: GET
// Endpoint: /blogs
// Description: Query the entire blogs collection, to return all blogs
export const getAllBlogs = async (req, res) => {
  try {
    console.log('Get all blogs end point')
  } catch (err) {
    console.log(err)
  }
}

// * Single Blog route
// Method: GET
// Endpoint: /blogs/:id
// Description: return a single blog that matches the id from params and using the helper function to findById

// * Add Blog route
// Method: Post
// Endpoint: /blogs
// Description: add a blog to the collection with create method

// * Update Blog Route
// Method: Put
// Endpoint: /blogs/:id
// Description: Find a specific blog with helper function, and assign req.body with Object.assign and save blog with save method

// * Delete Blog Route
// Method: delete
// Endpoint: /blogs/:id
// Description: Locates the correct blog and removes it from the collection