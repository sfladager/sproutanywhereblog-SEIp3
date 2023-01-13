# Sprout Anywhere

The third project of the SEI General Assembly course was a 8 day full stack project in a group of 3. We chose to build a website called Sprout Anywhere which was designed to be an ecommerce website listing plants for sale and a blog to provide education. We emphasized the customer journey by guiding them through the process of discovering the perfect plant for the occasion or the best articles for their interests. For the project we allow anyone to create an account and post a product or a blog. We didn’t have time to add payment processing, so we used affiliate links to purchase products. Give it a try and test out the functionality for yourself. 

![home-page](/screenshots/sprout-home.png)

Check out the website here → [Demo](https://project-sproutanywhere.herokuapp.com/)

# Brief
- Build a full-stack application by making your own back-end and front-end
- Use an Express API to serve your data from a Mongo database
- Consume your API with a separate front-end built with React
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
- Have a visually impressive design
- A working app hosted on the internet

# Technologies Used
- React.js
- JavaScript
- MongoDB
- Mongoose
- Node.js
- Express.js
- SASS
- Axios
- Git
- GitHub
- Insomnia
- npm
- Chakra-UI
- Bootstrap
- HTML5
- Cloudinary
- DropZone
- Heroku
- DraftJS
- html-react-parser
- Moment
- Figma

# Installation
- Clone or download the repo from GitHub
- In root folder type: ``` npm install ```
- Run ``` mongod --dbpath ~/data/db ``` in terminal if you are using MacOS Catalina. Otherwise run mongod
- ``` npm run seed ``` to seed the database
- ``` npm run serve ``` to run the server
- Cd into client folder and type: ``` npm start ``` to get front end started

# Approach Taken
- Day 1: Ideas research, team brief, planning project days
- Day 2-3: Backend setup, and testing
- Day 4-5: Setup basic layout of all pages and website with basic functionality and connecting to API
- Day 6-7: Add in details to each page per the plan
- Day 8: Fix bugs, improve styling and testing. Tested by trying all features to see if they worked as intended, and fix as needed.
- Day 9: Deployment with Heroku

# Planning
  After agreeing on the project concept we took out ideas to Figma, and started drawing out our ideas. We started writing all the features we wanted to have in the website and put that in a list and split responsibilities from there. I started the Figma project and shared it with partners so we were able to work at the same time on Figma and design each page separately. This expedited the process, and we were able to stay consistent with the theme. We had a standup in the morning everyday to recap the previous day's work, and share our plan for the day, which ensured we are on track, and gave us the ability to adjust the plan if needed. Our plans were written on Figma, and we were able to stick to them. The tasks were divided based upon both comfortability of the task, but interest in working that part of the project. The result of our planning is displayed below, and as you can see, we did change some things in the final product.  

![wireframe](/screenshots/wireframe.png)

# Build
## Back End
  The back end of the project was built with MongoDB, Express, and Mongoose. We divided the tasks in sections of the website. I worked on all backend functions related to the blogs, and also set up the index page. 
  The model for the blogs included a reference for the owner which would be used later for authentication and also populating the owner of the blogs on the front end. The code below displays the model schema I wrote for the blogs. 

```

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, maxlength: 100 },
  category: { type: String, required: true },
  tags: { type: String, required: true },
  description: { type: String, required: true, maxlength: 100 },
  thumbnail: { type: String, requied: true },
  article: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  reviews: [reviewBlogSchema],
}, {
  timestamps: true,
})

```
  We needed to implement the ability to create, retrieve, update, and delete blogs, so I wrote controllers for these functions. In an effort to reduce and re-use as much code as possible I created a function to find blogs by id, which also populated the data with the owner field. The function findBlog shows the helper function. 
  
```
export const findBlog = async (req, res) => {
  try {
    const { id } = req.params
    const blog = await Blog.findById(id).populate('owner')
    if (!blog) throw new NotFound('Blog not found')
    return blog
  } catch (err) {
    sendErrors(res, err)
  }
}

```

  I played around with useParams a bit and created 2 extra controllers that could query the database for blogs within a category and also query blogs in a category and tags. I thought this could be useful later on when the database became larger, and could speed up transfer of data to the browser if the user only wanted specific blogs. These GET requests are shown below. 

```

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('owner')
    return res.json(blogs)
  } catch (err) {
    sendErrors(res, err)
  }
}

export const getBlogsCategory = async (req, res) => {
  try {
    const { category } = req.params
    const blog = await Blog.find({ category: category }).populate('owner')
    if (!blog) throw new NotFound('No blogs exist in this category')
    return res.json(blog)
  } catch (err) {
    sendErrors(res, err)
  }
}

export const getBlogsCategoryAndTags = async (req, res) => {
  try {
    const { category, tags } = req.params
    const blog = await Blog.find({ category: category, tags: tags }).populate('owner')
    if (!blog || blog.length === 0) throw new NotFound('No blogs with these filter options')
    return res.json(blog)
  } catch (err) {
    sendErrors(res, err)
  }
}

```

# Front End
  This part of the project was the most challenging as I was planning to add a lot of features that I had never attempted before, and didn’t have much reference from classwork. I also used Chakra instead of bootstrap, and this proved to be a larger learning curve that I thought. I mixed Chakra with my own styling to avoid relying on a framework too much.
On the front end I created the following pages or features
- Blog index page
- Single blog page
- Search bar in nav menu
- Blog form to create a new blog or edit a blog
  
  The next few sections will show code for parts of the projects that I am happy I was able to do, because I had little to no idea how I was going to accomplish it initially. With a lot of research and time spent reading through documentation I was able to push through and accomplish everything I wanted.

  The first part that I’d like to share is the nav search bar. I was happy to get it to open/close on click, and also close and clear the history if a user clicks on a plant. The search currently queries the plants database. The handleSearchInput function displayed below searches the plant data and filters by looking for matches by name typed into the search. The code below this function shows how I displayed the results with JSX.

```
const handleSearchInput = (e) => {
    setSearch(e.target.value)
  }
  const filterByName = () => {
    const regex = new RegExp(search, 'i')
    const selectedPlants = plants.filter(plant => {
      return regex.test(plant.name)
    })
    setFilteredPlants(selectedPlants)    
  }

  const clearSearch = (e) => {
    setFilteredPlants([])
  }

  useEffect(() => {
    filterByName()
  }, [search])

```
```

 <SearchIcon onClick={handleSearchClick} className="search-icon" w={17} h={17} />
  {open && <div className="search-dropdown-container" onClick={clickOutDropdown}>
    <input onChange={handleSearchInput} className="search-list-input" placeholder="Search by plant name" />
    {filteredPlants ? 
      filteredPlants.map(plant => {
        const { _id, name, thumbnail } = plant
        return (
          <Link onClick={clearSearch} key={_id} to={`/plants/${_id}`}>
            <div className="search-list">
              <img className="search-img" src={thumbnail} />
              <h6 className="search-title">{name}</h6>
            </div>
          </Link>
        )
      }
      )
      :
      errors ? <h2>Enter a plant name</h2> : <p>Loading...</p>
    }
  </div>}

```

The picture below shows how the search menu looks like when a user begins a search.
![search-img](/screenshots/search.png)

  The next component is the blog form. This proved to be a challenge as I implemented Cloudinary and a drop and drop feature, and also implemented an editor to make writing a blog more practical. The editor portion was difficult because I started with the Lexical Rich editor, and unfortunately it had a lot of bugs that I couldn’t fix. After adding it to the app, I ended up taking it out and replacing it with DraftJS since it was more stable and the documentation was clear. Another challenge of the editor was storing data from the editor and displaying it as JSX when calling it from the database. To solve this problem, I stored the data as HTML and used an HTML to JSX parser when bringing the data back to the front end. I was also able to convert the article data back into editor state to display it in the editor in case the user wants to make changes. The following code block and picture show the code used to create the editor and also how the form looks when trying to edit data.
```

const NewEditor = ({ formFields, setFormFields }) => {

  const [ editorState, setEditorState ] = useState()

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    setFormFields({ ...formFields, article: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
  }

  // code to convert html saved in article to draft to load into editor if article data is present
  const loadArticleData = () => {
    if (formFields.article) {
      const blocksFromHtml = htmlToDraft(formFields.article)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    }
  }

  useEffect(() => {
    loadArticleData()
  }, [formFields.owner])

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  )
}
export default NewEditor

```
![blog-form](/screenshots/edit-form.png)

  I was also happy to implement Cloudinary and link Cloudinary with DropZone to allow users to drag and drop images to upload them instead of having to click on a button. 
The code to upload images is shown below.

```

useEffect(() => {
    const getFiles = async () => {
      if (files.length > 0)
        try {
          const formData = new FormData()
          // Appends the file information of the file to be uploaded
          formData.append('file', files[0])
          // Appends the upload preset information
          formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
          // Sends the file data to the cloudinary serve
          const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
          console.log('DATA', data)
          setFormFields({ ...formFields, thumbnail: data.secure_url })
        } catch (err) {
          console.log(err)
        }
    }
    getFiles()
  }, [files])
  
```

  The Cloudinary data is then saved to the form object as a value under the thumbnail key. With the save thumbnail data, the image could be displayed to show the user that it has been accepted. A picture of the DropZone implementation is below with the image being displayed from formFields.thumbnail.
  
```

return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input className="blog-form-input" {...getInputProps()} />
      <div className="blog-form-input">
        { isDragActive ? 
          <p className="dropzone-content">
          Release to drop the files here</p>
          :
          <p className="dropzone-content">
            Drag and drop hero image here, or click this box to select image
          </p>
        }
        <aside>
          <div className="thumbsContainer">
            <img
              className="thumb-img "
              src={formFields.thumbnail}
              // Revoke data uri after image is loaded
              onLoad={() => { 
                URL.revokeObjectURL(formFields.thumbnail) 
              } }
            />
          </div>
        </aside>
```

# Wins
- We completed the project and all the features we had planned for. I believe the user experience is engaging and provides a better user experience than a classic shopify website.
- The blog form is actually usable and you can upload a formatted blog with it, and also edit the blog without having to start over.
- The nav search bar is something I didn’t think I would have time for, and it’s something that turned out well, and I also enjoyed coding it.
- Using Chakra slowed me down a bit, but I was happy I took the time to learn it. I found the boxes, and containers useful for implementing a design that was responsive across different screen sizes.
- There are some small bugs on the mobile view, but for the most part it’s fully responsive and functional.

# Challenges
- One of the challenges we had was merging our files in Github. My partners made a few mistakes and I was able to help solve the merging problems. For the rest of the project I helped them with merges and managing GitHub.
- Implementing the editor presented a few challenges. Choosing the right editor was important, as I initially chose an editor that looked nice and had good functionality, but some features were broken. Scrapping the work on the initial editor was a tough decision, but it was the right one, as switching to a new editor was much easier, and it still offered enough functionality. Storing the editor data and getting the saved data from the editor was not straightforward since I had to change the format of the data 3 times. DraftJS had a package to convert from editor data to HTML, and I used a html to JSX parser package to convert the stored HTML to JSX to display the content from the editor.
- Managing GitHub was initially ok, but as the project developed helping my team members merge and handling merge conflicts became time consuming.

# Key Learnings
- Building the form was a challenging and fun process as I had to research packages and find which ones I needed to develop the features I wanted. When I started I didn’t even know what keywords to search for, or what I would need, so I needed to research what to research. I quickly learned I needed to search for an editor, and then had to determine which one to use.
- I learned to be more careful when choosing packages to implement as they may not work properly. It’s better to sacrifice some features in order to gain a better user experience.
- I really enjoyed searching for packages and working with them. They add a lot of benefits for rapid development, but I also learned about some of the pitfalls with packages. Great for the short term, but can cause problems in the long run, and need to monitor them for updates that could cause problems with the app.
- It was the first time working with GitHub and collaborating with others on the same project and merging on GitHub. I think I had a good grasp on it. Coordinating with my team members on the project was good practice, and I enjoyed the ability to work remotely on the same project.

# Bugs
-  filters on the blog list page do not work as expected. The filters don’t always work 100% together. The dropdown filter resets the search and ignores the text filter. You need to type the text after the dropdown filter for it to work properly.
- The home page does not resize well for mobile use.

# Future Improvements
- First thing I want to do is fix a few small bugs. The Nav search bar should close when you click anywhere outside of the search container, but it does not. The blog index filter has an issue after you use the tag filter and then go back to use the category filter. The category filter takes over and ignores the tags
- I want to do more research on editors and find one that is more user friendly
- I also will improve the comments section to add reviews for products and improve the visuals with the comments section. I also want to add an upvote downvote system for comments
- My plan with this project is to use this as a live website to replace my current wordpress site [Sprout Anywhere]([https://](https://sproutanywhere.com). In order to do this I need to add permissions to the user model to have admin users who can post/edit blogs and products. Initially I will use affiliate links to generate some revenue from products
- The next step is to build a better product manager and implement payments. I realize this is a large undertaking. I would need to be able to manage inventory, adjust pricing, and create a cart where people can add/ remove products and checkout. Most likely I’ll start with packages to expedite the process

