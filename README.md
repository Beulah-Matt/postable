# Postable, A Social Platform to Read Posts

This project is hosted on Vercel [Postable](https://postable-beulah-matt.vercel.app/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## `Project Description`

- 🔭 What is good about Postable **A user can see posts from others, see other users and follow them**
- 💬 Other Features **A user can sign in and logout, choose a premium subscription to view all posts .**
- 🌱 State Management **Has been done through context API and useState Hooks, persisted with local storage**
- 👯 I’m happy to have archieved **Mock card payments through Stripe Developer Tools**
- 💬 What I learned that is new: **Adding adSense to a Project**
- 🤔 Biggest Challenge I faced **App-wide shared state management without a backend** 

### `Archieving Deliverables`

<div align="left" style="padding: 20px 0 0 20px;">
  <p> Navigating to the application, an anonymous usser will see some posts, 20 to be precise. At the end of the feed, they will then be prompted to sign in. </p>
  <br>
  <p>After signing in, one is then redirected to the home page where they can see all the posts they have written. I have achieved this using react-routing page    navigation.  </p>
  <br>
  <p>Similarly, a signed in user can as well write more posts by clicking the like button. The post object can be seen in the console where it has been logged.  </p>
  <br>
</div>

- The rights of an authenticated user are **They can upgrade to premium, can follow other users and see their posts, can block a single post from their feed**

#### `User Preferences`

<div align="left" style="padding: 20px 0 0 20px;">
  <p> Unfollow: Mock content selection behaviour, When you unfollow a user, you can no longee see their posts in the Following Tab. </p>
  <br>
  <p> Following: After following a user in the Users tab, you can see all their posts by navigating to the Following Tab.  </p>
  <br>
  <p>Like a post: You can like a post once, authenticated or not. See the likes count increase as well.  </p>
  <br>
  <p>Block a post: Once you are signed in, a dislike button is visible. I used this button to act as a block icon, the post is immediately filtered out and state is      persisted so that a user does not see it again  </p>
  <br>
  <p>See your Profile: A navbar has options to navigate to various tabs in the app, including a user profile. Here, you can see your name, number of posts and navigate to the view All page. </p>
  <br>
  <p>You can as well log out from the Navbar by clicking on your icon </p>
  <br>
</div>

## `Important: Payments`

Mock payments for this project have been integrated by using Stripe Developer Payments Api. 
Stripe has given these cards for testing

#### Test Card for Visa:

**Card Number: 4242 4242 4242 4242**
Expiration Date: Any date in the future
CVC: Any 3-digit number
Postal Code: Any valid postal code

#### Test Card for Mastercard:

**Card Number: 5555 5555 5555 4444**
Expiration Date: Any date in the future
CVC: Any 3-digit number
Postal Code: Any valid postal code

### `Drawbacks`
As of the time of completion of this project, my Google adSense account had not been fully reviewed to run ads. 
Though I have added a google ads component, it is not visible on the browser pending confirmation from Google. 


<h3 align="left">Technologies Used:</h3>

<p align="left"> 
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
  </a> 
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="tailwindCSS" width="40" height="40"/>
  </a> 
  <a href="https://headlessui.dev/" target="_blank" rel="noreferrer">
    <img src="https://i.postimg.cc/qB67r5Dy/headless-ui-seeklogo-com.png" alt="Headless UI" width="40" height="40"/>
  </a> 
  <a href="https://stripe.com/" target="_blank" rel="noreferrer">
    <img src="https://i.postimg.cc/nhhbFsVg/Stripe-wordmark-blurple-large.png" alt="Stripe" width="40" height="40"/>
  </a> 
  </a> 
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
  </a> 
</p>

