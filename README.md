# Trickr Street

This project was created in less than a day, during a hackathon hosted by School of Code and GoodGrowth. The challenge was to make any Halloween themed application. 

We created Trickr Street, a Next.js application that features an interactive Google Map with custom markers and a night mode theme. The app has been built with a security first mindset, we started with authentication and after logging in, the user is able to see a map with trick or treat locations. 

Please click the following link to go to the deployed app: https://trickrstreet.vercel.app/ . 

To test the app using the following testing log in details: 

Username: test@gmail.com

Password: test123

If anything doesn't work please contact me on linkedIn or on here. 

<img width="1080" alt="Screenshot 2025-01-07 at 15 43 13" src="https://github.com/user-attachments/assets/72f68492-3c0d-4bb4-a472-049540d374ee" />

The login screen

<img width="350" alt="Screenshot 2025-01-07 at 16 08 59" src="https://github.com/user-attachments/assets/075956bf-f772-4d78-9ba7-bc8101109a5f" />

Markers to identify locations for trick or treating

<img width="350" alt="Screenshot 2025-01-07 at 16 08 32" src="https://github.com/user-attachments/assets/e49c8913-225c-4954-a8f1-31bd57f76701" />

Each marker would include reviews of the location and the address.


### Features
- Interactive Google Map
- Custom markers with unique icons
- Night mode map styling
- Responsive design
- React-based architecture


### Tech Stack

- Next.js
- React
- @react-google-maps/api
- Tailwind CSS

## Development

### Planning 
Once we decided on the idea that we wanted to build (using dot voting). We used a priorotisation matrix to list all the features we wanted the app to have, and using the matrix we priorotised those that are essential to the end user and build those first. 

1. Authentication/ Security - So that addresses are not visible to everyone
2. Visibility of location
3. Able to see reviews of locations 

![Priorotization matrix](https://www.productplan.com/uploads/2x2-prioritization-1024x536-1.png)


### Tech Choices

- Google maps API - in future we would like to adding rotuing options. Also google maps allows the map theme to be customised.
- Next.js and React - for app scalability, reusability of components.
- Supabase - for authentication and also the database. In future map marker locations would be stored in the SQL database, and then fetched to visualise this on the map.


### Future plans 

We would have liked to integrate the database with the location markers, include additional features such as route planning. Adding additional map marker styles, based on whether a house is rated bad or good and also show the houses that are currently active.  

## Getting Started


### Installation 

Follow the instructions below to install the project locally, if you wish to:

1. Get an API key at [https://example.com](https://example.com/)
2. Clone the repository

     ```shell
    git clone https://github.com/github_username/repo_name.git
    ```

4. Install NPM Packages: `npm install`

    ```shell
    npm install
    ```

6. Set up your Google Maps API key in `.env.local`:

    ```js
    const API_KEY = 'ENTER YOUR API';
    ```
   
8. Run the development server: `npm run dev`

    ```shell
    npm install
    ```
    
10. Open [http://localhost:3000](http://localhost:3000/) in your browser


## Version History

* 0.1
    * Initial Release




