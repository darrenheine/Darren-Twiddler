$(document).ready(() => {
  console.log("jQuery is ready!"); // Log to confirm jQuery is loaded

  // Basic setup
  const $body = $("body");
  $body.css({
    "font-family": "Arial, sans-serif",
    "line-height": "1.5",
    "background-color": "#f4f4f4",
    padding: "20px",
  });

  // Create tweet input and button elements
  const $tweetInput = $("<input>")
    .attr("placeholder", "What's happening?")
    .css({
      width: "80%",
      padding: "10px",
      "margin-bottom": "10px",
      "border-radius": "4px",
      border: "1px solid #ccc",
    });

  const $tweetButton = $("<button>").text("Tweet").css({
    padding: "10px 20px",
    "background-color": "#1DA1F2",
    color: "#fff",
    border: "none",
    "border-radius": "4px",
    cursor: "pointer",
    "margin-left": "10px",
  });

  // Create container and append input and button
  const $tweetInputContainer = $("<div>").css({ "margin-bottom": "20px" });
  $tweetInputContainer.append($tweetInput, $tweetButton);
  $body.append($tweetInputContainer);

  // Create a container to hold the tweets
  const $tweetsContainer = $("<div>").attr("id", "tweetsContainer");
  $body.append($tweetsContainer);

  // Function to add a tweet to the display
  const addTweetToDisplay = (tweet) => {
    const $tweet = $("<div></div>").css({
      "background-color": "#fff",
      padding: "10px",
      "margin-bottom": "10px",
      "border-radius": "4px",
      "box-shadow": "0 2px 4px rgba(0, 0, 0, 0.1)",
    });

    const $user = $("<span></span>")
      .text(`@${tweet.user}`)
      .css("font-weight", "bold")
      .css("cursor", "pointer");

    const $message = $("<span></span>")
      .text(`: ${tweet.message}`)
      .css("margin-left", "5px");

    const $timestampExact = $("<span></span>")
      .text(moment(tweet.created_at).format("MMMM Do YYYY, h:mm:ss a"))
      .css({
        "font-style": "italic",
        "font-size": "0.9em",
        color: "#555",
        "margin-left": "10px",
      });

    const $timestampHumanFriendly = $("<span></span>")
      .text(` (${moment(tweet.created_at).fromNow()})`)
      .css({
        "font-style": "italic",
        "font-size": "0.9em",
        color: "#999",
        "margin-left": "5px",
      });

    $tweet.append($user, $message, $timestampExact, $timestampHumanFriendly);
    $tweetsContainer.prepend($tweet); // Add the new tweet at the top

    // Add click event to the username to display user’s timeline
    $user.on("click", () => {
      displayUserTimeline(tweet.user);
    });
  };

  // Function to display all tweets on initial load
  const displayTweets = () => {
    $tweetsContainer.empty(); // Clear existing tweets
    streams.home
      .slice()
      .reverse()
      .forEach((tweet) => {
        addTweetToDisplay(tweet);
      });
  };

  // Function to display a specific user's timeline
  const displayUserTimeline = (user) => {
    currentView = user; // Track the current view
    $tweetsContainer.empty(); // Clear existing tweets

    streams.users[user]
      .slice()
      .reverse()
      .forEach((tweet) => {
        addTweetToDisplay(tweet);
      });

    // Add a "Back to Home" button
    const $backButton = $("<button>Back to Home</button>").css({
      padding: "10px 20px",
      "background-color": "#1DA1F2",
      color: "#fff",
      border: "none",
      "border-radius": "4px",
      cursor: "pointer",
      "margin-top": "20px",
    });

    $backButton.on("click", () => {
      currentView = "home"; // Set view to home
      displayTweets(); // Display home timeline
    });

    $tweetsContainer.append($backButton);
  };

  // Display tweets on initial load
  let currentView = "home";
  displayTweets();

  // Click event handler for the Tweet button
  $tweetButton.click(() => {
    const message = $tweetInput.val().trim();
    console.log("Tweet button clicked!");
    console.log("Tweet message: ", message);

    if (message) {
      const tweet = {
        user: "douglascalhoun",
        message: message,
        created_at: moment().toISOString(),
      };

      addTweet(tweet); // Add the tweet to the streams data structure

      if (currentView === "home") {
        addTweetToDisplay(tweet); // Display the new tweet on the screen if on the home timeline
      }

      $tweetInput.val(""); // Clear the input field after tweeting
    }
  });

  // Function to refresh tweets every 2 seconds
  const refreshTweets = () => {
    if (currentView === "home") {
      displayTweets(); // Refresh the tweet list only if viewing home timeline
    }
  };

  // Start the auto-refresh interval
  setInterval(refreshTweets, 2000);
});
